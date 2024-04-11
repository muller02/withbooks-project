window.addEventListener("load", function(){

    const searchBookForm = this.document.querySelector("#search-book-form");
    
    // 쿼리 검색
    const searchQueryInput = searchBookForm.querySelector(".search-query-input");
    const queryInputBtn = searchBookForm.querySelector(".query-input-btn");
    
    // 카테고리 검색
    const searchCategory = searchBookForm.querySelector(".search-category");

    const contentUl = this.document.querySelector(".content-ul");
   
  
    queryInputBtn.addEventListener("click", async function(e){
        e.preventDefault();
        // 쿼리로 검색하는 경우

        // 사용자가 검색을 눌렀을때 검색어
        let queryValue = searchQueryInput.value;
        // console.log("뭔데???", queryValue);
        // console.log("뭔데???", typeof queryValue);
        // console.log("뭔데???",  queryValue === '');

        //마가져와라
        if(categoryValue === undefined)
            categoryValue = null;
        let response = await getByParams(queryValue, categoryValue);

        // if(response.status != 200){
        //     alert("없는데용 ㅜ")          
        //     return;
        // }
        
        if(response.status != 200){
            contentUl.innerHTML= '';
            contentUl.innerHTML= `검색 결과가 없습니다 ...  유감.`;
            return;
        }
        let list = await response.json();
        console.log(list);

     
        await printBookList(list);
        
    });


    let tmp;
    let categoryValue;
    searchCategory.addEventListener("click", async function(e){

        // 카테고리로 검색하는 경우
        let clickedCategoryLi = e.target;

        // 클릭한 카테고리가 li가 아닌 경우 모두 퇴출
        if(clickedCategoryLi.tagName != "LI")
            return;

        let tmp = searchCategory.querySelectorAll("li");

        let categorySpan = clickedCategoryLi.querySelector("span");
        
        for(let t of tmp){
            let otherSpanValue = t.querySelector("span").dataset.id;
            let clickedSpanValue = categorySpan.dataset.id;

            // 전체 li span의 dataset id값이 클릭된 li span의 id값과 다른 경우
            // 기본스타일로 변경해준다.
            if(otherSpanValue != clickedSpanValue)
                t.classList.remove("bg-color:main-5");
                t.classList.add("bg-color:main-1");
                t.querySelector("span").classList.remove("color:base-1");

        }

        // 클릭된 li태그와 span에 색상 주기

        categorySpan.classList.add("color:base-1");
        clickedCategoryLi.classList.remove("bg-color:main-1");
        clickedCategoryLi.classList.add("bg-color:main-5");

        // 클릭한 li span 속 dataset value 찾기
        categoryValue = categorySpan.dataset.id;
        let queryValue = searchQueryInput.value;

        //마 가져와라
        let response = await getByParams(queryValue, categoryValue);

        if(response.status != 200){
            contentUl.innerHTML= '';
            contentUl.innerHTML= `검색 결과가 없습니다 ...  유감.`;
            return;
        }

        let list = await response.json();

        await printBookList(list);
        
    })
    
    function getByParams(q, c){
        
        const url = `/api/book/list?q=${q}&c=${c}`;
        // const method = "GET";
        return fetch(url);
    }

    function printBookList(list){
        contentUl.innerHTML= '';

        // 리스트는 검색결과가 없는 경우에  null이 아니라 length 0으로 나옴
        if(list.length <= 0){
            contentUl.innerHTML= '';
            contentUl.innerHTML= `검색 결과가 없습니다 ...  유감.`;
            return;
        }

        list.forEach(n => {
                
            let liHTML = ` <li
            class="jc:center ai:center p:3"
        >
            <div
                class="gap:4 d:flex fl-dir:column lg:ai:center"
            >
                <div class="w:100p lg:w:3 d:flex jc:center">
                    <a
                        href="@{./detail(id=${n.id})}"
                    >
                        <img
                            src="${n.cover}"
                            class="h:3 margin-right:auto"
                            alt="도둑맞은 집중력.img"
                        />
                    </a>
                </div>

                <div class="w:100p d: fl-dir:column ai:center">
                    <span></span>
                    <h1 class="fs:3 fw:3">
                        <a
                            
                            href="@{./detail(id=${n.id})}"
                            >${n.title}</a
                        >
                    </h1>
                    <div
                        class="fs:2 fw:1 mt:1"
                    >
                        <a
                            href="@{./detail(id=${n.id})}"
                            >${n.author}</a
                        >
                    </div>
                    <div class="mt:1 fs:1">
                        <div>
                            <a
                                href="@{./detail(id=${n.id})}"
                                >${n.publisher}</a
                            >
                        </div>
                        <div>
                            <a
                                href="@{./detail(id=${n.id})}"
                                >${n.pubDate}</a
                            >
                        </div>
                    </div>
                    <div
                        class="description d:none lg:d:block mt:2 w:10p"
                    >${n.description}
                    </div>
                </div>
            </div>
        </li>
            `;
            contentUl.insertAdjacentHTML("beforeend", liHTML);
        });
    }







})