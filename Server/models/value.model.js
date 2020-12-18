
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const { v4: uuidv4 } = require('uuid');

class Value extends Model {}
Value.init({  
  id: { type: DataTypes.STRING, primaryKey: true },
  name: DataTypes.STRING,
}, { sequelize, modelName: 'value' });

(async () => {
  await sequelize.sync();
  const val1 = await Value.create({
    id: uuidv4(),
    name: 'Individuals and interactions',
  });
  const val2 = await Value.create({
    id: uuidv4(),
    name: 'Working software',
  });
  const val3 = await Value.create({
    id: uuidv4(),
    name: 'Customer collaboration',
  });
  const val4 = await Value.create({
    id: uuidv4(),
    name: 'Responding to change',
  });
  
})();
module.exports = Value;
