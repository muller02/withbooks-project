// /*
// * 1. DOMContentLoaded
// *    html 문서가 완전히 로드되고 파싱된 후 발생
// *    DOM 요소에 대한 조작이나 초기화 작업 수행에 적절, 빠름
// * 2. load
// *    모든 리소스가 로드된 후에 발생
// *    DOM 외의 다른 요소들(이미지 등)을 처리하는데 유용, 시간 소요
// * 3. window.onload
// *    모든 내용(리소스, 이미지, 하위 프레임 등)이 로드된 후에 발생
// *    페이지에 대한 모든 작업 처리에 적절 but, 가장 느림
// *
// * => 대부분의 경우엔 DOMContentLoaded 가 초기화나 조작에 가장 적합
// *    페이지 로딩 시간 단축 & 빠른 상호작용 */
// /* 유효성 검증-> DOMContentLoaded
// * 라디오 버튼 관련-> onload 적합, 사용자 경험이 더욱 부드럽
// *
// * */
//
// window.addEventListener("load", function () {
//     // 전체 등록 폼
//     const withReg = document.querySelector("#with-reg");
//     // 위드 대표 사진 첨부파일
//     const imgInput = document.querySelector("input[type='file']");
//     // 미리보기 이미지 요소
//     const preViewImg = document.querySelector(".preview-img");
//
//     // 대면/비대면 라디오 버튼 요소 가져오기
//     const faceYnRadios = document.querySelectorAll('input[type="radio"][name="faceYn"]');
//     const locationSection = document.querySelector(".location");
//
//     // 위드명 입력 인풋
//     const withNameInput = withReg.querySelector("input[name='name']");
//     // 중복검사 버튼
//     const duplicateBtn = withReg.querySelector(".duplicate-btn");
//     // 중복된 경우(기사용)
//     const duplicateTrue = withReg.querySelector(".duplicate-true");
//     // 중복되지 않은 경우(미사용)
//     const duplicateFalse = withReg.querySelector(".duplicate-false");
//
//     // 카테고리 체크박스 요소 가져오기
//     const categoryCheckboxes = document.querySelectorAll('.category-section input[type="checkbox"]');
//     // 최대 체크박스 갯수
//     const checkBoxMaxCnt = 3;
//     // 선택된 체크박스 갯수
//     let checkBoxCnt = 0;
//
//     // 토론주기 입력
//     const intervalInput = withReg.querySelector("input[name='interval']");
//     // 위드 정원 입력
//     const personnelInput = withReg.querySelector("input[name='personnel']");
//     // 위드 소개 textarea
//     const withIntro = document.querySelector("#with-intro");
//
//     // 등록 버튼
//     const submitBtn = document.getElementById("btn");
//     // 길이 알림 요소
//     const lengthAlert = document.querySelector(".length-alert");
//     // 위드 정원 알림 요소
//     const personnelAlert = document.querySelector(".personnel-alert");
//     // 토론주기 알림 요소
//     const intervalAlert = document.querySelector(".interval-alert");
//     /* ------------------------변수선언부분--------------------- */
//
//     /* 위드 이미지 미리보기 */
//     imgInput.oninput = function () {
//         const file = imgInput.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = function (e) {
//                 preViewImg.innerHTML = ""; // 기존 이미지 삭제
//                 const img = document.createElement("img");
//                 img.src = e.target.result;
//                 img.classList.add("h:3", "w:3", "border-radius:4");
//                 preViewImg.appendChild(img);
//             };
//             reader.readAsDataURL(file);
//         }
//     };
//
//     /* 대면/비대면 라디오 버튼 클릭 시, 모임장소 표시 이벤트 */
//     locationSection.style.display = "none"; // 기본 비공개
//     faceYnRadios.forEach((radio) => {
//         radio.addEventListener("click", function (e) {
//             const selectedValue = e.target.value;
//             locationSection.style.display = selectedValue === "1" ? "block" : "none";
//         });
//     });
//
//     /* 위드명 인풋 발생시, 중복 버튼 활성화 이벤트 */
//     withNameInput.addEventListener("input", () => {
//         if (withNameInput.value) {
//             duplicateBtn.classList.add("bg-color:base-7");
//             duplicateBtn.disabled = false;
//         } else {
//             duplicateBtn.classList.remove("bg-color:base-7");
//             duplicateBtn.disabled = true;
//         }
//         // 위드명 길이 체크
//         if (withNameInput.value.length < 2) {
//             lengthAlert.classList.remove("d:none");
//         } else {
//             lengthAlert.classList.add("d:none");
//         }
//     });
//
//     /* 중복확인 버튼 클릭 시 */
//     duplicateBtn.onclick = async (e) => {
//         e.preventDefault();
//
//         let withName = withNameInput.value;
//         let url = "/api/withs/check-name?n=" + withName;
//
//         await fetch(url)
//             .then((response) => {
//                 return response.text();
//             })
//             .then((data) => {
//                 checkName = data;
//             });
//
//         if (checkName === "true") {
//             duplicateTrue.classList.remove("d:none");
//             duplicateFalse.classList.add("d:none");
//         } else {
//             duplicateFalse.classList.remove("d:none");
//             duplicateTrue.classList.add("d:none");
//         }
//     };
//
//     /* 카테고리 체크박스 갯수 제한 */
//     categoryCheckboxes.forEach((checkbox) => {
//         checkbox.addEventListener("click", function () {
//             checkBoxCnt = document.querySelectorAll('.category-section input[type="checkbox"]:checked').length;
//             if (checkBoxCnt > checkBoxMaxCnt) {
//                 this.checked = false;
//             }
//         });
//     });
//
//     /* 토론주기 유효성 검사 */
//     intervalInput.oninput = function () {
//         if (parseInt(intervalInput.value) > 50) {
//             intervalAlert.classList.remove("d:none");
//         } else {
//             intervalAlert.classList.add("d:none");
//         }
//     };
//
//     /* 위드 정원 유효성 검사 */
//     personnelInput.oninput = function () {
//         if (parseInt(personnelInput.value) > 100) {
//             personnelAlert.classList.remove("d:none");
//         } else {
//             personnelAlert.classList.add("d:none");
//         }
//     };
//
//
//     /* 등록 버튼 클릭시 폼 제출 유효성 검사 */
//     submitBtn.addEventListener("click", function (e) {
//         e.preventDefault();
//
//         const isFormValid = checkFormValidity();
//         if (isFormValid) {
//             withReg.action = "/with/reg";
//             withReg.method = "post";
//             withReg.submit();
//         }
//     });
//
//     /* 위드 소개 textarea 자동 늘어지게 하는 이벤트 */
//     withIntro.addEventListener("input", function () {
//         this.style.height = "auto";
//         this.style.height = this.scrollHeight + "px";
//     });
//
//     /* 폼 유효성 검사 */
//     function checkFormValidity() {
//         let isFormValid = true;
//
//         // 중복검사 유효성 검사
//         if (!duplicateBtnValid || checkName !== "true") {
//             isFormValid = false;
//         }
//
//         // 위드명 길이 유효성 검사
//         if (withNameInput.value.length < 2) {
//             isFormValid = false;
//             lengthAlert.classList.remove("d:none"); // 길이 알림 표시
//         } else {
//             lengthAlert.classList.add("d:none");
//         }
//
//         // 위드정원 유효성 검사
//         const personnelValue = parseInt(personnelInput.value);
//         if (personnelValue < 1 || personnelValue > 100) {
//             isFormValid = false;
//             personnelAlert.classList.remove("d:none"); // 위드 정원 알림 표시
//         } else {
//             personnelAlert.classList.add("d:none");
//         }
//
//         // 토론주기 유효성 검사
//         const intervalValue = parseInt(intervalInput.value);
//         if (intervalValue < 1 || intervalValue > 50) {
//             isFormValid = false;
//             intervalAlert.classList.remove("d:none"); // 토론주기 알림 표시
//         } else {
//             intervalAlert.classList.add("d:none");
//         }
//
//         // 카테고리 체크박스 갯수 제한 유효성 검사
//         if (checkBoxCnt > checkBoxMaxCnt) {
//             isFormValid = false;
//         }
//         return isFormValid;
//     }
// });
//
// // window.addEventListener("load", function () {
// //     // 전체 등록 폼
// //     const withReg = document.querySelector("#with-reg");
// //
// //     // 대면/비대면 라디오 버튼 요소 가져오기
// //     const faceYnRadios = document.querySelectorAll('input[type="radio"][name="faceYn"]');
// //     const locationSection = document.querySelector(".location");
// //
// //     // 중복검사 버튼
// //     const duplicateBtn = withReg.querySelector(".duplicate-btn");
// //
// //     // 중복된 경우(기사용)
// //     const duplicateTrue = withReg.querySelector(".duplicate-true");
// //
// //     // 중복되지 않은 경우(미사용)
// //     const duplicateFalse = withReg.querySelector(".duplicate-false");
// //
// //     // 위드 글자수 검증(두 글자 이상)
// //     const lengthAlert = withReg.querySelector(".length-alert");
// //
// //     // 위드명 입력 인풋
// //     const withNameInput = withReg.querySelector("input[name='name']");
// //
// //     // 위드소개 부분
// //     const withIntro = document.querySelector("#with-intro");
// //
// //     // 위드정원 100이상시 알림
// //     const personnelAlert = withReg.querySelector(".personnel-alert");
// //
// //     // 토론주기 50이상시 알림
// //     const intervalAlert = withReg.querySelector(".interval-alert");
// //
// //     // for 문, checked 하기 ,
// //     const categorySection = document.querySelector(".category-section");
// //     const categoryAlert = categorySection.querySelector(".category-alert");
// //
// //     // 선택된 체크박스 갯수
// //     let checkBoxCnt = 0;
// //
// //     // 최대 체크박스 갯수는 3개
// //     const checkBoxMaxCnt = 3;
// //
// //     // 위드대표사진 첨부파일 & 미리보기
// //     const imgInput = document.querySelector("input[type='file']");
// //     const preViewImg = document.querySelector(".preview-img");
// //
// //     // 중복확인으로 유효성 통과되었는지 여부
// //     let checkName;
// //
// //     // 중복확인버튼 클릭했는지 여부
// //     let duplicateBtnValid = false;
// //
// //     // 토론주기 입력
// //     const intervalInput = withReg.querySelector("input[name='interval']");
// //
// //     // 토론주기 유효성 검사
// //     let intervalValid = false;
// //
// //     // 위드 정원 입력
// //     const personnelInput = withReg.querySelector("input[name='personnel']");
// //
// //     // 위드 정원 유효성 검사
// //     let personnelValid = false;
// //
// //     const form = document.querySelector("form");
// //     const submitBtn = document.getElementById("btn");
// //
// //     locationSection.style.display = "none";
// //
// //     /* 페이지 load 시, 대면 라디오 버튼 모임장소 표시 이벤트 */
// //     faceYnRadios.forEach((radio) => {
// //         radio.addEventListener("click", function (e) {
// //             // 선택된 라디오 버튼의 값 확인
// //             const selectedValue = e.target.value;
// //             // location 섹션의 표시 여부 결정
// //             locationSection.style.display = selectedValue === "1" ? "block" : "none";
// //         });
// //     });
// //
// //     /* 등록 버튼 클릭시 폼 제출 유효성 검사 */
// //     submitBtn.addEventListener("click", function (e) {
// //         e.preventDefault(); // 기본 동작(폼 제출) 방지
// //
// //         if (
// //             duplicateBtnValid === true &&
// //             personnelValid === true &&
// //             intervalValid === true &&
// //             checkName === "true"
// //         ) {
// //             form.action = "/with/reg";
// //             form.method = "post";
// //             form.submit();
// //         }
// //     });
// //
// //
// //     /* 위드정원 100명 이하 유효성 검사 */
// //     personnelInput.addEventListener("input", function (e) {
// //         let value = personnelInput.value;
// //         personnelValid = false;
// //         if (value >= 1 && value < 100) {
// //             personnelValid = true;
// //         } else {
// //             personnelValid = false;
// //         }
// //         console.log("valid", personnelValid);
// //     });
// //
// //     /* 토론주기 50 이하 유효성 검사 */
// //     intervalInput.addEventListener("input", function (e) {
// //         let value = intervalInput.value;
// //         intervalValid = false;
// //         if (value >= 1 && value < 50) {
// //             intervalValid = true;
// //         } else {
// //             intervalValid = false;
// //         }
// //         console.log("valid", intervalValid);
// //     });
// //
// //     /* 위드명 인풋되면 중복버튼 활성화 이벤트 */
// //     withNameInput.addEventListener("input", (e) => {
// //         // 인풋 창에 값이 있을 때, 중복검사 버튼이 활성화 되면서, 배경색 변경
// //         if (withNameInput.value) {
// //             duplicateBtn.classList.add("bg-color:base-7");
// //             duplicateBtn.disabled = false;
// //         } else {
// //             duplicateBtn.classList.remove("bg-color:base-7");
// //             duplicateBtn.disabled = true;
// //         }
// //     });
// //
// //     // 중복검사 버튼을 클릭 했을 때
// //     duplicateBtn.onclick = async (e) => {
// //         e.preventDefault();
// //
// //         let withName = withNameInput.value;
// //         let url = "/api/withs/check-name?n=" + withName;
// //
// //         await fetch(url)
// //             .then((response) => {
// //                 return response.text(); // 응답으로 json 형태가 아닌 기본형으로 반환 되는 값을 받기 위해
// //             })
// //             .then((data) => {
// //                 checkName = data; // true, false 를 반환하게 됨
// //             });
// //
// //         if (checkName === "true") {
// //             // 중복되는 경우
// //             duplicateTrue.classList.remove("d:none");
// //             duplicateFalse.classList.add("d:none");
// //         } else {
// //             // 중복되지 않는 경우
// //             duplicateFalse.classList.remove("d:none");
// //             duplicateTrue.classList.add("d:none");
// //         }
// //
// //         /* 위드명 인풋 발생시, 유효성 검사 관련 알림 모두 숨김 */
// //         withNameInput.addEventListener("input", function (e) {
// //             // 위드명의 길이가 최소 글자 수(두 글자) 미만인 경우
// //             if (withNameInput.value.length < 2) {
// //                 lengthAlert.classList.remove("d:none");
// //             } else {
// //                 lengthAlert.classList.add("d:none");
// //                 duplicateFalse.classList.remove("d:none");
// //             }
// //         });
// //
// //         /* 위드 소개 textarea 자동 늘어지게 하는 이벤트 */
// //         withIntro.addEventListener("input", function (e) {
// //             this.style.height = "auto"; // 기본 높이로 설정
// //             this.style.height = this.scrollHeight + "px"; // 스크롤의 높이 만큼 textarea 의 높이 설정
// //         });
// //
// //         /* 위드 정원 유효성 검사 */
// //         personnelInput.oninput = function (e) {
// //             if (personnelInput.value > 100) {
// //                 // 위드 정원 100 이상 시 알람 표시
// //                 personnelAlert.classList.remove("d:none");
// //             } else {
// //                 personnelAlert.classList.add("d:none");
// //             }
// //         };
// //
// //         // 토론주기 유효성 검사
// //         intervalInput.oninput = function () {
// //             if (intervalInput.value > 50) {
// //                 intervalAlert.classList.remove("d:none");
// //             } else {
// //                 intervalAlert.classList.add("d:none");
// //             }
// //         };
// //
// //         // 카테고리 체크박스 갯수 제한 3개
// //         categorySection.onclick = function (e) {
// //             if (e.target.tagName !== "INPUT") return;
// //
// //             if (e.target.checked) {
// //                 checkBoxCnt++;
// //             } else {
// //                 checkBoxCnt--;
// //             }
// //
// //             if (checkBoxCnt > checkBoxMaxCnt) {
// //                 e.target.checked = false;
// //                 checkBoxCnt--;
// //
// //                 categoryAlert.classList.remove("d:none");
// //             } else {
// //                 categoryAlert.classList.add("d:none");
// //             }
// //         };
// //
// //         /* 위드 이미지 미리보기 */
// //         imgInput.oninput = function (e) {
// //             const file = imgInput.files[0];
// //
// //             if (file.type.indexOf("image/") != 0) {
// //                 alert("이미지만 업로드 할 수 있습니다.");
// //                 return;
// //             }
// //
// //             if (file.size > 100 * 1024 * 1024) {
// //                 alert("크기는 100KB 이하만 업로드 할 수 있습니다.");
// //                 return;
// //             }
// //
// //             let reader = new FileReader();
// //             console.log(file);
// //             reader.onload = function (e) {
// //                 if (preViewImg.hasChildNodes()) {
// //                     preViewImg.removeChild(preViewImg.firstChild);
// //                 }
// //                 console.log(file);
// //
// //                 let img = document.createElement("img");
// //                 img.src = e.target.result;
// //
// //                 img.setAttribute("class", "h:3 w:3 border-radius:4");
// //
// //                 preViewImg.append(img);
// //             };
// //
// //             // 주어진 파일을 읽어들이고, 해당 파일의 내용을 Data URL 형식으로 변환하여  콜백함수에 반환
// //             reader.readAsDataURL(file);
// //         };
// //     };
// // });
//
// /* 필수 입력 항목에 대한 유효성을 검사 & 알림 */
// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.querySelector("form");
//     const submitBtn = document.getElementById("btn");
//
//     /* submitBtn 클릭 시 유효성 검사 */
//     submitBtn.addEventListener("click", function (e) {
//         e.preventDefault(); // 기본 동작인 폼 제출을 막음
//         validateForm();
//     });
//
//     /* 폼 제출 시 유효성 검사 */
//     form.addEventListener("submit", function (e) {
//         e.preventDefault(); // 기본 동작인 폼 제출을 막음
//         validateForm();
//     });
//
//     function validateForm() {
//         // 추가
//         const withForm = document.querySelector(".with-form");
//
//         let isValid = true;
//         let firstInvalidField = null; // 첫 번째 유효하지 않은 필드를 저장할 변수
//         const requiredFields = Array.from(form.querySelectorAll("[required]")); // required 속성이 지정된 모든 요소를 배열로 변환
//         requiredFields.forEach(function (field) {
//             if (
//                 (field.type === "radio" ||
//                     field.type === "checkbox" ||
//                     field.type === "select") &&
//                 !document.querySelector('input[name="' + field.name + '"]:checked')
//             ) {
//                 isValid = false;
//                 if (!firstInvalidField) {
//                     firstInvalidField = field; // 첫 번째 유효하지 않은 필드를 찾음
//                 }
//             } else if (!field.value.trim()) {
//                 // 값이 비어있는 경우엔 필수 필드로 처리
//                 isValid = false;
//                 if (!firstInvalidField) {
//                     firstInvalidField = field; // 첫 번째 유효하지 않은 필드를 찾음
//                 }
//             }
//         });
//
//         /* 유효성 검사 실패시 */
//         if (!isValid) {
//             if (firstInvalidField) {
//                 const section = firstInvalidField.closest(".n-item");
//                 section.classList.add("required-field"); // 첫 번째 유효하지 않은 필드가 속한 섹션에 하이라이팅 효과 적용
//
//                 // 입력되지 않은 필수입력 안내문구 출력
//                 let existingMsg = section.querySelector(".required-msg");
//                 // 기존 메시지가 없으면 새로운 메시지 생성 후 추가
//                 if (!existingMsg) {
//                     const requiredMsg = document.createElement("div");
//                     requiredMsg.textContent = "필수 입력 정보입니다";
//                     requiredMsg.classList.add("required-msg");
//                     section.appendChild(requiredMsg);
//                 }
//                 scrollToSection(section); // 해당 섹션으로 스크롤 이동
//             }
//         } else {
//             // 유효성 검사 통과 시 폼 제출
//             // withReg.submit();
//             withForm.submit();
//         }
//     }
//
//     /* input 이벤트 발생 시 하이라이팅 해제 */
//     form.addEventListener("input", function () {
//         const sections = form.querySelectorAll(".n-item");
//
//         sections.forEach(function (section) {
//             section.classList.remove("required-field");
//             const requiredMsg = section.querySelector(".required-msg");
//             if (requiredMsg) {
//                 section.removeChild(requiredMsg); // required-msg 요소 제거
//             }
//         });
//     });
//
//     /* 해당 섹션으로 스크롤 이동하기 */
//     function scrollToSection(section) {
//         const yOffset = -100; // 섹션 위치 위로 100px 이동
//         const y = section.getBoundingClientRect().top + window.scrollY + yOffset; // DOM 내장 메서드로 섹션 현재 위치 파악 + 현재위치 + 최종스크롤 위치
//         window.scrollTo({top: y, behavior: "smooth"});
//     }
// });
//
//
// /* 위드 모임장소 select box 표시 */
// let area1Num = [
//     "서울",
//     "부산",
//     "대구",
//     "인천",
//     "광주",
//     "대전",
//     "울산",
//     "강원",
//     "경기",
//     "경남",
//     "경북",
//     "전남",
//     "전북",
//     "제주",
//     "충남",
//     "충북",
// ];
// let area1Name = [
//     "서울",
//     "부산",
//     "대구",
//     "인천",
//     "광주",
//     "대전",
//     "울산",
//     "강원",
//     "경기",
//     "경남",
//     "경북",
//     "전남",
//     "전북",
//     "제주",
//     "충남",
//     "충북",
// ];
//
// // area2는 시군구
// let area2Num = [];
// let area2Name = [];
//
// area2Num["강원"] = [
//     "강릉시",
//     "동해시",
//     "삼척시",
//     "속초시",
//     "원주시",
//     "춘천시",
//     "태백시",
//     "고성군",
//     "양구군",
//     "양양군",
//     "영월군",
//     "인제군",
//     "정선군",
//     "철원군",
//     "평창군",
//     "홍천군",
//     "화천군",
//     "횡성군",
// ];
// area2Name["강원"] = [
//     "강릉시",
//     "동해시",
//     "삼척시",
//     "속초시",
//     "원주시",
//     "춘천시",
//     "태백시",
//     "고성군",
//     "양구군",
//     "양양군",
//     "영월군",
//     "인제군",
//     "정선군",
//     "철원군",
//     "평창군",
//     "홍천군",
//     "화천군",
//     "횡성군",
// ];
//
// area2Num["경기"] = [
//     "고양시 덕양구",
//     "고양시 일산구",
//     "과천시",
//     "광명시",
//     "광주시",
//     "구리시",
//     "군포시",
//     "김포시",
//     "남양주시",
//     "동두천시",
//     "부천시 소사구",
//     "부천시 오정구",
//     "부천시 원미구",
//     "성남시 분당구",
//     "성남시 수정구",
//     "성남시 중원구",
//     "수원시 권선구",
//     "수원시 장안구",
//     "수원시 팔달구",
//     "시흥시",
//     "안산시 단원구",
//     "안산시 상록구",
//     "안성시",
//     "안양시 동안구",
//     "안양시 만안구",
//     "오산시",
//     "용인시",
//     "의왕시",
//     "의정부시",
//     "이천시",
//     "파주시",
//     "평택시",
//     "하남시",
//     "화성시",
//     "가평군",
//     "양주군",
//     "양평군",
//     "여주군",
//     "연천군",
//     "포천군",
// ];
// area2Name["경기"] = [
//     "고양시 덕양구",
//     "고양시 일산구",
//     "과천시",
//     "광명시",
//     "광주시",
//     "구리시",
//     "군포시",
//     "김포시",
//     "남양주시",
//     "동두천시",
//     "부천시 소사구",
//     "부천시 오정구",
//     "부천시 원미구",
//     "성남시 분당구",
//     "성남시 수정구",
//     "성남시 중원구",
//     "수원시 권선구",
//     "수원시 장안구",
//     "수원시 팔달구",
//     "시흥시",
//     "안산시 단원구",
//     "안산시 상록구",
//     "안성시",
//     "안양시 동안구",
//     "안양시 만안구",
//     "오산시",
//     "용인시",
//     "의왕시",
//     "의정부시",
//     "이천시",
//     "파주시",
//     "평택시",
//     "하남시",
//     "화성시",
//     "가평군",
//     "양주군",
//     "양평군",
//     "여주군",
//     "연천군",
//     "포천군",
// ];
//
// area2Num["경남"] = [
//     "거제시",
//     "김해시",
//     "마산시",
//     "밀양시",
//     "사천시",
//     "양산시",
//     "진주시",
//     "진해시",
//     "창원시",
//     "통영시",
//     "거창군",
//     "고성군",
//     "남해군",
//     "산청군",
//     "의령군",
//     "창녕군",
//     "하동군",
//     "함안군",
//     "함양군",
//     "합천군",
// ];
// area2Name["경남"] = [
//     "거제시",
//     "김해시",
//     "마산시",
//     "밀양시",
//     "사천시",
//     "양산시",
//     "진주시",
//     "진해시",
//     "창원시",
//     "통영시",
//     "거창군",
//     "고성군",
//     "남해군",
//     "산청군",
//     "의령군",
//     "창녕군",
//     "하동군",
//     "함안군",
//     "함양군",
//     "합천군",
// ];
//
// area2Num["경북"] = [
//     "경산시",
//     "경주시",
//     "구미시",
//     "김천시",
//     "문경시",
//     "상주시",
//     "안동시",
//     "영주시",
//     "영천시",
//     "포항시 남구",
//     "포항시 북구",
//     "고령군",
//     "군위군",
//     "봉화군",
//     "성주군",
//     "영덕군",
//     "영양군",
//     "예천군",
//     "울릉군",
//     "울진군",
//     "의성군",
//     "청도군",
//     "청송군",
//     "칠곡군",
// ];
// area2Name["경북"] = [
//     "경산시",
//     "경주시",
//     "구미시",
//     "김천시",
//     "문경시",
//     "상주시",
//     "안동시",
//     "영주시",
//     "영천시",
//     "포항시 남구",
//     "포항시 북구",
//     "고령군",
//     "군위군",
//     "봉화군",
//     "성주군",
//     "영덕군",
//     "영양군",
//     "예천군",
//     "울릉군",
//     "울진군",
//     "의성군",
//     "청도군",
//     "청송군",
//     "칠곡군",
// ];
//
// area2Num["광주"] = ["광산구", "남구", "동구", "북구", "서구"];
// area2Name["광주"] = ["광산구", "남구", "동구", "북구", "서구"];
//
// area2Num["대구"] = [
//     "남구",
//     "달서구",
//     "동구",
//     "북구",
//     "서구",
//     "수성구",
//     "중구",
//     "달성군",
// ];
// area2Name["대구"] = [
//     "남구",
//     "달서구",
//     "동구",
//     "북구",
//     "서구",
//     "수성구",
//     "중구",
//     "달성군",
// ];
//
// area2Num["대전"] = ["대덕구", "동구", "서구", "유성구", "중구"];
// area2Name["대전"] = ["대덕구", "동구", "서구", "유성구", "중구"];
//
// area2Num["부산"] = [
//     "강서구",
//     "금정구",
//     "남구",
//     "동구",
//     "동래구",
//     "부산진구",
//     "북구",
//     "사상구",
//     "사하구",
//     "서구",
//     "수영구",
//     "연제구",
//     "영도구",
//     "중구",
//     "해운대구",
//     "기장군",
// ];
// area2Name["부산"] = [
//     "강서구",
//     "금정구",
//     "남구",
//     "동구",
//     "동래구",
//     "부산진구",
//     "북구",
//     "사상구",
//     "사하구",
//     "서구",
//     "수영구",
//     "연제구",
//     "영도구",
//     "중구",
//     "해운대구",
//     "기장군",
// ];
//
// area2Num["서울"] = [
//     "강남구",
//     "강동구",
//     "강북구",
//     "강서구",
//     "관악구",
//     "광진구",
//     "구로구",
//     "금천구",
//     "노원구",
//     "도봉구",
//     "동대문구",
//     "동작구",
//     "마포구",
//     "서대문구",
//     "서초구",
//     "성동구",
//     "성북구",
//     "송파구",
//     "양천구",
//     "영등포구",
//     "용산구",
//     "은평구",
//     "종로구",
//     "중구",
//     "중랑구",
// ];
// area2Name["서울"] = [
//     "강남구",
//     "강동구",
//     "강북구",
//     "강서구",
//     "관악구",
//     "광진구",
//     "구로구",
//     "금천구",
//     "노원구",
//     "도봉구",
//     "동대문구",
//     "동작구",
//     "마포구",
//     "서대문구",
//     "서초구",
//     "성동구",
//     "성북구",
//     "송파구",
//     "양천구",
//     "영등포구",
//     "용산구",
//     "은평구",
//     "종로구",
//     "중구",
//     "중랑구",
// ];
//
// area2Num["세종"] = new Array("세종특별자치시");
// area2Name["세종"] = new Array("세종특별자치시");
//
// area2Num["울산"] = ["남구", "동구", "북구", "중구", "울주군"];
// area2Name["울산"] = ["남구", "동구", "북구", "중구", "울주군"];
//
// area2Num["인천"] = [
//     "계양구",
//     "남구",
//     "남동구",
//     "동구",
//     "부평구",
//     "서구",
//     "연수구",
//     "중구",
//     "강화군",
//     "옹진군",
// ];
// area2Name["인천"] = [
//     "계양구",
//     "남구",
//     "남동구",
//     "동구",
//     "부평구",
//     "서구",
//     "연수구",
//     "중구",
//     "강화군",
//     "옹진군",
// ];
//
// area2Num["전남"] = [
//     "광양시",
//     "나주시",
//     "목포시",
//     "순천시",
//     "여수시",
//     "강진군",
//     "고흥군",
//     "곡성군",
//     "구례군",
//     "담양군",
//     "무안군",
//     "보성군",
//     "신안군",
//     "영광군",
//     "영암군",
//     "완도군",
//     "장성군",
//     "장흥군",
//     "진도군",
//     "함평군",
//     "해남군",
//     "화순군",
// ];
// area2Name["전남"] = [
//     "광양시",
//     "나주시",
//     "목포시",
//     "순천시",
//     "여수시",
//     "강진군",
//     "고흥군",
//     "곡성군",
//     "구례군",
//     "담양군",
//     "무안군",
//     "보성군",
//     "신안군",
//     "영광군",
//     "영암군",
//     "완도군",
//     "장성군",
//     "장흥군",
//     "진도군",
//     "함평군",
//     "해남군",
//     "화순군",
// ];
//
// area2Num["전북"] = [
//     "군산시",
//     "김제시",
//     "남원시",
//     "익산시",
//     "전주시 덕진구",
//     "전주시 완산구",
//     "정읍시",
//     "고창군",
//     "무주군",
//     "부안군",
//     "순창군",
//     "완주군",
//     "임실군",
//     "장수군",
//     "진안군",
// ];
// area2Name["전북"] = [
//     "군산시",
//     "김제시",
//     "남원시",
//     "익산시",
//     "전주시 덕진구",
//     "전주시 완산구",
//     "정읍시",
//     "고창군",
//     "무주군",
//     "부안군",
//     "순창군",
//     "완주군",
//     "임실군",
//     "장수군",
//     "진안군",
// ];
//
// area2Num["제주"] = ["서귀포시", "제주시", "남제주군", "북제주군"];
// area2Name["제주"] = ["서귀포시", "제주시", "남제주군", "북제주군"];
//
// area2Num["충남"] = [
//     "공주시",
//     "논산시",
//     "보령시",
//     "서산시",
//     "아산시",
//     "천안시",
//     "금산군",
//     "당진군",
//     "부여군",
//     "서천군",
//     "연기군",
//     "예산군",
//     "청양군",
//     "태안군",
//     "홍성군",
// ];
// area2Name["충남"] = [
//     "공주시",
//     "논산시",
//     "보령시",
//     "서산시",
//     "아산시",
//     "천안시",
//     "금산군",
//     "당진군",
//     "부여군",
//     "서천군",
//     "연기군",
//     "예산군",
//     "청양군",
//     "태안군",
//     "홍성군",
// ];
//
// area2Num["충북"] = [
//     "제천시",
//     "청주시 상당구",
//     "청주시 흥덕구",
//     "충주시",
//     "괴산군",
//     "단양군",
//     "보은군",
//     "영동군",
//     "옥천군",
//     "음성군",
//     "진천군",
//     "청원군",
// ];
// area2Name["충북"] = [
//     "제천시",
//     "청주시 상당구",
//     "청주시 흥덕구",
//     "충주시",
//     "괴산군",
//     "단양군",
//     "보은군",
//     "영동군",
//     "옥천군",
//     "음성군",
//     "진천군",
//     "청원군",
// ];
//
// /* 지역1 선택시 지역2 체크박스 변화 */
// function area1Change(key, sel) {
//     if (key == "") return;
//     let name = area2Name[key];
//     let val = area2Num[key];
//
//     // key가 빈 값인지 확인, 비어있다면 아무 작업 없이 종료
//     for (i = sel.length - 1; i >= 0; i--) sel.options[i] = null;
//
//     // key가 있다면, 선택목록(sel) 초기화하고 시군구 추가
//     sel.options[0] = new Option("-선택-", "", "", "true");
//
//     // area2Name 객체에서 가져와 옵션 생성, 추가
//     for (i = 0; i < name.length; i++) {
//         sel.options[i + 1] = new Option(name[i], val[i]);
//     }
// }
//
// /* 대면 클릭시 모임장소 섹션 나옴 */
// // window.addEventListener("DOMContentLoaded", function () {
// //   // 대면/비대면 라디오 버튼 요소 가져오기
// //   const faceYnRadios = document.querySelectorAll(".face-yn");
// //   const locationSection = document.querySelector(".location");
// //   locationSection.style.display = "none";
// //
// //   // 각 라디오 버튼에 이벤트 리스너 추가
// //   faceYnRadios.forEach((radio) => {
// //     radio.addEventListener("click", function (e) {
// //       // 선택된 라디오 버튼의 값 확인
// //       const selectedValue = radio.value;
// //
// //       // location 섹션의 표시 여부 결정
// //       if (selectedValue === "1") {
// //         // 대면 선택 시
// //         locationSection.style.display = "block";
// //       } else {
// //         // 비대면 선택 시
// //         locationSection.style.display = "none";
// //       }
// //     });
// //   });
// // });
