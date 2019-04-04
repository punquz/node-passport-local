exports.index = (req, res, next) => {
    res.render('home', {
        pageTitle: 'HomePage'
    })
}


// Dashboard
exports.getDashBoard = (req, res) => {
    res.render('dashboard', {
        user: req.user,
        pageTitle: 'user page'
    })
}