const searchSection = document.querySelector("#search-section");
const searchInputDiv = searchSection.querySelector(".search-input-div");

// 검색관련
const selectSort = searchSection.querySelector("select[name='sort']");
const selectQt1 = searchInputDiv.querySelector("select.sort-1");
const selectQt2 = searchInputDiv.querySelector("select.sort-2");
const inputQ2 = searchInputDiv.querySelector("input.sort-2");
const inputI3 = searchInputDiv.querySelector("input.sort-3");

// submit 버튼
const submitBtn = searchSection.querySelector("button[type='submit']")
console.log(submitBtn);

// 책리스트/검색어/ISBN13 검색 선택 시 나타나는 input 변화
selectSort.onchange = function(e){
    let sortValue = Number(e.target.value);
    
    switch(sortValue){
        case 1 :
                selectQt1.classList.remove("d:none");
                selectQt2.classList.add("d:none");
                inputQ2.classList.add("d:none");
                inputI3.classList.add("d:none");
                break;
        case 2 : 
                selectQt1.classList.add("d:none");
                selectQt2.classList.remove("d:none");
                inputQ2.classList.remove("d:none");
                inputI3.classList.add("d:none");
                break;
        case 3 : 
                selectQt1.classList.add("d:none");
                selectQt2.classList.add("d:none");
                inputQ2.classList.add("d:none");
                inputI3.classList.remove("d:none");
                break;
    }
}

