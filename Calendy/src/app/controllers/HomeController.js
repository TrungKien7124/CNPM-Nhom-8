let homeController = {
    getHomePage(req, res) {
        const userId = req.session.user_id;
        res.render('home', { userId });
      },
}

module.exports = homeController;