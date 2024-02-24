require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var maximus = new Person({name: "Satyajeet Mahato", age: 24, favoriteFoods: ["Chicken Chowmin", "Chicken Lollipop"]});
  maximus.save(function(err, data){
    if(err) return console.error(err);

    done(null,data);
  });
};

var arrayOfPeople = [
  {name: "Monu", age: 20, favoriteFoods: ["Chicken Chowmin", "Chicken Biryani"]},
  {name: "Sudevi Mahato", age: 48, favoriteFoods: ["Paneer"]},
  {name: "Nilamber Mahato", age: 52, favoriteFoods: ["Chicken"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  });
};

var personName = "Monu";

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  })
};

var food = "Chicken Chowmin";
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  var foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err) return console.error(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) return console.error(err);
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId}, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age:0}).exec(function(err, data){
    if(err) return console.error(err);
    done(err, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
