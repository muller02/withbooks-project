// 게시글 점점점
{
    let board = document.querySelector("#board");
    let boardDot = board.querySelector(".board-dot");
    let boardPopup = board.querySelector(".board-popup");
    let boardDelBtn = board.querySelector(".board-del-btn");
    let boardDelModalBox = board.querySelector("#board-del-modal-box");
    let delBtn = boardDelModalBox.querySelector(".del-btn");
    let boardId = boardDot.dataset.id;
    

    // 게시글의 점점점을 누르면 팝업창이 토글
    boardDot.addEventListener("click", (e)=>{
        boardPopup.classList.toggle("d:none");
    });


    // 삭제하기 버튼을 눌렀을 시 모달창 활성화
    boardDelBtn.onclick = (e) =>{
        boardDelModalBox.classList.remove("d:none");
    }

    // 모달창의 바깥쪽 또는 취소버튼을 눌렀을 때 모달창 비활성화
    boardDelModalBox.onclick = (e)=>{
        if(e.target == boardDelModalBox || e.target.classList.contains("cancel-btn"))
            boardDelModalBox.classList.add("d:none");
    }

    // 모달창의 삭제버튼을 눌렀을 때 게시글 삭제
    delBtn.onclick = (e) => {
        fetch(`/api/free-boards/${boardId}`, {method: "DELETE"});
        history.back();
    }
}


// 댓글 점점점
{
    let cmtList = document.querySelector("#comment-list");
    let cmtModalBox = document.querySelector("#comment-del-modal-box");
    let mCancelBtn = cmtModalBox.querySelector(".cancel-btn");
    let mDelBtn = cmtModalBox.querySelector(".del-btn");
    let activePopup = null;
    let cmtId = null;
    

    cmtList.onclick = (e) =>{

        // 댓글 점점점 클릭 시 팝업창 활성화
        if(e.target.classList.contains("dotdotdot")){
            // 활성화된 팝업창이 있으면 끄기
            if(activePopup != null && activePopup !=e.target.parentNode.querySelector(".cmt-popup"))
                activePopup.classList.add("d:none");

            // 클릭한 댓글의 팝업창 활성화
            activePopup =  e.target.parentNode.querySelector(".cmt-popup");
            activePopup.classList.toggle("d:none");
            cmtId = activePopup.dataset.cmtId;
        }


        // 팝업창에서 삭제버튼 누르면 모달창 활성화
        if(e.target.classList.contains("del-btn")){
            cmtModalBox.classList.remove("d:none");
        }        
    }

    // 모달창에서 취소 또는 모달창 외부를 클릭했을 때 모달창 display none
    cmtModalBox.onclick = (e) =>{
        if(e.target == mCancelBtn || e.target == cmtModalBox)
            cmtModalBox.classList.add("d:none"); 
    }

    mDelBtn.onclick = (e)=>{
        fetch(`/api/free-comments/${cmtId}`, {method: "DELETE"});
        location.reload();
    }
}



// 좋아요 
{
    let likeBtn = document.querySelector(".like-btn");
    let freeBoardId = likeBtn.dataset.fid;

    likeBtn.onclick = (e)=>{
        
        // if(좋아요를 누른적이 없다면) 추가
        if(!likeBtn.classList.contains("liked"))
        {
            async function like(freeBoardId) {
                const response = await fetch("/api/free-board/free-like" ,
                {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'text/plain'
                    },
                    body: freeBoardId
                });
                const jsonData = await response.json();
                

                if(jsonData == 100)         // 로그인을 안 하고 좋아요를 눌렀을 때
                    console.log("로그인을 해 주세요");
                else if(jsonData == 1){     // 좋아요 성공 시 시각적 표현
                    likeBtn.classList.add("liked");
                    let innerText = likeBtn.innerText;
                    likeBtn.innerText = parseInt(innerText) + 1;
                }
                else{                       // 좋아요 실패 시 콘솔출력
                    console.log("좋아요에 실패했습니다.");
                }
            }

            like(freeBoardId);
        }
        // if(else 좋아요를 눌렀었다면) 삭제
        else
        {
            async function cancelLike(freeBoardId) {
                const response = await fetch("/api/free-board/free-like" ,
                {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'text/plain'
                    },
                    body: freeBoardId
                });
                const jsonData = await response.json();
                
                
                if(jsonData == 100)         // 로그인을 안 하고 좋아요를 눌렀을 때
                    console.log("로그인을 해 주세요");
                else if(jsonData == 1){     // 좋아요 삭제 성공 시 시각적 표현
                    likeBtn.classList.remove("liked");
                    let innerText = likeBtn.innerText;
                    likeBtn.innerText = parseInt(innerText) - 1;
                }
            }

            cancelLike(freeBoardId);
        }
    }


}


// 댓글 입력창 자동 크기 조절
{
    let textarea = document.querySelector("textarea");
    
    textarea.oninput = (e) => {
        const target = e.target;
      
        target.style.height = 0;
        target.style.height = 3 + target.scrollHeight + 'px';
      };
}