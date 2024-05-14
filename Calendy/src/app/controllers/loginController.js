let loginController = {
    renderLoginPage(req, res) {
        res.render('login');
    },

    login(req, res) {
        req.session.user_id = 1;
        return res.status(200).json({user_id: req.session.user_id, message: 'Login successfully!'});
    },

    logout(req, res) {
        req.session.user_id = null;
        return res.status(200).json({message: 'Logout successfully!'});
    }
}

module.exports = loginController;