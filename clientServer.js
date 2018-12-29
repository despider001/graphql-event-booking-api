
// require('isomorphic-fetch');
// isomorphic-fetch unlocks the "browser" fetch method
// fetch('http://localhost:4000/graphql', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ query: '{  getEvent { title, description, date } }' }),
// })
//   .then(res => res.json())
//   .then(res => console.log(res.data));


const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

// example of a normal query
// fetch({
//   query: '{ getEvent { title }}',
// }).then(res => {
//   console.log(res.data);
// });

// example of mutation
// You can also easily pass variables for dynamic arguments
fetch({
  query: `mutation createEvent($title: String!, $description: String!, $date: String!, $price: Float!){
      createEvent(eventInput: {title: $title, description: $description, date: $date, price: $price}) {
    title,
    description,
    date,
  }}`,
  variables: { 
      title: "my new title",
      description: "my new description",
      date: "2018-12-28T08:53:58.330Z",
      price: 29.99
     },
}).then(res => {
  console.log(res.data);
});