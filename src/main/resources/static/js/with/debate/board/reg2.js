window.addEventListener("load", function () {
    const fileInput = document.getElementById("file-input");

    console.log(fileInput);

    let selectedFiles = [];
    let dataTransfer = new DataTransfer();

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
                const index = selectedFiles.indexOf(files[i]);
                selectedFiles.splice(index, 1);
                fileList.removeChild(item);
                updateFileInput();
            })
            deleteButton.innerText = "X";
            item.appendChild(fileName);
            item.appendChild(deleteButton);
            fileList.appendChild(item);
        }

        updateFileInput();
    })

    function updateFileInput() {
        dataTransfer.items.clear();
        selectedFiles.forEach(file => {
            dataTransfer.items.add(file);
        });
        fileInput.files = dataTransfer.files;
    }

})
