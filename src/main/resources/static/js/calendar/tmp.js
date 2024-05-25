
// 아무래도 캘린더가 외부라이브러리이고, 캘린더를 화면에 생성하는 작업이 javascript로 이루어지다보니, 다 만들어 질 때까지 가다려야 함. 
// 그래서 임의의 시간인 0.2초를 기다렸다가 아래 코드 실행
setTimeout(() => {

    // "2024년 5월" 이라는 텍스트를 감싸고 있는 태그.
    let dateBox = document.querySelector("#fc-dom-1");      // 참고로 html로 만들어 지는 것이 아니라 javascript로 만들어져서, index.html에서는 찾을 수 없음. 따라서 개발자 도구로 알아봄.
    

    let date = dateBox.innerHTML;           // date = "2024년 5월"
    let yearAndMonth = date.split(" ");     // yearAndMonth = ["2024년", "5월"] 
    let year = yearAndMonth[0];             // year = "2024년"
    let month = yearAndMonth[1];            // month = "5월"



    // javascript에서 반응형(미디어 쿼리)을 가능하게 해 주는 메소드 window.matchMedia()
    const tmp = window.matchMedia("(max-width: 400px)");

    // 처음 화면이 로딩됐을 때 400px 이하라면 
    if(tmp.matches){
        dateBox.innerHTML = month;              // 기존의 "2024년 5월" 이 있던 자리에 "5월" 을 대입
        dateBox.classList.add("w:1");           // 텍스트를 감싸는 박스 dateBox에 width:1 을 줘서 크기가 안 줄어들게 하기
    }


    // 화면이 커지거나 작아졌을 때에 맞추어 바꾸기
    tmp.onchange = (e) => {
        if (e.matches) {
            dateBox.innerHTML = month;              // 기존의 "2024년 5월" 이 있던 자리에 "5월" 을 대입
            dateBox.classList.add("w:1");           // 텍스트를 감싸는 박스 dateBox에 width:1 을 줘서 크기가 안 줄어들게 하기
        } else {
            dateBox.innerHTML = year + " " + month;
            dateBox.classList.remove("w:1");
        }
    };

}, 200);