window.addEventListener("load", function(){

    // 검색을 위한 부모 form 찾기
    const searchBookForm = this.document.querySelector("#search-book-form");
    
    // 쿼리 검색
    const searchQueryInput = searchBookForm.querySelector(".search-query-input");
    const queryInputBtn = searchBookForm.querySelector(".query-input-btn");
    

    // 검색 결과 list를 뿌려줄 컨텐츠 ul ( li로 리스트가 뿌려짐 )
    const contentUl = this.document.querySelector(".content-ul");
    
 

    // ===================================== 쿼리로 검색하는 경우 =======================================
    // =================================================================================================

    // 쿼리 입력 후 검색 버튼 클릭 or 엔터 클릭 시 실행
    queryInputBtn.addEventListener("click", async function(e){
        e.preventDefault();

        // 사용자가 검색을 눌렀을때 검색어
        let queryValue = searchQueryInput.value;

        
        // fetch 통신 후 response 받는 절
        let response = await getByParams(queryValue);

        // 서버에서 문제가 생긴 경우 return
        if(response.status != 200){
            contentUl.innerHTML= '';
            contentUl.innerHTML= `검색 결과가 없습니다 ...  유감.`;
            return;
        }

        let list = await response.json();
        printBookList(list);
        
    });


    
    
    // ================================= 파라미터 추가하여 서버와 통신  =======================================
    // ======================================================================================================
    function getByParams(q, s=20, p=1){
        
        const url = `/api/book/list?q=${q}&s=${s}&p=${p}`;
        // const method = "GET";
        return fetch(url);
    }

    // ====================================== 검색결과 list를 출력 ===========================================
    // =====================================================================================================
    function printBookList(list){
        contentUl.innerHTML= '';

        // 리스트는 검색결과가 없는 경우에  null이 아니라 length 0으로 나옴
        if(list.length <= 0){
            contentUl.innerHTML= '';
            contentUl.innerHTML= `검색 결과가 없습니다 ...  유감.`;
            return;
        }

        list.forEach(n => {
                
            let liHTML = ` 
            <li
            class="jc:center ai:center p:3"
            >
            <a 
                href="/book/detail?id=${n.id}"
            >
                <div
                    class="gap:4 d:flex fl-dir:column lg:ai:center"
                >
                    <div class="w:100p lg:w:3 d:flex jc:center">
                        <img
                            src="${n.cover}"
                            class="h:3"
                            alt="도둑맞은 집중력.img"
                        />
                    </div>

                    <div class="w:100p d: fl-dir:column ai:center">
                        <h1 class="fs:3 fw:3">
                            <div
                            >
                            ${n.title}
                            </div>
                        </h1>
                        <div
                            class="fs:2 fw:1 mt:1"
                        >
                             ${n.author}
                        </div>
                        <div class="mt:1 fs:1">
                            <div>
                            ${n.publisher}
                            </div>
                            <div>
                            ${n.pubDate}
                            </div>
                        </div>
                        <div
                            class="description d:none lg:d:block mt:2 w:10p"
                        >
                        ${n.description}
                        </div>
                    </div>
                </div>
            </a>
        </li>
            `;
            contentUl.insertAdjacentHTML("beforeend", liHTML);
        });
    }







})