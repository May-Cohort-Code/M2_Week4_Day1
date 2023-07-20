const Celebrity = require('../models/Celebrity.model')

const router = require('express').Router()

router.get('/create',(req,res)=>{
    //only time we use the path for a hbs page is when we use the render method
    res.render('celebrities/new-celebrity')
})

router.post('/create',(req,res)=>{
    //the datat being sent in a POST request travels in the req.body
    const {name,occupation,catchPhrase} = req.body
    Celebrity.create({name,occupation,catchPhrase})
    .then(()=>{
        //res.redirect is related to the URL NOT the hbs pages
        res.redirect('/celebrities/create')
    })
    .catch(err=>{
        console.log(err)
    })

})

//get route for all my resources
//create a GET route
//use a .find() to get all my documents
//send the result as an object

router.get('/',(req,res)=>{
    Celebrity.find()
    .then((allCelebrities)=>{
        res.render('celebrities/celebrities',{allCelebrities})
    })
})

module.exports = router