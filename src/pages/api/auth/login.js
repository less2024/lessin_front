import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export default function loginHandler(req,res){
    
    const {email,password} = req.body;

    if(email === 'aron@lessing.com' && password === '123'){
        const token = sign({
            exp: Math.floor(Date.now()/1000)+60*60*24*30,
            username:'aron',
            userId:1,
        },'secret');

        const serialized = serialize("lessingToken", token, {
            httpOnly: true,
            //secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: "/",
        });

        res.setHeader('Set-Cookie',serialized);
        return res.json('login successful');
    }
        
    return res.status(401).json({error:'invalid email or password'});

}