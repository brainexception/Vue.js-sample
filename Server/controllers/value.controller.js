let Value = require('../models/Value.model');
const { v4: uuidv4 } = require('uuid');

exports.deleteValue = async (req, res) => {
    let id = req.params.id;

    if (!id) {
        res.status(500).send('No Selected');
        return;
    }

    await Value.destroy({
        where: {
            id: id
        }
    });
    res.send("success")
    return
}

exports.updateValue = async (req, res) => {
    let id = req.body.id;
    //console.log(JSON.stringify(req.params));
    //console.log(JSON.stringify(req.body));
    if (!id) {
        res.status(500).send('No Selected');
        return;
    }

    const result = await Value.update(
        { name: req.body.name },
        { where: { id: id } }
    );
    res.send("success");

    return;
}

exports.getValue = async (req, res) => {
    const value = await Value.findAll();
    res.json(value);
    return;
}
exports.createValue = function (req, res) {

    let _valueObj = new Value(req.body)
    _valueObj.id = uuidv4();
    _valueObj.save(function (err, _value) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(_value);
        return;
    });
}