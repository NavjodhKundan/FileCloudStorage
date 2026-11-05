import jwt from "jsonwebtoken";

export function createToken(userId, firstName, lastName){
    return jwt.sign(
        {id:userId, firstName:firstName, lastName:lastName},
        process.env.ACCESS_TOKEN_SECRET,
        //{expiresIn:"1m"}
    );
}

export function verifyToken(req, res, next){
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({ message: "Access token not found." });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET);

        req.user = decoded;
        next();
    } catch(error) {
        return res.status(401).json({ message: "Invalid or expired access token." })
    }
}

export function refreshToken(){
    
}