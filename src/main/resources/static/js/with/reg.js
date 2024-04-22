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


window.addEventListener("load", function () {
    // 위드 등록 카테고리 체크박스 갯수 제한 3개
    // for 문, checked 하기 ,
    const categorySection = document.querySelector(".category-section");
    const categoryAlert = categorySection.querySelector(".category-alert");

    // 선택 된 체크 박스 카운트
    let checkBoxCnt = 0;

    // 최대 체크 박스 갯수
    const checkBoxMaxCnt = 3;

    categorySection.onclick = function (e) {
        if (e.target.tagName !== "INPUT") return;

        if (e.target.checked) {
            checkBoxCnt++;
        } else {
            checkBoxCnt--;
        }

        if (checkBoxCnt > checkBoxMaxCnt) {
            e.target.checked = false;
            checkBoxCnt--;

            categoryAlert.classList.remove("d:none");
        } else {
            categoryAlert.classList.add("d:none");
        }
    };
});

window.addEventListener("load", function (e) {
    const imgInput = document.querySelector("input[type='file']");
    const preViewImg = document.querySelector(".preview-img");

    imgInput.oninput = function (e) {
        const file = imgInput.files[0];

        if (file.type.indexOf("image/") != 0) {
            alert("이미지만 업로드 할 수 있습니다.");
            return;
        }

        if (file.size > 100 * 1024 * 1024) {
            alert("크기는 100KB 이하만 업로드 할 수 있습니다.");
            return;
        }

        let reader = new FileReader();
        console.log(file);
        reader.onload = function (e) {
            if (preViewImg.hasChildNodes()) {
                preViewImg.removeChild(preViewImg.firstChild);
            }
            console.log(file);

            let img = document.createElement("img");
            img.src = e.target.result;

            img.setAttribute("class", "h:3 w:3 border-radius:4");

            preViewImg.append(img);
        };

        // 주어진 파일을 읽어들이고, 해당 파일의 내용을 Data URL 형식으로 변환하여  콜백함수에 반환
        reader.readAsDataURL(file);
    };
});


