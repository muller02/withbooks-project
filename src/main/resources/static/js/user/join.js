const form = document.querySelector("#form");
// onChange 들어갈 섹션
const changeSection = form.querySelector("#change-section");
// 이메일 중 @ 앞단
const emailNameInput = form.querySelector("input[name='email']")
// 이메일 중 @ 뒷단
const emailInput = form.querySelector("input.inputEmail")
// 이메일 중 @ 뒷단 select box
const emailSelect = form.querySelector("select[name='address']");
// 이메일 중복확인 버튼
const checkEmailBtn = form.querySelector(".check-email");

// 이메일 valid 출력 span
// 중복확인 필요
const emailCheckedSpan = form.querySelector(".email-checked");
// 사용가능
const emailVaildSpan = form.querySelector(".email-valid");


// 비밀번호 input
const passwordSection = form.querySelector(".password-section");
const passwordInput = passwordSection.querySelector(".pass");
const passwordCheckInput = passwordSection.querySelector(".pass-check");

// 비밀번호 valid 출력 span
const passwordInvalidSpan = passwordSection.querySelector(".password-invaild");
const passwordRegexSpan = passwordSection.querySelector(".password-regex");

// 닉네임 input
const nicknameInput = form.querySelector("input[name='nickname']");
// 닉네임 valid 출력 span
const nicknameValidSpan = form.querySelector(".nickname-vaild");

// submit 버튼
const submitBtn = form.querySelector("button#submit-btn");

// 중복확인 여부
let isEmailValid = false;
// 비밀번호 확인
let isValidPassword = false;
// 닉네임 확인
let isCheckedNickname = false;

// =======================================================================
// 이메일 관련

// 이메일 주소 설정 select 박스
emailSelect.onchange = function(e){
    // onchange 전파 방지
    e.stopPropagation();

    // select박스에서 선택한 value
    let optionValue = e.target.value;

    // email 직접 입력이 아닌 경우
    // 개발자가 완성해둔 이메일을 사용하므로 input value 값 설정
    if(optionValue != "직접 입력"){
        emailInput.value = e.target.value;
        emailInput.focus();
    }

    // email 정규식 검증 전
    emailInput.classList.remove("bd-color:accent-1") // 빨간색 없애고
    emailInput.classList.add("bd-color:main-5") // 파란색으로 라인색상

    // 정규식 검증
    if(emailRegex())
        // 정규식에 적합한 경우 중복확인필 메시지 출력
        emailCheckedSpan.classList.remove("d:none");
    else
        // 정규식에 적합하지 않은 경우 메시지 삭제
        emailCheckedSpan.classList.add("d:none");

    // 중복확인 필요
    isEmailValid = false;
}

// email 정규식 체크 function
function emailRegex(){
    // email 앞단 ex) withbooks
    let emailName = emailNameInput.value;
    // email 뒷단 ex) gmail.com
    let email = emailInput.value;

    // eamil 정규식 검증 결과 return 값 전역 설정
    let valid = false;

    // email 주소가 작성된 상태에서만 진행
    if(email == null || emailName == null)
        return;

    // email 앞단은 검증하지 않고 뒷단만 검증
    // ex) gmail.com
    let emailRegex = /^[\w-]+(\.[\w-]+)+$/;

    // email 형식 정규식 체크
    if(emailRegex.test(email)){
        // 정규식에 적합한 경우 중복체크 메시지 출력
        emailCheckedSpan.classList.remove("d:none");
        // 사용가능 파란색 라인색상 출력
        emailInput.classList.add("bd-color:main-5")
        
        // return 값 true
        valid = true;
    }
    else{
        // 적합하지 않은 경우
        // 중복체크 메시지 삭제
        emailCheckedSpan.classList.add("d:none");
        // 사용불가 파란색 라인색상 삭제
        emailInput.classList.remove("bd-color:main-5")
    }

    // 검증 결과에 따른 boolean 값 return
    return valid;
}

// email 입력 앞단&뒷단 input에 입력이 들어간 경우
changeSection.addEventListener('keyup', function(e) {

    // 이전에 중복체크를 한 경우
    // 메시지 출력 전부 삭제 후 진행 ( 정규식 검증 전 )
    emailVaildSpan.classList.add("d:none");
    emailCheckedSpan.classList.add("d:none");

    // email 앞단 ( withbooks )을 입력한 경우
    if(e.target == emailNameInput){
        // 새로 입력하였거나 수정한 경우 빨간색 라인
        e.target.classList.add("bd-color:accent-1")
        // 중복체크가 필요하므로 전역 valid = false 처리
        isEmailValid = false;

        return;
    }

    // email 뒷단 직접 입력하는 경우 select 박스로 '직접 입력'으로 변경
    if(emailSelect.value != '')
        emailSelect.querySelector(".inputSelected").selected = true;

        
    // 정규식 체크
    if(emailRegex()){
        // 사용가능하다는 파란색 보더 색상주기
        emailInput.classList.remove("bd-color:accent-1");
        emailInput.classList.add("bd-color:main-5");

        // 메시지 출력 변경
        emailVaildSpan.classList.add("d:none");
        emailCheckedSpan.classList.remove("d:none");
    }else{
        // 사용불가 빨간색 보더 색상
        emailInput.classList.remove("bd-color:main-5")
        emailInput.classList.add("bd-color:accent-1")

        // 메시지 출력 삭제
        emailCheckedSpan .classList.add("d:none");
        emailVaildSpan.classList.add("d:none");
    }

    // 중복확인 필요
    isEmailValid = false;
})


