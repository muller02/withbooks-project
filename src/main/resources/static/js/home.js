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
                // 효과를 다시 추가
                setTimeout(() => {
                    bookIntroDiv.classList.add("effect");
                }, 20);
            }, 300); // 애니메이션 완료 후 효과 제거
        }
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
        stopSlide(); // 슬라이드를 멈추고 조건을 확인

        if (window.innerWidth < 768) {
            moveLen = -460; // 기본 이동 거리
        } else {
            moveLen = -1200; // 768px 이상일 때 이동 거리
        }

        // 슬라이드 위치 초기화
        bookIntroDiv.classList.remove("effect");
        bookIntroDiv.style.transform = `translateX(${moveLen * currentIndex}px)`;
        setTimeout(() => {
            bookIntroDiv.classList.add("effect");
        }, 20);

        startSlide(); // 슬라이드를 다시 시작
    }

    // 초기화할 때 슬라이드 조건 확인
    checkSlideCondition();

    // 윈도우 크기 변경 감지하여 슬라이드 조건 확인
    let resizeTimeout;
    window.addEventListener("resize", function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            checkSlideCondition(); // 조건 재확인
        }, 100);
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


