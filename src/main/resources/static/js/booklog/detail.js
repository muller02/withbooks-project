window.addEventListener("load", function () {
    let bookInfo = this.document.querySelector("#book-info");
    let bookLabel = bookInfo.querySelector("label");
    let public = bookLabel.querySelector(".public");
    let labelInput = bookLabel.querySelector("input");
    let publicYn = public.dataset.public;

    // 북로그 디테일 페이지에서 공개상태일 때 '공개/비공개' 버튼을 활성화 한다.
    if (publicYn == 1) {
        console.log(publicYn);
        labelInput.checked = true;
    }

    

});

// window.addEventListener("click", function (e) {

//     const dropdownArea = e.target.closest(".n-dropdown");
//     let dropdownListAll = this.document.querySelectorAll(".n-dropdown-list");
//     let dropdownList ;

//     if(dropdownArea){
//         dropdownList = dropdownArea.querySelector(".n-dropdown-list");
//         dropdownList.classList.toggle("active");        
//     }
//     if(!(e.target.closest(".n-dropdown"))){
//         dropdownListAll.forEach(dl => {
//             dl.classList.remove("active");
//         });
//     }
    

// });
