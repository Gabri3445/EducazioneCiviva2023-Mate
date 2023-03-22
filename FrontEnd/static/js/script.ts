const answers = document.querySelectorAll(".answers") as unknown as Array<HTMLLabelElement>;
const form = document.getElementById("form");
const whiteBG = document.querySelectorAll(".whiteBG");
const explanationElement = document.querySelector(".complete-answer") as HTMLParagraphElement;
const confirmElement = document.querySelector(".confirmBox") as HTMLDivElement;
const questionElement = document.querySelector(".question") as HTMLParagraphElement;
const nextQuestionArrow = document.querySelector(".right-arrow");
const quizContainer = document.querySelector(".quiz") as HTMLDivElement;
const questionContainer = document.querySelector(".question") as HTMLParagraphElement;
const answerContainer = document.querySelector(".answer-container") as HTMLDivElement;
const leaderboardContainer = document.querySelector("#leaderboardContainer") as HTMLDivElement;
const leaderboardUserContainer = document.querySelector(".userContainer") as HTMLDivElement;
const questionCounter = document.querySelector(".current-question") as HTMLParagraphElement;

let limit = true;
const letters: Array<string> = [
    "A) ",
    "B) ",
    "C) ",
    "D) "
];

let user: User;

class User {

    guid: string;
    username: string;
    currentQuestion: string;
    answers: Array<string>;
    selectedIndex: number = -1;
    hasAnswered: boolean = false;
    questionCounter: number = 0;

    constructor(guid: string, username: string, currentQuestion: string, answers: Array<string>) {
        this.guid = guid;
        this.username = username;
        this.currentQuestion = currentQuestion;
        this.answers = answers;
    }
}

form!.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();
    if (limit) {
        limit = false;
        const usernameInput = document.getElementsByName("username")[0] as HTMLInputElement;
        const username = usernameInput.value;
        const createResponse = await createUser(username);
        if (isInterface<CreateUserResponse>(createResponse)) {
            let questionResponse = await getNewQuestion(createResponse.id);
            if (isInterface<GetQuestionResponse>(questionResponse)) {
                user = new User(createResponse.id, username, questionResponse.questionString, questionResponse.answers);
            }
        }
        const parent = form!.parentNode as HTMLElement; // ! means value can't be null
        parent.classList.add("hidden");
        whiteBG[1]!.classList.add("hidden");
        document.querySelector("body")!.classList.remove("darken"); // same thing here
    }

});

answers.forEach(element => element.addEventListener("click", (e) => {
    answers.forEach(giglo => giglo.classList.remove("selected"));
    element.classList.add("selected");
    let clicked = e.target as HTMLLabelElement;
    if (typeof clicked.dataset.index !== "undefined") {
        user.selectedIndex = parseInt(clicked.dataset.index);
    }
}));


confirmElement.addEventListener("click", async () => {
    if (user.selectedIndex !== -1) {
        if (!user.hasAnswered) {
            user.hasAnswered = true;
            let answerResponse = await sendAnswer(user.guid, user.selectedIndex);
            if (isInterface<SendAnswerResponse>(answerResponse)) {
                if (answerResponse.correctAnswer) {
                    quizContainer.classList.add("correct");
                    questionContainer.classList.add("correct");
                    answerContainer.classList.add("correct");

                    // answers.forEach(element => element.classList.add("wrong-answer"))

                    answers.forEach(element => {
                        element.classList.remove("selected");
                        element.removeEventListener("click", (e) => {
                            answers.forEach(giglo => giglo.classList.remove("selected"));
                            element.classList.add("selected");
                            let clicked = e.target as HTMLLabelElement;
                            if (typeof clicked.dataset.index !== "undefined") {
                                user.selectedIndex = parseInt(clicked.dataset.index);
                            }
                        });
                    });
                    answers[answerResponse.correctAnswerIndex].classList.add("correct-answer");
                    answers[answerResponse.correctAnswerIndex].classList.remove("wrong-answer");
                } else {
                    quizContainer.classList.add("wrong");
                    questionContainer.classList.add("wrong");
                    answerContainer.classList.add("wrong");

                    answers.forEach(element => {
                        element.classList.remove("selected");
                        element.removeEventListener("click", (e) => {
                            answers.forEach(giglo => giglo.classList.remove("selected"));
                            element.classList.add("selected");
                            let clicked = e.target as HTMLLabelElement;
                            if (typeof clicked.dataset.index !== "undefined") {
                                user.selectedIndex = parseInt(clicked.dataset.index);
                            }
                        });
                    });
                    answers[answerResponse.correctAnswerIndex].classList.add("correct-answer");
                    answers[user.selectedIndex].classList.add("wrong-answer");
                }
                explanationElement.innerHTML = answerResponse.explanation;
            }
        }
        user.selectedIndex = -1;
    }
});

nextQuestionArrow!.addEventListener("click", async () => {
    if (user.hasAnswered) {
        answers.forEach(element => {
            element.classList.remove("wrong-answer");
            element.classList.remove("correct-answer");
            element.classList.remove("selected");
        });

        quizContainer.classList.remove("correct");
        questionContainer.classList.remove("correct");
        answerContainer.classList.remove("correct");

        quizContainer.classList.remove("wrong");
        questionContainer.classList.remove("wrong");
        answerContainer.classList.remove("wrong");

        answers.forEach(element => element.addEventListener("click", (e) => {
            answers.forEach(giglo => giglo.classList.remove("selected"));
            element.classList.add("selected");
            let clicked = e.target as HTMLLabelElement;
            if (typeof clicked.dataset.index !== "undefined") {
                user.selectedIndex = parseInt(clicked.dataset.index);
            }
        }));


        // Reset user
        user.currentQuestion = "";
        user.answers = new Array<string>;
        user.selectedIndex = -1;
        user.hasAnswered = false;
        // Get new question and answers
        explanationElement.innerHTML = "";
        if (typeof user !== "undefined") {
            if (user.questionCounter < 19) {
                user.questionCounter++;
                questionCounter.innerHTML = String(user.questionCounter + 1);
                await getNewQuestion(user.guid);
            } else {
                await showLeaderboard();
            }
        }
    }
});

async function getNewQuestion(guid: string): Promise<string | GetQuestionResponse> {
    const questionResponse = await getQuestion(guid);
    if (isInterface<GetQuestionResponse>(questionResponse)) {
        for (let i = 0; i < questionResponse.answers.length; i++) {
            answers[i].innerHTML = letters[i] + questionResponse.answers[i];
        }
        questionElement.innerHTML = questionResponse.questionString;
    } else {
        console.error(questionResponse);
    }
    return questionResponse;
}

// TODO Call this function when the questions answered reaches 20
async function showLeaderboard() {
    leaderboardUserContainer.innerHTML = "";
    let leaderboardResponse = await getLeaderboard();
    if (isInterface<GetLeaderBoardResponse>(leaderboardResponse)) {
        for (let i = 0; i < leaderboardResponse.scores.length && i < leaderboardResponse.usernames.length; i++) {
            leaderboardUserContainer.innerHTML += `<div class="user"><span class="username">${leaderboardResponse.usernames[i]}</span><span class="score">${leaderboardResponse.scores[i]}</span></div>`;
        }
    }
    leaderboardContainer.classList.remove("hidden");
}