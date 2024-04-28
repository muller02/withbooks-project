
window.addEventListener("load",function (){
    const withReg=document.querySelector("#with-reg")

    const validBtn = withReg.querySelector(".valid-btn");

    const nameAlertTrue = withReg.querySelector(".name-alert-true");
    const nameAlertFalse = withReg.querySelector(".name-alert-false");

    const withNameInput = withReg.querySelector("input[name='name']");



    console.log(nameAlertFalse)

    withNameInput.addEventListener("input",(e)=>{

        if(withNameInput.value){
            validBtn.classList.add("bg-color:main-5");
            validBtn.disabled =false;
        }else{
            validBtn.classList.remove("bg-color:main-5");
            validBtn.disabled =true;
        }

    })

    validBtn.onclick = async (e) => {

        e.preventDefault();

        let withName = withNameInput.value;
        let url = "/api/with/check-name?n=" + withName;
        let checkName;

        await fetch(url).then(response => {

                return response.text(); // 응답으로부터 텍스트 데이터를 반환합니다
            }
        ).then(data => {

            checkName = data;
        })

        console.log(checkName);

        if (checkName === 'true') {
            nameAlertTrue.classList.remove("d:none")
            nameAlertFalse.classList.add("d:none");
        } else {
            nameAlertFalse.classList.remove("d:none");
            nameAlertTrue.classList.add("d:none")
        }
        withNameInput.addEventListener("input",function (e){

            nameAlertTrue.classList.add("d:none");
            nameAlertFalse.classList.add("d:none");

        })


    }

})

// 위드 소개 Texarea 자동 늘어지게 하는 이벤트 추가
window.addEventListener("load", function () {
    const withIntro=document.querySelector("#with-intro")

    withIntro.oninput = function (e){
        withIntro.style.height = 'auto';
        withIntro.style.height = (withIntro.scrollHeight) + 'px'; //스크롤의 높이 만큼 textArea의 높이도 같이 늘어 남

    }

})

// 위드 정원 유효성 검사
window.addEventListener("load", function (e){
    const withReg=document.querySelector("#with-reg")
    const personnelInput=withReg.querySelector("input[name='personnel']")
    const personnelAlert=withReg.querySelector(".personnel-alert");

    personnelInput.oninput=function (e) {
        if(personnelInput.value>100){  // 위드 정원 100 이상 시 알람 표시
            personnelAlert .classList.remove("d:none");
        } else{
            personnelAlert.classList.add("d:none")
            }
    }



})


// 토론 횟수 유효성 검사
window.addEventListener("load",function (e){
const withReg=document.querySelector("#with-reg")
const intervalInput=withReg.querySelector("input[name='interval']")
const intervalAlert = withReg.querySelector(".interval-alert");
intervalInput.oninput=function () {
    if(intervalInput.value>50) {

        intervalAlert.classList.remove("d:none");
    }else{
        intervalAlert.classList.add("d:none");
    }
}

})




// 위드 등록 카테고리 체크박스 갯수 제한 3개
// window.addEventListener("load", function (){
//
// // for 문, checked 하기 ,
//     const categorySection = document.querySelector(".category-section");
//     const  categoryAlert = categorySection.querySelector(".category-alert");
//
//     // 선택 된 체크 박스 카운트
//     let checkBoxCnt = 0 ;
//
//     // 최대 체크 박스 갯수
//     const checkBoxMaxCnt = 3;
//
//
//     categorySection.onclick = function (e){
//
//         if(e.target.tagName !== "INPUT")
//             return;
//
//         if(e.target.checked){
//             checkBoxCnt++;
//         }else{
//             checkBoxCnt--;
//         }
//
//         if(checkBoxCnt > checkBoxMaxCnt ){
//             e.target.checked =false;
//             checkBoxCnt--;
//
//             categoryAlert.classList.remove("d:none");
//
//
//         }else{
//             categoryAlert.classList.add("d:none");
//         }
//
//     }
//
//
//
// })

// 위드 등록 카테고리 체크박스 갯수 제한 3개
window.addEventListener("load", function () {
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

// 위드 이미지 미리보기
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


