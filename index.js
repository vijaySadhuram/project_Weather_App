const temperatureField = document.querySelector(".weather1");
const locationField = document.querySelector(".weather2 p");
const timeField = document.querySelector(".weather2 span");
const imageField = document.querySelector(".weather3 img");
const conditionField = document.querySelector(".weather3 span");
const searchLocation = document.querySelector(".searchField");
const form = document.querySelector("form");

// console.log(form)

let target = "Delhi";


// fetch data from the api
const fetchData = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=9c41f7fd73cc4d5fb1484459230806&q=${target}`;
        const response = await fetch(url);
        const responseData = await response.json();

        // console.log(responseData);
        // destructuring 
        const { current: {
            temp_c,
            condition: {
                text, icon
            }, },

            location: { name, localtime
            },
        } = responseData;
        updateDom(temp_c, name, localtime, text, icon);//updatedom
    } catch (error) {
        alert("Location not found");
    }

}

// function update DOM
function updateDom(temperature, name, localtime, text, Emoji) {
    temperatureField.innerHTML = temperature +"°C";
    locationField.innerHTML = name;
    imageField.src = Emoji;
    conditionField.innerHTML = text;

    // day and time manipulation
    const extactDate = localtime.split(" ")[0];
    const extactTime = localtime.split(" ")[1];
    const extactDay = new Date(extactDate).getDay();
    // manipulating DAY;
    const day = getFullDay(extactDay);
    const fullTime = `${extactTime}-${day} ${extactDate}`;
    timeField.innerHTML = fullTime;
    // console.log(fullTime);
}
fetchData(target);

const search = (e) => {
    e.preventDefault();
    target = searchLocation.value;
    // console.log(target);
    fetchData(target);
}


form.addEventListener("submit", search);

function getFullDay(day) {
    switch (day) {
        case 0: return "Sunday";

        case 1: return "Monday";

        case 2: return "Tuesday";

        case 3: return "Wednesday";

        case 4: return "Thursday";

        case 5: return "Friday";

        case 6: return "Saturday";
        default: return "Don't Know";

    }

}
