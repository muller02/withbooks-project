window.addEventListener("load", function () {

    var form = this.document.querySelector(".book-search-textbox");
    var btn = form.querySelector("button");
    var input = form.querySelector("input");
    var bookContent = this.document.querySelector(".book-content");
    var item = bookContent.querySelector(".item");
    var searchCount = bookContent.querySelector(".search-count");



    // bookContent.onclick = function (e){
    //     if (e.target.tagName==="SECTION") {
    //         return;
    //     }
    //     alert('asdf');
    // }

    btn.onclick = function (e) {
        e.preventDefault();

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        //비동기 처리
        xhr.onload = function () { //콜백 함수
            var list = JSON.parse(this.responseText);
            var bookCount =list.length;


            bookContent.innerHTML = " ";
            bookContent.innerHTML =  `<div class="mb:3 ml:2 fw:3">검색결과 <span class="fw:3">${bookCount} 개</span></div>`;

            for (book of list) {

                //var book = list[0];

                var sectionHTML = `    <a href="reg?b=${book.id}&n=${book.title}"><section class="d:flex h:2 ai:center item  ml:3 pl:3 ho">
                <h1 class="d:none">책 정보</h1>
                <div class=" w:74  mr:5 ">
                    <img src="${book.cover}" alt="도둑맞은 집중력" class="w:100p h:100p  border-radius:2">
                </div>
                <div class="d:flex jc:center flex-direction:column "> 
             
                    <div class="fs:4 fw:3">${book.title}</div>
                    <div class="fs:2 fw:2 mb:1">${book.author} 저</div>
                    <div class="fs:2 color:base-7">${book.publisher}</div>
                    <div class="fs:2 color:base-7">${book.pubDate}</div>
                </div>
        
            </section></a>
               `;

                bookContent.insertAdjacentHTML("beforeend", sectionHTML);
            }


        };

        // false 를 붙이면 동기
        var q = input.value;

        xhr.open("GET", `http://localhost:8080/api/book/list?q=${q}`);
        xhr.send();
    }


})