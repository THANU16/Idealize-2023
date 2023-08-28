const jwt = require('jsonwebtoken');

function decodeUserId(token){
    // Verify and decode the token to access the user ID
    const secretKey = 'secret_key';

    try {
      const decoded = jwt.verify(token, secretKey);
      const userId = decoded.userId;

      return userId;
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    return false;
    }

    
}

module.exports = decodeUserId;

  