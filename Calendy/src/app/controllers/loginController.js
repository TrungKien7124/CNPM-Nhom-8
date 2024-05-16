const { databaseQuery } = require('../../config/database.js');
const bcrypt = require('bcrypt');

async function checkCredentials(username, password) {
  try {
    const query = `SELECT * FROM users WHERE username = '${username}'`;
    const [user] = await databaseQuery(query, [username]);

    if (!user) {
      return { valid: false, error: 'Invalid username or password' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { valid: false, error: 'Invalid username or password' };
    }

    return { valid: true, userId: user.id };
  } catch (error) {
    console.error('Error checking user credentials:', error);
    return { valid: false, error: 'An error occurred while checking user credentials' };
  }
}

let loginController = {
  renderLoginPage(req, res) {
    res.render('login');
  },

  login(req, res) {
    const { username, password } = req.body;
  
    checkCredentials(username, password)
      .then(({ valid, userId, error }) => {
        if (!valid) {
          return res.status(401).json({ error });
        }
  
        req.session.user_id = userId;
        return res.status(200).json({ message: 'Login successful' });
      })
      .catch((err) => {
        console.error('Error logging in:', err);
        return res.status(500).json({ error: 'An error occurred while logging in' });
      });
  },

  logout(req, res) {
    req.session.user_id = null;
    return res.status(200).json({ message: 'Logout successfully!' });
  }
}

module.exports = loginController;