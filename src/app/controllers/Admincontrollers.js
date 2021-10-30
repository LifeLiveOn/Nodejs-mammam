const products = require('../../models/products')
var db = require('../../config/db/database');
class Admincontrollers{
    // [get] main menu path: /adminmanage
    index(req, res,next){
        res.redirect('/action/login');
        //res.render('admin/adminmenu');
    }
    //[get] /adminmanage/v show all products 
    view(req, res, next){
        products.find({}).lean()
            .then(data => {
                res.render('admin/viewall',{data})
            })
            .catch(next);
    }
    // [get] /adminmanage/edit/:id
    edit(req, res,next){
        products.findById(req.params.id).lean()
            // .then(products => res.json(products))
            .then(data =>{
                //res.json(Products)
                res.render('products/edit',{data})
            })
            .catch(next);

    }
    //[get]
    delete(req, res, next){
        products.findByIdAndRemove(req.params.id).lean()
            .then(()=> res.redirect('/adminmanage/v'))
            .catch(next);
    }

}
module.exports = new Admincontrollers();