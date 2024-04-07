window.addEventListener("load", () => {

    //83Line ... 버튼들
    const dropdownButtons = document.querySelectorAll(".dropdown-btn");

    //87Line dropdownButtons 들 활성화 시 나타나는 모달
    const dropdownLists = document.querySelectorAll(".dropdown-list");

    //301Line 이미지를 담는 section
    const imgSection = document.querySelectorAll(".img-section");



    // <점점점 버튼 클릭 시 모달 창 나타나는 이벤트>

    //dropdownButtons들을 하나 씩 거내어 이벤트 '클릭' 이벤트 추가
    dropdownButtons.forEach((dropdownButton, index) => {

        dropdownButton.addEventListener("click", () => {

            //버튼이 클릭 됐을 떄 "active" 클래스가 존재하면 제거하고, 존재하지 않으면 "acteive"를 추가한다
            dropdownLists[index].classList.toggle("active")

            //모달창 왼쪽으로 -60px 이동 클래스 추가
            dropdownLists[index].classList.add("transform-x");

        });
    });


    
    // <이미지 페이징 li 클릭시, 이미지 보이는 이벤트>
    imgSection.forEach((section, index) => {


        let images = section.querySelectorAll("img");
        let li = section.querySelectorAll("li");

        //각 section에 클릭 이벤트 추가 
        section.addEventListener("click", (e) => {
            
            // 'li'가 아닌 경우 함수 종료.
            if (e.target.tagName !== "LI") return;



            // 모든 이미지를 숨깁니다. 이 과정을 통해 다음 이미지를 클릭 했을 떄, 그 전 이미지가 보이지 않음
            images.forEach(img => {
                img.classList.add("d:none");
            });


            // 클릭한 li의 인덱스를 찾습니다. Array.from(li)=> nodeList를 Array로 변경
            //변경된 Array에서 e.target의 태그의 인덱스 번호를 찾기
            let clickedIndex = Array.from(li).indexOf(e.target);


            // 클릭한 li에 해당하는 이미지를 보여주기
            images[clickedIndex].classList.remove("d:none");


        });
    });


});
