// 점점점 누를 시 수정/삭제 팝업 띄우기
{
    let freeBoard = document.querySelector("#free-board");
    let onPopUpBox = null;
    
    freeBoard.addEventListener("click", function(e){
        
        // 점점점 버튼 누를 때 수정/삭제 팝업 토글
        if(e.target.classList.contains("icon:dots_three_outline_vertical_fill")){

            
            if(onPopUpBox == null){     // 활성화된 팝업창이 없을 때
                onPopUpBox = e.target.parentNode.querySelector("ul");
                onPopUpBox.classList.remove("d:none");
            }
            else{       // 활성화된 팝업창이 있을 때
                if(e.target.parentNode.querySelector("ul") === onPopUpBox){ // 클릭한 점점점이 활성화된 팝업창의 점점점일 때
                    onPopUpBox.classList.add("d:none");
                    onPopUpBox = null;
                }
                else{   // 클릭한 점점점이 활성화된 팝업창의 점점점이 아닐 때
                    onPopUpBox.classList.add("d:none");
                    onPopUpBox = e.target.parentNode.querySelector("ul");
                    onPopUpBox.classList.remove("d:none");
                }
            }
            
        }

        // 팝업창이 아닌 곳을 클릭했을 때 활성화된 팝업창 d:none
        if(!e.target.classList.contains("pop-up-box") && !e.target.classList.contains("icon:dots_three_outline_vertical_fill")){
            if(onPopUpBox != null){
                onPopUpBox.classList.add("d:none");
                onPopUpBox = null;
            }
        }

    });
}



// 삭제버튼 누를 시 모달창 띄우기 + 모달창에서 삭제/취소 버튼을 눌렀을 때
{

    let freeBoard = document.querySelector("#free-board");
    let delModalBox = document.querySelector("#del-modal-box");
    let freeBoardId = undefined;
    
    // 삭제버튼 누를 시 모달창 띄우기
    {
        freeBoard.addEventListener("click", function(e){
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



// 공지 토글 버튼 누를 시
{
    let noticeToggleBtn = document.querySelector(".notice-toggle-btn");
    let noticeList = document.querySelector("#notice-list");


    noticeToggleBtn.onclick = (e)=>{

        if(noticeToggleBtn.classList.contains("icon:speaker_simple_high_fill")){    // 공지가 켜져있을 때 공지를 접기
            noticeToggleBtn.classList.remove("icon:speaker_simple_high_fill");
            noticeToggleBtn.classList.add("icon:speaker_simple_slash_fill");

            noticeList.classList.toggle("d:none");
            // noticeList.classList.add("h:0");
            // noticeList.classList.add("of:hidden");
        }
        else{   // 공지가 꺼져있을 때 공지를 열기
            noticeToggleBtn.classList.remove("icon:speaker_simple_slash_fill");
            noticeToggleBtn.classList.add("icon:speaker_simple_high_fill");

            noticeList.classList.toggle("d:none");
            // noticeList.classList.remove("h:0");
            // noticeList.classList.remove("of:hidden");
        }
        // 경인이가 코드 만들어씀 >< 잘해쮜??
    }
}