window.onload = function() {
    const days = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
    const meals = ["Reggeli", "Tízórai", "Ebéd", "Uzsonna", "Vacsora"];
    const now = new Date();
    const currentDay = days[now.getDay()];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    document.getElementById("today").innerHTML = `<h2>Ma ${currentDay.charAt(0).toUpperCase() + currentDay.slice(1)}</h2>`;

    let currentDayElement = document.querySelector(`a[href="${currentDay}.html"]`);
    if (currentDayElement) {
        currentDayElement.style.backgroundColor = "#ffeb3b";
        currentDayElement.style.color = "#000";
    }

    // Az aktuális étel kiválasztása az aktuális időpontra
    let currentMealIndex;
    if (currentHour < 10) {
        currentMealIndex = 0; // Reggeli
    } else if (currentHour < 12) {
        currentMealIndex = 1; // Tízórai
    } else if (currentHour < 15) {
        currentMealIndex = 2; // Ebéd
    } else if (currentHour < 17) {
        currentMealIndex = 3; // Uzsonna
    } else {
        currentMealIndex = 4; // Vacsora
    }

    const currentMeal = meals[currentMealIndex];

    const mealIndex = meals.indexOf(currentMeal);
    if (mealIndex !== -1) {
        const mealItem = document.querySelectorAll('li')[mealIndex];
        if (mealItem) {
            mealItem.classList.add('selected');
        }
    }

    function updateInfo() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentSecond = now.getSeconds();
        const nextMealIndex = Math.floor(currentHour / 6); // 1 nap 4 étkezésre oszlik (24 óra / 4 étkezés)
        const nextMeal = meals[nextMealIndex];

        const dayTitle = document.getElementById("dayTitle");
        dayTitle.innerText = `${nextMeal} következik`;

        const nextMealTime = (nextMealIndex + 1) * 6 - currentHour - 1; // Mert 0-tól indul az index
        const nextMealMinutes = (nextMealTime * 60 - currentMinute) - 1; // Mert 0-tól indul az index
        const nextMealSeconds = 59 - currentSecond;

        const countdown = document.getElementById("countdown");
        countdown.innerText = `Még ${nextMealTime} óra ${nextMealSeconds} másodperc van hátra a következő étkezésig.`;
    }

    // Az információk frissítése minden 1 másodpercben
    updateInfo(); // Frissítsük azonnal az oldalt az oldal betöltésekor
    setInterval(updateInfo, 1000); // Majd minden 1 másodpercben
};
