const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SegmentObject = {
    flight: String,
    fromCode: String,
    toCode: String,
    seats: [String],
    departTime: String,
    arrivalTime: String
};

const FlightObject = {
    duration: String,
    price: Number,
    segments: [SegmentObject]
};

const TravelObject = {
    id: String,
    passengers: Number,
    parting: FlightObject,
    returning: FlightObject
};

const UserInfoModelSchema =  new Schema({
    user: String,
    booked: TravelObject,
    purchased: [TravelObject]
});

module.exports = UserInfoModelSchema;