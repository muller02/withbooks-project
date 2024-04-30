window.addEventListener('load', function () {
  const withReg = document.querySelector('#with-reg');

  //중복검사 버튼
  const validBtn = withReg.querySelector('.valid-btn');

  // 중복검사에서 통과 했을 떄 알람
  const nameAlertTrue = withReg.querySelector('.name-alert-true');

  // 중복검사에서 실패 했을 떄 알람
  const nameAlertFalse = withReg.querySelector('.name-alert-false');

  // 위드명 입력 인풋
  const withNameInput = withReg.querySelector("input[name='name']");

  // 인풋 이벤트 추가
  withNameInput.addEventListener('input', (e) => {
    // 인풋 창에 값이 있을 때, 중복검사 버튼이 활성화 되면서, 배경색 변경
    if (withNameInput.value) {
      validBtn.classList.add('bg-color:main-5');
      validBtn.disabled = false;
    } else {
      validBtn.classList.remove('bg-color:main-5');
      validBtn.disabled = true;
    }
  });

  // 중복검사 버튼을 클릭 했을 때
  validBtn.onclick = async (e) => {
    e.preventDefault();

    let withName = withNameInput.value;
    let url = '/api/with/check-name?n=' + withName;
    let checkName;

    await fetch(url)
      .then((response) => {
        return response.text(); // 응답으로 json 형태가 아닌 기본형으로 반환 되는 값을 받기 위해
      })
      .then((data) => {
        checkName = data; // true, false 를 반환하게 됨
      });

    console.log(checkName);

    if (checkName === 'true') {
      // 문자열로 비교를 해야  진행이 됨
      nameAlertTrue.classList.remove('d:none');
      nameAlertFalse.classList.add('d:none');
    } else {
      nameAlertFalse.classList.remove('d:none');
      nameAlertTrue.classList.add('d:none');
    }

    // 위드 명 입력창에 입력이 되면, 두 알람창 모두 숨김
    withNameInput.addEventListener('input', function (e) {
      nameAlertTrue.classList.add('d:none');
      nameAlertFalse.classList.add('d:none');
    });
  };
});

// 위드 소개 Texarea 자동 늘어지게 하는 이벤트 추가
window.addEventListener('load', function () {
  const withIntro = document.querySelector('#with-intro');

  // witnIntro Textarea에 input 이벤트 추가
  withIntro.oninput = function (e) {
    withIntro.style.height = withIntro.scrollHeight + 'px'; //스크롤의 높이 만큼 textArea의 높이도 같이 늘어 남
  };
});

// 위드 정원 유효성 검사
window.addEventListener('load', function (e) {
  const withReg = document.querySelector('#with-reg');
  const personnelInput = withReg.querySelector("input[name='personnel']");

  // reg.html personnel input 밑 알람 창이 있음
  const personnelAlert = withReg.querySelector('.personnel-alert');

  personnelInput.oninput = function (e) {
    if (personnelInput.value > 100) {
      // 위드 정원 100 이상 시 알람 표시
      personnelAlert.classList.remove('d:none');
    } else {
      personnelAlert.classList.add('d:none');
    }
  };
});

// 토론 횟수 유효성 검사
window.addEventListener('load', function (e) {
  const withReg = document.querySelector('#with-reg');
  const intervalInput = withReg.querySelector("input[name='interval']");
  const intervalAlert = withReg.querySelector('.interval-alert');
  intervalInput.oninput = function () {
    if (intervalInput.value > 50) {
      intervalAlert.classList.remove('d:none');
    } else {
      intervalAlert.classList.add('d:none');
    }
  };
});

