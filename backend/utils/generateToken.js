import jwt from "jsonwebtoken";


const generateToken = async(id,name,res) => {
    const token = jwt.sign({id},process.env.JWT_STRING,{
        expiresIn : '1d'
    })
    
    res.cookie('jwt'||`${name}`,token,{
        maxAge : 1000*60*60*24*1,
        httpOnly : true,
        sameSite : 'strict',
        secure : (process.env.APP_ON === 'production')
    })
}

export default generateToken;