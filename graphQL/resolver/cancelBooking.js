const Booking = require('../../models/Booking');
const Event = require('../../models/Event');
const commonFn = require('./commonFn');

const cancelBooking = async ({bookingId}) => {
    try {        
        const booking = await Booking.findById(bookingId).populate('event');
        if(!booking) {
            throw new Error('No Booking was Found!');
        }
        const result = await Booking.deleteOne({_id: bookingId});

        return commonFn.transformEvent(booking.event);
    } catch (err) {
        throw err;
    }
}

module.exports = cancelBooking;