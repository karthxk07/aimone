const jwt = require('jsonwebtoken');


const authMiddleware = (req,res)=>{
    const cookies = req.cookies;

    validateAccessToken(cookies.accessToken);

}

const validateAccessToken = (accessToken)=>{

    const user = jwt.verify(accessToken,process.env.SECRECT_KEY);
}


module.exports = {authMiddleware};