exports.getLogin = (req,res,next)=>{
  //const isLoggedIn =  req.get('Cookie').trim().split('=')[1]
  //console.log(res.session.isLoggedIn)
  res.render('auth/login',{
    path:'/login',
    pageTitle:'Login',
    sAuthenticated: false
  })
}

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    sAuthenticated: false
  });
};

exports.postLogin = (req,res,next)=>{
  //res.setHeader('Set-Cookie','loggedIn=true') //  req.isLoggedIn = true

  req.session.isLoggedIn = true;
  res.redirect('/');
}

exports.postSignup = (req, res, next) => {};

exports.postLogout = (req,res,next)=>{
  req.session.destroy(err=>{
    console.log(err);
    res.redirect('/')
  })
}