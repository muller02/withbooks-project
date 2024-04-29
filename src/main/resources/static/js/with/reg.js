
window.addEventListener("load",function (){
    const withReg=document.querySelector("#with-reg")

    //중복검사 버튼
    const validBtn = withReg.querySelector(".valid-btn");

    // 중복검사에서 통과 했을 떄 알람
    const nameAlertTrue = withReg.querySelector(".name-alert-true");

    // 중복검사에서 실패 했을 떄 알람
    const nameAlertFalse = withReg.querySelector(".name-alert-false");

    // 위드명 입력 인풋
    const withNameInput = withReg.querySelector("input[name='name']");


    // 인풋 이벤트 추가
    withNameInput.addEventListener("input",(e)=>{
        // 인풋 창에 값이 있을 때, 중복검사 버튼이 활성화 되면서, 배경색 변경
        if(withNameInput.value){
            validBtn.classList.add("bg-color:main-5");
            validBtn.disabled =false;
        }else{
            validBtn.classList.remove("bg-color:main-5");
            validBtn.disabled =true;
        }

    })

    // 중복검사 버튼을 클릭 했을 때
    validBtn.onclick = async (e) => {

        e.preventDefault();

        let withName = withNameInput.value;
        let url = "/api/with/check-name?n=" + withName;
        let checkName;

        await fetch(url).then(response => {
                return response.text(); // 응답으로 json 형태가 아닌 기본형으로 반환 되는 값을 받기 위해
            }
        ).then(data => {

            checkName = data;  // true, false 를 반환하게 됨
        })

        console.log(checkName);

        if (checkName === 'true') {  // 문자열로 비교를 해야  진행이 됨
            nameAlertTrue.classList.remove("d:none")
            nameAlertFalse.classList.add("d:none");
        } else {
            nameAlertFalse.classList.remove("d:none");
            nameAlertTrue.classList.add("d:none")
        }

        // 위드 명 입력창에 입력이 되면, 두 알람창 모두 숨김
        withNameInput.addEventListener("input",function (e){
            nameAlertTrue.classList.add("d:none");
            nameAlertFalse.classList.add("d:none");

        })


    }

})

// 위드 소개 Texarea 자동 늘어지게 하는 이벤트 추가
window.addEventListener("load", function () {
    const withIntro=document.querySelector("#with-intro")

    // witnIntro Textarea에 input 이벤트 추가
    withIntro.oninput = function (e){
        withIntro.style.height = (withIntro.scrollHeight) + 'px'; //스크롤의 높이 만큼 textArea의 높이도 같이 늘어 남

    }

})

// 위드 정원 유효성 검사
window.addEventListener("load", function (e){
    const withReg=document.querySelector("#with-reg")
    const personnelInput=withReg.querySelector("input[name='personnel']")

    // reg.html personnel input 밑 알람 창이 있음
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


