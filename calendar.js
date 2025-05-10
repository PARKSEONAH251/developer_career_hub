const calendarElement = document.getElementById('calendar');

function renderCalendar() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    let html = '<table>';

    html += `<thead><tr><b>${currentMonth + 1}월</b></tr><tr>`;
    html += '<th style="color: red;">일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th style="color: blue;">토</th>';
    html += '</tr></thead>';

    html += '<tbody><tr>';

    let dayCount = 1;
    let dayOfWeek = firstDayOfMonth;

    for (let i = 0; i < firstDayOfMonth; i++) {
        html += '<td></td>';
    }

    while (dayCount <= daysInMonth) {
        if (dayOfWeek === 6) {
            html += `<td style="color: blue;">${dayCount}</td>`;
        } else if (dayOfWeek === 0) {
            html += `<td style="color: red;">${dayCount}</td>`;
        } else {
            html += `<td>${dayCount}</td>`;
        }

        dayCount++;
        dayOfWeek = (dayOfWeek + 1) % 7;

        if (dayOfWeek === 0 && dayCount <= daysInMonth) {
            html += '</tr><tr>';
        }
    }

    html += '</tbody></table>';

    calendarElement.innerHTML = html;
}

renderCalendar();
