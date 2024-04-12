window.addEventListener("load", function () {
  let searchBook = this.document.querySelector("#search-book");
  let btn = searchBook.querySelector(".btn");
  let resultList = searchBook.querySelector(".result-list");
  let queryInput = searchBook.querySelector(".query-input");
  let inputReset = searchBook.querySelector(".input-reset");
  let formGroup = this.document.querySelector(".form-group");

  let previewPanel = formGroup.querySelector(".preview-panel");

  inputReset.onclick = function (e) {
    queryInput.value = "";
  };

  resultList.onclick = function (e) {
    // 사용자가 클릭한게 책이라면
    // .book 요소를 선택한다
    // 그 요소 안에서 h1을 찾는다
    // 찾은 h1 요소의 textContent 읽는다
    // textContent를 queryInput에 넣는다
    if (e.target.closest(".book")) {
      const book = e.target.closest(".book");
      const bookH1 = book.querySelector(".book-title");
      const bookTitle = bookH1.textContent;

      let bookId = book.getElementsByTagName("div")[0].textContent;
      queryInput.value = bookTitle;

      document.querySelector(".id-input").value = bookId;
    }

    resultList.innerHTML = "";
  };

  btn.onclick = function (e) {
    e.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    //비동기 처리
    xhr.onload = function () {
      //콜백 함수
      resultList.innerHTML = "";

      var list = JSON.parse(this.responseText);

      var bookCount = list.length;
      searchResultHtml = `<div class="mb:3 ml:2 fw:3 mt:3">검색결과 <span class="fw:3 mt:2">${bookCount} 개</span></div>`;
      resultList.insertAdjacentHTML("beforeend", searchResultHtml);

      for (book of list) {
        var sectionHTML = `<section class="book d:flex h:2 ai:center  bg-color:main-1     pl:3  item" >
                                        <h1 class="d:none">책정보</h1>
                                        <div class="d:none">${book.id}</div>
                                        <div class="w:74  mr:5 ">
                                         <img src="${book.cover}" alt="책이미지" class="h:100p w:100p">
                                         </div>
                                         <div class="d:flex jc:center flex-direction:column">
                                          <div class="fs:4 fw:3 book-title">${book.title}</div>
                                          <div class="fs:2 fw:2 mb:1">${book.author} 저</div>
                                         <div class="fs:2 color:base-7">${book.publisher}</div>
                                      <div class="fs:2 color:base-7">${book.pubDate}</div>
                                        </div>
                                    </section>`;

        resultList.insertAdjacentHTML("beforeend", sectionHTML);

        book = resultList.querySelector(".book");
        console.log(book);
      }
    };

    // false 를 붙이면 동기
    var q = queryInput.value;

    xhr.open("GET", `http://localhost:8080/api/book/list?q=${q}`);
    xhr.send();
  };
});

window.onload = function () {
  const textArea = document.querySelector(".text-area");
  const regBtn = document.querySelector(".reg-btn");
  const queryInput = document.querySelector(".query-input");

  const editer = document.querySelector("#editor");
  // <!-- Initialize Quill editor -->
  const quill = new Quill("#editor", {
    modules: {
      syntax: true,
      toolbar: "#toolbar-container",
    },
    placeholder: "여기에 입력해 주세요",
    theme: "snow",
  });

  // 글자수 제한
  const maxLength = 700;
  const restrict = document.querySelector(".restrict");

  quill.on("editor-change", (e) => {
    const length = quill.getLength();

    if (length > maxLength) {
      quill.deleteText(maxLength, length);

      restrict.classList.add("fade-out");
    } else {
      restrict.classList.remove("fade-out");
    }
  });

  // 내용이 변경될 때마다 함수 호출
  function regBtnbgColorChange() {
    // 에디터가 텍스트를 넣어주는 div안의 innerText가 빈 문자열이 아니거나, 책 검색 input이 공백이 아닐 때 실행

    const qlEditor = document.querySelector(".ql-editor > p "); // qlEditor 클래스 하위 p 선택
    let qlEditorChild = qlEditor.children; //  p의 자식 => <br>

    let existContent = qlEditorChild.item(0) === null;
    let existQuerInput = queryInput.value !== "";

    if (existContent && existQuerInput) {
      regBtn.classList.add("bg-color:main-5"); //bg-color:main-5 컬러 추가
    } else {
      regBtn.classList.remove("bg-color:main-5");
      regBtn.classList.add("bg-color:main-3");
    }
  }

  editer.addEventListener("keyup", regBtnbgColorChange); //editer에 키가 입력 될 떄 마다 함수 호출
  queryInput.addEventListener("input", regBtnbgColorChange); //editer에 키가 입력 될 떄 마다 함수 호출

  const qlEditor = document.querySelector(".ql-editor > p "); // qlEditor 클래스 하위 p 선택
  let qlEditorChild = qlEditor.children; // qlEditor의 자식들
  regBtn.onclick = function (e) {
    if (queryInput.value === "") {
      alert("책을 입력 해주세요");
      e.preventDefault();
    }

    let qlEditorChildTagName; // qlEditorChild의 tagName 을 저장 할 변수
    if (qlEditorChild.item(0) !== null) {
      qlEditorChildTagName = qlEditorChild.item(0).tagName; //qlEditor 자식들 중 첫번째 자식 br 선택
    }
    if (qlEditorChildTagName === "BR") {
      alert("내용을 입력 해주세요");
      e.preventDefault();
    }
    textArea.classList.add("ln-h:1.75");

    textArea.innerHTML = quill.getSemanticHTML();
  };
};

