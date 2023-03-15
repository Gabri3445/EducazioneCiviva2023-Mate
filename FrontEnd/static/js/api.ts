let url = "http://localhost:5258/api/Quiz/"

// let url = "http://gabri3445.ddns.net/api/Quiz/

async function postData(url: string = '', data = {}) {
    // Default options are marked with *
    return await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }, redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }); // parses JSON response into native JavaScript objects
}

async function putData(url: string = '', data = {}) {
    // Default options are marked with *
    return await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }, redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }); // parses JSON response into native JavaScript objects
}

function isInterface<T>(obj: any,): obj is T {
    return typeof obj === 'object' && obj !== null
}

async function ping(): Promise<string> {
    let pingUrl = url + "Ping";
    let response = await fetch(pingUrl);
    if (response.status === 200) {
        return "Online";
    }
    return "Not Online";
}

interface CreateUserResponse {
    id: string
}

async function createUser(username: string): Promise<string | CreateUserResponse> {
    let createUrl = url + "CreateUser"
    if (username === "") {
        return "Empty Username";
    }
    let data = {
        username: username
    };
    let response = await postData(createUrl, data);
    let statusCode = response.status;
    if (statusCode === 200) {
        return response.json();
    }
    if (statusCode === 400) {
        return "Empty username"
    }
    return "";
}

interface GetQuestionResponse {
    questionString: string,
    answers: Array<string>
}

async function getQuestion(guid: string): Promise<string | GetQuestionResponse> {
    if (guid === "") {
        return "Empty Guid";
    }
    let questionUrl = url + "GetQuestion?userGuid=" + guid;
    let response = await fetch(questionUrl);
    let statusCode = response.status;
    if (statusCode === 200) {
        return response.json();
    }
    if (statusCode === 400) {
        return "Invalid Guid";
    }
    if (statusCode === 404) {
        return "User not found"
    }
    return "";
}

interface SendAnswerResponse {
    correctAnswer: boolean,
    explanation: string
}

async function sendAnswer(guid: string, answerIndex: number): Promise<string | SendAnswerResponse> {
    let sendUrl = url + "SendAnswer";
    if (guid === "") {
        return "Empty Guid";
    }
    if (!Number.isInteger(answerIndex)) {
        return "Answer Index is NaN"
    }
    let data = {
        userGuid: guid,
        answerIndex: answerIndex
    }
    let response = await putData(sendUrl, data);
    let statusCode = response.status;
    if (statusCode === 200) {
        return response.json();
    }
    if (statusCode === 400) {
        return "Invalid Guid";
    }
    if (statusCode === 404) {
        return "User not found"
    }
    return ""
}

interface GetLeaderBoardResponse {
    usernames: Array<string>,
    scores: Array<number>
}

async function getLeaderboard(): Promise<string | GetLeaderBoardResponse> {
    let leaderboardUrl = url + "GetLeaderboard";
    let response = await fetch(leaderboardUrl);
    let statusCode = response.status;
    if (statusCode !== 200) {
        return "Error";
    }
    return response.json();
}