const Event = require('../../models/Event');
const User = require('../../models/User');

const commonFn = {}

commonFn.user = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            password: null,
           eventsCreated: commonFn.events.bind(this, user.eventsCreated)
        }
    } catch (err) {
        throw err;
    }

}

commonFn.events = async eventIds => {
    try {
        const events = Event.find({_id: {$in: eventIds}});
        return events.map(event => {
            return commonFn.transformEvent(event);
        });
        
    } catch (err) {
        throw err;
    }
}
commonFn.eventSingle = async eventId => {
    try {
        const event = await Event.findById(eventId);

        return commonFn.transformEvent(event);
        
    } catch (err) {
        throw err;
    }
}

commonFn.transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        createdBy: commonFn.user.bind(this, event.createdBy)
    }
}

commonFn.transformBooking = (result) => {
    return {
        ...result._doc,
        _id: result.id,
        event: commonFn.eventSingle.bind(this, result._doc.event),
        user: commonFn.user.bind(this, result._doc.user),
        createdAt: new Date(result._doc.createdAt).toISOString(), 
        updatedAt: new Date(result._doc.updatedAt).toISOString(), 
    } 
}

module.exports = commonFn;