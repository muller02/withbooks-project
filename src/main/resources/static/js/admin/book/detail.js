const searchSection = document.querySelector("#search-section");
const selectSort = searchSection.querySelector("select[name='sort']");
const searchInputDiv = searchSection.querySelector(".search-input-div");

// 책리스트/검색어/ISBN13 검색 선택 시 나타나는 input 변화
selectSort.onchange = function(e){
    let sortValue = Number(e.target.value);
    let template = "";
    searchInputDiv.innerHTML="";

    switch(sortValue){
        case 1 :
            template = `
            <select name="QueryType" >
                <option value="Bestseller">베스트셀러</option>
                <option value="ItemNewAll">신간</option>
                <option value="ItemNewSpecial">특별 신간</option>
             </select>
            `;
                break;
        case 2 : 
            template = `
            <select name="QueryType">
                <option value="Title">제목</option>
                <option value="Author">저자</option>
                <option value="Publisher">출판사</option>
            </select>
            <input
            type="text"
            name="Query"
            class="query n-textbox n-textbox-type:outline n-textbox-status:focus"
            placeholder="Outline Focus"
            />
            `;
                break;
        case 3 : 
            template = `
            <input
            type="text"
            name="ItemId"
            class="query n-textbox n-textbox-type:outline n-textbox-status:focus"
            placeholder="Outline Focus"
            />
            <input type="hidden" name="ItemIdType" value="ISBN13">
            `;
                break;
    }

    searchInputDiv.innerHTML = template;
}