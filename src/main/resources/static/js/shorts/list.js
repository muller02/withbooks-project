window.addEventListener("load", () => {
    const dropdownButtons = document.querySelectorAll(".dropdown-btn");
    const dropdownLists = document.querySelectorAll(".dropdown-list");

    dropdownButtons.forEach((dropdownButton, index) => {
        dropdownButton.addEventListener("click", () => {
            dropdownLists[index].classList.toggle("active")
            dropdownLists[index].classList.add("transform-x");  //모달창 왼쪽으로 -60px 이동
        });
    });
});
