const request = require('request')

const forecast = (lat, long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=8e1360a319da76590dfa439b35212e7d&query='+ lat +',' +long +'&units=f'

    //request({url:url, json:true}, (error, response) =>{
    request({url, json:true}, (error, {body}) =>{    //destructuring and propert shorthand
        
        if(error){
            callback('Unable to connect weather service!', undefined)
        }else if(body.error){
            callback('Unable to find location !!')
        }else{
            callback(undefined, 'it is '+ body.current.temperature + ' degree F but feels like ' + 
     body.current.feelslike +' degree F')
        }
    })
}

module.exports = forecast