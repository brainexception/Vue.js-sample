let Principle = require('../models/Principle.model');
const { v4: uuidv4 } = require('uuid');

exports.deletePrinciple = async(req, res) => {
    let id = req.params.id;
   
    if (!id) {
        res.status(500).send('No Selected');
        return;
    }
   
    await Principle.destroy({
        where: {
          _id: id
        }
      });
              res.send("success")
            return
}

exports.updatePrinciple =async(req, res) => {
    let id = req.body.id;
    
    if (!id) {
        res.status(500).send('No Selected');
        return;
    }

    if (!id) {
        res.status(500).send('No Selected');
        return;
    }

    await Principle.update({ name: req.body.name }, {
        where: {
            id: id
        }
      });
              res.send("success");
            
            return;
}

exports.getPrinciple = async(req, res) => {
  
    const principle =await  Principle.findAll();
     console.log("All principles:", JSON.stringify(principle, null, 2));
        res.json(principle);
        return;
}

exports.createPrinciple = function (req, res) {
    
    let _principleObj = new Principle(req.body)
    _principleObj.id = uuidv4();
    _principleObj.save(function(err, _principle) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(_principle);
        return;
    });
}