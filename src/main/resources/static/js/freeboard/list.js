
// 이전 / 다음 버튼 눌렀을 때
// '이미지 슬라이드' + '이전/다음 화살표 시각적 표시' + '이미지 페이저'
{
    let boardList = document.querySelector(".board-list");
    let imgWidth = document.querySelector("img[alt*='게시글']").width;

    boardList.onclick = (e)=>{
        
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