const express = require('express');
const router = express.Router();
const regcontroll = require('../app/controllers/registercontroller')
router.use(express.json())
router.use(express.urlencoded({ extended: false }))
// session handler
const accountmodel = require('../models/account')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const session = require('express-session');
const MongoStore = require('connect-mongo');
router.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: false, 
    resave: false, 
    store: MongoStore.create({ 
        mongoUrl: 'mongodb://localhost/toy_store_dev',
        ttl: 3 * 60 * 60, // 60 seconds * 60 minutes * 3 hours
     })
  }));

const isAuthenticated = (req, res, next) =>{
    if(req.session.isAuth){
        next();
    }
    else{
        res.render('admin/login');
    }
}
// router.post('/validate',(req,res) =>{
//     console.log(req.body);
// })
// [post] /action/login
router.post('/login',(req,res,next) => {
        //res.send(req.body);
        var user = req.body.username;
        var pass = req.body.password;
        const hash = bcrypt.hashSync(pass, salt);
        const check =  bcrypt.compareSync(pass, hash); // true
        if(check){
            accountmodel.findOne({ username:user})
            .then(data=> {
                if(data){
                // res.json(data);
                    //console.log(req.session)
                    req.session.isAuth = true;
                    res.redirect('/action/login');
            }
            else{
                res.status(300).json('account khong dung');
            }
        })
        .catch(err => {
            res.json('co loi ben server');
        })
        }
})
//[get] /action/login
router.get('/login',isAuthenticated,(req,res,next)=> {
    res.render('admin/adminmenu')
})
//[get] /action/logout
router.get("/logout",(req,res,next)=> {
    req.session.destroy(err=> {
        if(err){
            console.log(err);
        }else{
            res.redirect('/action/login')
        }
    })
})


router.post('/register',regcontroll.register)

module.exports = router;