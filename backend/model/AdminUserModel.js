import mongoose from "mongoose";

const AdminUserSchema = mongoose.Schema({
    username : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true,
        
    },
    email : {
        type : String,
        require : true,
        unique : true
    }
    
},{
    timestamps : true
})

const AdminUser = mongoose.model('AdminUser' , AdminUserSchema);
export default AdminUser;