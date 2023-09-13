
function searchBankHoliday() {
    const holidayYear = document.getElementById("holiday-year").value;
    const resultsContainer = document.getElementById("results");


    resultsContainer.innerHTML = "";


    const apiUrl = `https://www.gov.uk/bank-holidays.json`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const englandAndWalesHolidays = data["england-and-wales"].events;
            const scotlandHolidays = data["scotland"].events;
            const northernIrelandHolidays = data["northern-ireland"].events;
            const allHolidays = englandAndWalesHolidays.concat(scotlandHolidays, northernIrelandHolidays);

            const filteredHolidays = allHolidays.filter(holiday => holiday.date.includes(holidayYear));

            if (filteredHolidays.length > 0) {
                filteredHolidays.forEach(holiday => {
                    const date = holiday.date;
                    const title = holiday.title;
                    const division = holiday.division;

                    const holidayDiv = document.createElement("div");
                    holidayDiv.classList.add("holiday");
                    holidayDiv.innerHTML = `
                                <p>Date: ${date}</p>
                                <p>Title: ${title}</p>
                                <p>Division: ${division}</p>
                            `;

                    resultsContainer.appendChild(holidayDiv);
                });
            } else {
                resultsContainer.textContent = "No holidays found for the specified year.";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            resultsContainer.textContent = "An error occurred while fetching data.";
        });
}
