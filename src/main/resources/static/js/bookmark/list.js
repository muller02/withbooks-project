// 체크박스 및 삭제모드 버튼 변수
const bookCheckAll = this.document.querySelector(".book-check-all");
const checkAllBox = bookCheckAll.querySelector("input");
const checkBoxLabel = bookCheckAll.querySelector("span");

//삭제모드에서 취소, 전체삭제 버튼
const cancelBtn = bookCheckAll.querySelector(".cancel-btn");
const deleteAllBtn = bookCheckAll.querySelector(".delete-all-btn");

// 삭제모드로 들어가는 버튼
const deleteBtn = bookCheckAll.querySelector(".delete-btn");

// 책 리스트 섹션
const bookMarkSection = this.document.querySelector("#bookmark-section");
// 책 리스트 div
const bookMarkList = bookMarkSection.querySelector(".bookmark-list");
const inputCheckBoxes = bookMarkList.querySelectorAll("section");
console.log(inputCheckBoxes);
// 래핑 div들 -> 삭제모드 시 a링크를 가로막는 역할
const wrappingDivs = bookMarkList.querySelectorAll("section>div");

// 삭제버튼 눌렀을 때
deleteBtn.onclick = function () {
    // 취소, 전체 삭제 버튼 노출 및 삭제 버튼 숨김
    cancelBtn.classList.toggle("d:none");
    deleteAllBtn.classList.toggle("d:none");
    deleteBtn.classList.toggle("d:none");
    checkBoxLabel.classList.toggle("d:none");

    // 전체 선택 시 체크박스 뜨게 하기
    let checkboxes = document.querySelectorAll("input");
    checkboxes.forEach((checkbox) => {
        checkbox.classList.remove("d:none");
    });

    // div가 북마크를 감싸서 a링크 비활성화 시키기
    console.log(wrappingDivs);
    wrappingDivs.forEach((div) => {
        div.classList.add("wrapping");
    });

    // book-section을 눌렀을때 해당 책의 체크박스가 눌러지도록 조치
    // XXX 리팩토링 필요
    bookMarkList.onclick = function (e) {
        let section = e.target;

        // 찾은 section의 checkbox 찾기
        let checkbox = section.querySelector("input");

        // checkbox의 boolean을 찾아 반대로 대입해주기
        let tmp = checkbox.checked;
        checkbox.checked = !tmp;
    };
};

// 전체 선택 클릭 시 작동
checkAllBox.onchange = function (e) {
    // 모든 체크박스 찾기
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // 전체 선택 체크박스 checked 변경
    let checked = checkAllBox.checked;
    checked = e.target.checked;

    // 모든 체크박스들 checked 변경
    checkboxes.forEach((checkbox) => {
        checkbox.checked = checked;
    });
};

// 취소 버튼 클릭 시 작동
cancelBtn.onclick = function () {
    // 모든 체크박스 체크해제 후 숨김
    let checkboxes = document.querySelectorAll("input");
    checkboxes.forEach((checkbox) => {
        checkbox.classList.add("d:none");
        checkbox.checked = false;
    });

    // 취소 버튼 숨김
    cancelBtn.classList.toggle("d:none");
    deleteAllBtn.classList.toggle("d:none");
    deleteBtn.classList.toggle("d:none");
    checkBoxLabel.classList.toggle("d:none");

    wrappingDivs.forEach((div) => {
        div.classList.remove("wrapping");
    });
};

// 리스트의 모든 체크박스에 이벤트 대입한다
for (const c of inputCheckBoxes) {
    c.addEventListener("click", function (e) {
        const a = e.target.querySelector("input[name=ids]");
        console.log(a);
        // 현재 체크를 해제하면 전체체크박스 해체하고 리턴
        if (a.checked == true) {
            console.log("asdasd");
            checkAllBox.checked = false;
            return;
        }

        for (const cs of inputCheckBoxes) {
            // 현제체크 패스
            if (a.value == cs.querySelector("input[name=ids]").value) continue;

            // 다른체크 중에 해제된게 있으면 리턴
            if (cs.querySelector("input[name=ids]").checked == false) {
                checkAllBox.checked = false;
                return;
            }

            // 전부 체크된 상태 => 전체선택 활성화
            checkAllBox.checked = true;
        }
    });
}

deleteAllBtn.onclick = function () {
    const checkedboxes = document.querySelectorAll("input:checked");
    if (checkedboxes.length == 0) {
        alert("삭제할 책을 선택해주세요 ! ");
        return;
    }

    // const ids = new Array();
    // checkedboxes.forEach((checkbox)=>{
    //     ids.push(checkbox.value);
    // });

    // const formData = new FormData();
    // formData.append("ids", ids);

    let deleteYes = confirm("북마크를 삭제하시겠습니다 ?");
    if (deleteYes) document.querySelector("#idsForm").submit();
};
