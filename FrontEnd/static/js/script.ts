const answers = document.querySelectorAll(".answers");
const form = document.getElementById("form");
const questionElement = document.querySelector(".question") as HTMLParagraphElement;

let user: User;

class User {
    guid: string;
    currentQuestion: string;
    answers: Array<string>;

    constructor(guid: string, currentQuestion: string, answers: Array<string>) {
        this.guid = guid;
        this.currentQuestion = currentQuestion;
        this.answers = answers;
    }
}

answers.forEach(element => element.addEventListener("click", () => {
    answers.forEach(giglo => giglo.classList.remove("selected"))
    element.classList.add("selected")
    if (user.guid !== "") {
        // Send the answer
    }
}))


form!.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault()
    const usernameInput = document.getElementsByName("username")[0] as HTMLInputElement;
    const username = usernameInput.value;
    const createResponse = await createUser(username);
    if (isInterface<CreateUserResponse>(createResponse)) {
        let guid = createResponse.id;
        const questionResponse = await getQuestion(guid);
        if (isInterface<GetQuestionResponse>(questionResponse)) {
            user = new User(guid, questionResponse.questionString, questionResponse.answers);
            questionElement.innerHTML = questionResponse.questionString;
        } else {
            console.error(questionResponse)
        }
        const parent = form!.parentNode as HTMLElement; // ! means value can't be null
        parent.classList.add("hidden");
        document.querySelector("body")!.classList.remove("darken") // same thing here
    } else {
        console.error(createResponse)
    }
})

