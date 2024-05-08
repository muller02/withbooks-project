
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

    window.location = 
        `list?queryType=${queryType}&query=${query}&page=1`;
  }


  // ================ 카테고리 검색 ===================
  const searchCategoryDiv = searchSection.querySelector(".search-category-div");

  // 카테고리 선택 시
  searchCategoryDiv.onclick = function(e){

    const categorySpan = e.target;
    // 카테고리 span만 진행
    if(categorySpan.tagName != "SPAN")
      return;
    // console.log(e.target);
    
    //categoryId 추출
    const categoryId = categorySpan.dataset.id;
    const queryType =queryTypeInput.value;
    const query = queryInput.value;

    window.location = 
        `list?categoryId=${categoryId}&queryType=${queryType}&query=${query}&page=1`;
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

function makeTemplate(book){
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
              <label class="none-active">베스트셀러(Y/N) </label>
              <input class="ml:3" type="checkbox" checked="${book.publicYn} == 1">
          </div>

          <div class="d:flex mt:3">
              <label class="none-active">공개 </label>
              <input class="ml:3" type="checkbox" checked="${book.publicYn} == 1">
          </div>
      </span>
      
      <span class="btn-box d:flex pos:absolute bottom:1 right:1 mb:3 mr:3">
          <div>
              <button class="n-btn n-btn-type:outline">찾아와줘😀</button>
          </div>
          <div class="ml:6">
              <button class="n-btn">수정내용 저장</button>
          </div>
      </span>
  </div>
    `;
    return template;
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
        let template = makeTemplate(book);
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