const getEvent = require('./getEvent');
const createUser = require('./createUser');
const createEvent = require('./createEvent');
const bookEvent = require('./bookEvent');
const cancelBooking = require('./cancelBooking');

const root = {
    getEvent: getEvent,
    createEvent: createEvent,
    createUser: createUser,
    bookEvent: bookEvent,
    cancelBooking: cancelBooking,
}

module.exports = root;