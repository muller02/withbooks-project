
window.addEventListener('load', function (){


    //============================== SELECT OPTION ====================================

    // 셀렉트 박스 요소를 가져옴
    const selectBox = document.querySelector("select");

    // 셀렉트 박스의 변경 이벤트에 대한 함수
    selectBox.onchange = function(e){

        // 현재 페이지의 URL을 가져와서 URLSearchParams 객체 생성
        const params = new URLSearchParams(window.location.search);

        // URLSearchParams 객체를 사용하여 roomId와 topicId를 가져옴
        const roomId = params.get('rid');
        const withId = params.get('wid');
        const topicId = e.target.value;

        // roomId와 withId, topicId가 모두 유효한 경우에만 컨트롤러를 호출
        if (roomId && topicId && withId) {
            const url = `/with/debate/board/list?wid=${withId}&rid=${roomId}&tid=${topicId}`
            window.location.href = url;
        }
    }

    //==================================================================================

    //============================== NOTICE  ===========================================

    const noticeBox = document.querySelector('#notice-box');
    const openNotice = document.querySelector('#open-notice');
    const closeNotice = document.querySelector('#close-notice');

    openNotice.addEventListener("click", function(e){
        noticeBox.classList.add("active");
    })

    closeNotice.addEventListener("click", function(e){
        console.log(e.target)
        noticeBox.classList.remove("active");
    })



    //==================================================================================
})