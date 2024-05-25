window.addEventListener('load', function (e) {

    // 체크박스 및 삭제모드 버튼 변수
    const roomCheckAll = document.querySelector('.room-check-all');
    const checkAllBox = roomCheckAll.querySelector("input");
    const checkBoxLabel = roomCheckAll.querySelector("span");

    console.log(checkAllBox)

    // 삭제모드로 들어가는 버튼
    const deleteBtn = roomCheckAll.querySelector(".delete-btn");

    //삭제모드에서 취소, 전체삭제 버튼
    const cancelBtn = roomCheckAll.querySelector(".cancel-btn");
    const deleteAllBtn = roomCheckAll.querySelector(".delete-all-btn");

    // 삭제 버튼 눌렀을 때
    deleteBtn.addEventListener("click", function () {
        cancelBtn.classList.toggle("d:none");
        deleteAllBtn.classList.toggle("d:none");
        deleteBtn.classList.toggle("d:none");
        checkBoxLabel.classList.toggle("d:none");

        const checkBoxes = document.querySelectorAll("input");
        checkBoxes.forEach((checkbox) => {
            checkbox.classList.remove("d:none");
        })
    });

    // 취소 버튼 눌렀을 때
    cancelBtn.addEventListener("click", function () {
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
    });

    // 토론방 선택
    checkAllBox.addEventListener("click", function () {

        const checkBoxes = document.querySelectorAll("input[type='checkbox']");
        console.log(checkBoxes);

        let checked = checkAllBox.checked;
        console.log(checked);

        checkBoxes.forEach((checkbox) => {
            checkbox.checked = checked;
        })
    });

    // 토론방 삭제
    const deleteForm = document.querySelector("#delete-form");

    deleteAllBtn.addEventListener("click", function (e) {
        console.log(e.target)
        deleteForm.action = '/debate/deleteAll';
        deleteForm.method = 'post';
        deleteForm.submit();
    })

});