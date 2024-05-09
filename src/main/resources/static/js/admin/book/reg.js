const listContainer = document.querySelector("#list-container");
const selectAll = listContainer.querySelector("input[name='select-all']");
const regBtn = document.querySelector(".reg-btn");

// disabled를 제외한 모든 체크박스
const checkboxes = listContainer
                .querySelectorAll("input[type='checkbox']:not(:disabled):not([name='select-all'])");

// 전체선택
selectAll.onchange = function(){
        // 선택가능한 checkbox만 뽑기
        let bool = selectAll.checked;

        // 전체선택 checkbox 상태에 따라 전부 동일하게 바꿔줌
        checkboxes.forEach((checkbox)=>{
                checkbox.checked = bool;
        });
}

// TODO 요소들이 전부 체크된 경우 전체선택 체크박스 체크



// ===================================================================
// DB에 반영
regBtn.onclick = function(){
        
        // 유효성 체크
        {
                let count = 0;
                checkboxes.forEach((checkbox)=>{
                        if(checkbox.checked)
                        count++;  
                });
                
                if(count == 0){
                        alert("등록할 책을 하나 이상 선택해주세요.");
                        return;
                }
        }

        //=====================================
        // DB에 저장
        {
                let bookArr = new Array();
                // data-set에 특수문자나 url은 정상적으로 저장되지 않음.
                // 그러므로 필요한 다른 필드값들은 직접 추출
                checkboxes.forEach((checkbox)=>{
                        if(checkbox.checked){
                                let bookDetail = checkbox.parentElement.parentElement.parentElement;
                                let cover = bookDetail.querySelector("img").getAttribute("src");
                                let pubDate = bookDetail.querySelector(".pub-date").textContent;
                                let categoryName = bookDetail.querySelector(".category-name").textContent;
                                let description = bookDetail.querySelector(".description").textContent;
                                let purchaseLink = bookDetail.querySelector(".purchase-link").textContent;

                                // categoryName, title, author, isbn13, pubDate, publisher, price, description, purchaseLink, cid
                                let book = new Book(
                                        cover,
                                        categoryName,
                                        checkbox.dataset.title,
                                        checkbox.dataset.author,
                                        checkbox.dataset.isbn13,
                                        pubDate,
                                        checkbox.dataset.publisher,
                                        checkbox.dataset.price,
                                        description,
                                        purchaseLink,
                                        checkbox.dataset.cid
                                );
                                bookArr.push(book);
                        }
                });     
                console.log(bookArr);
                console.log(bookArr.length);

                let jsonString = JSON.stringify(bookArr);

                if(confirm(`총 ${bookArr.length}개 등록하시겠습니까?`))
                        fetch('/api/book/reg', {
                                method: 'POST',
                                headers: {
                                'Content-Type': 'application/json'
                                },
                                body: jsonString
                        })
                        .then(response => response.json())
                        .then(data => {
                                console.log('서버 응답:', data);
                                alert(data+"권 등록 완료! 새로고침 합니다.")
                                history.go(0);
                        })
                        .catch(error => {
                                console.error('에러:', error);
                                alert("error!");
                        });

        }

}
//==================================================================

class Book{
        constructor(cover, categoryName, title, author, isbn13, pubDate, publisher, price, description, purchaseLink, cid){
                this.cover = cover;
                this.categoryName = categoryName;
                this.title = title;
                this.author = author;
                this.isbn13 = isbn13;
                this.pubDate = pubDate;
                this.publisher = publisher;
                this.price = price;
                this.description = description;
                this.purchaseLink = purchaseLink;
                this.cid = cid;
        }
}





// isbn13 클립보드 복사
async function copyISBN13(isbn13){
        try {
                await navigator.clipboard.writeText(isbn13)
                .then(()=>{
                        alert("클립보드 저장!");
                });

        } catch (error) {
                console.error(error.message);
        }
}

