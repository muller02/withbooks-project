
// 체크박스 및 전체삭제 변수
const bookCheckAll = this.document.querySelector(".book-check-all");
const checkAllBox = bookCheckAll.querySelector("input");
const cancelBtn = bookCheckAll.querySelector(".cancel-btn");
const deleteBtn = bookCheckAll.querySelector(".delete-btn");

// 책 리스트 섹션과 그 안의 input들
const bookMarkSection = this.document.querySelector("#bookmark-section");
// 책 리스트 섹션 안의 모든 책들
const bookMarkLists = bookMarkSection.querySelectorAll(".bookmark-list");
const bookCheckAllInput = bookCheckAll.querySelector("input");

// 삭제버튼 눌렀을 때
deleteBtn.onclick = function(){

    // 취소 버튼 뜨게 하기
    cancelBtn.classList.remove("d:none");

    // 전체 선택 시 체크박스 뜨게 하기
    let checkboxes = document.querySelectorAll("input");
    checkboxes.forEach((checkbox)=>{checkbox.classList.remove("d:none")});

    // 모든 a링크를 못누르게 처리하고
    // let bookALinks = bookMarkSection.querySelectorAll("a");
    // bookALinks.forEach(
    //     (aLink)=>{
    //         aLink.onclick = (e)=>e.preventDefault();
    //     }
    // );
    
    // book-section을 눌렀을때 해당 책의 체크박스가 눌러지도록 조치
    // XXX 리팩토링 필요
    bookMarkSection.onclick = function(e){
        console.log(e);
        console.log(e.target);
        e.preventDefault();

    };

    // bookMarkLists.forEach((list)=>list.onclick = function(e){
        
    //     e.preventDefault();

    //     // 클릭한 책의 부모 section 찾기
    //     let clickedElement = e.target;
    //     let parentSection = clickedElement.parentElement;
        
    //     for(let i = 1 ;i<10;i++){
    //         if(parentSection.tagName == "SECTION")
    //             break;

    //         parentSection = parentSection.parentElement;
    //     }
    
    //     // 찾은 section의 checkbox 찾기
    //     let checkbox = parentSection.querySelector("input");
    
    //     // checkbox의 boolean을 찾아 반대로 대입해주기
    //     let tmp = checkbox.checked;
    //     checkbox.checked =! tmp;
    // });
};


// 전체 선택 클릭 시 작동
checkAllBox.onchange = function(e){
    // 모든 체크박스 찾기
    const checkboxes 
       = document.querySelectorAll('input[type="checkbox"]');

    // 전체 선택 체크박스 checked 변경
    let checked = checkAllBox.checked;
    checked = e.target.checked;

    // 모든 체크박스들 checked 변경
    checkboxes.forEach((checkbox)=>{checkbox.checked = checked});
  };


  // 취소 버튼 클릭 시 작동
  cancelBtn.onclick = function(){
    
    // 모든 체크박스 체크해제 후 숨김
    let checkboxes = document.querySelectorAll("input");
    checkboxes.forEach((checkbox)=>{
                    checkbox.classList.add("d:none");
                    checkbox.checked=false;});
    
    // 취소 버튼 숨김
    cancelBtn.classList.add("d:none");

    // prevented된 a링크들 되살리기..


  };


