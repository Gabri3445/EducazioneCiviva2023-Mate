const answers = document.querySelectorAll(".answers") as unknown as Array<HTMLLabelElement>;
const form = document.getElementById("form");
const whiteBG = document.querySelector(".whiteBG");
const submitBTN = document.querySelector(".submit");
let limit = true;
const letters: Array<string> = [
    "A) ",
    "B) ",
    "C) ",
    "D) "
]
const confirmElement = document.querySelector(".confirmBox") as HTMLDivElement;
const questionElement = document.querySelector(".question") as HTMLParagraphElement;

let user: User;

class User {
    guid: string;
    currentQuestion: string;
    answers: Array<string>;
    selectedIndex: number = -1;

    constructor(guid: string, currentQuestion: string, answers: Array<string>) {
        this.guid = guid;
        this.currentQuestion = currentQuestion;
        this.answers = answers;
    }
}

confirmElement.addEventListener("click", () => {
    if (user.selectedIndex !== -1) {

        user.selectedIndex = -1;
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


form!.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault()
    if (limit) {
        limit = false;
        const usernameInput = document.getElementsByName("username")[0] as HTMLInputElement;
        const username = usernameInput.value;
        const createResponse = await createUser(username);
        if (isInterface<CreateUserResponse>(createResponse)) {
            let guid = createResponse.id;
            const questionResponse = await getQuestion(guid);
            if (isInterface<GetQuestionResponse>(questionResponse)) {
                user = new User(guid, questionResponse.questionString, questionResponse.answers);
                for (let i = 0; i < user.answers.length; i++) {
                    answers[i].innerHTML = letters[i] + user.answers[i];
                }
                questionElement.innerHTML = questionResponse.questionString;
                //TODO set the answers, maybe do a function
            } else {
                console.error(questionResponse)
            }
            const parent = form!.parentNode as HTMLElement; // ! means value can't be null
            parent.classList.add("hidden");
            whiteBG!.classList.add("hidden");
            document.querySelector("body")!.classList.remove("darken") // same thing here
        }

    }

})