// 위드 등록 카테고리 체크박스 갯수 제한 3개
window.addEventListener('load', function () {
  // for 문, checked 하기 ,
  const categorySection = document.querySelector('.category-section');
  const categoryAlert = categorySection.querySelector('.category-alert');

  // 선택 된 체크 박스 카운트
  let checkBoxCnt = 0;

  // 최대 체크 박스 갯수
  const checkBoxMaxCnt = 3;

  categorySection.onclick = function (e) {
    if (e.target.tagName !== 'INPUT') return;

    if (e.target.checked) {
      checkBoxCnt++;
    } else {
      checkBoxCnt--;
    }

    if (checkBoxCnt > checkBoxMaxCnt) {
      e.target.checked = false;
      checkBoxCnt--;

      categoryAlert.classList.remove('d:none');
    } else {
      categoryAlert.classList.add('d:none');
    }
  };
});

// 위드 이미지 미리보기
window.addEventListener('load', function (e) {
  const imgInput = document.querySelector("input[type='file']");
  const preViewImg = document.querySelector('.preview-img');

  imgInput.oninput = function (e) {
    const file = imgInput.files[0];

    if (file.type.indexOf('image/') != 0) {
      alert('이미지만 업로드 할 수 있습니다.');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      alert('크기는 100KB 이하만 업로드 할 수 있습니다.');
      return;
    }

    let reader = new FileReader();
    console.log(file);
    reader.onload = function (e) {
      if (preViewImg.hasChildNodes()) {
        preViewImg.removeChild(preViewImg.firstChild);
      }
      console.log(file);

      let img = document.createElement('img');
      img.src = e.target.result;

      img.setAttribute('class', 'h:3 w:3 border-radius:4');

      preViewImg.append(img);
    };

    // 주어진 파일을 읽어들이고, 해당 파일의 내용을 Data URL 형식으로 변환하여  콜백함수에 반환
    reader.readAsDataURL(file);
  };
});

// 위드 모임장소 select box
// cate1은 시도에 해당
let cate1_num = new Array(
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '강원',
  '경기',
  '경남',
  '경북',
  '전남',
  '전북',
  '제주',
  '충남',
  '충북'
);
let cate1_name = new Array(
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '강원',
  '경기',
  '경남',
  '경북',
  '전남',
  '전북',
  '제주',
  '충남',
  '충북'
);

// cate2는 시군구
let cate2_num = new Array();
let cate2_name = new Array();

cate2_num['강원'] = new Array(
  '강릉시',
  '동해시',
  '삼척시',
  '속초시',
  '원주시',
  '춘천시',
  '태백시',
  '고성군',
  '양구군',
  '양양군',
  '영월군',
  '인제군',
  '정선군',
  '철원군',
  '평창군',
  '홍천군',
  '화천군',
  '횡성군'
);
cate2_name['강원'] = new Array(
  '강릉시',
  '동해시',
  '삼척시',
  '속초시',
  '원주시',
  '춘천시',
  '태백시',
  '고성군',
  '양구군',
  '양양군',
  '영월군',
  '인제군',
  '정선군',
  '철원군',
  '평창군',
  '홍천군',
  '화천군',
  '횡성군'
);

cate2_num['경기'] = new Array(
  '고양시 덕양구',
  '고양시 일산구',
  '과천시',
  '광명시',
  '광주시',
  '구리시',
  '군포시',
  '김포시',
  '남양주시',
  '동두천시',
  '부천시 소사구',
  '부천시 오정구',
  '부천시 원미구',
  '성남시 분당구',
  '성남시 수정구',
  '성남시 중원구',
  '수원시 권선구',
  '수원시 장안구',
  '수원시 팔달구',
  '시흥시',
  '안산시 단원구',
  '안산시 상록구',
  '안성시',
  '안양시 동안구',
  '안양시 만안구',
  '오산시',
  '용인시',
  '의왕시',
  '의정부시',
  '이천시',
  '파주시',
  '평택시',
  '하남시',
  '화성시',
  '가평군',
  '양주군',
  '양평군',
  '여주군',
  '연천군',
  '포천군'
);
cate2_name['경기'] = new Array(
  '고양시 덕양구',
  '고양시 일산구',
  '과천시',
  '광명시',
  '광주시',
  '구리시',
  '군포시',
  '김포시',
  '남양주시',
  '동두천시',
  '부천시 소사구',
  '부천시 오정구',
  '부천시 원미구',
  '성남시 분당구',
  '성남시 수정구',
  '성남시 중원구',
  '수원시 권선구',
  '수원시 장안구',
  '수원시 팔달구',
  '시흥시',
  '안산시 단원구',
  '안산시 상록구',
  '안성시',
  '안양시 동안구',
  '안양시 만안구',
  '오산시',
  '용인시',
  '의왕시',
  '의정부시',
  '이천시',
  '파주시',
  '평택시',
  '하남시',
  '화성시',
  '가평군',
  '양주군',
  '양평군',
  '여주군',
  '연천군',
  '포천군'
);

