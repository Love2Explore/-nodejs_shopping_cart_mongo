exports.getError = (req,res,next)=>{
    res.status(404);
    res.render('404',{pageTitle:"Not Found",formCSS:true ,path:"",sAuthenticated: req.isLoggedIn})
}