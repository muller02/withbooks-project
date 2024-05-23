// 체크박스 클릭 시 애니메이션
{
    let checkInput = document.querySelector(".check-input");

    checkInput.onchange = (e)=>{
        e.target.parentNode.classList.toggle("checked");
    }

}