const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')

const router = require('express').Router()


    router.get('/create',(req,res)=>{
        Celebrity.find()
        .then((allCelebrities)=>{
            console.log(allCelebrities)
            res.render('movies/new-movie',{allCelebrities})

        })
        .catch(err=>{
            console.log(err)
        })
    })

    router.post('/create',(req,res)=>{
        console.log(req.body)
        const {title,genre,plot,cast} = req.body

        Movie.create({title,genre,plot,cast})
        .then(()=>{
            res.redirect('/movies')
        })
        .catch(err=>{
            console.log(err)
        })
    })

    router.get('/',(req,res)=>{
        Movie.find()
        .then((allMovies)=>{
            res.render('movies/movies',{allMovies})
        })
        .catch(err=>{
            console.log(err)
        })
    })

    router.get('/:id',(req,res)=>{
        Movie.findById(req.params.id).populate('cast')
        .then((oneMovie)=>{
            console.log(oneMovie)
            res.render('movies/movie-details',oneMovie)
        })
    })
 
    router.post('/:id/delete',(req,res)=>{
        Movie.findByIdAndDelete(req.params.id)
        .then(()=>{
            res.redirect('/movies')
        })
    })


    router.get('/:id/edit', async (req,res)=>{
        try{
            let oneMovie = await Movie.findById(req.params.id)
            let allCelebrities = await Celebrity.find()
            res.render('movies/edit-movie',{oneMovie,allCelebrities})
     
        }
        catch(err){
            console.log(err)
        }
        Promise.all([Movie.findById(req.params.id),Celebrity.find()])
        .then(result=>{
            console.log(result[0])

            res.render('movies/edit-movie',{oneMovie:result[0],allCelebrities:result[1]})
        }) 
        
/*         let celebs;
        let movie
        Movie.findById(req.params.id)
        .then((oneMovie)=>{
            movie = oneMovie
            return Celebrity.find()

            
        })
        .then(celebrities=>{
            celebs = celebrities
            res.render('move/edit-movie',{movie,celebs})
        }) */
    })

    router.post('/:id/edit',(req,res)=>{
        const {title,genre,plot,cast}=req.body
        Movie.findByIdAndUpdate(req.params.id,{title,genre,plot,cast})
        .then(()=>{
            res.redirect('/movies')
        })
    })
module.exports = router