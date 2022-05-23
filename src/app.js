const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'weather',
        name:'Deependra'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'about me',
        name:'Deependra'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
       helpText : 'This is some helpful text',
       title:'Help',
       name:'Deependra'
    })
})

app.get('/weather', (req, res) =>{

    const address = req.query.address
    if(!address){
        return res.send({
            error:'Pls provide address'
        })
    }
    geocode(address, (error, {latitude,longitude, location} ={}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
               location,
                address : req.query.address
            })

        })
    })
    
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title : '404',
        errorText : 'help article not available',
        name : 'Deependra'
    })
})

app.get('*', (req,res) =>{
    res.render('404', {
        title: '404',
        errorText : 'Page not found',
        name : 'Deependra'
    })
})

app.listen(port, () =>{
    console.log('app is listening on  port ' + port)
})