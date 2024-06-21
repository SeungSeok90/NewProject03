document.addEventListener("DOMContentLoaded", function () {
    // 이벤트 날짜를 2024년 7월 18일 14시로 고정합니다.
    const eventDate = new Date("2024-07-18T14:00:00").getTime();

    // 카운트다운을 업데이트하는 함수입니다.
    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = eventDate - now;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById("countdown-timer").innerHTML = `
      ${days}<span class="time-label">d</span> ${hours.toString().padStart(2, '0')}<span class="time-label">h</span> ${minutes.toString().padStart(2, '0')}<span class="time-label">m</span> ${seconds.toString().padStart(2, '0')}<span class="time-label">s</span>
    `;

        // 이벤트 시간이 지난 경우
        if (timeRemaining < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown-timer").innerHTML = "Event Started";
        }
    }

    // 1초마다 카운트다운을 업데이트합니다.
    const countdownInterval = setInterval(updateCountdown, 1000);
});