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

        const url = `/api/with/debate/board/${debateComment.boardId}/comments`;
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

                let divHTML = `
                            <div class="d:flex fl-dir:column">
                                <a class="d:none" href="">
                                    <div><img class="profile-image w:1 h:1" src="/image/shorts/profile.png" alt="프로필사진"></div>
                                    <div class="writer fs:2 fw:3 h:1 ml:1">뉴렉이</div>
                                </a>
                                <span class="comment-area ml:10 pos:relative d:flex fl-dir:column ai:end">
                                    <p class="fs:2 bg-color:main-2 bd-radius:4 bd-tr-radius:0 px:2 pt:2 pb:8">세상은 이미 끔찍하고 지독하지만 앞으로는 더욱 악화될 것이다. 기적적인 해법을 무작정 기다릴 것이 아니라 이제 각자가 자신 자신을 책임져야 할 때다. </p>
                                    <div class="delete-button pos:absolute right:1 bottom:1"><button class="icon icon:trash icon-color:accent-3 icon-size:3">삭제</button></div>
                                    <div class="fs:1 color:base-6 mr:1 mt:1">오후 10:46</div>
                                </span>
                            </div>
                `
                document.querySelector(".my-comment").insertAdjacentHTML("beforeend", divHTML);
                document.querySelector("#new-comment").value = "";
            } else {
                response.json().then(error => {
                    console.error("댓글 등록 실패:", error.message);
                });
            }
            return response.json();
        }).then((data) => console.log(data))
    })

    //============================== 삭제 ====================================
    // const commentDeleteBtns  = document.querySelectorAll(".comment-delete-btn");

    // commentDeleteBtns.forEach(deleteBtn => {

    // })

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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



