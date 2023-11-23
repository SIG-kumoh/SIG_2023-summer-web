import {Weather} from "../../config/config";

export default function WeatherWidget() {
    const response = test().response.body.items.item
    const weatherData: Array<Weather> = []
    let fcstTime: string = "";
    let temperature: number = 0;
    let minTemperature: number = 0;
    let maxTemperature: number = 0;
    let rainPercent: number = 0;
    let weatherStatus: string = "";

    for (let i = 0; i < response.length && response[i].baseDate === response[i].fcstDate; i++) {
        const e: any = response[i];
        fcstTime = e.fcstTime;
        if (e.category === "TMP") {
            temperature = e.fcstValue;
        } else if (e.category === "TMN") {
            minTemperature = e.fcstValue;
        } else if (e.category === "TMX") {
            maxTemperature = e.fcstValue;
        } else if (e.category === "POP") {
            rainPercent = e.fcstValue;
        } else if (e.category === "SKY") {
            weatherStatus = weatherStatusSelector(e.fcstValue);
        }

        if (i % 12 == 0) {
            weatherData.push({
                fcstTime: fcstTime,
                temperature: temperature,
                minTemperature: minTemperature,
                maxTemperature: maxTemperature,
                rainPercent: rainPercent,
                weatherStatus: weatherStatus
            })
        }
    }

    console.log(weatherData)
    return(
        <div>
            test
        </div>
    )
}

function weatherStatusSelector(statCode: number) {
    if (statCode == 1) {
        return "맑음"
    } else if (statCode == 3) {
        return "구름많음"
    } else {
        return "흐림"
    }
}

function test() {
    const xhr = new XMLHttpRequest();
    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
    let queryParams = '?' + encodeURIComponent('serviceKey') + '='+''; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent('20231122'); /**/
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0200'); /**/
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('84'); /**/
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('96'); /**/
    xhr.open('GET', url + queryParams, false);
    xhr.send('');

    return JSON.parse(xhr.response)
}