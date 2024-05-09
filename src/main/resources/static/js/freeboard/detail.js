
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