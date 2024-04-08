window.addEventListener("load", () => {

    //83Line ... 버튼들
    const dropdownButtons = document.querySelectorAll(".dropdown-btn");

    //87Line dropdownButtons 들 활성화 시 나타나는 모달
    const dropdownLists = document.querySelectorAll(".dropdown-list");

    //301Line 이미지를 담는 section
    const imgSection = document.querySelectorAll(".img-section");

    const shortSections = document.querySelectorAll(".short-section");


    // -------------------------- 슬라이드
    let pages = 0;//현재 인덱스 번호
    let positionValue = 0;//images 위치값
    const IMAGE_WIDTH = 400;//한번 이동 시 IMAGE_WIDTH만큼 이동한다.

    const backBtn = document.querySelector(".back")
    const nextBtn = document.querySelector(".next")
    const images = document.querySelector(".images")


    console.log(shortSections);
    // 댓글 창 관련
    shortSections.forEach(shortSection => {
        const commentBtn = shortSection.querySelector(".comment-btn");
        const commentGroup = shortSection.querySelector(".comment-group");

        console.log(commentBtn);


        // 각 commentBtn에 클릭 이벤트를 추가합니다.
        commentBtn.addEventListener("click", function (e) {
            console.log('clicked');
            // 클릭 이벤트가 발생했을 때 commentGroup 요소에 "d:block" 클래스를 추가하여 보이도록 합니다.

            commentGroup.classList.toggle("d:none");
        });


    })



            function next() {
                if (pages< 3) {
                    backBtn.removeAttribute('disabled')//뒤로 이동해 더이상 disabled가 아니여서 속성을 삭제한다.
                    positionValue -= IMAGE_WIDTH;//IMAGE_WIDTH의 증감을 positionValue에 저장한다.
                    images.style.transform = `translateX(${positionValue}px)`;

                    //x축으로 positionValue만큼의 px을 이동한다.
                    pages += 1; //다음 페이지로 이동해서 pages를 1증가 시킨다.
                }
                if (pages === 2) { //
                    nextBtn.setAttribute('disabled', 'true')//마지막 장일 때 next버튼이 disabled된다.
                }
                console.log(pages);
            }

            function back() {
                if (pages > 0) {
                    nextBtn.removeAttribute('disabled')
                    positionValue += IMAGE_WIDTH;
                    images.style.transform = `translateX(${positionValue}px)`;
                    pages -= 1; //이전 페이지로 이동해서 pages를 1감소 시킨다.
                }
                if (pages === 0) {
                    backBtn.setAttribute('disabled', 'true')//마지막 장일 때 back버튼이 disabled된다.
                }
                console.log(pages);
            }

            function init() {  //초기 화면 상태
                backBtn.setAttribute('disabled', 'true'); //속성이 disabled가 된다.
                backBtn.addEventListener("click", back); //클릭시 다음으로 이동한다.
                nextBtn.addEventListener("click", next);//클릭시 이전으로 이동한다.
            }
            init();



    // -------------------------------


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
