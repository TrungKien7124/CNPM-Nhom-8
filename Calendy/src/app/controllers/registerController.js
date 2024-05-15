// registerController.js
const bcrypt = require('bcrypt');
const { databaseQuery } = require('../../config/database.js');
const registerController = {
  renderRegisterPage(req, res) {
    res.render('login');
  },
  
  async registerUser(req, res) {
    const { username, password, securityPassword } = req.body;

    if (username.length < 8) {
      return res.status(400).json({ error: 'Username must be at least 8 characters long' });
    }

    if (password.length < 6 || securityPassword.length < 6) {
      return res.status(400).json({ error: 'Password and Security Password must be at least 6 characters long' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const hashedSecurityPassword = await bcrypt.hash(securityPassword, 10);

      const checkUserQuery = `SELECT * FROM users WHERE username = '${username}'`;
      const existingUser = await databaseQuery(checkUserQuery);

      if (existingUser.length > 0) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      const insertUserQuery = `INSERT INTO users (username, password, security_password) VALUES ('${username}', '${hashedPassword}', '${hashedSecurityPassword}')`;
      await databaseQuery(insertUserQuery);

      return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  async isUsernameExist(username) {
    const query = `SELECT COUNT(*) FROM users WHERE username = '${username}'`;
    const result = await databaseQuery(query, [username]);
    return result[0]['COUNT(*)'] > 0;
  },


  async resetPassword(req, res) {
    const { username, securityPassword, password, reenterPassword } = req.body;
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password and Security Password must be at least 6 characters long' });
    }
    if (password !== reenterPassword) {
      return res.status(400).json({ error: 'New passwords do not match' });
    }
  
    try {
      const checkUserQuery = `SELECT * FROM users WHERE username = '${username}'`;
      const user = await databaseQuery(checkUserQuery, [username]);
  
      if (user.length === 0) {
        return res.status(404).json({ error: 'Invalid username' });
      }
  
      const isSecurityPasswordValid = await bcrypt.compare(securityPassword, user[0].security_password);
  
      if (!isSecurityPasswordValid) {
        return res.status(401).json({ error: 'Invalid security password' });
      }
  
      const hashedNewPassword = await bcrypt.hash(password, 10);
  
      const updatePasswordQuery = `UPDATE users SET password = '${hashedNewPassword}' WHERE username = '${username}'`;
      await databaseQuery(updatePasswordQuery, [hashedNewPassword, username]);
  
      return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = registerController;