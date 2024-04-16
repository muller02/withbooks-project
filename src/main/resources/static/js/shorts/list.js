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

      var divHTML = `
                <div class="border-bottom pb:3 pt:6 pr:2 pl:2">
                    <div class="pb:2 deco comment-title-color icon icon:dots_three_outline_vertical_fill deco-size:2 w:100p deco deco-pos:right jc:space-between mr:3 fw:3">${cmt.nickname}</div>
                    <div class="pl:2 pr:2 comment-content-color">${cmt.content}</div>
                </div>`;
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
      let shortsComment = {
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

      /* Post 방식으로 요청 */
      httpRequest.open("POST", "/api/comments", true);
      /* Response Type을 Json으로 사전 정의 */
      httpRequest.responseType = "json";
      /* 요청 Header에 컨텐츠 타입은 Json으로 사전 정의 */
      httpRequest.setRequestHeader("Content-Type", "application/json");
      /* 정의된 서버에 Json 형식의 요청 Data를 포함하여 요청을 전송 */
      httpRequest.send(JSON.stringify(shortsComment));
    };
  });
});

// <이미지 슬라이드> , <댓글 창>, <점점점 버튼 클릭 시 모달>
window.addEventListener("load", () => {
  // 83Line ... 버튼들
  const dropdownButtons = document.querySelectorAll(".dropdown-btn");

  // 87Line dropdownButtons 들 활성화 시 나타나는 모달
  const dropdownLists = document.querySelectorAll(".dropdown-list");

  // 301Line 이미지를 담는 section
  const imgSection = document.querySelectorAll(".img-section");

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

  // <점점점 버튼 클릭 시 모달 창 나타나는 이벤트>
  // dropdownButtons.forEach((dropdownButton, index) => {
  //
  //     // dropdownButtons들을 하나 씩 거내어 이벤트 '클릭' 이벤트 추가
  //     // dropdownButton.addEventListener("click", () => {
  //     //     // 버튼이 클릭 됐을 떄 "active" 클래스가 존재하면 제거하고, 존재하지 않으면 "acteive"를 추가한다
  //     //     dropdownLists[index].classList.toggle("active");
  //     //     // 모달창 왼쪽으로 -60px 이동 클래스 추가
  //     //     dropdownLists[index].classList.add("transform-x");
  //     //
  //     // });
  //
  // });
});

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
