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
let url = "http://localhost:5258/api/Quiz/";
// let url = "http://gabri3445.ddns.net/api/Quiz/
function postData(url = '', data = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        // Default options are marked with *
        return yield fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }, redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }); // parses JSON response into native JavaScript objects
    });
}
function putData(url = '', data = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        // Default options are marked with *
        return yield fetch(url, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }, redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }); // parses JSON response into native JavaScript objects
    });
}
function ping() {
    return __awaiter(this, void 0, void 0, function* () {
        let pingUrl = url + "Ping";
        let response = yield fetch(pingUrl);
        if (response.status === 200) {
            return "Online";
        }
        return "Not Online";
    });
}
/*
{
    id: "string"
}
 */
function createUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let createUrl = url + "CreateUser";
        if (username === "") {
            return "Empty Username";
        }
        let data = {
            username: username
        };
        let response = yield postData(createUrl, data);
        let statusCode = response.status;
        if (statusCode === 200) {
            return response.json();
        }
        if (statusCode === 400) {
            return "Empty username";
        }
    });
}
/*
{
  questionString: "string",
  answers: [
    "string"
  ]
}
 */
function getQuestion(guid) {
    return __awaiter(this, void 0, void 0, function* () {
        if (guid === "") {
            return "Empty Guid";
        }
        let questionUrl = url + "GetQuestion?userGuid=" + guid;
        let response = yield fetch(questionUrl);
        let statusCode = response.status;
        if (statusCode === 200) {
            return response.json();
        }
        if (statusCode === 400) {
            return "Invalid Guid";
        }
        if (statusCode === 404) {
            return "User not found";
        }
    });
}
/*
{
  correctAnswer: bool,
  explanation: "string"
}
 */
function sendAnswer(guid, answerIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        let sendUrl = url + "SendAnswer";
        if (guid === "") {
            return "Empty Guid";
        }
        if (!Number.isInteger(answerIndex)) {
            return "Answer Index is NaN";
        }
        let data = {
            userGuid: guid,
            answerIndex: answerIndex
        };
        let response = yield putData(sendUrl, data);
        let statusCode = response.status;
        if (statusCode === 200) {
            return response.json();
        }
        if (statusCode === 400) {
            return "Invalid Guid";
        }
        if (statusCode === 404) {
            return "User not found";
        }
    });
}
/*
{
  usernames: [ // Already sorted
    "string"
  ],
  scores: [ // Already sorted
    0
  ]
}
 */
function getLeaderboard() {
    return __awaiter(this, void 0, void 0, function* () {
        let leaderboardUrl = url + "GetLeaderboard";
        let response = yield fetch(leaderboardUrl);
        let statusCode = response.status;
        if (statusCode !== 200) {
            return "Error";
        }
        return response.json();
    });
}
