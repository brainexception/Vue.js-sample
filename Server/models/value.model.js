
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const { v4: uuidv4 } = require('uuid');

class Value extends Model {}
Value.init({
  _id: DataTypes.STRING,
  Name: DataTypes.STRING,
  CreatedDate: DataTypes.DATE
}, { sequelize, modelName: 'value' });

(async () => {
  await sequelize.sync();
  const val1 = await Value.create({
    _id: uuidv4(),
    Name: 'Individuals and interactions',
    CreatedDate: new Date(1980, 6, 20)
  });
  const val2 = await Value.create({
    _id: uuidv4(),
    Name: 'Working software',
    CreatedDate: new Date(1980, 6, 20)
  });
  const val3 = await Value.create({
    _id: uuidv4(),
    Name: 'Customer collaboration',
    CreatedDate: new Date(1980, 6, 20)
  });
  const val4 = await Value.create({
    _id: uuidv4(),
    Name: 'Responding to change',
    CreatedDate: new Date(1980, 6, 20)
  });
  
})();
module.exports = Value;
