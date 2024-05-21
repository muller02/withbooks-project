window.addEventListener("load", function () {
    const searchSection = this.document.querySelector("#search-form");
    const startDate = searchSection.querySelector("input[name=start-date]");
    const endtDate = searchSection.querySelector("input[name=end-date]");

    const resultSection = this.document.querySelector("#result-section");
    const checkboxAll = resultSection.querySelector("input[name=all]");
    const checkboxes = resultSection.querySelectorAll(".result-list input");

    // const searchForm = searchSection.querySelector("form");
    // const resetBtn = searchSection.querySelector(".reset-btn");
    // const userId = searchSection.querySelector("input[name=id]");
    // const nickname = searchSection.querySelector("input[name=nickname]");
    // const email = searchSection.querySelector("input[name=email]");
    // const birthyear = searchSection.querySelector("input[name=birthyear]");
    // const genders = searchSection.querySelectorAll("input[name=gender]");
    // const statuses = searchSection.querySelectorAll("input[name=status]");

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

    // 전체 체크박스 on/off
    checkboxAll.onclick = function () {
        const checkedStatus = checkboxAll.checked;

        // 전체 체크
        if (checkedStatus) {
            for (const b of checkboxes) {
                b.checked = true;
                b.closest(".result").classList.add("bg-color:main-2");
            }
        }
        // 전체 체크 해제
        else {
            for (const b of checkboxes) {
                b.checked = false;
                b.closest(".result").classList.remove("bg-color:main-2");
            }
        }
    };

    // 리스트의 모든 체크박스에 이벤트 대입한다
    for (const c of checkboxes) {
        c.onclick = function (e) {
            // 체크할 때 배경화면 색깔 주기
            e.target.closest(".result").classList.toggle("bg-color:main-2");
            // 리스트의 모든 체크박스를 돌면서
            for (const cs of checkboxes) {
                // 체크 해체된게 있으면
                if (cs.checked == false) {
                    // 전체체크 해제하고 리턴
                    checkboxAll.checked = false;
                    return;
                }
                // 전체가 체크되었으면 전체체크 체크하기
                checkboxAll.checked = true;
            }
        };
    }
});
