const location = document.getElementById('location')
const searchBtn = document.getElementById('searchbtn')
const conditionImg = document.querySelector('.condition-img')
const main = document.querySelector('.main')
const empty = document.querySelector('.empty')


function search(){
    searchBtn.addEventListener('click' , function(e) {
        e.preventDefault()
        let locationValue =  location.value
        checkWeather(locationValue)
        empty.style.display = 'none'
        main.style.display = 'flex'
    } )
}

async function checkWeather(locationValue) {
    const respone = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationValue}&appid=1e73e8544fc98737720c1b381431983b`)
    let data = await respone.json() ;
    
    document.querySelector(".temp").innerHTML = `${Math.round((data.main.temp) / 10)}°C` ;
    document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}` ;
    document.querySelector(".condition-text").innerHTML = data.weather[0].description ;


    let localDateTime = new Date((data.dt + data.timezone) * 1000);
    document.querySelector(".time").innerHTML = localDateTime.toUTCString()

    if(data.weather[0].main == "Clouds"){
        conditionImg.src = './image/weather/clouds.png'
    }
    else if(data.weather[0].main == "Clear"){
        conditionImg.src = './image/weather/clear.png'
    }
    else if(data.weather[0].main == "Drizzle"){
        conditionImg.src = './image/weather/drizzle.png'
    }
    else if(data.weather[0].main == "Mist"){
        conditionImg.src = './image/weather/mist.png'
    }
    else if(data.weather[0].main == "Rain"){
        conditionImg.src = './image/weather/rain.png'
    }
    else if(data.weather[0].main == "Snow"){
        conditionImg.src = './image/weather/snow.png'
    }

    document.querySelector('.humidity').innerHTML = data.main.humidity ;
    document.querySelector('.feel-like').innerHTML = data.main.feels_like ;
    document.querySelector('.wind-speed').innerHTML = data.wind.speed ;
    document.querySelector('.pressure').innerHTML = data.main.pressure ;
    document.querySelector('.cloud-level').innerHTML = data.clouds.all ;


}






export {search , checkWeather} ;