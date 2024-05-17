window.addEventListener("load", function(e) {
    let bookIntro = document.querySelector(".book-intro");
    let bookIntroDiv = bookIntro.querySelector(".book-intro-div");
    let countImg = bookIntroDiv.querySelectorAll("img");
    let currentIndex = 0; // 초기값을 0으로 설정
    let moveLen = -460; // 이미지의 너비로 이동 거리 설정
    let intervalId;

    function slideNextImage() {
        currentIndex = (currentIndex + 1) % countImg.length; // currentIndex를 다음 이미지로 갱신
        bookIntroDiv.style.transform = `translateX(${moveLen * currentIndex}px)`;

        if (currentIndex === 0) {
            setTimeout(() => {
                bookIntroDiv.classList.remove("effect");
                bookIntroDiv.style.transform = `translateX(0px)`;
            }, 0);
        }
        bookIntroDiv.classList.add("effect");
    }

    function startSlide() {
        intervalId = setInterval(slideNextImage, 3000);
    }

    function stopSlide() {
        clearInterval(intervalId);
    }

    bookIntroDiv.addEventListener("mouseenter", stopSlide);
    bookIntroDiv.addEventListener("mouseleave", startSlide);

    // 슬라이드 조건 확인
    function checkSlideCondition() {
        if (window.innerWidth <768) {
            moveLen = -460; // 기본 이동 거리
            startSlide();
        } else if (window.innerWidth >= 768) {
        
            moveLen = -1200; // 1200px 이상일 때 이동 거리
            startSlide();
        } else {
            moveLen = -460; // 기본 이동 거리
            startSlide();
        }
    }

    // 초기화할 때 슬라이드 조건 확인
    checkSlideCondition();

    // 윈도우 크기 변경 감지하여 슬라이드 조건 확인
    window.addEventListener("resize", function() {
        stopSlide()

        checkSlideCondition(); // 조건 재확인
    });
});

document.addEventListener('DOMContentLoaded', function() {

    var scrollAmount = 310; // 스크롤 이동 거리

    document.querySelectorAll('.scroll-box').forEach(function(scrollBox) {
        scrollBox.addEventListener('wheel', function(event) {
            if (event.deltaY > 0) {
                scrollBox.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            } else {
                scrollBox.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            }
            event.preventDefault();
        });
    });
});


