import {Weather} from "../../config/config";
import {useQuery} from "react-query";

export default function WeatherWidget() {
    // TODO 요청 비동기화
    let today = new Date()
    const response = getWeatherData(today).response.body.items.item
    const weatherData: Array<Weather> = []
    let fcstTime: string = "";
    let temperature: number = 0;
    let minTemperature: number = 10000;
    let maxTemperature: number = -10000;
    let rainPercent: number = 0;
    let weatherStatus: string = "";
    let rainStatus:string = "";

    for (let i = 0; i < response.length && response[i].baseDate === response[i].fcstDate; i++) {
        const e: any = response[i];

        if (i !== 0 && i % 12 === 0) {
            weatherData.push({
                fcstTime: fcstTime,
                temperature: temperature,
                rainPercent: rainPercent,
                weatherStatus: weatherStatus,
                rainStatus: rainStatus
            })
        }

        fcstTime = e.fcstTime;
        if (e.category === "TMP") {
            temperature = e.fcstValue;
            minTemperature = minTemperature < temperature ? minTemperature : temperature
            maxTemperature = maxTemperature > temperature ? maxTemperature : temperature
        } else if (e.category === "POP") {
            rainPercent = e.fcstValue;
        } else if (e.category === "SKY") {
            weatherStatus = weatherStatusSelector(e.fcstValue);
        } else if (e.category === "PTY") {
            rainStatus = rainStatusSelector(e.fcstValue);
        }
    }

    //console.log(weatherData)

    return(
        <div className="weather_widget">
            <div className="weather_container">
                <div className="date_info">
                    {today.getMonth() + 1}월 {today.getDate()}일 경북 구미시
                </div>
                <div className="weather_info">
                    <div className="main_info">
                        <img className="weather_icon" src={imageSelector(weatherData[0])} alt=""/>
                        <div className="temperature">
                            {weatherData[0].temperature} °C
                        </div>
                    </div>
                    <div className="sub_info">
                        <div className="rainPercent">
                            강수확률 : {weatherData[0].rainPercent}%{weatherData[0].rainPercent > 50 && weatherData[0].rainStatus !== "없음" ? "(" + weatherData[0].rainStatus + ")" : ""}
                        </div>
                        <div className="minmax_temp">
                            최저 : {minTemperature} / 최고 : {maxTemperature} °C
                        </div>
                    </div>
                </div>
                <div className="fcst">
                    {createFcstValue(weatherData)}
                </div>
            </div>
        </div>
    )
}

function createFcstValue(weatherData: Array<Weather>) {
    const result = []

    for (let i = 1; i < weatherData.length && i < 6; i++) {
        result.push(
            <div className="main_info">
                <img className="weather_icon" src={imageSelector(weatherData[i])} alt=""/>
                <div className="temperature">
                    {weatherData[i].temperature} °C
                </div>
                <div className="fcst_time">
                    {weatherData[i].fcstTime.substring(0, 2)}
                </div>
            </div>
        )
    }

    return result
}

function weatherStatusSelector(statCode: number) {
    if (statCode === 1) {
        return "맑음"
    } else if (statCode === 3) {
        return "구름많음"
    } else {
        return "흐림"
    }
}

function rainStatusSelector(statCode: number) {
    if (statCode === 0) {
        return "없음"
    } else if (statCode === 1) {
        return "비"
    } else if (statCode === 2) {
        return "비/눈"
    } else if (statCode === 3) {
        return "눈"
    } else {
        return "소나기"
    }
}

function imageSelector(weather: Weather) {
    //아이콘 출처 : 공공누리 날씨 아이콘
    if (weather.weatherStatus === "맑음") {
        return "/img/맑음.png"
    } else if (weather.weatherStatus === "구름많음") {
        return "/img/구름많음.png"
    } else {
        if (weather.rainPercent > 50) {
            if (weather.rainStatus === "비") {
                return "/img/비.png"
            } else if (weather.rainStatus === "비/눈") {
                return "/img/비_눈.png"
            } else if (weather.rainStatus === "눈") {
                return "/img/눈.png"
            } else if (weather.rainStatus === "소나기") {
                return "/img/소나기.png"
            } else {
                return ""
            }
        } else {
            return "/img/흐림.png"
        }
    }


    /*
    rainPercent: rainPercent,
                weatherStatus: weatherStatus,
                rainStatus: rainStatus
     */
    return "/img/맑음.png"
}

function hourSelector(hour: number) {
    if (0 <= hour && hour < 2) {
        return '0200'
    } else if (2 <= hour && hour < 5) {
        return '0200'
    } else if (5 <= hour && hour < 8) {
        return '0500'
    } else if (8 <= hour && hour < 11) {
        return '0800'
    } else if (11 <= hour && hour < 14) {
        return '1100'
    } else if (14 <= hour && hour < 17) {
        return '1400'
    } else if (17 <= hour && hour < 20) {
        return '1700'
    } else {
        return '2000';
    }
}

function getWeatherData(today : Date) {

    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1;
    const day: number = today.getDate();

    const formattedMonth: string = month < 10 ? '0' + month : '' + month;
    const formattedDay: string = day < 10 ? '0' + day : '' + day;

    const targetDate: string = year + formattedMonth + formattedDay;

    const xhr = new XMLHttpRequest();
    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
    let queryParams = '?' + encodeURIComponent('serviceKey') + '='+''; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(targetDate); /**/
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(hourSelector(today.getHours())); /**/
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('84'); /**/
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('96'); /**/
    xhr.open('GET', url + queryParams, false);
    xhr.send('');

    return JSON.parse(xhr.response)
}