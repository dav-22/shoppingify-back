const jwt = require('jwt-simple');
const moment = require('moment');
require('../db-config');

const checkToken = (req, res, next) => {
    
    if(!req.headers['authorization']) {
        return res.json({ error: 'Not token found' });
    }

    const token = req.headers['authorization'];

    let payload = {};

    try {
        
        payload = jwt.decode(token,  process.env.SECRET_KEY);
    } catch (err) {
        return res.json({ error: 'Invalid token' });
    }
    
    if(payload.expiredAt < moment().unix()) {
        res.json({ error: 'Expired token' });
    }

    req.userId = payload.userId;

    next();
}

module.exports = {
    checkToken: checkToken  
}