const Event = require('../../models/Event');
const commonFn = require('./commonFn');

const getEvent = async function () {
  try {
    const events = await Event.find({});
    return events.map(event => {
        return commonFn.transformEvent(event);
      }
    )
  } catch (err) {
    throw err;
  }

  }

  module.exports = getEvent;