import express from 'express';
import { createEvent , deleteEvent , getEvent ,getAllEvents} from '../controller/EventController.js';
import protectRoute from '../middleware/protectRoute.js'


const router = express.Router();

router.post('/create' ,protectRoute, createEvent)
router.delete('/delete/:evid' ,protectRoute, deleteEvent)
router.get('/allevents',getAllEvents)
router.get('/:evid',getEvent)

export default router;