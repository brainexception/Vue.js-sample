let Value = require('../models/Value.model');


exports.deleteValue = async(req, res) => {
    let id = req.params.id;
   
    if (!id) {
        res.status(500).send('No Selected');
        return;
    }

    await Value.destroy({
        where: {
          _id: id
        }
      });
              res.send("success")
            return
}

exports.updateValue = async (req, res) => {
	let id = req.params.id;
    if (!id) {
        res.status(500).send('No Selected');
        return;
    }
    
    await Value.update({ Name: req.body.Name,CreatedDate: req.body.CreatedDate }, {
        where: {
            _id: id
        }
      });
              res.send("success");
            
            return;
}

exports.getValue = async (req, res) => {
   
    const value =await  Value.findAll();
         res.json(value);
        return;

}
exports.createValue = function (req, res) {
    
    let _valueObj = new Value(req.body)
    _valueObj.save(function(err, _value) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(_value);
        return;
    });
}