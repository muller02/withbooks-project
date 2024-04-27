export default function theme(){
    let theme = localStorage.getItem("theme");   

    switch (theme) {
        case 'white':
            {
                const root = document.querySelector(':root');
        
                root.style.setProperty('--background-theme-color', '#ffffff');
                
                root.style.setProperty('--color-base-1', '#ffffff');
                root.style.setProperty('--color-base-2', '#ebebeb');
                root.style.setProperty('--color-base-3', '#d6d6d6');
                root.style.setProperty('--color-base-4', '#b8b8b8');
                root.style.setProperty('--color-base-5', '#999999');
                root.style.setProperty('--color-base-6', '#7a7a7a');
                root.style.setProperty('--color-base-7', '#525252');
                root.style.setProperty('--color-base-8', '#3c3c3c');
                root.style.setProperty('--color-base-9', '#000000');
        
                root.style.setProperty('--color-main-1', '#ECF0FE');
                root.style.setProperty('--color-main-2', '#D8E0FD');
                root.style.setProperty('--color-main-3', '#C5D1FC');
                root.style.setProperty('--color-main-4', '#8BA3F8');
                root.style.setProperty('--color-main-5', '#4F74F5');
                root.style.setProperty('--color-main-6', '#2B56F3');
        
                root.style.setProperty('--color-sub-1', '#FFFFFF');
                root.style.setProperty('--color-sub-2', '#AAAABC');
                root.style.setProperty('--color-sub-3', '#495057');
                root.style.setProperty('--color-sub-4', '#0F1419');
                root.style.setProperty('--color-sub-5', '#2FB916');
                root.style.setProperty('--color-sub-6', '#9D9D9D');
            }
            break;
        case 'dark':
            {
                const root = document.querySelector(':root');
        
                root.style.setProperty('--background-theme-color', '#171A2A');
                
                root.style.setProperty('--color-base-9', '#ECF1FA');
                root.style.setProperty('--color-base-8', '#C6D6F8');
                root.style.setProperty('--color-base-7', '#9CB5F3');
                root.style.setProperty('--color-base-6', '#708EE8');
                root.style.setProperty('--color-base-5', '#4666D3');
                root.style.setProperty('--color-base-4', '#3A52A6');
                root.style.setProperty('--color-base-3', '#263158');
                root.style.setProperty('--color-base-2', '#1D2443');
                root.style.setProperty('--color-base-1', '#171A2A');
        
                root.style.setProperty('--color-main-1', '#2B56F3');
                root.style.setProperty('--color-main-2', '#4F74F5');
                root.style.setProperty('--color-main-3', '#8BA3F8');
                root.style.setProperty('--color-main-4', '#C5D1FC');
                root.style.setProperty('--color-main-5', '#D8E0FD');
                root.style.setProperty('--color-main-6', '#ECF0FE');
        
                root.style.setProperty('--color-sub-1', '#0F1419');
                root.style.setProperty('--color-sub-2', '#495057');
                root.style.setProperty('--color-sub-3', '#AAAABC');
                root.style.setProperty('--color-sub-4', '#FFFFFF');
                root.style.setProperty('--color-sub-5', '#F652A0');
                root.style.setProperty('--color-sub-6', '#4C5270');
                
            }
            break;
    }
    
    
}

theme();