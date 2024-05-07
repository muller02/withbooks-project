// default 오브젝트
export default{
    data() {
      return {
        book: {
            id: 0,
            cover:"",
            title:"",
            author:"",
            categoryName:"",
            isbn13:"",
            pubDate:"",
            publisher:"",
            price:0,
            description:"",
            purchaseLink:"",
            publicYn:""
          }
      }
    },
    methods:{
      async getDetail(id){
        let url = "/api/book/detail?id="+id;
        let response = await fetch(url);
        let book = await response.json();
        console.log(book);
        this.book = book;
      }
    },
    template:
      `
      <div class="d:flex pos:relative">
      <h1 class="d:none">디테일</h1>
        <div class="d:flex fl-dir:column">
            <div class="">
                <img class="w:3 h:5 bd-radius:2" src="" alt="" th:src="${book.cover}">
            </div>
            <div>
                <label class="d:flex jc:center color:main-6 cursor:pointer">
                    이미지 변경
                    <input class="d:none bd w:3" type="file">
                </label>
            </div>
        </div>

        <span class="ml:6 w:10p">
            <span class="d:flex">
                <div>
                    <div><b>ID</b> : <span th:text="${book.id}"></span></div>
                </div>

                <div class="ml:auto">
                    <div><b>카테고리</b> : <span th:text="${book.categoryName}"></span></div>
                </div>

                <div class="ml:auto">
                    <div><b>제목</b> : <span th:text="${book.title}"></span></div>
                </div>

                <div class="ml:auto">
                    <div><b>저자</b> : <span th:text="${book.author}"></span></div>
                </div>
            </span>

            <span class="d:flex mt:3">
                <div><b>ISBN13</b> : <span th:text="${book.isbn13}"></span></div>
                <div class="ml:auto"><b>출판일</b> : <span th:text="${book.pubDate}"></span></div>
                <div class="ml:auto"><b>출판사</b> : <span th:text="${book.publisher}"></span></div>
            </span>
            
            <div class="d:flex mt:3 ai:center">
                <label class="w:1"><b>가격</b></label>
                <input class="bd bd-radius:2 w:10p pl:3 py:1" th:value="${book.price}"></input>
            </div>

            <div class="d:flex mt:3">
                <label class="w:1"><b>설명</b></label>
                <textarea class="bd bd-radius:2 w:10p pl:3 py:1" th:utext="${book.description}"></textarea>
            </div>

            <div class="d:flex mt:3">
                <label class="w:2"><b>구매링크</b></label>
                <input class="bd bd-radius:2 w:10p pl:3 py:1" th:value="${book.purchaseLink}"></input>
                
                <div class="d:flex jc:center ai:center"><a href="" th:href="${book.purchaseLink}" class="icon icon:share_fat ml:2">링크</a></div>
            </div>

            
            <div class="d:flex mt:3">
                <label class="none-active">베스트셀러(Y/N) </label>
                <input class="ml:3" type="checkbox" th:checked="${book.publicYn} == 1">
            </div>

            <div class="d:flex mt:3">
                <label class="none-active">공개 </label>
                <input class="ml:3" type="checkbox" th:checked="${book.publicYn} == 1">
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

      `
  }