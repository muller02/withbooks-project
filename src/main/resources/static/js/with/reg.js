window.addEventListener("load", function (){

// 위드 등록 카테고리 체크박스 갯수 제한 3개
// for 문, checked 하기 ,
    const categorySection = document.querySelector(".category-section");
    const  categoryAlert = categorySection.querySelector(".category-alert");

    // 선택 된 체크 박스 카운트
    let checkBoxCnt = 0 ;

    // 최대 체크 박스 갯수
    const checkBoxMaxCnt = 3;


    categorySection.onclick = function (e){

        if(e.target.tagName !== "INPUT")
            return;

        if(e.target.checked){
            checkBoxCnt++;
        }else{
            checkBoxCnt--;
        }

        if(checkBoxCnt > checkBoxMaxCnt ){
            e.target.checked =false;
            checkBoxCnt--;

            categoryAlert.classList.remove("d:none");


        }else{
            categoryAlert.classList.add("d:none");
        }







    }



})