cate2_num['경남'] = new Array(
  '거제시',
  '김해시',
  '마산시',
  '밀양시',
  '사천시',
  '양산시',
  '진주시',
  '진해시',
  '창원시',
  '통영시',
  '거창군',
  '고성군',
  '남해군',
  '산청군',
  '의령군',
  '창녕군',
  '하동군',
  '함안군',
  '함양군',
  '합천군'
);
cate2_name['경남'] = new Array(
  '거제시',
  '김해시',
  '마산시',
  '밀양시',
  '사천시',
  '양산시',
  '진주시',
  '진해시',
  '창원시',
  '통영시',
  '거창군',
  '고성군',
  '남해군',
  '산청군',
  '의령군',
  '창녕군',
  '하동군',
  '함안군',
  '함양군',
  '합천군'
);

cate2_num['경북'] = new Array(
  '경산시',
  '경주시',
  '구미시',
  '김천시',
  '문경시',
  '상주시',
  '안동시',
  '영주시',
  '영천시',
  '포항시 남구',
  '포항시 북구',
  '고령군',
  '군위군',
  '봉화군',
  '성주군',
  '영덕군',
  '영양군',
  '예천군',
  '울릉군',
  '울진군',
  '의성군',
  '청도군',
  '청송군',
  '칠곡군'
);
cate2_name['경북'] = new Array(
  '경산시',
  '경주시',
  '구미시',
  '김천시',
  '문경시',
  '상주시',
  '안동시',
  '영주시',
  '영천시',
  '포항시 남구',
  '포항시 북구',
  '고령군',
  '군위군',
  '봉화군',
  '성주군',
  '영덕군',
  '영양군',
  '예천군',
  '울릉군',
  '울진군',
  '의성군',
  '청도군',
  '청송군',
  '칠곡군'
);

cate2_num['광주'] = new Array('광산구', '남구', '동구', '북구', '서구');
cate2_name['광주'] = new Array('광산구', '남구', '동구', '북구', '서구');

cate2_num['대구'] = new Array(
  '남구',
  '달서구',
  '동구',
  '북구',
  '서구',
  '수성구',
  '중구',
  '달성군'
);
cate2_name['대구'] = new Array(
  '남구',
  '달서구',
  '동구',
  '북구',
  '서구',
  '수성구',
  '중구',
  '달성군'
);

cate2_num['대전'] = new Array('대덕구', '동구', '서구', '유성구', '중구');
cate2_name['대전'] = new Array('대덕구', '동구', '서구', '유성구', '중구');

cate2_num['부산'] = new Array(
  '강서구',
  '금정구',
  '남구',
  '동구',
  '동래구',
  '부산진구',
  '북구',
  '사상구',
  '사하구',
  '서구',
  '수영구',
  '연제구',
  '영도구',
  '중구',
  '해운대구',
  '기장군'
);
cate2_name['부산'] = new Array(
  '강서구',
  '금정구',
  '남구',
  '동구',
  '동래구',
  '부산진구',
  '북구',
  '사상구',
  '사하구',
  '서구',
  '수영구',
  '연제구',
  '영도구',
  '중구',
  '해운대구',
  '기장군'
);

cate2_num['서울'] = new Array(
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구'
);
cate2_name['서울'] = new Array(
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구'
);

cate2_num['세종'] = new Array('세종특별자치시');
cate2_name['세종'] = new Array('세종특별자치시');

