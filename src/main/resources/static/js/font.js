export default function font(){
    let font = localStorage.getItem("font");   

    switch (font) {
        case 'Noto Sans KR':
            {
                const root = document.querySelector(':root');
                root.style.setProperty('--selected-font', 'Noto Sans KR');
            }
            break;

        case 'Hi Melody':
            {
                const root = document.querySelector(':root');
                root.style.setProperty('--selected-font', 'Hi Melody');
            }
            break;
    }
    
}

font();