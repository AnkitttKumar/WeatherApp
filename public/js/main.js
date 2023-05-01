const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const temp_real = document.getElementById("temp_real");
const temp = document.getElementById("temp");
const dataHide = document.querySelector(".middle_layer");
const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  if (cityVal === "") {
    city_name.innerText = `Please enter the city`;
    dataHide.classList.add("data_hide");
  } else {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=47a9369c0dd58eb797d25684991b25e7`;
      const response = await fetch(url);
      const Data = await response.json();
      console.log(Data);
      const arrData = [Data];
      city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
      temp_real.innerText = (arrData[0].main.temp / 10).toFixed(2);
      const tempMood = arrData[0].weather[0].main;

      //condition for checking cloud or sunny

      if (tempMood == "Clear") {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color: #eccc68;'></i>";
      } else if (tempMood == "Cloud") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color: #eccc68;'></i>";
      }
      const getCurrentDay = () => {
        let weekDay = new Array(7);
        weekDay[0] = "Sunday";
        weekDay[1] = "Monday";
        weekDay[2] = "Tuesday";
        weekDay[3] = "Wednesday";
        weekDay[4] = "Thursday";
        weekDay[5] = "Friday";
        weekDay[6] = "Saturday";
        let currentTime = new Date();
        let day = weekDay[currentTime.getDay()];
        return day;
      };
      const getCurrentTime = () => {
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        var now = new Date();
        var hours = now.getHours();
        var mins = now.getMinutes();
        var month = months[now.getMonth() + 1];
        var Date = now.getDate();
        var period = "am";
        if (hours > 11) {
          period = "pm";
          if (hours > 12) hours -= 12;
        }
        if (mins < 10) {
          min = "0" + mins;
        }
        return `${month} ${date} | ${hours}: ${mins} ${period}`;
      };
      dataHide.classList.remove("data_hide");
    } catch {
      city_name.innerText = `Please enter the correct city`;
      dataHide.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getInfo);
