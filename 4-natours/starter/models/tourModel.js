const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Tour must have name'],
    unique:true,
    trim:true

  },
  slug:{
    type:String
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
      default:Date.now(),
      selected:false
    },
  startDates:[Date] 
  ,
  secretTour:{
    type:Boolean,
    default:false

  }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
  });
tourSchema.virtual('durationWeeks').get(function() {
  return this.duration/7;
});
//DOCUMENT MIDDLEWARE, RUNS BEFORE SAVE COMMAND, CREATE

tourSchema.pre('save',function(next){
this.slug=slugify(this.name,{lower:true});
next();
});

tourSchema.post('save',function(doc,next){
  console.log(doc);
  next();
});

//AGGREGATION MIDDLEWARE

tourSchema.pre('aggregate',function(next){
  console.log(this.pipeline());
  next();
})

const Tour = mongoose.model('Tour',tourSchema);

module.exports = Tour;