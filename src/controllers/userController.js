const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../util/auth");

module.exports = {
    signupUser : function(req, res){
        var body = req.body;
        if(body.username && body.password){
            
            userModel.getUserDetails(body, function(err, result){
                var resBody = {};
                if(err){
                    resBody.success = false;
                    resBody.message = "Some Error occurred while fetching user details";
                    res.status(500).send(resBody);
                }

                if(result.length>0){
                    resBody.success = true;
                    resBody.message = body.username + " already exists.";

                    res.status(200).send(resBody);
                }else{
                    userModel.signupUser(body, function(err, results){
                        if(err){
                            resBody.success = false;
                            resBody.message = "Some Error while inserting data";
                            res.status(501).send(resBody);
                        }
                        resBody.success = true;
                        resBody.message = "Successfully Signed up with " + body.username;
                        res.status(200).send(resBody);
                    });
                }
            });
        }
    },

    loginUser : function(req, res){
        var body = req.body;
        var resBody = {};
        if(body.username && body.password){
            userModel.loginUser(body, function(err, result){
                if(err){
                    resBody.success = false;
                    resBody.message = "Error occurred while fetching user details";
                    res.status(500).send(resBody);
                    return;
                }
                if(result.length>0){
                    resBody.success = true;
                    resBody.message = "Successfully Signed In with user: " + body.username;
                    res.status(201).send(resBody);
                }else{
                    resBody.success = false;
                    resBody.message = "User doesnt exist";
                    res.status(501).send(resBody);
                }
            });
        }else{
            resBody.success = false;
            resBody.message = "Please provide valid credentials";

            res.status(501).send(resBody);
        }
    },

    strongSignup: function(req, res){
        var body = req.body;
        var resBody = {};
        if(body.username && body.password){
            userModel.getUserDetails(body, function(err, result){
                
                if(err){
                    resBody.success = false;
                    resBody.message = "Some Error occurred while fetching user details";
                    res.status(500).send(resBody);
                }

                if(result.length>0){
                    resBody.success = true;
                    resBody.message = body.username + " already exists.";

                    res.status(200).send(resBody);
                }else{
                    // Before signup encrypt password using bcryptx
                    bcrypt.hash(body.password, 8, function(err, hash){
                        if(err){
                            console.log("Error while encrypting password");
                            return;
                        }
                        body.password = hash;
                        
                        userModel.signupUser(body, function(err, results){
                            if(err){
                                resBody.success = false;
                                resBody.message = "Some Error while inserting data";
                                res.status(501).send(resBody);
                            }
                            resBody.success = true;
                            resBody.message = "Successfully Signed up with " + body.username;
                            res.status(200).send(resBody);
                        });
                    });
                }
            });
        }else{
            resBody.success = false;
            resBody.message = "Please provide valid credentials";

            res.status(501).send(resBody);
        }
    },

    strongLogin : function(req, res){
        var body = req.body;
        var resBody = {};
        if(body.username && body.password){
            userModel.getUserDetails(body, function(err, result){
                if(err){
                    resBody.success = false;
                    resBody.message = "Error occurred while fetching user details";
                    res.status(500).send(resBody);
                    return;
                }
                if(result.length>0){
                    // Compare password with bcrypt compareSync
                    let isValid = bcrypt.compareSync(body.password, result[0].Password);
                    if(isValid){
                        try{
                            resBody.auth = auth.newToken(result[0]);
                        }catch(err){
                            console.log(err);
                        }
                        resBody.success = true;
                        resBody.message = "Successfully Signed In with user: " + body.username;
                        return res.status(201).send(resBody);
                    }else{
                        resBody.success = false;
                        resBody.message = "Invalid Password";
                        return res.status(501).send(resBody);
                    }
                }else{
                    resBody.success = false;
                    resBody.message = "User doesnt exist";
                    return res.status(501).send(resBody);
                }
            });
        }else{
            resBody.success = false;
            resBody.message = "Please provide valid credentials";

            res.status(501).send(resBody);
        }
    },

    isAuthenticated: function(req, res, next){
        console.log(req.headers);
        let token = req.headers.auth;
        let response;
        let resBody = {};

        if(token){
            try{
                response = auth.verifyToken(token);
            }catch(err){
                console.log(err);
                return;
            }
    
            console.log("Auth Response: ", response);
            userModel.getUserById(response, (err, result)=>{
                if(err){
                    resBody.success = false;
                    resBody.message = "Invalid User";
                    return res.status(401).send(resBody);
                }
                console.log("Authentication Verified");
                next();
            });
        }else{
            resBody.success = false;
            resBody.message = "Invalid User";
            return res.status(401).send(resBody);
        }
    }

};
