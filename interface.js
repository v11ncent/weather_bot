
//import libraries
const https = require('https');
const http = require('http');

//MAKE AN ACCOUNT ON https://openweathermap.org/
//AND GET AN API KEY AND COPY AND PASTE ON THIS LINE \/
const api_key = '';

function get_weather(zip_code, callback) {
    try {
        const req = https.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip_code}&appid=${api_key}`, res => {
            if (res.statusCode === 200) {
                let res_body = '';

                res.on('data', data => {
                    res_body += data;
                });
                
                res.on('end', () => {
                    res_body = JSON.parse(res_body);
                    let weather = res_body.weather[0].main;
                    let desc = res_body.weather[0].description;
                    let temp = kel_us(res_body.main.temp);
                    callback(weather, desc, temp);
                });
            }
            else {
                err_msg(res.statusCode);
            }
        });
    }
    catch (err) {
        throw err;
    }
}


//us_conversion
function kel_us(temp) {
    temp = (temp - 273.15) * 9/5 + 32 | 0;
    return `${temp}F`;
}
//error
function err_msg(error) {
    if (error === 404) {
        return 'Please enter a valid zip.';
    }
    else {
        return http.STATUS_CODES[error];
    }
}

//export
module.exports.get_weather = get_weather;
