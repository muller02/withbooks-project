import applyFont from '/js/font.js';

// 브라우저 로드 시 선택한 폰트를 checked 하기(만약 선택한 폰트가 없다면 디폴트는 'Noto Sans KR 가나다' 폰트)
{
    // 우선 기본인 'Noto Sans KR 가나다' 폰트를 checked
    let NotoSansKRInput = document.querySelector(".Noto-Sans-KR");
    NotoSansKRInput.checked = true;


    // 만약 선택한 폰트가 있다면 해당 폰트 checked
    let selectedFont = localStorage.getItem("font");

    let inputs = document.querySelectorAll("input");

    for(let input of inputs){
        let inputFont = input.dataset.font;
        
        if(inputFont == selectedFont){
            input.checked = true;
            break;
        }
    }
}

// 사용자가 폰트를 클릭하면 해당 폰트를 적용
{
    let fontList = document.querySelector(".font-list");

    fontList.onclick = (e)=>{
        let valid = e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL';
        
        if(valid){
            let selectedFont = e.target.dataset.font;
            localStorage.setItem("font", selectedFont);
            applyFont();
        }
    }

}