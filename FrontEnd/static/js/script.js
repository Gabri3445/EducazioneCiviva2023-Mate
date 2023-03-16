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
const explanationElement = document.querySelector(".complete-answer");
const confirmElement = document.querySelector(".confirmBox");
const questionElement = document.querySelector(".question");
const nextQuestionArrow = document.querySelector(".right-arrow");
let limit = true;
const letters = [
    "A) ",
    "B) ",
    "C) ",
    "D) "
];
let user;
class User {
    constructor(guid, username, currentQuestion, answers) {
        this.selectedIndex = -1;
        this.hasAnswered = false;
        this.guid = guid;
        this.username = username;
        this.currentQuestion = currentQuestion;
        this.answers = answers;
    }
}
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    if (limit) {
        limit = false;
        const usernameInput = document.getElementsByName("username")[0];
        const username = usernameInput.value;
        yield getNewQuestion(username);
        const parent = form.parentNode;
        parent.classList.add("hidden");
        whiteBG.classList.add("hidden");
        document.querySelector("body").classList.remove("darken");
    }
}));
answers.forEach(element => element.addEventListener("click", (e) => {
    answers.forEach(giglo => giglo.classList.remove("selected"));
    element.classList.add("selected");
    let clicked = e.target;
    if (typeof clicked.dataset.index !== "undefined") {
        user.selectedIndex = parseInt(clicked.dataset.index);
    }
}));
confirmElement.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    if (user.selectedIndex !== -1) {
        if (!user.hasAnswered) {
            user.hasAnswered = true;
            let answerResponse = yield sendAnswer(user.guid, user.selectedIndex);
            if (isInterface(answerResponse)) {
                if (answerResponse.correctAnswer) {
                    explanationElement.innerHTML = answerResponse.explanation;
                }
                else {
                }
            }
        }
        user.selectedIndex = -1;
    }
}));
nextQuestionArrow.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    if (user.hasAnswered) {
        user.currentQuestion = "";
        user.answers = new Array;
        user.selectedIndex = -1;
        user.hasAnswered = false;
        yield getNewQuestion(user.username);
    }
}));
function getNewQuestion(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const createResponse = yield createUser(username);
        if (isInterface(createResponse)) {
            let guid = createResponse.id;
            const questionResponse = yield getQuestion(guid);
            if (isInterface(questionResponse)) {
                user = new User(guid, username, questionResponse.questionString, questionResponse.answers);
                for (let i = 0; i < user.answers.length; i++) {
                    answers[i].innerHTML = letters[i] + user.answers[i];
                }
                questionElement.innerHTML = questionResponse.questionString;
            }
            else {
                console.error(questionResponse);
            }
        }
    });
}
