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

// 이메일 주소 설정 select 박스
emailSelect.onchange = function(e){
    e.stopPropagation();
    emailInput.value = e.target.value;
}

changeSection.onchange = function(e){

    let emailName = emailNameInput.value;
    let email = emailInput.value;

    // 이메일 아이디와 이하 주소가 작성된 상태에서만 진행
    if(email == null || emailName == null)
        return;

    emailIdInput.value = emailName+"@"+email;
    let emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

    // 이메일 형식인지 정규식 체크
    if(emailRegex.test(emailIdInput.value))
        console.log("적합");
    else
        console.log("부적합 이메일 형식이 아님");

}



// 이메일 중복확인
checkEmailBtn.onclick = async function(e){
    e.preventDefault();

    let emailName = emailNameInput.value;
    let email = emailInput.value;

    console.log(emailName,"@", email);

    // 이메일 아이디와 이하 주소가 작성된 상태에서만 진행
    if(email == '' || emailName == ''){
        alert("이메일을 정확히 적어주세요");
        return;
    }
    
    let emailId = emailName+"@"+email;

    await fetch()


}

