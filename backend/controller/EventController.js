import Event from "../model/NewEventModel.js";

export const createEvent = async(req , res) => {
    try {
        const {eventName , eventDetails } = req.body;
        const createdBy = req.AdminUser._id;

        if(!eventName || !eventDetails){
            return res.status(400).json({error : 'need all infos'})
        }

    const event = new Event({
        eventName,
        eventDetails,
        createdBy
    })

    if(event){
        await event.save();
        console.log(event)
        return res.status(200).json({message : 'event created'})
    }

    return res.status(400).json({error : 'data not enough'})


    } catch (err) {
        console.log('error in eventController createEvent : ',err)
        return res.status(500).json({error : 'internal server error'})
    }
}
export const deleteEvent = async(req , res) => {
    try {
        const {evid} = req.params;
        const event = await Event.findOne({_id : evid})
        if(!event){
            return res.status(404).json({error : 'no event found'})
        }
        console.log(event.createdBy.toString() ,'\n', req.AdminUser._id.toString())
        if(event.createdBy.toString() !== req.AdminUser._id.toString()){
            return res.status(400).json({error : 'illegal to delete'})
        }

        await Event.findByIdAndDelete({_id : evid})
                         

        return res.status(200).json({message : `${event.eventName} deleted`})

    } catch (err) {
        console.log('error in eventController deleteEvent : ',err)
        return res.status(500).json({error : 'internal server error'})
    }
}
export const getEvent = async(req , res) => {
    try {
        const {evid} = req.params;
        const event = await Event.findOne({_id : evid})
        if(!event){
            return res.status(404).json({error : 'no event found'})
        }
    
        return res.status(200).json({event})
        
    } catch (err) {
        console.log('error in eventController getEvent : ',err)
        return res.status(500).json({error : 'internal server error'})
    }
}
export const getAllEvents = async(req , res) => {
    try {
        
        const event = await Event.find().sort({createdAt : 1}).populate({
            path : 'createdBy',
            select : 'username'
        })

        if(!event){
            return res.status(404).json({error : 'no event found'})
        }else if(event.length ===0){
            return res.status(200).json([])
        }
    
        return res.status(200).json(event)
        
    } catch (err) {
        console.log('error in eventController getallEvent : ',err)
        return res.status(500).json({error : 'internal server error'})
    }
}
