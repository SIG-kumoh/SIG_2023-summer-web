import {Weather} from "../../config/config";

export default function WeatherWidget() {
    // TODO 스타일 적용
    // TODO 요청 비동기화
    // TODO rainPercent 이용하여 일정 확률 이상이면 비오는 날씨로 취급
    // TODO 날씨별 이미지 추가
    const response = getWeatherData().response.body.items.item
    const weatherData: Array<Weather> = []
    let fcstTime: string = "";
    let temperature: number = 0;
    let minTemperature: number = 10000;
    let maxTemperature: number = -10000;
    let rainPercent: number = 0;
    let weatherStatus: string = "";

    for (let i = 0; i < response.length && response[i].baseDate === response[i].fcstDate; i++) {
        const e: any = response[i];

        if (i !== 0 && i % 12 === 0) {
            weatherData.push({
                fcstTime: fcstTime,
                temperature: temperature,
                rainPercent: rainPercent,
                weatherStatus: weatherStatus
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
        }
    }

    //console.log(weatherData)

    return(
        <div>
            {weatherData[0].weatherStatus} {weatherData[0].rainPercent}%
            <div>
                {minTemperature} / {maxTemperature}
            </div>
            <div>
                {createFcstValue(weatherData)}
            </div>
        </div>
    )
}

function createFcstValue(weatherDate: Array<Weather>) {
    const result = []

    for (let i = 0; i < weatherDate.length; i++) {
        result.push(
            <div className={"fcstBlock"}>
                {weatherDate[i].fcstTime}
                <div>
                    {weatherDate[i].weatherStatus} {weatherDate[i].rainPercent}%
                </div>
                <div>
                    {weatherDate[i].temperature}
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

function getWeatherData() {
    const today: Date = new Date();

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