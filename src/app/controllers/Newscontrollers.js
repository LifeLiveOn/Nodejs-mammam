// quick example of request parameters;
class NewsController {
    //[get] /news
    index(req, res,next) {
        res.render('news');
       // next();
    }
    // add parameters sau / news

    // [get] /news/:slug
    show(req, res,next) {
        res.send('' + req.body.slug);
        //next();
    }
}

module.exports = new NewsController();
