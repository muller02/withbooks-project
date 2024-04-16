
window.addEventListener("load", function (e){

    const bookMark = document.querySelector("#book-mark");

    console.log(e.target);
    bookMark.addEventListener("click",function (){

        bookMark.classList.toggle(
            "icon-color:main-5");
    })

})
