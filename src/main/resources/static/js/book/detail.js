
window.addEventListener("load", function (e){

    const bookMark = document.querySelector("#book-mark");

    // ============================= 북마크 클릭 동작 ===================================
    // XXX 회원인 경우에만 북마크 라벨이 나타므로 여기서는 회원체크를 하지 않아도 됨
    // 북마크 선택 시 데이터 입력 or 데이터 삭제
    bookMark.addEventListener("click",async function(e){

        const classes = bookMark.classList;
        const iconColor = "icon-color:main-5";
        
        let bookId = new URLSearchParams(window.location.search).get("id");
        let url = "/api/bookmark/";
        const add = "add?";
        const del = "delete?";
        const param = "bookId="+bookId;

        // toggle = 설정한 클래스가 없으면 추가, 있으면 삭제
        classes.toggle(iconColor);

        // toggle이 한번에 추가, 삭제를 동시에 하는 문제를 고치기 위한 prevent
        e.preventDefault();

        if(classes.contains(iconColor))
            // 비동기로 북마크 추가
            url += add;
        else
            // 비동기로 북마크 삭제
            url += del;

        console.log(url);
        const response = await fetch(url+param);
        let result = await response.json();
        console.log(result);

    })

})
