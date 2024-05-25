window.addEventListener("load", function(e) {

    //======================= 기존 이미지 가져오기 =====================================

    const params = new URLSearchParams(window.location.search);
    const boardId = params.get("id");

    const url = `/with/debate/board/files/${boardId}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(files => {
            // 파일을 성공적으로 가져온 경우에 대한 처리
            loadFiles(files);
        })
        .catch(error => {
            // 네트워크 오류 또는 다른 문제로 인해 파일을 가져오지 못한 경우에 대한 처리
            console.error('There was a problem with the fetch operation:', error);
        });

    function loadFiles(files) {
        const fileList = document.querySelector("#file-list");
        for(let i=0; i<files.length; i++) {
            const item = document.createElement('div');
            const fileName = document.createTextNode(files[i].originalImg);
            const deleteButton = document.createElement('button');
            deleteButton.addEventListener('click', (event) => {
                item.remove();
                event.preventDefault();
                const deleteItem = document.createElement('input');
                deleteItem.setAttribute("name", "deleteFilesId");
                deleteItem.setAttribute("value", files[i].id);
                deleteItem.setAttribute("type", "hidden");
                fileList.appendChild(deleteItem);
            });
            deleteButton.innerText="X";
            item.appendChild(fileName);
            item.appendChild(deleteButton);
            fileList.appendChild(item);
        }
    }


    //======================= 이미지 선택 =====================================

    const fileInput = document.querySelector("#file-input");
    const fileList = document.querySelector("#file-list");

    console.log(fileInput);
    console.log(fileList);

    let selectedFiles = [];

    fileInput.addEventListener("change", function (e) {

        let files = e.target.files;
        console.log(files);

        for (let i = 0; i < files.length; i++) {
            selectedFiles.push(files[i]);
            const item = document.createElement("div");
            const fileName = document.createTextNode(files[i].name);
            const deleteButton = document.createElement("button");
            deleteButton.addEventListener("click", function (e) {
                item.remove();
                e.preventDefault();
                deleteFile(files[i]);
            })
            deleteButton.innerText="X";
            item.appendChild(fileName);
            item.appendChild(deleteButton);
            fileList.appendChild(item);
        }

    })

    function deleteFile(deleteFile) {
        const inputFile = document.querySelector('input[name="files"]');
        const dataTransfer = new DataTransfer();

        // 삭제할 파일을 필터링하여 해당 파일을 제외
        selectedFiles = selectedFiles.filter(file => file!==deleteFile);

        // 필터링된 파일 목록
        selectedFiles.forEach(file => {
            // 필터링된 파일을 DataTransfer 객체의 items 에 추가
            dataTransfer.items.add(file);
        })

        // 파일 입력 요소의 파일 목록을 업데이트
        inputFile.files = dataTransfer.files;
    }
})