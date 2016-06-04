var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RetreatSchema = new Schema({
    createdAt           : { type: Date }
  , updatedAt           : { type: Date }
      
  , name                : String
  , center              : String
  , tradition           : String
  , teacher             : String
  , startsOn            : Date
  , startsOnMonth       : Number
  , startsOnDay         : Number
  , startsOnYear        : Number
  , daysLong            : Number
  , url                 : String
  , repeats             : Boolean
  , price               : Number

  , email               : String
  , phone               : String
  
  , address             : String
  , cityState           : String
  , postalCode          : String
  , country             : String
  
})

RetreatSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

var Retreat = mongoose.model('Retreat', RetreatSchema);

module.exports = Retreat;