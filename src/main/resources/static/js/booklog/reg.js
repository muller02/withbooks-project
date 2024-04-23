window.addEventListener("load", function () {
    let searchBox = this.document.querySelector("#search-box");
    let queryInput = searchBox.querySelector(".query-input");
    let resetBtn = searchBox.querySelector(".reset-btn");
    let resultList = searchBox.querySelector(".result-list");
    let searchBtn = searchBox.querySelector(".search-btn");

    let booklogContent = searchBox.querySelector(".booklog-content");

    // 검색창 리셋
    resetBtn.onclick = function () {
        queryInput.value = "";
    };

    // =============================== 책 검색 결과 ===================================================
    searchBtn.onclick = function (e) {
        e.preventDefault();

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        //비동기 처리
        xhr.onload = function () {
            //콜백 함수
            resultList.innerHTML = "";

            let list = JSON.parse(this.responseText);

            // 검색결과 개수
            let bookCount = list.length;

            // 검색된 책이 있을 경우 검색결과 개수 띄우기
            if (bookCount > 0) {
                searchResultHtml = `<div class="mb:3 ml:2 fw:3 mt:3">검색결과 <span class="fw:3 mt:2">${bookCount} 개</span></div>`;
                resultList.insertAdjacentHTML("beforeend", searchResultHtml);
            }

            // 검색된 책이 없을 경우 검색결과 없음 멘트 띄우기
            else {
                let emptyList = `
                                <div class="h:100p d:flex fl-dir:column jc:center ai:center">
                                    <div class="icon icon:file icon-color:base-5">아이콘</div>
                                    <div class="color:base-5">검색된 책이 없습니다.</div>
                                </div>  
                `;
                resultList.insertAdjacentHTML("beforeend", emptyList);
            }

            // 검색된 책 리스트 보여주기
            for (book of list) {
                let sectionHTML = ` <section class="book item d:flex pl:3 py:3">
                                        <h1 class="d:none">책정보</h1>
                                        <div class="book-id d:none">${book.id}</div>
                                        <div class="h:3 w:3 mr:5 text-align:center fl-shrink:0 box-shadow-custom">
                                            <img src="${book.cover}" alt="책이미지" class="book-cover h:100p object-fit:cover">
                                        </div>
                                        <div class="d:flex flex-direction:column">
                                            <div class="book-title fs:4 fw:3 mb:2">${book.title}</div>
                                            <div class="book-author fs:2 fw:2 mb:1 ">${book.author} 저</div>
                                            <div class="book-publisher fs:2 color:base-7 ">${book.publisher}</div>
                                            <div class="fs:2 color:base-7">${book.pubDate}</div>
                                        </div>
                                    </section>`;

                resultList.insertAdjacentHTML("beforeend", sectionHTML);
            }
        };

        // false 를 붙이면 동기
        let q = queryInput.value;

        xhr.open("GET", `/api/book/list?q=${q}&c=0`);
        xhr.send();
    };

    // =============================== 검색된 책 선택시 새로운 북로그 작성창 생성 ================================================
    resultList.onclick = function (e) {
        // 사용자가 클릭한게 책이라면
        // .book 요소를 선택한다
        // 그 요소 안에서 h1을 찾는다
        // 찾은 h1 요소의 textContent 읽는다
        // textContent를 queryInput에 넣는다
        if (e.target.closest(".book")) {
            const book = e.target.closest(".book");
            const bookTitle = book.querySelector(".book-title").textContent;
            const bookAuthor = book.querySelector(".book-author").textContent;
            const bookPublisher = book.querySelector(".book-publisher").textContent;
            const bookCover = book.querySelector(".book-cover").src;
            const bookId = book.querySelector(".book-id").textContent;

            resultList.innerHTML = "";

            // 북로그 작성시 오늘날짜 받아오기
            let today = new Date();

            // 년도
            let year = today.getFullYear();

            // 월
            let month = today.getMonth() + 1;
            //해당 월이 한자리면 앞에 '0' 붙이기
            if (month.toString.length == 1) month = "0" + month;

            // 일
            let date = today.getDate();

            // 북로그 작성창 ( 책정보 + 이미지/글 작성란 )
            let sectionHTML = ` 
                            <form action="reg" method="post" enctype="multipart/form-data" novalidate>
                                <section id="book-info" class="booklog-style">
                                    <h1 class="d:none">책 정보</h1>
                                    <div class="d:flex px:2 pos:relative">
                                        <img class="book-cover h:4 border-color:base-2 mr:2 box-shadow-custom" src=${bookCover} />
                                        <div class="d:flex fl-dir:column fl-grow:1 px:2 position:relative">
                                            <label class="n-btn n-toggle n-toggle-type:outline-box n-toggle-size:2 margin-bottom:3 font-size:1">
                                                <span class="icon icon:lock_simple icon-size:2 margin-right:1">아이콘</span>
                                                <span class="public">공개</span>
                                                <input type="checkbox" class="public-input d:none" name="public-yn" value="1" checked />
                                            </label>
                                            <div class="book-title fs:3 fw:3 pb:4">${bookTitle}</div>
                                            <div class="d:flex fs:1 pb:2">
                                                <div class="mr:1 fs:1 color:base-4">저자</div>
                                                <div class="book-author">${bookAuthor}</div>
                                            </div>
                                            <div class="d:flex fs:1">
                                                <div class="book-publisher mr:1 fs:1 color:base-4">출판사</div>
                                                <div>${bookPublisher}</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>                                
                                <section id="booklog-reg-form" class="booklog-style d:flex fl-dir:column px:2 py:3">
                                    <h1 class="d:none">로그</h1>
                                    <div class="bd-top pt:3">
                                        <input class="d:none" type="number" name="book-id" value="${bookId}"/>
                                        <div class="d:flex mb:4 pos:relative">
                                            <div class="booklog-date fl-grow:1 fw:3">${year}.${month}.${date}</div>
                                            <button class="reg-btn n-btn bg-color:main-1 color:main-3 top:0 right:0" type="submit">등록</button>
                                        </div>
                                        <div class="d:flex fl-dir:column md:fl-dir:row lg:fl-dir:row">
                                            <section class="mb:2">
                                                <h1 class="d:none">이미지 입력</h1>
                                                <div class="img-group d:flex ai:center bd-radius:5 mr:3">
                                                    <label class="img-label d:flex jc:center flex-shrink:0 bg-color:base-2 ai:center border-radius:8 d:inline-block mr:2 w:3 h:3">
                                                        <span class="icon icon:image icon-color:base-9 icon-size:5">이미지</span>
                                                        <input class="booklog-img d:none img-input" name="file" type="file" multiple />
                                                    </label>
                                                    <div>
                                                        <div class="preview-panel h:4">
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <textarea class="booklog-content n-textbox" type="text" name="text-area" placeholder="새로운 북로그를 작성해주세요 :"></textarea>
                                        </div>
                                </section>
                            </form>
                            `;
            resultList.insertAdjacentHTML("beforeend", sectionHTML);

            let publicInput = searchBox.querySelector(".public-input");
            // 공개/비공개 버튼 클릭시 value값 0 또는 1로 셋팅 ( DB 저장할 값으로 보내기 위해서 )
            publicInput.onclick = function () {
                if (publicInput.checked) publicInput.value = 1;
                else publicInput.value = 0;

                console.log(publicInput.value);
            };

            let inputImg = searchBox.querySelector(".booklog-img");
            let previewPanel = searchBox.querySelector(".preview-panel");
            console.log(inputImg);
            console.log(previewPanel);

            inputImg.oninput = function () {
                let file = inputImg.files["0"];

                // 타입 제약
                if (file.type.indexOf("image/") != 0) {
                    alert("이미지만 업로드 가능");
                    return;
                }

                // 크기 제약
                if (file.size > 13 * 1024) {
                    alert("이미지가 너무 큽니다.(13*1024)");
                    return;
                }

                // ======= 바이너리를 읽어와야 해서 비동기로 만든다 =======
                let reader = new FileReader();
                reader.onload = function (e) {
                    let img = document.createElement("img");
                    img.src = e.target.result;
                    img.classList.add("h:100p");

                    // 이미지 한개만 가능. 선택한 이미지가 있으면 지우기.
                    if (previewPanel.childNodes.length > 0) {
                        previewPanel.removeChild(previewPanel.firstChild);
                    }

                    previewPanel.append(img);
                };
                // 바이너리 파일 읽어온다.
                reader.readAsDataURL(file);
            };
        }
    };
});
