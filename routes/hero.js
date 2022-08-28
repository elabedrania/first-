const express = require('express');

const Hero = require('../models/hero');

const router = express.Router();

const multer = require('multer');

filename='';
const myStorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect)=>{

        let fl = Date.now() + '.'+ file.mimetype.split('/')[1]
        filename = fl;
        redirect(null, fl);
    }
})


const upload = multer({storage : myStorage})

router.post('/ajoutHero', upload.any('image'), (req, res)=>{
    let data = req.body;

    let hr = new Hero(data);

    hr.image = filename;
    hr.save()
        .then(
            (savedHr)=>{
                filename='';
                res.send(savedHr);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )
})

// router.post('/ajoutHero', upload.any('image'), (req, res)=>{
//     let data = req.body;

//     let hr = new Hero(data);

//     hr.image = filename;
//     hr.save()
//         .then(
//             (savedHr)=>{
//                 filename='';
//                 res.send(savedHr);
//             }
//         )
//         .catch(
//             (err)=>{
//                 res.send(err);
//             }
//         )
// })

router.post('/ajout' , (req , res)=>{
    let dataFormPostman = req.body;
    let hero = new Hero (dataFormPostman);
    hero.save()
    .then(
        (savedHero)=>{
            console.log(savedHero);
            res.send(savedHero);
        }
    )
    .catch(
        (error)=>{
            console.log(error);
            res.send(error);
        }
    )
})

router.get('/getallHero', (req, res)=>{
    Hero.find()
    .then(
        (heros)=>{
            res.send(heros)
    }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})

router.get('/getHeroById/:id', (req, res)=>{
    let myId = req.params.id;
    
    Hero.findOne( { _id : myId} )
    .then(
        (Heros)=>{
            res.send(Heros)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})

router.delete('/deleteHero/:id', (req,res)=>{
    let id = req.params.id;

    Hero.findOneAndDelete({ _id : id })
    .then(
        (Heros)=>{
            res.send(Heros)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})


router.put('/updateHero/:id', (req,res)=>{

    let id = req.params.id;

    let newContent = req.body;

    Hero.findByIdAndUpdate({_id:id} , newContent)
    .then(
        (Heros)=>{
            res.send(Heros)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
    

})

module.exports = router;