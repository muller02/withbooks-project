// 이전 / 다음 버튼 눌렀을 때
// '이미지 슬라이드' + '이전/다음 화살표 시각적 표시' + '이미지 페이저'
{
    let board = document.querySelector("#board");
    let _img = document.querySelector("img[alt*='게시글']");
    let imgWidth = null;
    // 이미지가 없는 경우 조건처리
    if(_img != null)    
        imgWidth = _img.width;

    // 이미지가 한 장만 있는 경우 이전/다음 화살표 시각적 표시
    let lastImgCnt = parseInt(document.querySelector(".img-box").dataset.lastImg);
    if(lastImgCnt == 1)
        document.querySelector(".img-r-btn").classList.add("d:none");

    board.onclick = (e)=>{
        
        // 이전 버튼을 눌렀을 때 
        if(e.target.classList.contains("img-l-btn")){

            let imgBox = e.target.parentNode.parentNode.parentNode.querySelector(".img-box");
            let curX = parseInt(imgBox.dataset.curX);
            let curImg = parseInt(imgBox.dataset.curImg);

            if(curImg != 1){

                // 이미지 슬라이드
                imgBox.style.transform = `translateX(${curX + imgWidth}px)`;
                imgBox.dataset.curX = curX + imgWidth;
                imgBox.dataset.curImg--;


                // 이전/다음 화살표 시각적 표시
                let imgLBtnClassList = e.target.classList;
                let imgRBtnClassList = e.target.parentNode.parentNode.querySelector(".img-r-btn").classList;
                
                imgRBtnClassList.remove("d:none");
                if(imgBox.dataset.curImg == 1)
                    imgLBtnClassList.add("d:none");


                // 이미지 페이저
                let selected = e.target.parentNode.parentNode.parentNode.querySelector(".selected-img-pager");
                selected.classList.remove("selected-img-pager");
                selected.previousElementSibling.classList.add("selected-img-pager");
            }            
        }


        // 다음 버튼을 눌렀을 때 
        if(e.target.classList.contains("img-r-btn")){
            
            let imgBox = e.target.parentNode.parentNode.parentNode.querySelector(".img-box");
            let curX = parseInt(imgBox.dataset.curX);
            let curImg = parseInt(imgBox.dataset.curImg);
            let lastImg = parseInt(imgBox.dataset.lastImg);

            if(curImg != lastImg){

                // 이미지 슬라이드
                imgBox.style.transform = `translateX(${curX - imgWidth}px)`;
                imgBox.dataset.curX = curX - imgWidth;
                imgBox.dataset.curImg++;


                // 이전/다음 화살표 시각적 표시
                let imgLBtnClassList = e.target.parentNode.parentNode.querySelector(".img-l-btn").classList;
                let imgRBtnClassList = e.target.classList;
                
                imgLBtnClassList.remove("d:none");
                if(imgBox.dataset.curImg == lastImg)
                    imgRBtnClassList.add("d:none");


                // 이미지 페이저
                let selected = e.target.parentNode.parentNode.parentNode.querySelector(".selected-img-pager");
                selected.classList.remove("selected-img-pager");
                selected.nextElementSibling.classList.add("selected-img-pager");
            }            
        }
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


// textarea 자동 크기 조절
{
    let textarea = document.querySelector("textarea");
    
    textarea.oninput = (e) => {
        const target = e.target;
      
        target.style.height = 0;
        target.style.height = 3 + target.scrollHeight + 'px';
      };
}