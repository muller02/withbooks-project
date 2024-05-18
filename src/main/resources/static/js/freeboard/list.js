// 점점점 누를 시 수정/삭제 팝업 띄우기
{
    let boardList = document.querySelector("#board-list");
    let onPopUpBox = null;
    
    boardList.addEventListener("click", function(e){
        
        // 점점점 버튼 누를 때 수정/삭제 팝업 토글
        if(e.target.classList.contains("icon:dots_three_outline_vertical_fill")){
            if(onPopUpBox != null)
                onPopUpBox.classList.add("d:none");
            
            onPopUpBox = e.target.parentNode.querySelector("ul");
            onPopUpBox.classList.toggle("d:none");
        }

        // 팝업창이 아닌 곳을 클릭했을 때 팝업창 d:none
        if(!e.target.classList.contains("pop-up-box") && !e.target.classList.contains("icon:dots_three_outline_vertical_fill")){
            if(onPopUpBox != null)
                onPopUpBox.classList.add("d:none");
        }

    });
}



// 삭제버튼 누를 시 모달창 띄우기 + 모달창에서 삭제/취소 버튼을 눌렀을 때
{

    let boardList = document.querySelector("#board-list");
    let delModalBox = document.querySelector("#del-modal-box");
    let freeBoardId = undefined;
    
    // 삭제버튼 누를 시 모달창 띄우기
    {
        boardList.addEventListener("click", function(e){
            if(e.target.classList.contains("del-btn")){
                delModalBox.classList.remove("d:none");
                freeBoardId = e.target.dataset.id;
            }
        });
    }



    // 모달창에서 삭제/취소 버튼을 눌렀을 때
    {
        let cancelBtn = delModalBox.querySelector(".cancel-btn");
        let delBtn = delModalBox.querySelector(".del-btn");

        // 삭제버튼을 눌렀을 때
        delBtn.onclick = (e)=>{
            fetch(`/api/free-boards/${freeBoardId}`, {method: "DELETE"})
                .then(response=>response.json())
                .then(data=>{
                    if(data == 1)
                        console.log("삭제 완료");
                    else
                        console.log("삭제 실패");
                });
            
            location.reload();
        }


        // 취소버튼을 눌렀을 때
        cancelBtn.onclick = (e) => {
            delModalBox.classList.add("d:none");
        }


        // 박스 바깥을 눌렀을 때
        delModalBox.onclick = (e)=>{
            if(e.target.id == "del-modal-box")
                delModalBox.classList.add("d:none");
        }

    }
}


