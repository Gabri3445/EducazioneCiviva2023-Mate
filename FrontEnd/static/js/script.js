"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const answers = document.querySelectorAll(".answers");
const form = document.getElementById("form");
const whiteBG = document.querySelector(".whiteBG");
const questionElement = document.querySelector(".question");
let user;
class User {
    constructor(guid, currentQuestion, answers) {
        this.guid = guid;
        this.currentQuestion = currentQuestion;
        this.answers = answers;
    }
}
answers.forEach(element => element.addEventListener("click", () => {
    answers.forEach(giglo => giglo.classList.remove("selected"));
    element.classList.add("selected");
    if (user.guid !== "") {
    }
}));
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const usernameInput = document.getElementsByName("username")[0];
    const username = usernameInput.value;
    const createResponse = yield createUser(username);
    if (isInterface(createResponse)) {
        let guid = createResponse.id;
        const questionResponse = yield getQuestion(guid);
        if (isInterface(questionResponse)) {
            user = new User(guid, questionResponse.questionString, questionResponse.answers);
            questionElement.innerHTML = questionResponse.questionString;
        }
        else {
            console.error(questionResponse);
        }
        const parent = form.parentNode;
        parent.classList.add("hidden");
        whiteBG.classList.add("hidden");
        document.querySelector("body").classList.remove("darken");
    }
    else {
        console.error(createResponse);
    }
}));
