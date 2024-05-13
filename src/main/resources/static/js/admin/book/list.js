
window.addEventListener("load", function(){

  // ================ 쿼리 검색 ========================
  // 검색섹션
  const searchSection = this.document.querySelector("#search-section")
  const searchDiv = searchSection.querySelector(".search-div");
  // 쿼리 타입과 쿼리
  const queryTypeInput = searchDiv.querySelector("select[name='query-type']");
  const queryInput = searchDiv.querySelector(".query");
  // submit 버튼
  const submitBtn = searchDiv.querySelector("button");

  //쿼리 입력 후 submit 버튼 눌렀을때
  submitBtn.onclick = function(e){
    e.preventDefault();

    const query = queryInput.value;
    const queryType = queryTypeInput.value;

    // 해당 페이지로 이동
    window.location = 
        `list?queryType=${queryType}&query=${query}&page=1`;
  }


  // ================ 카테고리 검색 ===================
  const searchCategoryDiv = searchSection.querySelector(".search-category-div");

  // 카테고리 선택 시
  searchCategoryDiv.onclick = function(e){
    e.stopPropagation();
    const categorySpan = e.target;
    // 카테고리 span만 진행
    if(categorySpan.tagName != "SPAN")
      return;
   
    //이미 선택된 카테고리인지 체크
    let isSelected =  e.target.parentNode.classList.contains("bg-color:main-4");
    
    //categoryId 추출
    const categoryId = categorySpan.dataset.id;
    if(categoryId===undefined)
        return;
    const queryType =queryTypeInput.value;
    const query = queryInput.value;

    let locationUrl = ""; 

    //새 카테고리인지,현재 선택된 카테고리인지에 따라 url 변경
    if(isSelected)
      locationUrl = `list?queryType=${queryType}&query=${query}&page=1`;
    else
      locationUrl = `list?categoryId=${categoryId}&queryType=${queryType}&query=${query}&page=1`;

      window.location = locationUrl;
  }

});

// ================================================================================
// 행에서 detail을 가져오고, 출력할 template을 만드는 function
async function getDetail(id){
  let url = "/api/book/detail?id="+id;
  let response = await fetch(url);
  let book = await response.json();
  return book;
}

async function getBestseller(bookId){
  let url = "/api/book/bestseller?bookId="+bookId;
  let response = await fetch(url);
  let result = await response.json();
  console.log("여부 = ",result);
  return result;
}


function makeTemplate(book, bestsellerYn){

  let bestChecked = "";
  let pubChecked = "";

  // 출력 시 베스트셀러/공개유무 checked 를 위한 boolean 처리
  if(Number(bestsellerYn) > 0)
    bestChecked = "checked";

  if(Number(book.publicYn) > 0)
    pubChecked = "checked";

  console.log(book.pubDate);
  console.log(typeof book.pubDate);

  let temp = book.pubDate;
  book.pubDate = temp.substr(0, 10);

    let template = `
    <div class="d:flex pos:relative w:100p">
    <h1 class="d:none">디테일</h1>
      <div class="d:flex fl-dir:column">
          <div class="">
              <img class="w:3 h:5 bd-radius:2" src="${book.cover}">
          </div>
      </div>

      <span class="ml:6 w:10p">
          <span class="d:flex">
              <div>
                  <div><b>ID</b> : <span>${book.id}</span></div>
              </div>

              <div class="ml:auto">
                  <div><b>카테고리</b> : <span>${book.categoryName}</span></div>
              </div>

              <div class="ml:auto">
                  <div><b>제목</b> : <span>"${book.title}</span></div>
              </div>

              <div class="ml:auto">
                  <div><b>저자</b> : <span>${book.author}</span></div>
              </div>
          </span>

          <span class="d:flex mt:3">
              <div><b>ISBN13</b> : <span>${book.isbn13}</span></div>
              <div class="ml:auto"><b>출판일</b> : <span>${book.pubDate}</span></div>
              <div class="ml:auto"><b>출판사</b> : <span>${book.publisher}</span></div>
          </span>
          
          <div class="d:flex mt:3 ai:center">
              <label class="w:1"><b>가격</b></label>
              <input class="bd bd-radius:2 w:10p pl:3 py:1" value="${book.price}"></input>
          </div>

          <div class="d:flex mt:3">
              <label class="w:1"><b>설명</b></label>
              <textarea class="bd bd-radius:2 w:10p pl:3 py:1">${book.description}</textarea>
          </div>

          <div class="d:flex mt:3">
              <label class="w:2"><b>구매링크</b></label>
              <input class="bd bd-radius:2 w:10p pl:3 py:1" value="${book.purchaseLink}"></input>
              
              <div class="d:flex jc:center ai:center"><a href="${book.purchaseLink}" class="icon icon:share_fat ml:2">링크</a></div>
          </div>

          
          <div class="d:flex mt:3">
              <label class="none-active">베스트셀러(Y/N)
              <input class="ml:3" type="checkbox" onchange="bestsellerToggle(event, ${book.id})" ${bestChecked}>
              </label>
          </div>

          <div class="d:flex mt:3">
              <label class="none-active">공개
              <input class="ml:3" onchange="publicYnToggle(event, ${book.id})" type="checkbox" ${pubChecked}>
              </label>
          </div>
      </span>
      
      <span class="btn-box d:flex pos:absolute bottom:1 right:1 mb:3 mr:3">
          <div>
              <button class="n-btn n-btn-type:outline" onclick='getByISBN13(${book.isbn13})'>찾아와줘😀</button>
          </div>
          <div class="ml:6">
              <button class="n-btn" onclick="editClickHandler(event, ${book.id})">수정내용 저장</button>
          </div>
      </span>
  </div>
    `;
    return template;
}
// ================================================================================

