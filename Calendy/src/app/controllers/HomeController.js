let homeController = {
    getHomePage(req, res) {
        if (!req.session.user_id) {
            res.render('home', {header0: true});
        } else {
            res.render('home', {header2: true});
        }
        
    },
}

module.exports = homeController;