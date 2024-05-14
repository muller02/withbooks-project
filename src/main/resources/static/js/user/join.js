const form = document.querySelector("#form");
// onChange 들어갈 섹션
const changeSection = form.querySelector(".change-section");
// 이메일 중 @ 앞단
const emailNameInput = form.querySelector("input[name='email']")
// 이메일 중 @ 뒷단
const emailInput = form.querySelector("input.inputEmail")
// 이메일 중 @ 뒷단 select box
const emailSelect = form.querySelector("select[name='address']");
// 이메일 중복확인 버튼
const checkEmailBtn = form.querySelector(".check-email");

// 서버로 넘어가는 email input ( hidden )
const emailIdInput = form.querySelector("input[name='email-id']");

// 중복확인 여부
let isEmailValid = false;

// =======================================================================
// 이메일 관련

// 이메일 주소 설정 select 박스
emailSelect.onchange = function(e){
    e.stopPropagation();
    let optionValue = e.target.value;
    if(optionValue != "직접 입력")
        emailInput.value = e.target.value;
    emailInput.classList.remove("bd-color:accent-1")
    emailInput.classList.add("bd-color:main-5")

    // 중복확인 필요
    isEmailValid = false;
}

// email 정규식 체크
function emailRegex(){
    let emailName = emailNameInput.value;
    let email = emailInput.value;

    let valid = false;

    // 이메일 아이디와 이하 주소가 작성된 상태에서만 진행
    if(email == null || emailName == null)
        return;

    let emailRegex = /^[\w-]+(\.[\w-]+)+$/;

    // email 형식 정규식 체크
    if(emailRegex.test(email)){
        console.log("적합");
        emailInput.classList.add("bd-color:main-5")
        valid = true;
    }
    else{
        console.log("부적합 이메일 형식이 아님");
        emailInput.classList.remove("bd-color:main-5")
    }

    return valid;
}


changeSection.addEventListener('keyup', function(e) {

    if(e.target == emailNameInput){
        e.target.classList.add("bd-color:accent-1")
        return;
    }
    e.target.classList.add("bd-color:main-5")

    if(emailSelect.value != "self")
        emailSelect.querySelector(".inputSelected").selected = true;
        
    // 정규식 체크
    if(emailRegex()){
        emailInput.classList.remove("bd-color:accent-1")
        emailInput.classList.add("bd-color:main-5")
    }else{
        emailInput.classList.remove("bd-color:main-5")
        emailInput.classList.add("bd-color:accent-1")
    }

    // 중복확인 필요
    isEmailValid = false;
})



// 이메일 중복확인
checkEmailBtn.onclick = async function(e){
    e.preventDefault();

    // 정규식 체크
    if(!emailRegex()){
        alert("이메일을 정확히 적어주세요");
        return;
    }

    let emailName = emailNameInput.value;
    let email = emailInput.value;

    // 이메일 아이디와 이하 주소가 작성된 상태에서만 진행
    if(email == '' || emailName == ''){
        alert("이메일을 정확히 적어주세요");
        return;
    }
    
    let emailId = emailName+"@"+email;

    await fetch("/api/user/emailCheck?email="+emailId)
        .then((response)=>response.json())
        .then((data)=>{
            if(data == 0){
                alert("사용 가능한 이메일입니다.")
                emailNameInput.classList.add("bd-color:main-5")
                isEmailValid = true;
            }
            else{
                alert("중복된 이메일입니다.")
                isEmailValid = false;
            }
        })
}

// =======================================================================

// =======================================================================

