const listContainer = document.querySelector("#list-container");
const selectAll = listContainer.querySelector("input[name='select-all']");

// disabled를 제외한 모든 체크박스
const bookList = listContainer.querySelector("#book-list");
const checkboxes = bookList.querySelectorAll("input[type='checkbox']:not(:disabled)");

// 전체선택
selectAll.onchange = function(){
    // 선택가능한 checkbox만 뽑기
    let bool = selectAll.checked;

    // 전체선택 checkbox 상태에 따라 전부 동일하게 바꿔줌
    checkboxes.forEach((checkbox)=>{
        checkbox.checked = bool;
    });
}

