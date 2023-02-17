let barillas = document.querySelectorAll(".answers")
var submit = document.getElementsByTagName('input')
let registration = document.querySelector(".registration")

barillas.forEach(element => element.addEventListener("click", () => {
    barillas.forEach(giglo => giglo.classList.remove("selected"))
    element.classList.add("selected")
}))

if(submit.hasAttribute('required')){
    registration.style.display = "none"
}