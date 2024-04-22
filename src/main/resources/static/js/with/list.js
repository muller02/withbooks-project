
// 카테고리 검색  클릭 시 모달창 표시
window.addEventListener("load", function (e){
 const searchBtn=document.querySelector("#search-btn");
 const searchBox=document.querySelector(".search-box")
    const  categorySection=document.querySelector("#category")
const initIcon=categorySection.querySelector(".init-icon");
 const categoryList = categorySection.querySelector(".category-list");
 const inputCheckBox = categoryList.querySelectorAll("input[type='checkbox']");

searchBtn.onclick=function (e){
  searchBox.classList.toggle("d:none");

    if (searchBtn.classList.toggle("icon:plus")) {
        searchBtn.classList.remove("icon:minus");
        searchBtn.classList.add("icon:plus");
    } else {
        searchBtn.classList.remove("icon:plus");
        searchBtn.classList.add("icon:minus");
    }
}


initIcon.onclick = function (e){

        for(let i of inputCheckBox){
            i.checked = false;

        }




}







})