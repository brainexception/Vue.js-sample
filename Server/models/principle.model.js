const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const { v4: uuidv4 } = require('uuid');

class Principle extends Model {}
Principle.init({
  _id: DataTypes.STRING,
  Name: DataTypes.STRING,
  CreatedDate: DataTypes.DATE
}, { sequelize, modelName: 'principle' });

(async () => {
  await sequelize.sync();
  const prin1 = await Principle.create({
    _id: uuidv4(),
    Name: 'Early and Continuous Delivery of Valuable Software',
    CreatedDate: new Date(1980, 6, 20)
  });
  prin2 = await Principle.create({
    _id: uuidv4(),
    Name: 'Embrace Change',
    CreatedDate: new Date(1980, 6, 20)
  });
  prin3 = await Principle.create({
    _id: uuidv4(),
    Name: 'Frequent Delivery',
    CreatedDate: new Date(1980, 6, 20)
  });
  prin4 = await Principle.create({
    _id: uuidv4(),
    Name: 'Business and Developers Together',
    CreatedDate: new Date(1980, 6, 20)
  });
  prin5 = await Principle.create({
    _id: uuidv4(),
    Name: 'Motivated Individuals',
    CreatedDate: new Date(1980, 6, 20)
  });
  prin6 = await Principle.create({
    _id: uuidv4(),
    Name: 'Face-to-Face Conversation',
    CreatedDate: new Date(1980, 6, 20)
  });
  prin7 = await Principle.create({
    _id: uuidv4(),
    Name: 'Working Software',
    CreatedDate: new Date(1980, 6, 20)
  });
  prin8 = await Principle.create({
    _id: uuidv4(),
    Name: 'Technical Excellence',
    CreatedDate: new Date(1980, 6, 20)
  });
  prin9 = await Principle.create({
    _id: uuidv4(),
    Name: 'Simplicity',
    CreatedDate: new Date(1980, 6, 20)
  });
  prin10 = await Principle.create({
    _id: uuidv4(),
    Name: 'Self-Organizing Teams',
    CreatedDate: new Date(1980, 6, 20)
  });
  prin11 = await Principle.create({
    _id: uuidv4(),
    Name: 'Regular Reflection and Adjustment',
    CreatedDate: new Date(1980, 6, 20)
  });
  prin12 = await Principle.create({
    _id: uuidv4(),
    Name: 'They All Still Matter',
    CreatedDate: new Date(1980, 6, 20)
  });


})();


module.exports = Principle;