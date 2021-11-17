const dbhelpers = require('../models/dbHelpers')

const created = async (req, res) => {
    try{
        const producto = ({title, price, thumbnail} = req.body); //Una alternativa mas simple para escribir lo mismo de arriba
        await dbhelpers.addproduct(producto)
        res.redirect('/productos')
    } catch (err){
        res.status(400).json(err.message)
    }
}

module.exports = {
    created,
}