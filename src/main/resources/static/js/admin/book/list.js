window.addEventListener("load", function(){

  // ================ 쿼리 검색 ========================
  // 검색섹션
  const searchSection = this.document.querySelector("#search-section")
  const searchDiv = searchSection.querySelector(".search-div");
  // 쿼리 타입과 쿼리
  const queryType = searchDiv.querySelector("select[name='query-type']");
  const query = searchDiv.querySelector(".query");
  // submit 버튼
  const submitBtn = searchDiv.querySelector("button");

  //쿼리 입력 후 submit 버튼 눌렀을때
  submitBtn.onclick = function(e){
    e.preventDefault();

    // console.log(queryType.value);
    // console.log(query.value);
    

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
    
    
  }


});


// ================ 책 토글 ===================
{
  let bookList = document.querySelector(".book-list");

  bookList.onclick = (e)=>{
    if(e.target.classList.contains("toggle-btn")){
      let bookDetail = e.target.parentNode.parentNode.querySelector(".book-detail");
      bookDetail.classList.toggle("toggle");
    }
  }
}