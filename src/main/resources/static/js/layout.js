window.addEventListener("load", function (e) {
    let mainMenuDesktop = document.querySelector(".main-menu-desktop");
    let url = window.location.pathname;
    console.log(url);

    mainMenuDesktop.addEventListener("click", function (e) {
        if (e.target.nodeName !== "A")
            return;

        let target = e.target;
        let targetHref = target.getAttribute("href");

        if (targetHref === "/booklog/list") {
            // 클래스 추가
            target.classList.add("color:main-5", "icon-color:main-5");

            // 로컬 스토리지에 클래스 정보 저장
            localStorage.setItem("booklogListClass", "color:main-5,icon-color:main-5");
        }
    });

    // 페이지 로드 시 로컬 스토리지에서 클래스 정보 불러와 적용
    let booklogListClass = localStorage.getItem("booklogListClass");
    if (booklogListClass) {

        let elementBooklogList = document.querySelector('a[href="/booklog/list"]');
        elementBooklogList.classList.add(booklogListClass);
    }
});
