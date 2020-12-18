const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const { v4: uuidv4 } = require('uuid');

class Principle extends Model {}
Principle.init({
  id: { type: DataTypes.STRING, primaryKey: true },
  name: DataTypes.STRING,
}, { sequelize, modelname: 'principle' });

(async () => {
  await sequelize.sync();
  const prin1 = await Principle.create({
    id: uuidv4(),
    name: 'Early and Continuous Delivery of Valuable Software',
  });
  const prin2 = await Principle.create({
    id:  uuidv4(),
    name: 'Embrace Change',
  });
  const prin3 = await Principle.create({
    id:  uuidv4(),
    name: 'Frequent Delivery',
  });
  const prin4 = await Principle.create({
    id:  uuidv4(),
    name: 'Business and Developers Together',
  });
  const prin5 = await Principle.create({
    id:  uuidv4(),
    name: 'Motivated Individuals',
  });
  const prin6 = await Principle.create({
    id:  uuidv4(),
    name: 'Face-to-Face Conversation',
  });
  const prin7 = await Principle.create({
    id:  uuidv4(),
    name: 'Working Software',
  });
  const prin8 = await Principle.create({
    id:  uuidv4(),
    name: 'Technical Excellence',
  });
  const prin9 = await Principle.create({
    id:  uuidv4(),
    name: 'Simplicity',
  });
  const prin10 = await Principle.create({
    id:  uuidv4(),
    name: 'Self-Organizing Teams',
  });
  const prin11 = await Principle.create({ 
    id:  uuidv4(),
    name: 'Regular Reflection and Adjustment',
  });
  const prin12 = await Principle.create({ 
    id:  uuidv4(),
    name: 'They All Still Matter',
  });
})();


module.exports = Principle;