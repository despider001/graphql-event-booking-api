const { buildSchema } = require('graphql');

const schema = buildSchema(`
type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  createdBy: User!
}

type User {
  _id: ID!
  email: String!
  password: String
  eventsCreated: [Event!]
}

type Booking {
  _id: ID!
  event: Event!
  user: User!
  createdAt: String!
  updatedAt: String!
}

input UserInput {
  email: String!
  password: String!

}

input EventInput {
  title: String!
  description: String!
  price: Float
  date: String!
}

type Query {
  getEvent: [Event!]!
}

type Mutation {
  createEvent(eventInput: EventInput): Event
  createUser(userInput: UserInput): User
  bookEvent(eventId: String!): Booking!
  cancelBooking(bookingId: String!): Event!
}
`);

module.exports = schema;