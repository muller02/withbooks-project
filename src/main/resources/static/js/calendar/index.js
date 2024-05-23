document.addEventListener("DOMContentLoaded", () => {
  const calendarEl = document.querySelector("#calendar-container");
  const modal = document.querySelector("#calendar-modal");
  let selectedInfo = null;
  const eventForm = modal.querySelector(".event-form");
  const eventTitle = modal.querySelector("#event-title");
  const eventStart = modal.querySelector("#event-start");
  const eventEnd = modal.querySelector("#event-end");
  const cancelBtn = modal.querySelector("#cancel-btn");
  const allDayCheckbox = modal.querySelector("#all-day-checkbox");
  const timeGroup = modal.querySelector(".time-group");
  const startTime = modal.querySelector("#start-time");
  const endTime = modal.querySelector("#end-time");

  // *** 캘린더 구조 렌더링
  function renderCalendar(events) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      height: "700px",
      expandRows: true,
      slotMinTime: "08:00",
      slotMaxTime: "20:00",
      defaultTimedEventDuration: "01:00:00",
      now: new Date(),
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      },
      initialView: "dayGridMonth",
      navLinks: true,
      editable: true,
      selectable: true,
      nowIndicator: true,
      dayMaxEvents: true,
      locale: "ko",
      events: events,

      dateClick: (info) => handleDateClick(info),
      select: (info) => handleSelect(info),
    });
    calendar.render();

    // *** 모달창에서의 이벤트리스너(취소, 등록, 종일선택, 시간 변화)
    cancelBtn.addEventListener("click", handleCancel);

    eventForm.addEventListener("submit", (e) =>
      handleEventFormSubmit(e, calendar),
    );

    allDayCheckbox.addEventListener("change", handleAllDayCheckboxChange);

    startTime.addEventListener("change", () => handleTimeChange(startTime));
    endTime.addEventListener("change", () => handleTimeChange(endTime));
  }

  // *** 날짜 칸을 클릭해서 하루치 일정 입력할 때
  function handleDateClick(info) {
    selectedInfo = { start: info.date, end: info.date, allDay: true };
    showModal(info.dateStr, info.dateStr, true);
  }

  // *** 드래그로 여러날짜 기간을 입력할 떼
  function handleSelect(info) {
    selectedInfo = {
      start: info.start,
      end: info.end,
      allDay: info.allDay,
    };
    const endDate = new Date(info.endStr);
    endDate.setDate(endDate.getDate() - 1);
    showModal(
      info.startStr.split("T")[0],
      endDate.toISOString().split("T")[0],
      info.allDay,
      info,
    );
  }

  // *** 모달창을 띄움
  function showModal(start, end, allDay, info = null) {
    modal.classList.remove("d:none");
    eventStart.value = start;
    eventEnd.value = end;
    allDayCheckbox.checked = allDay;
    if (allDay) {
      timeGroup.classList.add("d:none");
      timeGroup.classList.remove("d:flex");
    } else {
      timeGroup.classList.remove("d:none");
      timeGroup.classList.add("d:flex");
      if (info) {
        startTime.value = info.startStr.split("T")[1].substring(0, 5);
        endTime.value = info.endStr.split("T")[1].substring(0, 5);
      }
    }
  }

  // *** 모달 입력 취소
  function handleCancel() {
    modal.classList.add("d:none");
    clearModalFields();
  }

  // *** 모달 등록 전송
  function handleEventFormSubmit(e, calendar) {
    e.preventDefault();
    const title = eventTitle.value.trim();
    let start = eventStart.value;
    let end = eventEnd.value;
    let uiEndDate;
    let dbEndDate;
    const allDay = allDayCheckbox.checked;

    if (allDay) {
      // 실제 저장될 종료 날짜 계산 (하루 추가하지 않음)
      dbEndDate = new Date(end);
      dbEndDate.setTime(dbEndDate.getTime());
      // 종료 날짜에 하루를 더해서 표시 (하지만 실제 데이터는 변경하지 않음)
      uiEndDate = new Date(dbEndDate);
      uiEndDate.setDate(uiEndDate.getDate() + 1);

      // UI에 표시할 end 변수 설정
      end = uiEndDate.toISOString().split("T")[0];

      console.log("end", end);
      console.log("dbEndDate", dbEndDate);
      console.log("uiEndDate", uiEndDate);
    } else {
      start = `${start}T${startTime.value}`;
      end = `${end}T${endTime.value}`;
      dbEndDate = new Date(end); // Non-allDay의 경우에도 dbEndDate 설정
      console.log("end2", end);
    }

    if (title && start && end) {
      // 서버로 데이터 전송
      sendDataToServer(title, start, dbEndDate.toISOString(), allDay);

      // 캘린더에 추가할 때는 uiEndDate 사용
      calendar.addEvent({
        title: title,
        start: start,
        end: allDay ? uiEndDate.toISOString() : end,
        allDay: allDayCheckbox.checked,
      });
      modal.classList.add("d:none");
      clearModalFields();
    } else {
      alert("모든 필드를 입력하세요.");
    }
  }

  function sendDataToServer(title, start, end, allDay) {
    const data = {
      title: title,
      start: start,
      end: end, // 실제 데이터베이스에 저장될 종료 날짜 사용
      allDay: allDay,
    };

    fetch("/api/calendar/reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.success) {
          console.log("성공! 데이터 저장 앤 전송", responseData);
        } else {
          console.error("Server error:", responseData.error);
          alert("데이터 저장 실패");
        }
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        alert("데이터 전송 실패");
      });
  }

  // *** 종일 토글선택유무에 따라 시작~종료시간 부분 보이거나 감추기
  function handleAllDayCheckboxChange() {
    if (allDayCheckbox.checked) {
      timeGroup.classList.add("d:none");
      timeGroup.classList.remove("d:flex");
    } else {
      timeGroup.classList.remove("d:none");
      timeGroup.classList.add("d:flex");
    }
  }

  // *** 종일 미선택시 시간 선택
  function handleTimeChange(timeInput) {
    if (!allDayCheckbox.checked) {
      const value = timeInput.value;
      if (timeInput === startTime) {
        eventStart.value = value;
      } else {
        eventEnd.value = value;
      }
    }
  }

  // *** 모달에 입력된 값 비워주기
  function clearModalFields() {
    eventTitle.value = "";
    eventStart.value = "";
    eventEnd.value = "";
  }

  renderCalendar([]);
});
