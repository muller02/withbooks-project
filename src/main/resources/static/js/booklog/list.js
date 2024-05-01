window.addEventListener("load", function () {
    let newLogBtn = this.document.querySelector("#new-log-reg");
    let newLogBtnATag = newLogBtn.querySelector("a");
    let bookList = this.document.querySelector(".book-list");
    let bookIdList = bookList.querySelectorAll("input");

    newLogBtnATag.onclick = function () {
        // 책 아이디 로컬스토리지에 담기
        let list = {};
        let cnt = 0;

        for (const id of bookIdList) {
            list[cnt++] = id.value;
        }

        localStorage.setItem("bookids", JSON.stringify(list));

    };
});
