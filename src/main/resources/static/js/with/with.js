window.addEventListener("load", function () {

    searchDiv = document.querySelector("#search-detail");
    searchBtn = document.querySelector("#search-btn");
    withlist = document.querySelector("#with-list");
    refreshBtn = document.querySelector("#refresh")


    searchBtn.onclick = function (e) {

        e.preventDefault();


        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        //비동기 처리
        xhr.onload = function () { //콜백 함수

            var list = JSON.parse(this.responseText);

            searchDiv.innerHTML = " ";


            var inHTML1 = `<section class="category d:flex fl-dir:column w:7 pl:3">
      <div class="d:flex ai:center">
        <div class="margin-right:8">카테고리</div>
        <div class="icon icon:arrows_clockwise_fill icon-size:2"></div>
      </div>
      <div class="mt:3">
        <div class="d:flex fl-wrap:wrap">
          <h1 class="d:none">카테고리 필터</h1>
        `
            searchDiv.insertAdjacentHTML("afterbegin", inHTML1);

            for (item of list) {
                var inHTML2 = `
          <label class="n-toggle n-toggle-type:outline-box m:1" >
        ${item.name}
            <input type="checkbox" class="d:none p" name="c"  value="${item.cid}" />
          </label>
          `
                searchDiv.insertAdjacentHTML("beforeend", inHTML2);
            }
            var inHTML3 = `
        </div>
      </div>
    </section>
            `


            searchDiv.insertAdjacentHTML("beforeend", inHTML3);
        }


        xhr.open("GET", `http://localhost:8080/api/category/list`);
        xhr.send();
    }


    var arr = [];
    var tmp2;

    searchDiv.addEventListener("change", function (e) {
        // checkbox = document.getElementsByClassName("p")[0];


        if (e.target.tagName != "INPUT")
            return;


        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        var c = e.target.value;
        xhr.onload = function () { //콜백 함수

            var list3 = JSON.parse(this.responseText);

            //현재 클릭한 checkbox가 true 일 경우만 insertHtml을 실행한다

            console.log(arr)

            withlist.innerHTML = ``;

            for (i of list3) {
                var innerHtml = ` <li class="d:flex h:4 gap:3 n-item:shadow ">

                <h1 class="d:none">위드 리스트</h1>


                <img data-v-01ad9008="" src="/image/with/puppy2.png"
                     class="obj-fit:cover   w:2 margin-top:10  margin-bottom:auto    border-radius:8 va:middle max-width:100p max-height:100p">

                <!-- 젤 큰박스에 사이즈 주기 -->

                <div class="d:flex flex-direction:column gap:2 fl-grow:1 pl:2 ">
                    <ul class="d:flex gap:1 flex-wrap:wrap  ">
                        <li class="border bd-color:base-3 border-radius:11 fs:1  pl:3 pr:3 pt:1 pb:1"><span class="">대면</span>
                        </li>
                        <li class="border bd-color:base-3 border-radius:11 fs:1  pl:3 pr:3 pt:1 pb:1 background-color:main-6 ">
                            <span class="\tcolor:base-1">소설</span></li>
                        <li class="border bd-color:base-3 border-radius:11 fs:1  pl:3 pr:3 pt:1 pb:1 background-color:main-6">
                            <span class=" color:base-1">인문</span>
                        </li>
                    </ul>
                    <div class="fs:5 fw:3">${i.name}</div>
                    <div class="d:flex ai:center gap:1 flex-wrap:wrap">
                        <!-- 텍스트 중앙정렬 line-height로 주기  -->
                        <div class="d:flex ">
                            <span class="icon icon:chat_circle  icon-size:2"></span>
                            <span class="fs:1 color:base-5 ml:1  ">5명/12명</span>
                        </div>
                        <span>·</span>
                        <div class="d:flex">
                            <span class="icon icon:chat_circle  icon-size:2"></span>
                            <span class="fs:1 color:base-5 ml:1">월 1회</span>
                        </div>
                        <span>·</span>
                        <div class="d:flex">
                            <span class="icon icon:chat_circle  icon-size:2"></span>
                            <span class="fs:1 color:base-5 ml:1">노고산동</span>
                        </div>
                    </div>
                    <div class=" ln-clamp:3">
                    <span class=" ">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam velit adipisci quae nisi ad possimus, 
                        dolores dolor ex quas molestias temporibus quidem aperiam cupiditate excepturi pariatur 
                        amet! Ex, sunt eius.
                    </span>

                    </div>
                    <!-- <div class="text-align:right"><a href="" class="color:base-4 fs:1">더보기></a></div> -->

                </div>


            </li>`

                withlist.insertAdjacentHTML("beforeend", innerHtml);

            }


        }


        var c = e.target.value;  //체크 박스의 카테고리 id를 저장

        if (e.target.checked == true) {  //체크박스가 클릭되면 arr에 id 저장
            arr.push(c);

        } else {  // 클릭이 false면 배열에서 요소 제거
            arr = arr.filter(function (item) {
                return item !== c;
            });

        }

        var tmp = '';
        for (k of arr) {   //list를 얻기위해 문자열 결합
            tmp += k + '&c=';
        }
        console.log('tmp = ' + tmp);

        if(arr.length==0){
            xhr.open("GET", `http://localhost:8080/api/with/list`);
            xhr.send();
        }else{
        xhr.open("GET", `http://localhost:8080/api/with/list?c=${tmp}`);
        xhr.send();
        }

    })


})