// API를 통한 베스트셀러 설정
async function bestsellerToggle(e, bookId){
  
  // bookList.onchange를 꺼주기 위한 전파방지
  e.stopPropagation();

  let url = "/api/book/";
  let ischecked = e.target.checked;
  let string = "";

  //저장 or 삭제
  if(ischecked){
    url += "addBestseller";
    string = "베스트셀러로 저장하시겠습니까?";
  }
  else{
    url += "deleteBestseller"
    string = "베스트셀러에서 삭제하시겠습니까?";
  }
    
  url += "?bookId="+bookId;

  // 통신 및 결과 회신
  if(confirm(string))
      await fetch(url)
      .then((response)=>response.json())
      .then((result)=>{
        if(result > 0){
          alert("처리완료!");
        }
        else{
          alert("실패!");
        }
      })
  else
  // 아니오 선택 시 checked를 원래대로
    e.target.checked =! ischecked;
}

// API를 통한 공개유무 설정
async function publicYnToggle(e, bookId){
  
  // bookList.onchange를 꺼주기 위한 전파방지
  e.stopPropagation();

  let checked = e.target.checked;
  let yn = 0;

  // 0 = 숨김, 1 = 공개
  if(checked)
    yn = 1;
  else
    yn = 0;

  url = "/api/book/editPublic?bookId="+bookId+"&yn="+yn;
  // 통신 및 결과 회신
  await fetch(url)
        .then((response)=>response.json())
        .then((result)=>{
          console.log(result);
        })

  // 공개여부에 따라 아이콘 toggle
  {
      let publicYnSpan = document.querySelector(`span[data-id="${bookId}"]`);
      publicYnSpan.classList.toggle("icon:visibility");
      publicYnSpan.classList.toggle("icon-color:main-5");
      publicYnSpan.classList.toggle("icon:visibility_off");
      publicYnSpan.classList.toggle("icon-color:accent-1");
  }
}

async function editClickHandler(e, bookId){

}



// ================================================================================
// ISBN13으로 책 한권 알라딘에서 찾아오기
async function getByISBN13(isbn13){
  
  var url = "/api/book/getByISBN13?isbn13="+isbn13; // 팝업 창에 표시될 페이지의 URL
  var popupWidth = 800; // 팝업 창의 너비
  var popupHeight = 300; // 팝업 창의 높이
  var left = (window.innerWidth - popupWidth) / 2;
  var top = (window.innerHeight - popupHeight) / 2;
  var popupOptions = "width=" + popupWidth + ",height=" + popupHeight + ",top=" + top + ",left=" + left;
  
  // 팝업 창 오픈
  var popup = window.open(url, "_blank", popupOptions);
  
  // 팝업 차단을 우회하기 위한 예외 처리
  // if (popup == null || typeof(popup) === "undefined") {
  //   alert("팝업 허용 후 다시 시도해주세요.");
  //   return;
  // }

  let response = await fetch(url);
  let book = await response.json();

    // return book;
}
// ================================================================================


// ================ 책 토글 =======================================================
{
  let bookList = document.querySelector(".book-list");

  bookList.onclick = async function(e){
    if(e.target.classList.contains("toggle-btn-area")){

      // 디테일 토글
      let bookDetail = e.target.parentNode.parentNode.querySelector(".book-detail");
      bookDetail.classList.toggle("toggle");

      let bookId = bookDetail.dataset.id;

      // 토글 상태에 따라서 detail을 검색해 가져오거나, 내용을 삭제
      if(!bookDetail.classList.contains("toggle")){
        let book = await getDetail(bookId);
        let bestsellerYn = await getBestseller(bookId);
        let template = makeTemplate(book, bestsellerYn);
        // console.log(template);
        bookDetail.insertAdjacentHTML("beforeend", template);
      }else{
        bookDetail.innerHTML = '';
      }

      // 디테일 열린 행 색칠
      let bookRow = e.target.parentNode.parentNode.querySelector(".book-row");
      bookRow.classList.toggle("bg-color:main-2");
    }
  }
}



// ================ 수정 된 항목 표시 ==============================================
{
  let bookList = document.querySelector(".book-list");

  bookList.onchange = (e)=>{
    
    if(e.target.type == 'text' || e.target.type == 'textarea'){
      e.target.classList.add('bd-color:accent-3');
    }

    if(e.target.type == 'checkbox'){
      let labelClassList = e.target.parentNode.querySelector("label").classList;
      if(labelClassList.contains("none-active"))
        return;
      labelClassList.add("bd");
      labelClassList.add("bd-color:accent-3")
    }

  }
}