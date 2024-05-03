window.addEventListener("load", function(){

    // 검색을 위한 부모 form 찾기
    const searchBookForm = this.document.querySelector("#search-book-form");
    
    // 쿼리 검색
    const searchQueryInput = searchBookForm.querySelector(".search-query-input");
    const queryInputBtn = searchBookForm.querySelector(".query-input-btn");
    

    // 검색 결과 list를 뿌려줄 컨텐츠 ul ( li로 리스트가 뿌려짐 )
    const contentUl = this.document.querySelector(".content-ul");

    //
    const topicListAlert = document.querySelector(".topic-list-alert");
 

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
        
        const url = `/api/book/list?q=${q}&c=0&s=${s}&p=${p}`;
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
                class="jc:center ai:center p:3 searched-book w:100p"
            >
            <input type="hidden" name="bookId" value="${n.id}">
            <a 
                
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




    // ================================= 책 검색 결과를 클릭했을때의 이벤트  =======================================
    // ======================================================================================================


    contentUl.onclick = (e)=>{

        if(e.target == contentUl)
            return;
        
        // 선택한 책 li 하나 저장
        let selectedBook = e.target;
        for(; contentUl!==selectedBook.parentElement; selectedBook = selectedBook.parentElement);
            
        // ul의 li들 싹다 지우기
        contentUl.innerHTML = "";

        // 저장한 li 다시 뿌리기
        selectedBook.classList.add("bg-color:main-3");
        contentUl.innerHTML = selectedBook.outerHTML;
    };


    // =================================  토론 주제 추가, 삭제를 클릭했을때 이벤트  =======================================
    // ======================================================================================================
    // 추가 버튼
    let count =0;
    let maxCount = 1;
    const addBtn = document.querySelector('.add-btn')


       addBtn.addEventListener("click", function(){



           console.log(count)
           if(count > maxCount){

               topicListAlert.classList.remove("d:none");
               return;
           }
           count++;

        let spanHTML = `
                <span class="topic-input d:flex ai:center al-self:stretch">
                  <div class="d:flex mt:4 flex-grow:1">
                    <input type="text" name="topic" class="n-textbox w:100p mr:3" placeholder="토론 주제를 입력하세요." />
                    <button type="button" class=""><span class="del-btn icon icon:minus">삭제</span></button>
                  </div>
                </span> `
        document.querySelector('.topic-list').insertAdjacentHTML("beforeend", spanHTML)
    });

    // 삭제 버튼
    document.querySelector('.topic-list').addEventListener('click', function(e){
;


        if(e.target.classList.contains('add-btn'))
            return
        // 클릭된 요소가 삭제 버튼인지 확인
        if(e.target.classList.contains('del-btn')) {

            // 클릭된 요소의 부모 요소를 찾아서 삭제
            e.target.parentElement.parentElement.remove();

            count--;
            console.log(count)
            topicListAlert.classList.add("d:none")
        }
    });
});

// 토론일자 , 예약일
window.addEventListener("DOMContentLoaded", function() {
    let reserveDate = document.getElementById("reserve-date");
    let debatePeriod = document.getElementById("debate-period");
    let deadline = document.getElementById("deadline");
    let  deadlineBox = document.querySelector(".deadline-box");
    let deadlineValue;
    let statDateValue;
    let debateEndDate


    // 현재 날짜를 Moment 객체로 가져오기
    let today = moment();

    // 현재 날짜를 YYYY-MM-DD 형식의 문자열로 변환하기
    let maxDate = today.format('YYYY-MM-DD');

    // 시작일의 최소값을 오늘로 설정합니다.
    reserveDate.min = maxDate;

    // 입력된 값이 변경될 때마다 이벤트를 설정합니다.
    reserveDate.addEventListener("change", function(e) {
        let selectedDate = new Date(reserveDate.value);

        // 선택한 날짜가 오늘 이전인 경우 값을 초기화합니다.
        if (selectedDate < today) {
            startInput.value = "";
            console.log("오늘 이전의 날짜는 선택할 수 없습니다.");
        }
        statDateValue =  reserveDate.value
        deadlineBox.classList.remove("d:none");
        debateEndDate  = moment(reserveDate.value).add(deadlineValue, 'days').format('YYYY-MM-DD');
        debatePeriod.innerHTML=` (${statDateValue} ~ ${debateEndDate})`

    });

    deadline.oninput = function (e){

        deadlineValue = deadline.value;
        console.log(deadlineValue)
       debateEndDate  = moment(reserveDate.value).add(deadlineValue, 'days').format('YYYY-MM-DD');

        debatePeriod.innerHTML=` (${statDateValue} ~ ${debateEndDate})`

    }







});