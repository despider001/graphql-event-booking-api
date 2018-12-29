const Event = require('../../models/Event');
const User = require('../../models/User');
const commonFn = require('./commonFn');

const createEvent = async function (args) {
    const {title, description, price, date} = args.eventInput;
    let newEvent = new Event({
      title: title,
      description: description,
      price: +price,
      date: new Date(date),
      createdBy: '5c256377a4e4ba3af08f84f9'     
    });

    try {
      savedEvent = await newEvent.save();
      createdEvent = commonFn.transformEvent(savedEvent);

       const createdBy = await User.findById('5c256377a4e4ba3af08f84f9');
       if(!createdBy) {
         throw new Error('No user found!');
       }
       createdBy.eventsCreated.push(newEvent)
       await createdBy.save();
       return createdEvent;
      
    } catch (err) {
      throw err;
    }
  }

  module.exports = createEvent;