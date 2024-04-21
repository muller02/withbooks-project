// 댓글 리스트 요청
function getCommentList(shortsId, comments, getCommentCount) {
  comments.innerHTML = "";

  let commentCount = 0;

  fetch(`http://localhost:8080/api/comments/list?shorts_id=${shortsId}`)
    .then((response) => response.json())
    .then((data) => {

      data.forEach((cmt) => {

        commentCount++; //댓글 갯수 카운트

        var divHTML = `
        <div class="border-bottom pb:3 pt:6 pr:2 pl:2 ">
          <div class="d:flex">
            <div class="pb:2 w:100p jc:space-between mr:3 fw:3">${cmt.nickname}</div>
            <div class="n-dropdown comment-dropdown">
              <button class="cursor:pointer dropdown-btn">
                <span class="comment-dots-icon icon icon:dots_three_outline_vertical_fill icon-size:3 color-icon rg-comment-hover "></span>
              </button>
              <ul class="dropdown-list w:2 dropdown-transformx comment-dropdown-list ">
                <li>
                  <button class="va:middle text-align:center color:accent-2 " data:${cmt.id}>
                    삭제하기
                  </button>
                </li>
                <li>
                  <button class="va:middle text-align:center color:accent-2 ">
                    수정하기
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="pl:2 pr:2 comment-content-color">${cmt.content}</div>
        </div>
      `;

        comments.insertAdjacentHTML("beforeend", divHTML);
      });

      if (getCommentCount !== null)
        getCommentCount(commentCount);
    })

    .catch((error) => console.error("Error:", error));
}






// 점점점 버튼 클릭 시 모달 창 나타나는 이벤트, 점점점 밖에 영역 클릭 시 모달 창 닫힘
window.addEventListener("load", function () {

  const main = document.querySelector("#main");
  let siblingElement = null;

  main.addEventListener("click", function (e) {

    const target = e.target;
    if (target.classList.contains("shorts-content-dots")) {

      const parentElement = target.parentElement;
      siblingElement = parentElement.nextElementSibling;
      siblingElement.classList.add("active");
      siblingElement.classList.add("transform-x");

    }
    else if (siblingElement && siblingElement.classList.contains("active")) {

      siblingElement.classList.remove("active");

    }
  });
});





// 댓글 창 관련 이벤트, 댓글 리스트 GET, 댓글 X 버튼 클릭
window.addEventListener("load", function (e) {
  //메인 엘리먼트 가지고 오기
  let main = document.querySelector("#main");

  // 방금 전 선택한 댓글 요소를 저장할 임시 배열
  let tmpArr = [];

  // 메인 이벤트 시작 버블링
  main.addEventListener("click", function (e) {
    // 내가 클릭한 아이의 클래스에 icon:cahts 가 없으면 리턴
    if (!e.target.classList.contains("icon:chats")) return;

    //내가 클릭한 요소의 부모 중  댓글/ 좋아요 아이콘이 있는 section 을 가지고 온다 .
    let commentBox = e.target.closest(".cmt-like-section");

    // 그 section의 다음 형제(댓글 창)  엘리먼트를 가지고 온다 .
    let commentGroup = commentBox.nextElementSibling;

    // 첫번 째로 댓글 아이콘을 클릭하면,  그 아이의 d:none 속성을 제거한다.
    commentGroup.classList.remove("d:none");

    // 방금 내가 선택한 댓글 엘리먼트를 임시 배열에 넣는다.
    tmpArr.push(commentGroup);

    // 다음 댓글을 클릭하게 되면 배열 0번쨰 있는 댓글의 클래스 d:none 추가하여 보이지 않게 만든 다음  배열에 제거
    // 다음 댓글이 배열 0번쨰 요소로 이동

    //배열에 2개가 담기게 되면 실행
    if (tmpArr.length > 1) {
      tmpArr[0].classList.add("d:none");
      tmpArr.shift();
    }

    //html 자체에 d:none이 있기 때문에 , 새 댓글창을 보려면 d:none을 제거해야함
    tmpArr[0].classList.remove("d:none");

    let shortsId = e.target.dataset.shortsId;
    let comments = commentGroup.querySelector(".comments");

    getCommentList(shortsId, comments, null);

    let closeBtn = commentGroup.querySelector(".comment-close");

    //닫기 버튼
    closeBtn.onclick = function (e) {
      commentGroup.classList.add("d:none");
    };
  });
});







