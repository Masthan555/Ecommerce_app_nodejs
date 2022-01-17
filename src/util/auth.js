const jwt = require("jsonwebtoken");

function newToken(user){
    return jwt.sign({id: user.ID}, 'Masthan', {
        expiresIn: "10d"
    });
}

function verifyToken(token){
    try{
        let response = jwt.verify(token, 'Masthan');
        return response;
    }catch(err){
        console.log(err);
        return;
    }
}

module.exports = {newToken, verifyToken};