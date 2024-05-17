document.addEventListener("DOMContentLoaded", () => {
  // calendar element 취득
  let calendarEl = document.querySelector("#calendar");
  let modal = document.querySelector("#calendar-modal");
  let selectedInfo = null; // 저장공간
  let eventForm = document.getElementById("event-form");
  let eventTitle = document.getElementById("event-title");
  let eventStart = document.getElementById("event-start");
  let eventEnd = document.getElementById("event-end");
  let cancelBtn = document.getElementById("cancel-btn");

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

      // 클릭해서 이벤트 생성
      dateClick: function (info) {
        modal.classList.remove("d:none");
        let selectedDate = info.dateStr;
        eventStart.value = selectedDate;
        eventEnd.value = selectedDate;
      },
      // 드래그로 이벤트 생성
      select: function (info) {
        console.log("Start date: ", info.startStr);
        console.log("End date: ", info.endStr);
        // eventStart.value = info.startStr.split("T")[0];
        // eventEnd.value = info.endStr.split("T")[0];
        eventStart.value = info.dateStr;
        eventEnd.value = info.dateStr;
        modal.classList.remove("d:none");
      },
    });
    calendar.render();

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

    // 취소 버튼 이벤트
    cancelBtn.addEventListener("click", () => {
      modal.classList.add("d:none");
      eventTitle.value = "";
      eventStart.value = "";
      eventEnd.value = "";
    });
  }
});
