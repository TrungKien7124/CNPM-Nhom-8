let homeController = {
    getHomePage(req, res) {
        res.render('home', {header2: true});
    },
}

module.exports = homeController;