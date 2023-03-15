"use strict";
const barillas = document.querySelectorAll(".answers");
const form = document.getElementById("form");
barillas.forEach(element => element.addEventListener("click", () => {
    barillas.forEach(giglo => giglo.classList.remove("selected"));
    element.classList.add("selected");
}));
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let parent = form.parentNode; // ! means value can't be null
    parent.classList.add("hidden");
    document.querySelector("body").classList.remove("darken");
});
