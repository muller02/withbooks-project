// 댓글 리스트 요청
function getCommentList(shortsId, comments, getCommentCount) {
  comments.innerHTML = "";
  var commentCount = 0;
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.onload = function () {
    var list = JSON.parse(this.responseText);
    for (cmt of list) {
      commentCount++;
      var divHTML = `
        <div class="border-bottom pb:3 pt:6 pr:2 pl:2 ">
          <div class="d:flex">
            <div class="pb:2 w:100p jc:space-between mr:3 fw:3">${cmt.nickname}</div>
            <div class="n-dropdown comment-dropdown">
              <button class="cursor:pointer dropdown-btn">
                <span class="comment-dots-icon icon icon:dots_three_outline_vertical_fill icon-size:3 color-icon rg-comment-hover pro"></span>
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
    }
    if (getCommentCount !== null) getCommentCount(commentCount);
  };
  xhr.open(
    "GET",
    `http://localhost:8080/api/comments/list?shorts_id=${shortsId}`,
  );
  xhr.send();
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
    } else if (siblingElement && siblingElement.classList.contains("active")) {
      siblingElement.classList.remove("active");
    }
  });
});

// 댓글 창 관련 이벤트, 댓글 리스트 GET, 댓글 X 버튼 클릭
window.addEventListener("load", function (e) {
  let main = document.querySelector("#main");
  let tmpArr = [];

  main.addEventListener("click", function (e) {
    if (!e.target.classList.contains("icon:chats")) return;
    let commentBox = e.target.closest("section");
    let commentGroup = commentBox.nextElementSibling;
    commentGroup.classList.remove("d:none");
    tmpArr.push(commentGroup);
    if (tmpArr.length > 1) {
      tmpArr[0].classList.add("d:none");
      tmpArr.shift();
    }
    commentGroup.classList.remove("d:none");
    let shortsId = e.target.dataset.shortsId;
    let comments = commentGroup.querySelector(".comments");
    getCommentList(shortsId, comments, null);
    let closeBtn = commentGroup.querySelector(".comment-close");
    closeBtn.onclick = function (e) {
      commentGroup.classList.add("d:none");
    };
  });
});

// 댓글 POST 요청
window.addEventListener("load", function (e) {
  let main = document.querySelector("#main");
  main.addEventListener("click", function (e) {
    if (!e.target.closest(".cmt-like-section")) return;
    let commentBox = e.target.closest(".cmt-like-section");
    let commentGroup = commentBox.nextElementSibling;
    let commentBtn = commentBox.querySelector(".comment-btn");
    let shortsId;
    if (commentBox.querySelector(".comment-btn")) {
      shortsId = commentBtn.dataset.shortsId;
    }
    let countComment = commentBox.querySelector(".count-comment");
    let comments = commentGroup.querySelector(".comments");
    let commentReg = commentGroup.querySelector(".comment-reg");
    commentReg.onclick = function (e) {
      let commentContent = commentGroup.querySelector(".comment-content");
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
        commentContent.value = "";
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
  let main = document.querySelector("#main");
  main.addEventListener("click", function (e) {
    let target = e.target;
    if (!target.closest(".comment-dropdown")) return;
    const commentDropdown = target.closest(".comment-dropdown");
    const btn = commentDropdown.querySelector(".pro");
    const dropdownList = commentDropdown.querySelector(".dropdown-list");
    dropdownList.classList.add("active");
    document.addEventListener("click", function (e) {
      if (!e.target.contains(btn)) {
        dropdownList.classList.remove("active");
      }
    });
  });
});
