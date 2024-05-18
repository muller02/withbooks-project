window.addEventListener("load", function () {
    const searchSection = this.document.querySelector("#search-form");
    const searchForm = searchSection.querySelector("form");
    const resetBtn = searchSection.querySelector(".reset-btn");
    const userId = searchSection.querySelector("input[name=id]");
    const nickname = searchSection.querySelector("input[name=nickname]");
    const email = searchSection.querySelector("input[name=email]");
    const birthyear = searchSection.querySelector("input[name=birthyear]");
    const startDate = searchSection.querySelector("input[name=start-date]");
    const endtDate = searchSection.querySelector("input[name=end-date]");
    const genders = searchSection.querySelectorAll("input[name=gender]");
    const statuses = searchSection.querySelectorAll("input[name=status]");

    let changeStartDate;
    let changeEndDate;

    // 등록일 조건검색에서 시작날짜가 마침날짜보다 큰 경우를 선택했을 경우 처리
    function validRegDate(e) {
        if (changeEndDate != null && changeStartDate > changeEndDate) {
            alert("시작날짜가 마침날짜보다 큽니다.");
            e.target.value = "";
        }
    }

    // 시작일 바꾸는 부분
    startDate.onchange = function (e) {
        changeStartDate = e.target.value;

        validRegDate(e);
    };

    // 마침일 바꾸는 부분
    endtDate.onchange = function (e) {
        changeEndDate = e.target.value;

        validRegDate(e);
    };
});
