window.addEventListener("load", function (e) {


        let url = new URLSearchParams(location.search);
        let queryMenu = url.get('m')

        const mainMenuBarDeskTop = document.querySelector(".main-menu-bar-desktop");
        const mainMenuBarTablet = document.querySelector(".main-menu-bar-tablet")
        console.log(mainMenuBarDeskTop)

        const bookSearchD = mainMenuBarDeskTop.querySelector(".book-search");
        const bookSearchT = mainMenuBarTablet.querySelector(".book-search");

        const withD = mainMenuBarDeskTop.querySelector(".with");
        const withT = mainMenuBarTablet.querySelector(".with");

        const bookShortsD = mainMenuBarDeskTop.querySelector(".book-shorts");
        const bookShortsT = mainMenuBarTablet.querySelector(".book-shorts");

        const bookLogD = mainMenuBarDeskTop.querySelector(".booklog");
        const bookLogT = mainMenuBarTablet.querySelector(".booklog");




        if(queryMenu == 1){
                bookSearchT.classList.add("bg-color:main-2","border-radius:6","p:3");
                bookSearchT.querySelector("a").classList.add("color:main-5","icon-color:main-5")

                bookSearchD.querySelector("a").classList.add("color:main-5","icon-color:main-5");
                bookSearchD.classList.add("bg-color:main-2","border-radius:6","p:2");

        }else if(queryMenu == 2){
                withT.classList.add("bg-color:main-2","border-radius:6","p:3");
                withT.querySelector("a").classList.add("color:main-5","icon-color:main-5")

                withD.classList.add("bg-color:main-2","border-radius:6","p:3");
                withD.querySelector("a").classList.add("color:main-5","icon-color:main-5")

        }else if(queryMenu ==3 ){
                bookShortsD.classList.add("bg-color:main-2","border-radius:6","p:3");
                bookShortsD.querySelector("a").classList.add("color:main-5","icon-color:main-5")

                bookShortsT.classList.add("bg-color:main-2","border-radius:6","p:3");
                bookShortsT.querySelector("a").classList.add("color:main-5","icon-color:main-5")

        }else if(queryMenu==4){
                bookLogD.classList.add("bg-color:main-2","border-radius:6","p:3");
                bookLogD.querySelector("a").classList.add("color:main-5","icon-color:main-5")


                bookLogT.classList.add("bg-color:main-2","border-radius:6","p:3");
                bookLogT.querySelector("a").classList.add("color:main-5","icon-color:main-5")

        }


});
