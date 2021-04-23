  
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Hotel = require('./models/hotel')

const User = require('./models/user')

const Booking = require ('./models/booking')

const app = express();

const user = user_id => {
    return User.findById(user_id)
    .then(user=>{
        return { ...user._doc, _id: user_id}
    })
    .catch(err=> {
        throw err
    })
}

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
        type Hotel {
            hotel_id: ID!
            hotel_name: String!
            street: String!
            city: String!
            postal_code: String!
            price: Float!
            email: String!
            user_id: ID!
        }

        type User{
            user_id: ID!
            username: String!
            password:String
            email:String!
            userbooking: [Hotel!]
        }

        type Booking{
            booking_date: String!
            booking_start:String!
            booking_end:String!
        }

        input BookInput{
            booking_date: String!
            booking_start:String!
            booking_end:String!
        }
        input HotelInput{
            hotel_name: String!
            street: String!
            city: String!
            postal_code:String!
            price:Float!
            email:String!
        }

        input UserInput{
            username: String!
            email: String!
            password:String!
        }

        type RootQuery {
            showlist: [Hotel!]!
        }
        type RootMutation {
            AddHotel(hotelInput: HotelInput): Hotel
            AddUser(userInput: UserInput): User
            AddBooking(bookInput:BookInput): Booking
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      showlist: () => {
          return Hotel.find()
          .then (showlist =>{
              return showlist.map(list=>{
                  return {...list._doc, _id: list.id, booking: user.bind(this, list._doc.booking)};
              })
          }).catch( err=> {
              throw err
          })

      },
      AddHotel: args => {
         const hotel = new Hotel({
            hotel_name: args.hotelInput.hotel_name,
            street : args.hotelInput.street,
            city : args.hotelInput.city,
            postal_code : args.hotelInput.postal_code,
            price : args.hotelInput.price,
            email : args.hotelInput.email,
         })
         return hotel
         .save()
         .then(result =>{
             book = {...result._doc, _id: result._doc._id.toString()}
         })
        .catch(err =>{
             console.log(err)
             throw err;
         });
      },
      AddBooking: args =>{
        const booked = new Booking ({
            book_date: args.bookInput.book_date,
            book_start: args.bookInput.book_start,
            book_end:args.bookInput.book_end
        })
        return booked.save()
        .then(result =>{
            return {...result._doc, _id: result.id}
        }).catch(err=>{
            throw err
        })
      },
      AddUser: args => {
        const user = new User({
            username: args.userInput.username,
            password:args.userInput.password,
            email:args.userInput.email
        });
        return user.save()
        .then(result =>{
            return {...result._doc, _id: result.id}
        })
        .catch(err =>{
            throw err
        })
      }
    },
    graphiql: true
  })
);

mongoose.connect(`mongodb+srv://hcgh:giahao@cluster0.0uzi4.mongodb.net/Lab06?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(3000)
}).catch(err=>{
    console.log(err)
});
