document.addEventListener("DOMContentLoaded", () => {
  // calendar element 취득
  let calendarEl = document.querySelector("#calendar");
  let modal = document.querySelector("#calendar-modal");
  let selectedInfo = null; // 저장공간
  let eventForm = modal.querySelector(".event-form");
  let eventTitle = modal.querySelector("#event-title");
  let eventStart = modal.querySelector("#event-start");
  let eventEnd = modal.querySelector("#event-end");
  let cancelBtn = modal.querySelector("#cancel-btn");
  let allDayCheckbox = modal.querySelector("#all-day-checkbox");
  let timeGroup = modal.querySelector(".time-group");
  let startTime = modal.querySelector("#start-time");
  let endTime = modal.querySelector("#end-time");

  if (calendarEl) {
    // full-calendar 생성하기
    let calendar = new FullCalendar.Calendar(calendarEl, {
      height: "700px", // calendar 높이 설정
      expandRows: true, // 화면에 맞게 높이 재설정
      slotMinTime: "08:00", // Day 캘린더에서 시작 시간
      slotMaxTime: "20:00", // Day 캘린더에서 종료 시간
      defaultTimedEventDuration: "01:00:00", // 이벤트 기본 기간
      now: new Date(), // 현재 시간
      // 해더에 표시할 툴바
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      },
      initialView: "dayGridMonth", // 초기 로드 될때 보이는 캘린더
      navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
      editable: true, // 수정 가능?
      selectable: true, // 달력 일자 드래그 설정가능
      nowIndicator: true, // 현재 시간 마크
      dayMaxEvents: true, // +more 표시 전 최대 이벤트 갯수, 셀 높이에 의해 결정
      locale: "ko", // 한국어 설정
      events: [],

      // 클릭해서 이벤트 생성
      dateClick: function (info) {
        modal.classList.remove("d:none");
        let selectedDate = info.dateStr;
        eventStart.value = selectedDate;
        eventEnd.value = selectedDate;
      },
      // 드래그로 이벤트 생성
      select: function (info) {
        modal.classList.remove("d:none");
        eventStart.value = info.startStr.split("T")[0];
        // 라이브러리 특성상 종료 날짜가 +1 되어, 이를 커스텀
        let endDate = new Date(info.endStr);
        endDate.setDate(endDate.getDate() - 1);
        // ISO 8601 문자열로 변환 후, 날짜 부분만 추출
        eventEnd.value = endDate.toISOString().split("T")[0];
      },
    });
    calendar.render();

    // 취소 버튼 이벤트
    cancelBtn.addEventListener("click", () => {
      modal.classList.add("d:none");
      eventTitle.value = "";
      eventStart.value = "";
      eventEnd.value = "";
    });

    // 등록 버튼 이벤트
    eventForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let title = eventTitle.value.trim();
      let start = eventStart.value;
      let end = eventEnd.value;
      if (title && start && end) {
        calendar.addEvent({
          title: title,
          start: start,
          end: end,
          // 종일 지속되는지 여부
          allDay: selectedInfo ? selectedInfo.allDay : false,
        });
        modal.classList.add("d:none");
        // 다음 이벤트를 위해 입력 필드 초기화
        eventTitle.value = "";
        eventStart.value = "";
        eventEnd.value = "";
      } else alert("모든 필드를 입력하세요.");
    });

    // 종일 체크박스 상태 변경 시 이벤트 처리
    allDayCheckbox.addEventListener("change", () => {
      if (allDayCheckbox.checked) {
        // 체크되어 있다면, time-group 숨기기
        timeGroup.classList.add("d:none");
        timeGroup.classList.remove("d:flex");
      } else {
        // 체크되어 있지 않다면, time-group 표시
        timeGroup.classList.remove("d:none");
        timeGroup.classList.add("d:flex");
      }
    });

    startTime.addEventListener("change", () => {
      if (!allDayCheckbox.checked) {
        eventStart.value = startTime.value;
      }
    });
    endTime.addEventListener("change", () => {
      if (!allDayCheckbox.checked) {
        eventEnd.value = endTime.value;
      }
    });
  }
});
