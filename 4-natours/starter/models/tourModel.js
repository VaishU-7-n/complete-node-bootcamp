const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Tour must have name'],
    unique:true,
    trim:true

  },
duration: {
  type: String,
  required: [true, 'Tour must have duration']
},

maxGroupSize: {
  type: Number,
  required: [true, 'Tour must have max group size']
},
  difficulty:{
     type:String,
      required:[true,'Tour must have difficulty']

  },
  ratingsAverage:{
    type:Number,
   default:4.5
  },
  ratingsQuantity:{
     type:Number,
   default:0

  },
  price:{
    type:Number,
    required:[true,'tour must have price']
  },
  priceDiscount:{
    type:Number
  },
  summary:{
    type:String,
    trim:true,
    required:[true,'tour must have a description']
  },
  description:{
    type:String,
    trim: true
  },
  imageCover:{
    type:String,
    required:[true,'tour must have a cover']
  },
 images:[String],
    
    createdAt:{
      type:Date,
      default:Date.now()
    },
  startDates:[Date] 
});

const Tour = mongoose.model('Tour',tourSchema);

module.exports = Tour;