// 이메일 중복확인 버튼
checkEmailBtn.onclick = function(e){
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
    emailCheckedSpan .classList.remove("d:none");
    
    let emailId = emailName+"@"+email;

    fetch("/api/user/emailCheck?email="+emailId)
    .then((response)=>response.json())
    .then((data)=>{
        if(data == 0){
            alert("사용 가능한 이메일입니다.")
            emailNameInput.classList.add("bd-color:main-5")
            emailVaildSpan.classList.remove("d:none");
            emailCheckedSpan.classList.add("d:none");
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
// password check
passwordSection.addEventListener('keyup', function(e){

    // password 정규식
    // 8자 이상 영문(대소문자 구분x) 1개 이상, 숫자 1개 이상
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    // 비밀번호 input이 하나라도 입력 안 된 경우 return;
    if(passwordInput.value =='' || passwordCheckInput.value == ''){
        passwordInput.classList.add("bd-color:accent-1");
        passwordCheckInput.classList.add("bd-color:accent-1");
        passwordInput.classList.remove("bd-color:main-5");
        passwordCheckInput.classList.remove("bd-color:main-5");
        
        passwordInvalidSpan.classList.remove("d:none");
        return;
    }

    // 비밀번호가 정규식에 맞지 않는 경우
    if(!passwordRegex.test(passwordInput.value)){
        passwordInvalidSpan.classList.add("d:none");
        passwordRegexSpan.classList.remove("d:none");
        return;
    }

    //정규식에 맞고 비번 확인이 맞는 경우
    if(passwordInput.value == passwordCheckInput.value){
        passwordInput.classList.add("bd-color:main-5");
        passwordCheckInput.classList.add("bd-color:main-5");
        passwordInput.classList.remove("bd-color:accent-1");
        passwordCheckInput.classList.remove("bd-color:accent-1");
       
        // 메시지 출력 삭제
        passwordInvalidSpan.classList.add("d:none");
        passwordRegexSpan.classList.add("d:none");
       
        isValidPassword = true;
    }
    else{
        passwordInput.classList.add("bd-color:accent-1");
        passwordCheckInput.classList.add("bd-color:accent-1");
        passwordInput.classList.remove("bd-color:main-5");
        passwordCheckInput.classList.remove("bd-color:main-5");
        
        //메시지 출력 수정
        passwordInvalidSpan.classList.remove("d:none");
        passwordRegexSpan.classList.add("d:none");
        
        isValidPassword = false;
    }
})
// =======================================================================

// =======================================================================
// nickname check

let timeout;
nicknameInput.oninput = function(){
    console.log("우엥엥");
    
    // 한글 숫자 영문대소문자 2 이상 10 이하
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,9}$/;
    
    // 입력 중에는 빨간색 색상 표시
    nicknameInput.classList.add("bd-color:accent-1");
    const nickname = nicknameInput.value;
    
    // 유효성 체크
    if(!nicknameRegex.test(nickname)){
        return;
    }
    
    clearTimeout(timeout);
    // DB 체크
    timeout = setTimeout(()=>{
        fetch("/api/user/nicknameCheck?nickname="+nickname)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            if(Number(data) == 0){
                // 유효한 경우에 메시지 출력 삭제
                nicknameValidSpan.classList.add("d:none");
                nicknameInput.classList.add("bd-color:main-5");
                nicknameInput.classList.remove("bd-color:accent-1");
                isCheckedNickname = true;
            }else{
                // 유효하지 않은 경우 메시지 출력
                nicknameValidSpan.classList.remove("d:none");
                nicknameInput.classList.add("bd-color:accent-1");
                nicknameInput.classList.remove("bd-color:main-5");
                isCheckedNickname = false;
            }
        })
    }, 500);
}
// ================================================================

// ================================================================
// submit
submitBtn.onclick = function(e){
    e.preventDefault();

    const birthDateInput = form.querySelector("input[name='birth-date']");

    // 유효성 체크 여부
    if(!isEmailValid){
        alert("이메일 중복확인 해주세요.");
        return;
    }else if(!isValidPassword){
        alert("비밀번호를 제대로 작성해주세요.");
        return;
    }else if(!isCheckedNickname){
        alert("닉네임을 제대로 작성해주세요.");
        nicknameInput.focus();
        return;
    }else if(birthDateInput.value == ''){
        alert("생년월일을 입력해주세요.");
        return;
    }

    // email 값 완성
    let emailId = emailNameInput.value+"@"+emailInput.value;
    emailNameInput.value = emailId;

    // DB POST
    const formAction = "/user/join";
    form.setAttribute("action", formAction);
    form.submit();

}
