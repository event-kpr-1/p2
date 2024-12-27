import mongoose from "mongoose";

const NewEventSchema = mongoose.Schema({
    eventName : {
        type : String,
        required : true
    },
    subEvents : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Event",
            default : []
        }
    ],
    eventDetails : {
        type : String,
        required : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "AdminUser",
        required : true
    }
},{timestamps : true})

const Event = mongoose.model('Event' , NewEventSchema);
export default Event;