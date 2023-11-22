export default function WeatherWidget() {
    {console.log(test())}
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

function WeatherInfoSelector(data: JSON) {
    const temperature = data.parse('TMP');
    const minTemperature = data.parse('TMN')
    const maxTemperature = data.parse('TMX')
    const rainPercent = data.parse('POP')
    const weatherStatus = weatherStatusSelector(data.parse('TMX'))

    return {
        temperature: temperature,
        minTemperature: minTemperature,
        maxTemperature: maxTemperature,
        rainPercent: rainPercent,
        weatherStatus: weatherStatus
    };
}

function test() {
    var xhr = new XMLHttpRequest();
    var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+''; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent('20231122'); /**/
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0500'); /**/
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('84'); /**/
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('96'); /**/
    xhr.open('GET', url + queryParams);
    xhr.send('');
    return xhr
}