// 댓글 POST 요청
window.addEventListener("load", function (e) {

  let main = document.querySelector("#main");

  main.addEventListener("click", function (e) {

    if (!e.target.closest(".cmt-like-section"))
      return;

    let commentBox = e.target.closest(".cmt-like-section"); // 댓글, 좋아요 버튼이 있는 box
    let commentGroup = commentBox.nextElementSibling;
    let commentBtn = commentBox.querySelector(".comment-btn");
    let shortsId;


    if (commentBox.querySelector(".comment-btn")) {
      shortsId = commentBtn.dataset.shortsId;
    }

    let countComment = commentBox.querySelector(".count-comment");  // 댓글 숫자 나오는 엘리먼트
    let comments = commentGroup.querySelector(".comments"); //댓글 창 내부 댓글 리스트
    let commentReg = commentGroup.querySelector(".comment-reg"); // 댓글 등록 버튼
    let commentContent = commentGroup.querySelector(".comment-content"); // 댓글창 input



    // input에 내용이 있어야 버튼 활성화 가능 함수
    function  updateButtonState(){
      if(commentContent.value.trim() === "" || commentContent.value.trim() ===null){
        commentReg.disabled = true;
      }else{
        commentReg.disabled=false;
      }

    }


    //댓글 input창에 입력될 때 마다 함수 호출
    commentContent.addEventListener("input",updateButtonState);


    commentReg.onclick = function (e) {
      let content = commentContent.value;

      if (commentContent.value === "") {
        alert("댓글을 입력해주세요 !");
        return;
      }

      let httpRequest = new XMLHttpRequest();
      let shortsComment = {
        shortsId,
        content,
      };
      httpRequest.onload = () => {
        getCommentList(shortsId, comments, function (commentCount) {
          countComment.innerHTML = commentCount;
        });
        
        // 댓글 등록 누르고나서의 행위 , 댓글 내용 초기화, 댓글 등록 버튼 비활성화
        commentContent.value = "";
        commentReg.disabled=true; 
      };
      httpRequest.open("POST", "/api/comments", true);
      httpRequest.responseType = "json";
      httpRequest.setRequestHeader("Content-Type", "application/json");
      httpRequest.send(JSON.stringify(shortsComment));
    };


  });
});





// 댓글창 점점점 버튼
window.addEventListener("load", function () {

  // 메인 엘리먼트 가지고오기
  const main = document.querySelector("#main");

  main.addEventListener("click", function (e) {

    // e.target 변수 설정
    const target = e.target;

    // 내가 클릭한 아이의 부모 중 comment - dropdown이 없으면 함수 종료
    if (!target.closest(".comment-dropdown"))
      return;

    // 내가 클릭한 아이의 comment-dropdown 가지고 옴
    const commentDropdown = target.closest(".comment-dropdown");

    // .. 버튼
    const dotBtn = commentDropdown.querySelector(".comment-dots-icon");

    // ... 버튼 클릭시 나오는 모달 창
    const dropdownList = commentDropdown.querySelector(".dropdown-list");

    dropdownList.classList.add("active");

    // 아무데나 클릭하면 , 모달창 사라지게 하기
    // 위에서 e.target의 범위를 한정 했기 때문에 , 내가 문서 전체에서 e 를 가지고 와서
    // e.target 의 범위를 제한하지 않으면서 모든 클릭 대상을 설정 가능
    document.addEventListener("click", function (e) {

      //내가 클릭한 애가 dotBtn이 아니면 모달창에 active 제거
      if (!e.target.contains(dotBtn)) {
        dropdownList.classList.remove("active");
      }

    });
  });
});
