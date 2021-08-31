const fs = require('fs')

const { topping } = require('../../models')

exports.getToppings = async (req, res) => {
    try {
        const toppings = await topping.findAll({
            attributes: {
                exclude: ["createdAt","updatedAt"]
            },
        })

        res.send({
            status: 'success',
            data: {
                toppings,
            }
        })
    }catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Server Error'
        })
    }
}

exports.getTopping = async (req, res) => {
    try {
        const { id } = req.params
        const toppings = await topping.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt","updatedAt"]
            },
        })

        res.send({
            status: 'success',
            data: {
                toppings,
            }
        })
    }catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Server Error'
        })
    }
}

exports.addTopping = async (req, res) => {
    if(!req.body.title || !req.body.price){    
        fs.unlink("./uploads/toppings/"+req.file.filename, (err) => {
            if (err) {
            console.error(err)
            }
        })
        
        return res.status(500).send({
            status: "failed",
            message: "No data",
        });
    }
    try {
        const newTopping = await topping.create({
            title: req.body.title,
            price: req.body.price,
            image: req.file.filename
        })

        res.status(200).send({
            status: 'success',
            data: {
                title: newTopping.title,
                price: newTopping.price,
                image: newTopping.image
            }
        })
        
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
}

exports.updateTopping = async (req, res) => {
    const { id } = req.params
    const toppings = req.body

    if(req.file){
        toppings.image = req.file.filename
        const {image} = await topping.findOne({
            where: {
                id,
            },
            attributes: ["image"]
        })

        fs.unlink("./uploads/toppings/"+image, (err) => {
            if (err) {
              console.error(err)
            }
        })
    }
    console.log(toppings)
    try {

        await topping.update(toppings,{
            where: {
                id
            }
        })

        const data = await topping.findOne({ 
            where: { id },
            attributes: {
                exclude: ["createdAt","updatedAt"]
            }
        })

        res.status(200).send({
            status: 'success',
            data: {
                data
            }
        })
        
    }catch(error){
        res.status(500).send({
            status: 'error',
            message: 'Server Error'
        })
    }
}

exports.deleteTopping = async (req, res) => {
    
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const toppings = await product.findOne({
            where: {
                id,
            },
            attributes: ["image"]
        })

        const data = await product.destroy({
            where: { id }
        })

        fs.unlink("./uploads/toppings/"+toppings.image, (err) => {
            if (err) {
              console.error(err)
            }
        })

        res.send({
            status: 'success',
            data: {
                "id": data
            }
        })
    }catch(error) {
        res.send({
          status: "failed",
          message: "Server Error",
        });
    }
}
}