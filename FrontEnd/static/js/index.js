let barillas = document.querySelectorAll(".answers")
let form = document.getElementById("form")

barillas.forEach(element => element.addEventListener("click", () => {
    barillas.forEach(giglo => giglo.classList.remove("selected"))
    element.classList.add("selected")
}))

form.addEventListener("submit", function(e){
    e.preventDefault()
    form.parentNode.classList.add("hidden")
    document.querySelector("body").classList.remove("darken")
})