cate2_num['울산'] = new Array('남구', '동구', '북구', '중구', '울주군');
cate2_name['울산'] = new Array('남구', '동구', '북구', '중구', '울주군');

cate2_num['인천'] = new Array(
  '계양구',
  '남구',
  '남동구',
  '동구',
  '부평구',
  '서구',
  '연수구',
  '중구',
  '강화군',
  '옹진군'
);
cate2_name['인천'] = new Array(
  '계양구',
  '남구',
  '남동구',
  '동구',
  '부평구',
  '서구',
  '연수구',
  '중구',
  '강화군',
  '옹진군'
);

cate2_num['전남'] = new Array(
  '광양시',
  '나주시',
  '목포시',
  '순천시',
  '여수시',
  '강진군',
  '고흥군',
  '곡성군',
  '구례군',
  '담양군',
  '무안군',
  '보성군',
  '신안군',
  '영광군',
  '영암군',
  '완도군',
  '장성군',
  '장흥군',
  '진도군',
  '함평군',
  '해남군',
  '화순군'
);
cate2_name['전남'] = new Array(
  '광양시',
  '나주시',
  '목포시',
  '순천시',
  '여수시',
  '강진군',
  '고흥군',
  '곡성군',
  '구례군',
  '담양군',
  '무안군',
  '보성군',
  '신안군',
  '영광군',
  '영암군',
  '완도군',
  '장성군',
  '장흥군',
  '진도군',
  '함평군',
  '해남군',
  '화순군'
);

cate2_num['전북'] = new Array(
  '군산시',
  '김제시',
  '남원시',
  '익산시',
  '전주시 덕진구',
  '전주시 완산구',
  '정읍시',
  '고창군',
  '무주군',
  '부안군',
  '순창군',
  '완주군',
  '임실군',
  '장수군',
  '진안군'
);
cate2_name['전북'] = new Array(
  '군산시',
  '김제시',
  '남원시',
  '익산시',
  '전주시 덕진구',
  '전주시 완산구',
  '정읍시',
  '고창군',
  '무주군',
  '부안군',
  '순창군',
  '완주군',
  '임실군',
  '장수군',
  '진안군'
);

cate2_num['제주'] = new Array('서귀포시', '제주시', '남제주군', '북제주군');
cate2_name['제주'] = new Array('서귀포시', '제주시', '남제주군', '북제주군');

cate2_num['충남'] = new Array(
  '공주시',
  '논산시',
  '보령시',
  '서산시',
  '아산시',
  '천안시',
  '금산군',
  '당진군',
  '부여군',
  '서천군',
  '연기군',
  '예산군',
  '청양군',
  '태안군',
  '홍성군'
);
cat2_name['충남'] = new Array(
  '공주시',
  '논산시',
  '보령시',
  '서산시',
  '아산시',
  '천안시',
  '금산군',
  '당진군',
  '부여군',
  '서천군',
  '연기군',
  '예산군',
  '청양군',
  '태안군',
  '홍성군'
);

cate2_num['충북'] = new Array(
  '제천시',
  '청주시 상당구',
  '청주시 흥덕구',
  '충주시',
  '괴산군',
  '단양군',
  '보은군',
  '영동군',
  '옥천군',
  '음성군',
  '진천군',
  '청원군'
);
cate2_name['충북'] = new Array(
  '제천시',
  '청주시 상당구',
  '청주시 흥덕구',
  '충주시',
  '괴산군',
  '단양군',
  '보은군',
  '영동군',
  '옥천군',
  '음성군',
  '진천군',
  '청원군'
);

function cate1_change(key, sel) {
  if (key == '') return;
  let name = cate2_name[key];
  let val = cate2_num[key];

  for (i = sel.length - 1; i >= 0; i--) sel.options[i] = null;
  sel.options[0] = new Option('-선택-', '', '', 'true');
  for (i = 0; i < name.length; i++) {
    sel.options[i + 1] = new Option(name[i], val[i]);
  }
}
