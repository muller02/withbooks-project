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

  // *** 서버에서 달력 데이터 가져오기 ***
  function getDataToServer(withId) {
    fetch("/api/calendar/events?wid=" + withId)
      .then((response) => response.json())
      .then((data) => {
        renderCalendar(data);
        console.log("Fetched data", data);
      })
      .catch((error) => {
        console.error("일정관리 데이터 가져오는 중 오류 발생:", error);
      });
  }

  // *** 캘린더 구조 렌더링 ***
  function renderCalendar(events) {
    console.log("Received events data:", events);

    const formattedEvents = events.map((event) => ({
      id: event.id,
      title: event.title || event.content,
      start: event.start || event.startDateTime,
      end: event.end || event.endDateTime,
      allDay: event.allDay || false,
    }));

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
      events: formattedEvents,
      dateClick: (info) => handleDateClick(info),
      select: (info) => handleSelect(info),
    });

    calendar.render();

    // 모달창 이벤트 리스너
    cancelBtn.addEventListener("click", handleCancel);
    eventForm.addEventListener("submit", (e) =>
      handleEventFormSubmit(e, calendar),
    );
    allDayCheckbox.addEventListener("change", handleAllDayCheckboxChange);
    startTime.addEventListener("change", () => handleTimeChange(startTime));
    endTime.addEventListener("change", () => handleTimeChange(endTime));
  }

  // *** 날짜 클릭 핸들러 ***
  function handleDateClick(info) {
    selectedInfo = { start: info.date, end: info.date, allDay: true };
    showModal(info.dateStr, info.dateStr, true);
  }

  // *** 날짜 선택 핸들러 ***
  function handleSelect(info) {
    selectedInfo = { start: info.start, end: info.end, allDay: info.allDay };
    const endDate = new Date(info.endStr);
    endDate.setDate(endDate.getDate() - 1);
    showModal(
      info.startStr.split("T")[0],
      endDate.toISOString().split("T")[0],
      info.allDay,
      info,
    );
  }

  // *** 모달 표시 ***
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

  // *** 모달 취소 ***
  function handleCancel() {
    modal.classList.add("d:none");
    clearModalFields();
  }

  // *** 모달 제출 ***
  function handleEventFormSubmit(e, calendar) {
    e.preventDefault();
    const title = eventTitle.value.trim();
    let start = eventStart.value;
    let end = eventEnd.value;
    let uiEndDate;
    let dbEndDate;
    const allDay = allDayCheckbox.checked;

    if (allDay) {
      dbEndDate = new Date(end);
      // dbEndDate.setTime(dbEndDate.getTime());
      uiEndDate = new Date(dbEndDate);
      uiEndDate.setDate(uiEndDate.getDate() + 1);
      end = uiEndDate.toISOString();
    } else {
      start = `${start}T${startTime.value}`;
      end = `${end}T${endTime.value}`;
      dbEndDate = new Date(end);
    }

    if (title && start && end) {
      sendDataToServer(title, start, dbEndDate.toISOString(), allDay);
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

  // *** 서버에 데이터 전송 ***
  function sendDataToServer(title, start, end, allDay) {
    const data = { title, start, end, allDay };
    console.log("서버로 데이터 전송:", data); // 로그 추가
    fetch("/api/calendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 응답이 정상이 아닙니다.");
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.success) {
          console.log("이벤트가 성공적으로 저장됨: ", responseData);
        } else {
          console.error("Server error:", responseData.error);
          alert("이벤트 저장 실패");
        }
      })
      .catch((error) => {
        console.error("데이터 전송 오류:", error);
        alert("이벤트 데이터 전송 실패");
      });
  }

  // *** 종일 체크박스 변경 핸들러 ***
  function handleAllDayCheckboxChange() {
    if (allDayCheckbox.checked) {
      timeGroup.classList.add("d:none");
      timeGroup.classList.remove("d:flex");
    } else {
      timeGroup.classList.remove("d:none");
      timeGroup.classList.add("d:flex");
    }
  }

  // *** 시간 변경 핸들러 ***
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

  // *** 모달 입력 필드 초기화 ***
  function clearModalFields() {
    eventTitle.value = "";
    eventStart.value = "";
    eventEnd.value = "";
  }

  // *** url 에서 wid 추출
  function getWidFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("wid");
  }

  const wid = getWidFromUrl();
  getDataToServer(wid);
});
