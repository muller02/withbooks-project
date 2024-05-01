// <좋아요 >
window.addEventListener("load", function (e) {

    // 버블리을 위해 main 얻기
    const main = document.querySelector("#main");

    // main에 이벤트 추가
    main.addEventListener("click", async function (e) {

        // 좋아요 버튼이 아니면 return
        if (!e.target.classList.contains("likeBtn"))
            return;

        // 좋아요 버튼을 누르면 shortsId 를 얻어온다
        let shortsId = e.target.dataset.shortsId;

        // 추후 좋아요 숫자를 비동기로 변경하기위해, 좋아요 숫자 엘리먼트 찾기
        let shortsNumber = e.target.nextElementSibling;


        // Api 요청 url
        const url = `http://localhost:8080/api/shorts-like?si=`;

        try {
            const response = await fetch(url + shortsId, {
                method: "GET",
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error("서버 요청에 실패");
            }

            const data = await response.text(); // response로 받은 결과 boolean을 통해 조건 처리

            if (data == 'true') {  // 내가 이전에 좋아요 했으면, 좋아요 취소

                // 로그인을 하지 않고 누르면 서버 오류 발생
                const deleteResponse = await fetch(url + shortsId, {
                    method: "DELETE",
                })
                if (!deleteResponse.ok) {
                    throw new Error("서버요청에 실패");
                }
                // 좋아요 취소 후 , 아이콘과 색상 변경
                e.target.classList.remove("icon-color:main-5", "icon:heart_fill");
                e.target.classList.add("icon:heart")

                // 좋아요 취소 후, 해당 쇼츠의 좋아요 갯수 리로드 후  삽입
                let count = getLikeCount(shortsId);
                shortsNumber.textContent = await count;

            } else if (data == 'false') {  // 내가 좋아요를 한 적이 없으면 실행

                const postResponse = await fetch(url + shortsId, {
                    method: "POST"
                })
                if (!postResponse.ok) {
                    throw new Error("서버요청에 실패");
                }
                // 좋아요 후, 아이콴과 색상 변경
                e.target.classList.add("icon-color:main-5", "icon:heart_fill");
                e.target.classList.remove("icon:heart")

                //  좋아요 후 해당 쇼츠의 좋아요 갯수 리로드 후 삽입
                let count = getLikeCount(shortsId);
                shortsNumber.textContent = await count;
            }
        } catch (error) {
            alert("로그인을 해주세요 !")
            console.error("fetch 호출 중 에러 발생:", error);
        }


        // 좋아요 리로드 함수
        async function getLikeCount(shortsId) {
            let count;
            let url = `http://localhost:8080/api/shorts-like/count?si=${shortsId}`
            let resoponse = fetch(url);

            count = (await resoponse).text();

            console.log(count);
            return count;

        }


    })


})

//  <댓글 리스트 요청 >
function getCommentList(shortsId, comments, getCommetnCount) {
    //getCommentCount ; 댓글 수를 카운트 해서 반환 해주는 콜백함수

    // 댓글의 섹션부분 삭제
    comments.innerHTML = "";

    // 카운트 변수 선언
    var commentCount = 0;

    // 비동기로 데이터 가져오기
    // e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    // 비동기 처리
    xhr.onload = function () {
        var list = JSON.parse(this.responseText);

        for (cmt of list) {
            commentCount++;
            // icon icon-size:2 icon-color:accent-2 icon:trash
            var divHTML = `
                    <div class="border-bottom  pt:4  pl:2 ">
                    <div class="d:flex ai:center " >
                    <div class="border-radius:full of:hidden mr:1  h:1 w:1"> 
                        <img src="/image/shorts/totoro.jpg" class="obj-fit:contain h:1 w:1 "">
                     </div>
                     <span></span>
                      <div class=" mr:auto  fw:3 ">${cmt.nickname}</div>
                      <div class="n-dropdown comment-dropdown">
                        <button class="cursor:pointer dropdown-btn">
                          <span class="comment-dots-icon icon icon:dots_three_outline_vertical_fill icon-size:3 color-icon rg-comment-hover"></span>
                        </button>
                        <ul class="dropdown-list w:2 dropdown-transformx comment-dropdown-list ">
                        
                          <li>
               
                              <button class="va:middle text-align:center	  color:accent-2 " data:${cmt.id}>
                                삭제하기
                              </button>

                          </li>
                          <li>
               
                          <button class="va:middle text-align:center	  color:accent-2 ">
                            수정하기
                          </button>

                      </li>
                      
                          
                        </ul>
                      </div>
                    </div>
                    <div class=" mt:2 comment-content-color pb:2 pl:2">${cmt.content}</div>
                    <div class="ml:auto fs:1 color:base-3 mb:2 d:flex jc:end">${cmt.regDate}</div>
                  </div>
                  `;
            comments.insertAdjacentHTML("beforeend", divHTML);
        }
        if (getCommetnCount !== null) getCommetnCount(commentCount);
    };

    xhr.open(
        "GET",
        `http://localhost:8080/api/comments/list?shorts_id=${shortsId}`
    );
    xhr.send();
}


window.addEventListener("load", function () {
    //쇼츠 섹션
    const shortSections = document.querySelectorAll(".short-section");

    for (let shortsSection of shortSections) {
        let comments = shortsSection.querySelector(".comments");

        let tmpArr = [];

        comments.onclick = function (e) {
            if (e.target.tagName !== "SPAN") return;

            let parentBtn = e.target.parentNode;
            // let parentDiv = parentBtn.parentNode;
            let sibling = parentBtn.nextElementSibling;
            console.log(sibling);

            sibling.classList.remove("active");
            tmpArr.push(sibling);

            // test.classList.toggle("active")

            if (tmpArr.length > 1) {
                // 엘리먼트 저장 배열이 2개가 되면, 즉 댓글 아이콘을 클릭한 횟수가 2번 이상이라면
                tmpArr[0].classList.remove("active"); // 이전 엘리먼트의 댓글 창을 안보이게 하기
                tmpArr.shift(); // 첫번째 엘리먼트 제거 후 ,두번째 엘리먼트 첫번쨰로이동
            }
            sibling.classList.add("active"); //이게 있어야, 다음 댓글 버튼 클릭 해도 댓글창이 나타남

            let commentsDivs = comments.querySelectorAll(".comments>div");
            for (let commentDiv of commentsDivs) {
                const nDropdown = commentDiv.querySelector(".comment-dropdown");
                const dropDownList = commentDiv.querySelector(".comment-dropdown-list");

                window.addEventListener("click", function (e) {
                    if (!nDropdown.contains(e.target)) {
                        dropDownList.classList.remove("active");
                    }
                });
            }
        };
    }
});

//  <댓글 등록 >
window.addEventListener("load", function () {
    const shortSections = document.querySelectorAll(".short-section");

    shortSections.forEach((shortSection) => {
        const commentBtn = shortSection.querySelector(".comment-btn");
        const commentReg = shortSection.querySelector(".comment-reg");
        const commentContent = shortSection.querySelector(".comment-content");

        const countComment = shortSection.querySelector(".count-comment"); //댓글 숫자 표시 엘리먼트

        commentReg.onclick = function (e) {
            // shortSection에 있는 shortsId를 가지고 온다.
            let shortsId = commentBtn.dataset.shortsId;

            if (commentContent.value === "") {
                alert("댓글을 입력해주세요 !");
                return;
            }

            // 댓글 창 textarea의 value 값을 가지고 온다.
            let content = commentContent.value;

            // 서버에 댓글객체를 전송하기 위해 객체를 생성한다.
            let BookshortsComment = {
                shortsId,
                content,
            };
            /* 통신에 사용 될 XMLHttpRequest 객체 정의 */
            httpRequest = new XMLHttpRequest();

            // 콜백 함수
            httpRequest.onload = () => {
                const commentGroup = shortSection.querySelector(".comment-group");
                const comments = commentGroup.querySelector(".comments");

                //첫번쨰 인자 : 숏츠아이디, 두번쨰 인자 : 댓글 내용, 세번쨰 인자 : 콜백함수 댓글 수 얻는 변수
                getCommentList(shortsId, comments, function (commentCount) {
                    countComment.innerHTML = commentCount;
                });

                commentContent.value = "";
            };

            console.log
            /* Post 방식으로 요청 */
            httpRequest.open("POST", "/api/comments", true);
            /* Response Type을 Json으로 사전 정의 */
            httpRequest.responseType = "json";
            /* 요청 Header에 컨텐츠 타입은 Json으로 사전 정의 */
            httpRequest.setRequestHeader("Content-Type", "application/json");
            /* 정의된 서버에 Json 형식의 요청 Data를 포함하여 요청을 전송 */
            httpRequest.send(JSON.stringify(BookshortsComment));
        };
    });
});

// <이미지 슬라이드> , <댓글 창>, <점점점 버튼 클릭 시 모달>
window.addEventListener("load", () => {
    const shortSections = document.querySelectorAll(".short-section");

    let width = document.querySelector(".img-list > img");

    shortSections.forEach((short) => {
        let pages = 0; // 현재 인덱스 번호
        let positionValue = 0; // images 위치값
        const IMAGE_WIDTH = 350; // 한번 이동 시 IMAGE_WIDTH만큼 이동한다.

        const nextBtn = short.querySelector(".next");
        const backBtn = short.querySelector(".back");
        const images = short.querySelector(".images");

        const imgPaging = Array.from(short.querySelectorAll(".img-paging > li"));
        const imgLen = short.querySelectorAll(".images > img").length;

        //이미지 슬라이드 되면, 해당 스라이드 패이징 색상 변경 함수
        function imgSlidePaging(pages) {
            imgPaging.forEach((img, index) => {
                img.classList.add("bg-color:main-3");

                if (index === pages) {
                    img.classList.remove("bg-color:main-3");
                    img.classList.add("bg-color:main-5");
                }
            });
        }

        //각 쇼츠에 nextBtn과 backBtn이 없으면 리턴
        if (nextBtn == null || backBtn == null) return;

        nextBtn.addEventListener("click", function () {
            console.log("widhth = ", width.offsetWidth);
            if (pages < imgLen - 1) {
                backBtn.removeAttribute("disabled"); // 뒤로 이동해 더이상 disabled가 아니여서 속성을 삭제한다.
                positionValue -= IMAGE_WIDTH; // IMAGE_WIDTH의 증감을 positionValue에 저장한다.
                images.style.transform = `translateX(${positionValue}px)`; // x축으로 positionValue만큼의 px을 이동한다.
                pages += 1; // 다음 페이지로 이동해서 pages를 1증가 시킨다.

                imgSlidePaging(pages); //슬라이드 페이징 색상 변경 함수 호출
            }
            if (pages === imgLen - 1) {
                nextBtn.setAttribute("disabled", "true"); // 마지막 장일 때 next버튼이 disabled된다.
            }
        });

        backBtn.addEventListener("click", function () {
            if (pages > 0) {
                nextBtn.removeAttribute("disabled");
                positionValue += IMAGE_WIDTH;
                images.style.transform = `translateX(${positionValue}px)`;
                pages -= 1; // 이전 페이지로 이동해서 pages를 1감소 시킨다.

                imgSlidePaging(pages); //슬라이드 페이징 색상 변경 함수 호출
            }
            if (pages === 0) {
                backBtn.setAttribute("disabled", "true"); // 첫 장 일때 back버튼이 disabled된다.
            }
        });
    });


});

window.addEventListener("load", function (e) {
    const shortSections = document.querySelectorAll(".short-section");
// <댓글 창 잔상, 댓글 창 하나만 보이기>
    let tmpArr = []; //엘리먼트 저장배열

    shortSections.forEach((shortSection) => {
        const commentBtn = shortSection.querySelector(".comment-btn");
        const commentGroup = shortSection.querySelector(".comment-group");
        const comments = commentGroup.querySelector(".comments");
        const closeBtn = shortSection.querySelector(".comment-close");

        // 각 commentBtn에 클릭 이벤트를 추가합니다.
        commentBtn.addEventListener("click", function (e) {
            commentGroup.classList.remove("d:none");

            tmpArr.push(commentGroup); // 클릭 한 엘리먼트 저장하기

            if (tmpArr.length > 1) {
                // 엘리먼트 저장 배열이 2개가 되면, 즉 댓글 아이콘을 클릭한 횟수가 2번 이상이라면
                tmpArr[0].classList.add("d:none"); // 이전 엘리먼트의 댓글 창을 안보이게 하기
                tmpArr.shift(); // 첫번째 엘리먼트 제거 후 ,두번째 엘리먼트 첫번쨰로이동
            }
            commentGroup.classList.remove("d:none"); //이게 있어야, 다음 댓글 버튼 클릭 해도 댓글창이 나타남

            var shortsId = e.target.dataset.shortsId; //html에서 shortsId를 얻기
            getCommentList(shortsId, comments, null); // 댓글창 리스트 서버에서 얻어오는 api를 통해 댓글 리스트 얻기

            // 댓글창 x 버튼 클릭시 해당 댓글 창 숨기기
            closeBtn.onclick = function (e) {
                commentGroup.classList.add("d:none");
            };
        });
    });
})


//<점점점 버튼 클릭 시 모달 창 나타나는 이벤트> , <점점점 밖에 영역 클릭시 모달 창 닫힘)
window.addEventListener("load", function () {
    const shortSections = document.querySelectorAll(".short-section");

    shortSections.forEach((shortSection) => {
        const nDropdown = shortSection.querySelector(".n-dropdown");
        const dropDownList = shortSection.querySelector(".dropdown-list");

        nDropdown.onclick = function () {
            dropDownList.classList.add("active");
            dropDownList.classList.add("transform-x");
        };

        window.addEventListener("click", function (e) {
            if (!nDropdown.contains(e.target)) {
                // 클릭한 현재 요소가 nDropDown의 하위 요소가 아니면
                dropDownList.classList.remove("active");
            }
        });

    });
});


//삭제하기 모달 추가
window.addEventListener('load', function () {
    const modalBackdrop = document.querySelector('#modal-backdrop');

    const shortSections = document.querySelectorAll(".short-section");
    console.log(shortSections)
    for (let shortSection of shortSections) {
        const nDropdown = shortSection.querySelector(".n-dropdown");
        const dropDownList = shortSection.querySelector(".dropdown-list");

        const openButton = shortSection.querySelector('#modal-btn');
        const closeButton = shortSection.querySelector('#close-btn');
        const modal = shortSection.querySelector('#modal');
        const formName = shortSection.querySelector("#form-name");
        const okButton = shortSection.querySelector("#ok-btn");

        okButton.onclick = function (e) {

            formName.action = "/shorts/delete";
            formName.method = "post";
            formName.submit();

        }

        openButton.addEventListener('click', function (e) {
            e.preventDefault();
            modal.classList.remove('d:none');
            modalBackdrop.classList.remove('d:none');
            modal.classList.add('modal-fade-in');

            dropDownList.classList.remove("active");


        });


        closeButton.addEventListener('click', function (e) {
            modal.classList.replace('modal-fade-in', 'modal-fade-out');

            setTimeout(() => {
                modal.classList.add('d:none');
                modalBackdrop.classList.add('d:none');
                modal.classList.remove('modal-fade-out');
            }, 130);


        });


    }


});