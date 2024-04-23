
// 카테고리 검색  클릭 시 모달창 표시
window.addEventListener("load", function (e){
 const searchBtn=document.querySelector("#search-btn");
 const searchBox=document.querySelector(".search-box");
 const  categorySection=document.querySelector("#category");
    const initIcon=categorySection.querySelector(".init-icon");
 const categoryList = categorySection.querySelector(".category-list");
 const inputCheckBox = categoryList.querySelectorAll("input[type='checkbox']");


    let categoryIdArr = []; // categoryId를 누적으로 저장하는 배열


searchBtn.onclick=function (e){
  searchBox.classList.toggle("d:none");

    if (searchBtn.classList.toggle("icon:plus")) {
        searchBtn.classList.remove("icon:minus");
        searchBtn.classList.add("icon:plus");
    } else {
        searchBtn.classList.remove("icon:plus");
        searchBtn.classList.add("icon:minus");
    }
}

// reset 아이콘 클릭시 모든 checkbox false 상태로 변환
initIcon.onclick = async function (e) {

    for (let i of inputCheckBox) {
        i.checked = false;
    }


    categoryIdArr.length =0;

    //비동기 fetch 메소드 호출 및 GET 통신
    let response = await getByParams(categoryIdArr,null);

    // 위드 리스트를 받아옴
    let list = await response.json();


    updateHTML(list);


}

        // 체크박스 클릭시 그에 해당하는 value를 가지고온다 e.target을 통해



        // 가지고 온 value값을 배열에 담아준다 .

        // locahostL8080/ ? c=2&c=3&c=4

        //문자열 결합



    window.addEventListener("click", async (e) => {


        if (e.target.nodeName !== "INPUT")
            return;


        // 이거는 체크 박스 클릭하면 넣고 아니면 뺴기
        let categoryId = e.target.value;
        if (e.target.checked) {
            categoryIdArr.push(e.target.value);
        } else {
            categoryIdArr = categoryIdArr.filter(item => item !== categoryId);
        }

        console.log(categoryIdArr);


        let queryTmp = '';

        for(let i=0; i<categoryIdArr.length; i++){

            queryTmp +=categoryIdArr[i];
            // c?=2 &c=
            if (i < categoryIdArr.length - 1) {
                queryTmp += '&c='
            }
        }


        //비동기 fetch 메소드 호출 및 GET 통신
        let response = await getByParams(categoryIdArr,queryTmp);

        // 위드 리스트를 받아옴
        let list = await response.json();




        updateHTML(list);


        console.log(queryTmp);
    })

})


//
function getByParams(categoryIdArr,queryTmp) {
    let url;
    if (categoryIdArr===null || categoryIdArr.length === 0) {
         url = `/api/with`;
    } else {
         url = `/api/with?c=${queryTmp}`;
    }


    // const method = "GET";
    return fetch(url);
}




function updateHTML(list){
    const withListUl = document.querySelector(".with-list-ul")

    withListUl.innerHTML=``;
    for(let item of list){
        let categoryHtml = '';

        for(let category of item.categoryNames){
            categoryHtml += `<li class="border bd-color:base-3 border-radius:11 fs:1 pl:3 pr:3 pt:1 pb:1 background-color:main-6 fl-shrink:0">
                        <span class="color:base-1">${category}</span>
                          </li>`;

        }

        let innerHtml =`
       
             <li
            class="d:flex with-ul gap:2 flex-direction:column n-item:shadow"
   
          >
            <ul class="d:flex gap:1 flex-wrap:wrap">
              <li
                class="border bd-color:base-2 border-radius:11 fs:1 pl:3 pr:3 pt:1 pb:1 mr:2"
              >
                <span class="" 
                  >${item.faceYn ==1 ? '대면' : '비대면' }</span
                >
              </li>
              ${categoryHtml}
            </ul>
            <div class="d:flex pt:1 gap:5">
              <!--            th:with img-->
              <div
                class="w:2 h:2 box-shadow border-color:base-2 border-radius:3 my:auto flex-shrink:0"
              >
                <img
                  src="/image/with/puppy2.png"
     
                  class="w:100p h:100p border-radius:3"
                />
              </div>

              <div class="d:flex gap:1 flex-direction:column flex-grow:1">
                <div class="fs:6 fw:3 mb:2">
                  <a
   
        
                  >
                   ${item.name}</a
                  >
                </div>
                <div class="d:flex ai:center gap:1 ai:center">
                  <div class="d:flex ai:center">
                    <span class="icon icon:chat_circle icon-size:2"></span>
                    <span
                      class="fs:2 color:base-5 ml:1"
       
                      >${item.memberCnt}명/${item.personnel}명</span
                    >
                  </div>
                  <!--            <span>·</span>-->
                  <div class="d:flex ai:center">
                    <span class="icon icon:chat_circle icon-size:2"></span>
                    <span
                      class="fs:2 color:base-5 ml:1"
     
                      >${item.location}</span
                    >
                  </div>
                  <!--            <span>·</span>-->
                </div>

                <div class="d:flex ai:center">
                  <span class="icon icon:chat_circle icon-size:2"></span>
                  <span
                    class="fs:2 color:base-5 ml:1"
        
                    >${item.location}</span
                  >
                </div>
                <div class="ln-clamp:3">
                  <span class=" " >
                        ${item.intro}
                  </span>
                </div>
              </div>
            </div>
          </li>
       `


        withListUl.insertAdjacentHTML("beforeend",innerHtml);
    }

}