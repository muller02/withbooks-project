////////////////// 로그아웃 모달창 이벤트 ////////////////////
{
    let logoutLink = document.querySelector(".logout-link ");
    let logoutModal = document.querySelector(".logout-modal");
    let logoutCancelBtn = logoutModal.querySelector(".logout-cancel-btn");


    // 로그아웃 링크 눌렀을 시
    logoutLink.onclick = (e)=>{
        e.preventDefault();
        logoutModal.classList.remove("d:none");
    };

    // 로그아웃 모달창에서 취소 버튼 눌렀을 시
    logoutCancelBtn.onclick = (e)=>{
        logoutModal.classList.add("d:none");
    };
}
