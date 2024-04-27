import applyTheme from '/js/theme.js';

// 브라우저 로드 시 선택한 테마를 checked 하기(만약 선택한 테마가 없다면 디폴트는 white 테마)
{
    // 우선 기본인 white 테마를 checked
    let whiteInput = document.querySelector(".white");
    whiteInput.checked = true;


    // 만약 선택한 테마가 있다면 해당 테마 checked
    let selectedTheme = localStorage.getItem("theme");

    let inputs = document.querySelectorAll("input");

    for(let input of inputs){
        let inputTheme = input.dataset.theme;
        
        if(inputTheme == selectedTheme){
            input.checked = true;
            break;
        }
    }
}

// 사용자가 테마를 클릭하면 해당 테마를 적용
{
    let themeList = document.querySelector(".theme-list");

    themeList.onclick = (e)=>{
        let valid = e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL';
        
        if(valid){
            let selectedTheme = e.target.dataset.theme;
            localStorage.setItem("theme", selectedTheme);
        }
        applyTheme();
    }

}