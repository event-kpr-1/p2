import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js'
import AdminUser from '../model/AdminUserModel.js';


export const signup = async(req,res) => {
    try {
        
        const {username , password , email} = req.body;
        // USER
        const ExistingUser = await AdminUser.findOne({username})
        if(ExistingUser){
            return res.status(400).json({error : 'user exist'})
        }
        // EMAIL
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error : 'invalid email'})
        }
        const ExistingEmail = await AdminUser.findOne({email})
        if(ExistingEmail){
            return res.status(400).json({error : 'email exist'})
        }
        // PASSWORD
        const salt = await bcrypt.genSalt(5);
        const encryptedPassword = await bcrypt.hash(password , salt);

        // CREATING USER
        const newUser = new AdminUser({
            username : username,
            password : encryptedPassword,
            email : email
        })
        
        if(newUser){
            
            await newUser.save();
            await generateToken(newUser._id,newUser.username, res);
            return res.status(200).json({user : newUser.username})
        }else{
            return res.status(400).json({error : 'invalid user data'})
        }


    } catch (err) {
        console.log('error in signup-authController : ',err)
        return res.status(500).json({error : 'invernal server error'})
    }
    
}
export const login = async(req,res) => {
    try {
        console.log(req.body)
        const {email , password} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error : 'invalid email'})
        }
        
        // FINDING THE USER
        const user = await AdminUser.findOne({email})
        
        if(!user ){
            return res.status(404).json({error : 'user not found'})
        }
        const pass = await bcrypt.compare(password , user?.password || '')
        if(!pass ){
            return res.status(400).json({error : 'wrong password'})
        }
        generateToken(user._id , user.username, res);
        res.status(200).json({message : `logged in as ${user.username}`})
       

    } catch (err) {
        console.log('error in login-authController : ',err)
        return res.status(500).json({error : 'invernal server error'})
    }
}
export const logout = async(req , res) =>{
    try {
        // const user = await AdminUser.findOne({_id : req.AdminUser._id})
        // await res.cookie('jwt','',{maxage : 0})
        await res.cookie('jwt', '', { maxAge: 0, httpOnly: true, secure: false, path: '/' });
        res.status(200).json({message : 'logout success'})
    } catch (err) {
        console.log('error in logout-authController : ',err)
        return res.status(500).json({error : 'invernal server error'})
    }

}
export const getMe = async(req , res) =>{
    try {
        const user = await AdminUser.findOne({_id : req.AdminUser._id}).select('-password')
        res.status(200).json(user)
    } catch (err) {
        console.log('error in getme-authController : ',err)
        return res.status(500).json({error : 'invernal server error'})
    }

}