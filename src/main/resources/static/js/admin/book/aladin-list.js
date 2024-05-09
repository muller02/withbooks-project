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

// 검색 버튼
submitBtn.onclick = (e)=>{

        // selected된 sort에 따른 url 변경
        sortValue = Number(selectSort.value);
        urlParams = "";

        switch(sortValue){
                case 1 :
                        urlParams = `sort=1&qt=${selectQt1.value}&p=1`; 
                        break;
                case 2 : 
                        urlParams = `sort=2&qt=${selectQt2.value}&q=${inputQ2.value}&p=1`; 
                        break;
                case 3 : 
                        urlParams = `sort=3&i=${inputI3.value}&p=1`; 
                        break;
        }
        console.log(urlParams);
        
        let url = "aladinList?"+urlParams;
        window.location = url;        
}



