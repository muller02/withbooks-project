document.addEventListener("DOMContentLoaded", () => {
  const calendarEl = document.querySelector("#calendar");
  let calendar;
  const modalEl = document.getElementById("calendar-modal");
  const submitButton = modalEl.querySelector(".n-btn");
  const eventContentInput = modalEl.querySelector(
    "input[type='text']:nth-of-type(1)",
  );
  const startDateInput = modalEl.querySelector(
    "input[type='text']:nth-of-type(2)",
  );
  const endDateInput = modalEl.querySelector(
    "input[type='text']:nth-of-type(3)",
  );

  // FullCalendar 초기화 및 렌더링
  calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: "UTC",
    initialView: "dayGridMonth",
    events: [
      {
        title: "일정",
        start: "2021-05-26 00:00:00",
        end: "2021-05-27 24:00:00",
      },
    ],
    headerToolbar: {
      center: "addEventButton",
    },
    customButtons: {
      addEventButton: {
        text: "일정 추가",
        click: function () {
          var modal = document.getElementById("calendarModal");
          modal.style.display = "block";

          // 추가 버튼 클릭 이벤트 핸들링 코드 추가
          // ...
        },
      },
    },
    editable: true,
    displayEventTime: false,
  });

  calendar.render(); // 캘린더 렌더링
});
