
// 댓글 창 textarea 자동으로 글 늘어나게 하기
window.addEventListener('load', function(e) {




    let textarea = document.querySelector("#new-comment");

    console.log(textarea)


    textarea.oninput = function (e) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + 'px'; //스크롤의 높이 만큼 textArea의 높이도 같이 늘어 남

    }

})


// 수정 삭제 드랍다운
window.addEventListener("load", function () {
    const dropdownButton = document.getElementById("dropdown-btn");
    const dropdownList = document.getElementById("dropdown-list");

    console.log(dropdownButton);
    console.log(dropdownList);

    dropdownButton.addEventListener("click", function () {
        dropdownList.classList.toggle("active");
    });
});

// 삭제 모달 창
window.addEventListener('load', function () {
    const openButton = document.getElementById('modal-btn');
    const closeButton = document.getElementById('close-btn');
    const modal = document.getElementById('modal');
    const modalBackdrop = document.getElementById('modal-backdrop');

    openButton.addEventListener('click', function () {
        modal.classList.remove('d:none');
        modalBackdrop.classList.remove('d:none');
        modal.classList.add('modal-fade-in');
    });

    closeButton.addEventListener('click', function () {
        modal.classList.replace('modal-fade-in', 'modal-fade-out');

        setTimeout(() => {
            modal.classList.add('d:none');
            modalBackdrop.classList.add('d:none');
            modal.classList.remove('modal-fade-out');
        }, 130);
    });
});

// 게시글 삭제
window.addEventListener('load', function () {
    const deleteBtn = document.querySelector("#delete-btn");
    const deleteForm = document.querySelector("#delete-form");

    deleteBtn.addEventListener("click", function (e) {
        console.log(e.target)
        deleteForm.action = '/board/delete';
        deleteForm.method = 'post';
        deleteForm.submit();
    })
})



// 댓글 등록 삭제
window.addEventListener('load', function(e) {

    //============================== 등록 ====================================

    const commentCreateBtn  = document.querySelector("#comment-create-btn");


    commentCreateBtn.addEventListener('click', () => {

        const debateComment = {
            content : document.querySelector("#new-comment").value,
            boardId : document.querySelector("#new-comment-board-id").value
        }
        console.log(debateComment.content)
        console.log(debateComment.boardId)

        const url = `/with/debate/board/${debateComment.boardId}/comments`;
        console.log(url)

        fetch(url, {
            method: "post",
            body: JSON.stringify(debateComment),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            if (response.ok) {
                console.log("댓글이 등록되었습니다.");
                window.location.reload();
            } else {
                response.json().then(error => {
                    console.error("댓글 등록 실패:", error.message);
                });
            }

        })
    })

    //============================== 삭제 ====================================
    const commentDeleteBtns  = document.querySelectorAll(".comment-delete-btn");
    // console.log(commentDeleteBtns);

    commentDeleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener("click", function(e) {

            const params = new URLSearchParams(window.location.search);
            const boardId = params.get("id");
            const id = e.target.getAttribute("data-commentId");

            console.log(boardId);
            console.log(id);

            const url = `/with/debate/board/${boardId}/comments/${id}`;
            console.log(url)

            fetch(url, {
                method: "delete",
            }).then(response => {
                if (response.ok) {
                    console.log("삭제 성공")
                    window.location.reload();
                } else {
                    console.log("삭제 실패")
                    return;
                }
            })
        })
    })





    

  
  
  })

      
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    //============================== 삭제 ====================================
    // <button id="deleteButton" data-board-id="your_board_id_here" data-comment-id="your_comment_id_here">삭제</button>


    // document.getElementById('deleteButton').addEventListener('click', function() {
    //     const boardId = this.getAttribute('data-board-id');
    //     const commentId = this.getAttribute('data-comment-id');
    //     // const csrfToken = getCSRFToken(); // CSRF 토큰을 얻어오는 함수
    //
    //     fetch(`/${boardId}/comments/${commentId}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-CSRF-TOKEN': csrfToken
    //         }
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //
    //         // 성공적으로 삭제되면 해당 댓글의 HTML 요소를 삭제
    //         const commentElement = document.getElementById(`comment_${commentId}`);
    //         if (commentElement) {
    //             commentElement.remove();
    //         } else {
    //             console.error('Failed to find comment element to delete');
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    // });



