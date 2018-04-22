const router  = require('express').Router();
const mongoose = require('mongoose');

const Tour = require('../../models/tour');

router.get('/tours', (req,res,next) => {

    Tour.find((err, tours) => {
        if (err) return next(err);

        res.json(tours);
    });
});

router.get('/tours/:id', (req,res,next) => {
    IdMongo = mongoose.Types.ObjectId(req.params.id);
    Tour.findOne({_id: IdMongo }, (err, tour) => {
        if (err) return next(err);

        res.json(tour);
    });
});

router.post('/tours', (req,res,next) => {

    var tour = new Tour({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        lugar: req.body.lugar,
        isActive: false
    });

    if (!tour.titulo || !(tour.isActive + '')){
        req.statusCode(400).json({
            error: 'Bad Data'
        });
    } else {

        tour.save(tour, (err,tour) => {
            if (err) return next(err);
            res.json(tour);
        })
    }
});

router.delete('/tours/:id', (req,res,next) => {

    IdMongo = mongoose.Types.ObjectId(req.params.id);

    Tour.remove({_id: IdMongo}, (err,result) =>{
        if (err) return next(err);
            res.json(result);
    });

});

router.put('/tours/:id', (req, res , next) => {
    const tour = req.body;
    const updateTour = {};

    if (tour.isActive){
        updateTour.isActive = tour.isActive;
    }

    if (tour.titulo){
        updateTour.titulo = tour.titulo;
    }

    if (!updateTour){
        req.statusCode(400).json({
            error: 'Bad Request'
        });
    }else{
        IdMongo = mongoose.Types.ObjectId(req.params.id);
        Tour.update({_id: IdMongo}, updateTour , (err, tour) =>{
        if (err) return next(err);
            res.json(tour);
        });
    }
});


module.exports = router;
