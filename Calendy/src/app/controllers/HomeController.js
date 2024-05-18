let homeController = {
    getHomePage(req, res) {
        if (!req.session.user_id) {
            // chua dang nhap
            res.render('home', {header0: true});
        } else {
            // da dang nhap
            res.render('home', {header2: true});
        }
        
    },
}

module.exports = homeController;