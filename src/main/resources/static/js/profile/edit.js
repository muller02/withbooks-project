
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