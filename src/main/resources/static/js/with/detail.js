window.addEventListener("load", (e)=>{
    let contentDiv = document.querySelector("#content");
    let menuTap = document.querySelector(".menu-tap");
    let withInfoSection = document.querySelector("#with-info");
    let withJoinDiv = withInfoSection.querySelector(".with-join-btn");
    let withJoinBtn = withJoinDiv.querySelector("button");

    let lis = menuTap.querySelectorAll("li");

    let tmpContetnDiv =contentDiv.innerHTML;

    // console.log(tmpContetnDiv);

    menuTap.addEventListener("click",async function (e) {
        e.preventDefault();
        if (e.target.tagName != "BUTTON")
            return;

        for(let li of lis){
            li.classList.remove("active");
        }





        if(e.target.id == "board"){

            let tapParentLi = e.target.parentElement;
            tapParentLi.classList.add("active");

        contentDiv.innerHTML = ``;
        let withId = e.target.dataset.withId;



        let url = `http://localhost:8080/api/with/free?id=${withId}`;


        let list = await getAnyList(withId,url);
        console.log(list)


        for(let b of list){
        let innerHtml =
            `<section class="   my:5 board-list ">
    <section class="border-bottom px:3   pb:2 mb:3 ">
        <h1 class="d:none">게시글</h1>
        <div class="d:flex ai:center mb:3">
            <div class="w:1 h:1 mr:2">
                <img src="/image/shorts/uie.jpg" class=" w:100p h:100p border-radius:5 ">
            </div>
            <div>
                <div  >${b.nickname}</div>
                <div  class="fs:2 color:base-3">${b.regDate}</div>
            </div>

            <div class="ml:auto icon icon:dots_three_outline_vertical_fill\t" ></div>
        </div>

        <div>
            <h1 class="fs:5 fw:3 mb:3 "  >${b.title}</h1>
            <p class="mb:2" >what i like what i like what ilike what i like what i likewhat i like what i like what ilike what i like what i like
                what i like what i like what i like what i like what i likewhat i like what i like what ilike what i like what i like
                what i like what i like what i like what i like what i likewhat i like what i like what ilike what i like what i like</p>

            <div class="border border-color:base-3 w:100p  h:4 border-radius:5">

                <img src="/image/shorts/">
            </div>
        </div>


        <div class="mt:2 d:flex ai:center">
            <span class="deco icon:thumbs_up mr:3 my:auto pt:1" >12</span>
            <span class="deco icon:chat my:auto">12</span>
        </div>

    </section>`

        contentDiv.insertAdjacentHTML("afterbegin", innerHtml);
        }
    }

        if(e.target.id == "debate") {
            let tapParentLi = e.target.parentElement;
            console.log(tapParentLi);
            tapParentLi.classList.add("active");

            contentDiv.innerHTML = ``;



            let withId = e.target.dataset.withId;
            let url = `http://localhost:8080/api/with/debate?id=${withId}`;

            let list = await getAnyList(withId,url);
            console.log(list);

            let innerHtml = `
<div class="p:3">
    <h1 class="d:none">북리스트</h1>
    <section id="search-book-form">
        <h1 class="d:none">책 검색 폼</h1>
        <div class="d:flex">
            <div class="flex-grow:1 margin-right:1">
                <form class="pos:relative book-search">
                    <input
                        class="search-query-input n-textbox n-textbox:outline txt-al:center bd-radius:4 input"
                        type="text"
                        placeholder="책 검색"
                    />
                    <button
                        class="query-input-btn search pos:absolute right:1 top:1 icon icon:magnifying_glass"
                        type="submit"
                    >
                        검색
                    </button>
                </form>
            </div>
        </div>
    </section>
    <section class="my:4 book-list">
        <h1 class="d:none">북 리스트</h1>
        <ul class="n-list n-card-list content-ul">
`;

// 리스트 아이템 생성
            for (let b of list) {
                innerHtml += `
        <li class="jc:center ai:center p:5">
            <a  class="" href="/with/debate/board/list?rid=${b.id}">
                <div class="gap:4 d:flex fl-dir:column lg:ai:center ai:center">
                    <div class="w:100p lg:w:3 d:flex jc:center mb:2">
                        <img
                            src="${b.cover}"
                            class="h:4 w:4 border-radius:3"
                            alt="${b.title}"
                        />
                    </div>
                    <div class="w:100p d: fl-dir:column ai:center px:2">
                        <h1 class="fs:4 fw:3">
                            <div>${b.title}</div>
                        </h1>
                        <span class="d:flex">
                            <div class="fs:2 fw:1 mt:1">${b.author}</div>
                            <div class="ml:2">
                                [<span>${b.boardCnt}</span>]
                            </div>
                        </span>
                    </div>
                </div>
            </a>
        </li>
    `;
            }
            innerHtml += `
        </ul>
     
    </section>
         <a
          href="debate/reg?wid=${withId}"
          class="icon icon:plus write-btn icon-color:sub-1 bg-color:main-5 pos:fixed bottom:9 right:7 icon-size:5 border-radius:full h:1 w:1 zi:5"
        ></a>
</div>
 
`;

            contentDiv.insertAdjacentHTML("afterbegin", innerHtml);

        //===================== 해당 텝의 스크립트 추가 ============================//

            let queryForm = document.querySelector("#search-book-form");
            let queryBtn = queryForm.querySelector(".search");
            queryBtn.onclick = function (e){
                e.preventDefault();

            }



        }


        if(e.target.id=="home2"){

            contentDiv.innerHTML = ``;
            let tapParentLi = e.target.parentElement;
            tapParentLi.classList.add("active");
            contentDiv.insertAdjacentHTML("afterbegin",tmpContetnDiv);


        }







    })



    async function getAnyList(withId,reqUrl) {
        let url = reqUrl;

        try {
            let response = await fetch(url);


            if (!response.ok) {
                throw new Error('네트워크 상태가 좋지 않습니다.');
            }

            let list = await response.json();
            return list;
        } catch (error) {
            console.error('게시판 목록을 가져오는 동안 오류 발생:', error);
            throw error; // 예외를 다시 throw하여 호출자에게 전달
        }
    }

    // 가입신청 버튼 클릭시
    withJoinBtn.addEventListener("click", async()=>{

        // 이미 가입된 상태일 땐 이벤트 끝내기
        if(withJoinBtn.classList.contains("bg-color:base-2")){
          return;
        } 

        // 위드 아이디
        let withId = withJoinDiv.querySelector("input").value;
        // 위드가입 api
        let reponse = await fetch(`/api/with/join?withId=${withId}&userId=${4}`);

        // 가입된 상태를 식별하기 위한 스타일 변경
        reponse.json().then(()=>{
            withJoinBtn.textContent = "가입 되었습니다!";
            withJoinBtn.classList.add("bg-color:base-2");
            withJoinBtn.classList.add("color:base-4");
        });

        // TODO 가입 됐을 때 바뀔 액션 적용 필요!
    });


})