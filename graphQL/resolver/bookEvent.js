const Booking = require('../../models/Booking');
const Event = require('../../models/Event');
const commonFn = require('./commonFn');

const bookEvent = async ({eventId}) => {

    const eventData = await Event.findById(eventId);

    const newBooking = new Booking({
        event: eventData.id,
        user: '5c256377a4e4ba3af08f84f9'
    });

    // console.log(newBooking);

    try {
        const result = await newBooking.save();
        return commonFn.transformBooking(result);     
    } catch (err) {
        throw err;
    }

}

module.exports = bookEvent;