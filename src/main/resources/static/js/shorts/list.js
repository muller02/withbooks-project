

//댓글 
window.addEventListener("load", function () {

    const shortSections = document.querySelectorAll(".short-section");
    
    shortSections.forEach(shortSection => {
        const commentBtn = shortSection.querySelector(".comment-btn");
        const commentReg = shortSection.querySelector(".comment-reg");
        const commentContent = shortSection.querySelector(".comment-content");

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        commentReg.onclick = function (e) {


            //shortSection에 있는 shortsId를 가지고 온다.
            let shortsId = commentBtn.dataset.shortsId;

            //댓글 창 textarea의 value 값을 가지고 온다.
            let content = commentContent.value;


            //서버에 댓글객체를 전송하기 위해 객체를 생성한다.
            let shortsComment = {
                shortsId:shortsId,
                content:content
            };

            /* 통신에 사용 될 XMLHttpRequest 객체 정의 */
            httpRequest = new XMLHttpRequest();

           // 콜백 함수
            httpRequest.onload = () => {
            };

            /* Post 방식으로 요청 */
            httpRequest.open('POST', '/api/comments', true);
            /* Response Type을 Json으로 사전 정의 */
            httpRequest.responseType = "json";
            /* 요청 Header에 컨텐츠 타입은 Json으로 사전 정의 */
            httpRequest.setRequestHeader('Content-Type', 'application/json');
            /* 정의된 서버에 Json 형식의 요청 Data를 포함하여 요청을 전송 */

            httpRequest.send(JSON.stringify(shortsComment));
            

            // 등록한 댓글을 끝에 추가(수정 필요. 다시 로드 해 와야 함)
            // let addedContent = `
            // <div class="border-bottom pb:3 pt:6 pr:2 pl:2">
            //     <div class="pb:2 deco icon icon:dots_three_outline_vertical_fill deco-size:2 w:100p deco deco-pos:right jc:space-between mr:3 fw:3">${cmt.nickname}</div>
            //     <div class="pl:2 pr:2">${content}</div>
            // </div>`;

            // const commentGroup = shortSection.querySelector(".comment-group");
            // const comments = commentGroup.querySelector(".comments");
            // comments.insertAdjacentHTML("beforeend", addedContent);
            // commentContent.value = "";
        };

  


    })
})





window.addEventListener("load", () => {

    //83Line ... 버튼들
    const dropdownButtons = document.querySelectorAll(".dropdown-btn");

    //87Line dropdownButtons 들 활성화 시 나타나는 모달
    const dropdownLists = document.querySelectorAll(".dropdown-list");

    //301Line 이미지를 담는 section
    const imgSection = document.querySelectorAll(".img-section");

    const shortSections = document.querySelectorAll(".short-section");











    // ------------- 슬라이드-------------
    shortSections.forEach(short => {


        let pages = 0;//현재 인덱스 번호
        let positionValue = 0;//images 위치값
        const IMAGE_WIDTH = 400;//한번 이동 시 IMAGE_WIDTH만큼 이동한다.
        const nextBtn = short.querySelector(".next");
        const backBtn = short.querySelector(".back");
        const images = short.querySelector(".images");



        const imgLen = short.querySelectorAll(".images > img").length;

        if (nextBtn == null)
            return;
        nextBtn.addEventListener("click", function () {


            if (pages < imgLen - 1) {
                backBtn.removeAttribute('disabled')//뒤로 이동해 더이상 disabled가 아니여서 속성을 삭제한다.
                positionValue -= IMAGE_WIDTH;//IMAGE_WIDTH의 증감을 positionValue에 저장한다.
                images.style.transform = `translateX(${positionValue}px)`;

                //x축으로 positionValue만큼의 px을 이동한다.
                pages += 1; //다음 페이지로 이동해서 pages를 1증가 시킨다.
            }
            if (pages === imgLen - 1) { //
                nextBtn.setAttribute('disabled', 'true')//마지막 장일 때 next버튼이 disabled된다.
            }
        })

        backBtn.addEventListener("click", function () {

            console.log('dasfdsaf')
            if (pages > 0) {
                nextBtn.removeAttribute('disabled')

                positionValue += IMAGE_WIDTH;
                images.style.transform = `translateX(${positionValue}px)`;
                pages -= 1; //이전 페이지로 이동해서 pages를 1감소 시킨다.
            }
            if (pages === 0) {
                backBtn.setAttribute('disabled', 'true')//첫 장 일때 back버튼이 disabled된다.
            }
            console.log(pages);
        })




    })



    function next() {

        console.log(pages);
    }



    function init() {  //초기 화면 상태
        // backBtn.setAttribute('disabled', 'true'); //속성이 disabled가 된다.
        // backBtn.addEventListener("click", back); //클릭시 다음으로 이동한다.
    }
    init();





    // 댓글 창 관련
    shortSections.forEach(shortSection => {
        const commentBtn = shortSection.querySelector(".comment-btn");
        const commentGroup = shortSection.querySelector(".comment-group");
        const comments = commentGroup.querySelector(".comments");


        // 각 commentBtn에 클릭 이벤트를 추가합니다.
        commentBtn.addEventListener("click", function (e) {

            // 댓글의 섹션부분 삭제
            comments.innerHTML = "";


            // 비동기로 데이터 가져오기
            // e.preventDefault();
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            //비동기 처리
            xhr.onload = function () {


                var list = JSON.parse(this.responseText);


                for (cmt of list) {
                    var divHTML = `
                    <div class="border-bottom pb:3 pt:6 pr:2 pl:2">
                        <div class="pb:2 deco icon icon:dots_three_outline_vertical_fill deco-size:2 w:100p deco deco-pos:right jc:space-between mr:3 fw:3">${cmt.nickname}</div>
                        <div class="pl:2 pr:2">${cmt.content}</div>
                    </div>`;

                    comments.insertAdjacentHTML("beforeend", divHTML);


                }
            };

            // shortsid 얻어오기
            var shortsId = e.target.dataset.shortsId;

            xhr.open("GET", `http://localhost:8080/api/comments/list?shorts_id=${shortsId}`);
            xhr.send();
        });


    })





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
