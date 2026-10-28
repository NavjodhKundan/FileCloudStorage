import jwt from "jsonwebtoken";

export function createToken(userId){
    return jwt.sign({sub:userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"1m"});
}

export function authToken(req, res, next){
}

export function refreshToken(){
    
}