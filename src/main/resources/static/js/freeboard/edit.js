// 체크박스 클릭 시 애니메이션
{
    let checkInput = document.querySelector(".check-input");

    checkInput.onchange = (e)=>{
        e.target.parentNode.classList.toggle("checked");
    }

}



// 이미지 preview 
{
    let imgInput = document.querySelector(".img-input");
    let preview = document.querySelector(".preview");

    // 버퍼 생성
    let buffer = new DataTransfer();
    let bufferList = buffer.items;

    let inputCnt = 0;
    
    imgInput.onchange = (e)=>{
        inputCnt++;
        if(inputCnt == 1){
            let serverSavedImg = preview.querySelectorAll(".server-saved-img");
            for(let div of serverSavedImg)
                div.remove();
        }


        let imgFiles = imgInput.files;
        
        for(let f of imgFiles){
            // 버퍼에 저장
            bufferList.add(f);

            // 이미지 미리보기
            let fileReader = new FileReader();
            fileReader.onload = (e)=>{

                // 미리보기 이미지 삽입
                preview.insertAdjacentHTML(
                                            "afterbegin", 
                                            `<div class="mr:2 pos:relative">
                                                <img class="h:2 w:2 px:2 py:1 bd bd-radius:4 box-sizing:content-box" src="${e.target.result}" alt="">
                                            </div>`
                                            );
            }

            fileReader.readAsDataURL(f);
        }

        // input에 갱신
        imgInput.files = buffer.files;
    }

    
}
