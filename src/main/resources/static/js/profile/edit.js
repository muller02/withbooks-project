////////////////// 프로필이미지 선택 시 썸네일 변경 ////////////////////
{
    let profileImg = document.querySelector(".profile-img");
    let profileImgInput = document.querySelector(".profile-img-input");
    
    profileImgInput.oninput = (e)=>{
        let file = e.target.files[0];
        let fileReader = new FileReader();

        fileReader.onload = (e)=>{
            profileImg.src = e.target.result;
        };

        fileReader.readAsDataURL(file);
    }
}


////////////////// 회원탈퇴 모달창 이벤트 ////////////////////
{
    let withdrawalLink = document.querySelector(".withdrawal-link");
    let withdrawalModal = document.querySelector(".withdrawal-modal");
    let withdrawalCancelBtn = withdrawalModal.querySelector(".withdrawal-cancel-btn");

    // 로그아웃 링크 눌렀을 시
    withdrawalLink.onclick = (e)=>{
        e.preventDefault();
        withdrawalModal.classList.remove("d:none");
    };

    // 로그아웃 모달창에서 취소 버튼 눌렀을 시
    withdrawalCancelBtn.onclick = (e)=>{
        withdrawalModal.classList.add("d:none");
    };


}