document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const eventEntryModal = document.getElementById("event_entry_modal");
  const eventStartDateInput = document.getElementById("event_start_date");
  const eventEndDateInput = document.getElementById("event_end_date");
  const eventNameInput = document.getElementById("event_name");

  displayEvents();

  function displayEvents() {
    fetch("display_event.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const result = data.data;
        const events = result.map((item) => {
          return {
            event_id: item.event_id,
            title: item.title,
            start: new Date(item.start), // Date 형식으로 변환
            end: new Date(item.end), // Date 형식으로 변환
            color: item.color,
            url: item.url,
          };
        });
        renderCalendar(events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }

  function renderCalendar(events) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      timeZone: "local",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      editable: true,
      selectable: true,
      select: function (info) {
        const start = info.startStr;
        const end = info.endStr;
        alert("Start: " + start + "\nEnd: " + end);
        eventStartDateInput.value = start;
        eventEndDateInput.value = end;
        eventEntryModal.classList.add("show");
      },
      events: events,
      eventClick: function (info) {
        alert("Event ID: " + info.event.extendedProps.event_id);
      },
    });
    calendar.render();
  }

  function saveEvent() {
    const eventName = eventNameInput.value;
    const eventStartDate = eventStartDateInput.value;
    const eventEndDate = eventEndDateInput.value;
    if (eventName === "" || eventStartDate === "" || eventEndDate === "") {
      alert("Please enter all required details.");
      return false;
    }
    fetch("save_event.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_name: eventName,
        event_start_date: eventStartDate,
        event_end_date: eventEndDate,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === true) {
          alert(data.msg);
          location.reload();
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.error("Error saving event:", error);
      });
    return false;
  }
});
