let barillas = document.querySelectorAll(".answers")
let form: HTMLElement | null = document.getElementById("form")

barillas.forEach(element => element.addEventListener("click", () => {
    barillas.forEach(giglo => giglo.classList.remove("selected"))
    element.classList.add("selected")
}))


form!.addEventListener("submit", function (e) {
    e.preventDefault()
    let parent = form?.parentNode as HTMLElement;
    parent.classList.add("hidden");
    document.querySelector("body")!.classList.remove("darken")
})