let imgArr = []; // 삭제 이미지 저장소

//////////////////////////////////////////////////////////
window.addEventListener("load", function () {
  var formGroup = this.document.querySelector(".form-group");
  var imgInput = formGroup.querySelector(".img-input");

  var previewPanel = formGroup.querySelector(".preview-panel");
  var imgLabel = formGroup.querySelector(".img-label");

  var previewPanel = formGroup.querySelector(".preview-panel");

  // 이미지 임시 저장소 생성 (이유 : input에 이미지를 또 넣으면 마지막 이미지로 초기화 되기 때문)
  var datatransfer = new DataTransfer();

  // 입력받은 이미지들을 처리(저장 및 img-panel에 이미지 추가)해주는 함수
  function inputImgHandler(files) {
    for (var file of files) {
      if (file.type.indexOf("image/") != 0) {
        alert("이미지만 업로드 할 수 있습니다.");
        return;
      }

      if (file.size > 100 * 1024 * 1024) {
        alert("크기는 100KB 이하만 업로드 할 수 있습니다.");
        return;
      }
    }

    for (var file of files) {
      datatransfer.items.add(file);

      // 사용자가 등록 버튼을 눌렀을 경우 최신의 이미지파일들을 submit 해야 하기 때문이다
      imgInput.files = datatransfer.files;

      var reader = new FileReader();

      reader.onload = function (e) {
        var img = document.createElement("img");
        var div = document.createElement("div");
        var deleteDiv = document.createElement("div");
        img.src = e.target.result;

        img.id = file.lastModified; //이미지 고유 값저장

        img.classList.add("h:3", "w:3", "bd-radius:3");
        previewPanel.append(div);

        div.classList.add("pos:relative", "mr:2");
        div.append(img);

        deleteDiv.classList.add(
          "pos:absolute",
          "right:1",
          "top:1",
          "w:1",
          "h:1",
          "icon",
          "icon:x"
        );
        div.append(deleteDiv);
      };

      reader.readAsDataURL(file);
    }
  }

  imgLabel.ondragleave = function (e) {
    console.log("드래그 리브");
    imgLabel.classList.remove("valid");
    imgLabel.classList.remove("invalid");
  };

  // 드래그 오버 => 사용안함
  //   imgLabel.ondragover = function (e) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     console.log("드래그 오버");

  //     var valid =
  //       e.dataTransfer &&
  //       e.dataTransfer.types &&
  //       e.dataTransfer.types.indexOf("Files") >= 0; //배열의 indexOf메소드다. 문자열의 메소드와 이름이 같아서 착각할 수 있으니 주의

  //     if (valid) imgLabel.classList.add("valid");
  //     else imgLabel.classList.add("invalid");
  //   };

  // 드래그 앤 드랍 시 처리
  imgLabel.ondrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("드래그 드랍");

    inputImgHandler(e.dataTransfer.files);
  };

  // 이미지 직접 input 시 처리
  imgInput.oninput = function (e) {
    inputImgHandler(e.target.files);
  };
});

window.addEventListener("click", function (e) {
  //삭제 버튼 클릭시 이미지 삭제

  if (!e.target.classList.contains("icon:x")) return;

  console.log(e.target);
  const deleteBtn = e.target;

  const deleteBtnParent = deleteBtn.parentNode;

  deleteBtnParent.remove();

  const img = deleteBtn.previousSibling;

  console.log(img.src);
  imgArr.push(img.src);
});

// 삭제를 누르면  src d
