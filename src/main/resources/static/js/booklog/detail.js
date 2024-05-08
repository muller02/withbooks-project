function deleteBooklog(data) {
    let form = data.closest("#book-info").querySelector("form");

    let result = confirm("북로그를 삭제하시겠습니까?");
    if (result) {
        form.submit();
        alert("북로그가 삭제됐습니다");
    }
}

function deleteLog(data) {
    let result = confirm("로그를 삭제하시겠습니까?");
    let form = data.closest(".log-info").querySelector("form");
    let logCount = data.closest(".log-list").childElementCount;

    if (logCount == 1) {
        alert("로그는 한 개 이상 있어야 합니다.");
        return;
    }

    if (result) {
        form.submit();
        alert("로그가 삭제됐습니다");
    }
}

window.addEventListener("load", function () {
    let bookInfo = this.document.querySelector("#book-info");
    let bookLabel = bookInfo.querySelector("label");
    let publicSpan = bookLabel.querySelector(".public");
    let publicInput = bookLabel.querySelector("input");
    let publicYn = bookInfo.querySelector(".public-yn").value;
    let logSection = this.document.querySelector("#log-section");
    let logList = logSection.querySelector(".log-list");

    let addLog = this.document.querySelector("#add-log");
    let addLogBtn = addLog.querySelector("div");

    let booklogId = this.document.querySelector(".booklog-id").value;

    // 북로그 디테일 페이지에서 공개상태일 때 '공개/비공개' 버튼을 활성화 한다.
    if (publicYn == 1) {
        publicInput.checked = true;
    }
    // ===================================================================

    // PUBLIC 버튼 클릭시 값과 텍스트 바꾸기
    publicInput.onclick = async function () {
        if (publicInput.checked) {
            publicInput.value = 1;
            publicSpan.textContent = "공개";

            let reponse = await fetch(`/api/booklog?booklogId=${booklogId}&publicYn=1`);
            let result = await reponse.json();
            console.log(result);
        } else {
            publicInput.value = 0;
            publicSpan.textContent = "비공개";

            let reponse = await fetch(`/api/booklog?booklogId=${booklogId}&publicYn=0`);
            let result = await reponse.json();
            console.log(result);
        }
    };

    // 새로운 로그 생성하기
    addLogBtn.addEventListener("click", function (e) {
        e.preventDefault();

        // 로그 생성 버튼 숨기기
        addLog.classList.add("d:none");

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
        //해당 일이 한자리면 앞에 '0' 붙이기
        if (date.toString.length == 1) date = "0" + date;

        // 로그 작성창 만들기
        let sectionHTML = ` 
                        <div id="new-log" class="new-log bd-top pt:3">
                            <div class="d:flex mb:4 pos:relative">
                                <div class="booklog-date fl-grow:1 fw:3">${year}-${month}-${date}</div>
                                <div class="reg-cancel n-btn bg-color:base-2 mr:1"><span>취소</span></div>
                                <button class="reg-btn n-btn bg-color:main-1 color:main-3 top:0 right:0" type="submit">등록</button>
                            </div>
                            <div>
                                <label class="img-label n-btn n-btn:outline mr:1">
                                    <span class="deco icon:camera icon-color:base-9">사진 추가</span>
                                    <input class="booklog-img d:none" name="new-file" type="file" multiple accept=".jpg,.png,.jpeg" />
                                </label>
                                <div class="img-delete d:none n-btn bg-color:accent-1 mr:1"><span class="icon icon:x icon-color:base-1">사진 삭제</span></div>
                            </div>
                            <div class="fs:2 color:main-4">* 사진은 한 장만 업로드 가능합니다.</div>
                            <div class="log-content-section d:flex fl-dir:column md:fl-dir:row lg:fl-dir:row">
                                <section class="d:none mb:1">
                                    <h1 class="d:none">사진 입력</h1>
                                    <div class="img-group d:flex jc-content:center bd-radius:5 mr:3 mt:1">
                                        <div class="preview-panel"></div>
                                    </div>
                                </section>
                                <textarea class="n-textbox fs:3 mt:1" type="text" name="text-area" placeholder="새로운 북로그를 작성해주세요 :)"></textarea>
                            </div>
                        </div>
            
        `;

        logList.insertAdjacentHTML("beforeend", sectionHTML);

        // 생성된 작성창으로 포커스 맞추기
        // 가상의 a 태그를 만들어서
        let aTag = document.createElement("a");
        aTag.href = "#new-log";
        aTag.click();

        let newLogSection = logList.querySelector(".new-log");
        // 사진 추가 버튼
        let inputImg = newLogSection.querySelector(".booklog-img");
        // 선택한 사진 들어갈 공간
        let previewPanel = newLogSection.querySelector(".preview-panel");
        // 사진 선택하는 label 세션부분
        let imgLabel = newLogSection.querySelector(".img-label");
        // 선택된 사진 삭제하는 버튼
        let imgDeleteBtn = newLogSection.querySelector(".img-delete");
        // 로그 등록 버튼
        let submitBtn = newLogSection.querySelector(".reg-btn");
        // 로그 작성 섹션
        let logContentSection = newLogSection.querySelector(".log-content-section");
        // 로그 작성 섹션 중 사진 섹션
        let logContentImg = logContentSection.querySelector("section");
        // 로그 textarea
        let logTextarea = logContentSection.querySelector("textarea");
        // 취소버튼
        let regCancelBtn = newLogSection.querySelector(".reg-cancel");

        // 작성 취소버튼 클릭시
        // 작성창 없애고 로그 추가 버튼 살리기
        function addLogCancel() {
            newLogSection.remove();
            addLog.classList.remove("d:none");
        }

        // 사진 추가시 필요한 동작들 ( 제약조건, 이미 선택된 사진 있을 경우 지우고 새로운 사진 삽입 )
        inputImg.oninput = function () {
            let file = inputImg.files["0"];

            // 파일이 없으면 종료
            if (!file) return;

            // 타입 제약: 이미지 파일이 아닌 경우 경고를 표시하고 종료
            if (!file.type.startsWith("image/")) {
                alert("사진만 업로드 가능합니다.");
                return;
            }

            // 크기 제약
            // if (file.size > 13 * 1024) {
            //     alert("사진 크기가 너무 큽니다.(13*1024)");
            //     return;
            // }

            // ======= 바이너리를 읽어와야 해서 비동기로 만든다 =======
            let reader = new FileReader();
            reader.onload = function (e) {
                // img 태그 만들어서 속성 및 값 대입
                let img = document.createElement("img");
                img.src = e.target.result;
                img.classList.add("h:5");
                img.classList.add("reg-img");

                // 숨겼던 이미지 섹션 보이기
                logContentImg.classList.remove("d:none");

                // 이미지 미리보기 갱신
                previewPanel.innerHTML = ""; // 이전 미리보기 이미지 제거
                previewPanel.appendChild(img); // 새로운 미리보기 이미지 추가

                // 사진 선택시 사진 삭제버튼 활성화
                if (imgDeleteBtn.classList.contains("d:none")) imgDeleteBtn.classList.remove("d:none");
            };
            // 바이너리 파일 읽어온다.
            reader.readAsDataURL(file);
        };

        // 사진 삭제 버튼 클릭시
        imgDeleteBtn.onclick = function (e) {
            e.preventDefault();

            // 선택된 사진 태그 지우기
            previewPanel.removeChild(previewPanel.firstChild);

            // 삭제 버튼 숨기기
            imgDeleteBtn.classList.add("d:none");

            // 사진 섹션 숨기기
            logContentImg.classList.add("d:none");

            // 사진 삭제 후 같은 사진 업로드 했을 때 이벤트 먹히는 현상 해결하기 위해
            // input value 값을 빈문자열 대입.
            inputImg.value = "";
        };

        // 취소버튼 클릭시 로그 작성창 숨기기
        regCancelBtn.onclick = function () {
            addLogCancel();
        };

        // TODO 등록 전 유효성 검사
        logContentSection.onchange = function (e) {
            console.log("changing");
        };

        //등록 버튼 클릭시 비동기처리
        submitBtn.onclick = async function (e) {
            e.preventDefault();

            let content = logTextarea.value.replace(/\n/g, "<br/>");
            let file = inputImg.files[0];

            const formData = new FormData();
            formData.append("content", content);
            formData.append("booklogId", booklogId);
            formData.append("file", file);

            let reponse = await fetch("/api/booklog/reg", {
                method: "POST",
                headers: {
                    ContentType: "multipart/form-data",
                },
                body: formData,
            });

            await reponse.json().then((result) => {
                // 작성창 없애고 추가버튼 나타내기
                addLogCancel();

                // 이미지가 없을 때 태그를 대입하지 않기 위해서
                // 태그를 추출해서 조건처리.
                let imgSection = "";
                if (result.img) {
                    imgSection = `
                        <div class="h:5 text-align:center mb:8 md:mb:0 lg:mb:0">
                            <img class="h:100p mr:5" src="/image/booklog/${result.img}" alt="로그이미지" />
                        </div>
                        `;
                }

                // 날짜 포맷
                // timestamp 표시부터 자르기 위해 T의 인덱스를 찾는다.
                const subIdx = result.regDate.search("T");
                const regDate = result.regDate.substring(0, subIdx);

                let sectionHTML = ` 
                    <div class="log-info bd-top py:3">
                        <div class="d:flex mb:4 pos:relative">
                            <form action="deletelog" name="deletelog" method="post">
                                <input class="d:none" name="booklog-id" value="${result.booklogId}" />
                                <input type="hidden" name="logs-id" value="${result.id}" />
                            </form>
                            <div class="fl-grow:1 fw:3" >${regDate}</div>
                            <div class="new-delete-log d:flex border border-radius:4 px:3 py:1 color:base-4 mr:1 cursor:pointer">
                                <span class="icon icon:trash icon-size:3 icon-color:base-4">삭제 아이콘</span>삭제
                            </div>
                        </div>
                        <div class="d:flex fl-dir:column md:fl-dir:row lg:fl-dir:row">
                            ${imgSection}
                            <div class="fs:3 py:3 md:py:0 lg:py:0">${result.content}</div>
                        </div>
                    </div>
        
                `;

                logList.insertAdjacentHTML("beforeend", sectionHTML);
            });
            // 새로운 로그 삭제 버튼에 onclick 이벤트를 추가해준다.
            const newDeleteBtn = logList.querySelector(".new-delete-log");
            const newEditBtn = logList.querySelector(".new-edit-log");

            newDeleteBtn.setAttribute("onclick", "deleteLog(this)");
            newEditBtn.setAttribute("onclick", "editLog(this)");
        };
    });
});
