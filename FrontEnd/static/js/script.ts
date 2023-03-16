const answers = document.querySelectorAll(".answers") as unknown as Array<HTMLLabelElement>;
const form = document.getElementById("form");
const whiteBG = document.querySelector(".whiteBG");
const explanationElement = document.querySelector(".complete-answer") as HTMLParagraphElement;
const confirmElement = document.querySelector(".confirmBox") as HTMLDivElement;
const questionElement = document.querySelector(".question") as HTMLParagraphElement;
const nextQuestionArrow = document.querySelector(".right-arrow");

let limit = true;
const letters: Array<string> = [
    "A) ",
    "B) ",
    "C) ",
    "D) "
]


let user: User;

class User {
    guid: string;
    username: string;
    currentQuestion: string;
    answers: Array<string>;
    selectedIndex: number = -1;
    hasAnswered: boolean = false;

    constructor(guid: string, username: string, currentQuestion: string, answers: Array<string>) {
        this.guid = guid;
        this.username = username;
        this.currentQuestion = currentQuestion;
        this.answers = answers;
    }
}

form!.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault()
    if (limit) {
        limit = false;
        const usernameInput = document.getElementsByName("username")[0] as HTMLInputElement;
        const username = usernameInput.value;
        await getNewQuestion(username);
        const parent = form!.parentNode as HTMLElement; // ! means value can't be null
        parent.classList.add("hidden");
        whiteBG!.classList.add("hidden");
        document.querySelector("body")!.classList.remove("darken") // same thing here
    }

})

answers.forEach(element => element.addEventListener("click", (e) => {
    answers.forEach(giglo => giglo.classList.remove("selected"))
    element.classList.add("selected")
    let clicked = e.target as HTMLLabelElement;
    if (typeof clicked.dataset.index !== "undefined") {
        user.selectedIndex = parseInt(clicked.dataset.index);
    }
}))



confirmElement.addEventListener("click", async () => {
    if (user.selectedIndex !== -1) {
        if (!user.hasAnswered) {
            user.hasAnswered = true;
            let answerResponse = await sendAnswer(user.guid, user.selectedIndex);
            if (isInterface<SendAnswerResponse>(answerResponse)) {
                if (answerResponse.correctAnswer) {
                    explanationElement.innerHTML = answerResponse.explanation;
                    // TODO set to green
                } else {
                    // TODO set to red
                }
            }
        }
        user.selectedIndex = -1;
    }
})

nextQuestionArrow!.addEventListener("click", async () => {
    if (user.hasAnswered) {
        // Reset user
        user.currentQuestion = "";
        user.answers = new Array<string>;
        user.selectedIndex = -1;
        user.hasAnswered = false
        // Get new question and answers
        explanationElement.innerHTML = "";
        await getNewQuestion(user.username);
    }
})

async function getNewQuestion(username: string) {
    const createResponse = await createUser(username);
    if (isInterface<CreateUserResponse>(createResponse)) {
        let guid = createResponse.id;
        const questionResponse = await getQuestion(guid);
        if (isInterface<GetQuestionResponse>(questionResponse)) {
            user = new User(guid, username, questionResponse.questionString, questionResponse.answers);
            for (let i = 0; i < user.answers.length; i++) {
                answers[i].innerHTML = letters[i] + user.answers[i];
            }
            questionElement.innerHTML = questionResponse.questionString;
        } else {
            console.error(questionResponse)
        }
    }
}