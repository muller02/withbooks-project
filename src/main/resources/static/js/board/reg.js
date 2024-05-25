window.addEventListener("load", function () {

    const fileInput = document.getElementById("file-input");

    console.log(fileInput);


    let selectedFiles = [];

    fileInput.addEventListener("change", function (e) {

        const fileList = document.getElementById("file-list");
        console.log(fileList);

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