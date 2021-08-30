const fs = require('fs')

const { product } = require('../../models')

exports.getProducts = async (req, res) => {
    try {
        const products = await product.findAll({
            attributes: {
                exclude: ["createdAt","updatedAt"]
            },
        })

        res.send({
            status: 'success',
            data: {
                products,
            }
        })
    }catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Server Error'
        })
    }
}

exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const products = await product.findOne({
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
                products,
            }
        })
    }catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Server Error'
        })
    }
}

exports.addProduct = async (req, res) => {
    
    try {
        const newProduct = await product.create({
            title: req.body.title,
            price: req.body.price,
            image: req.file.filename
        })

        res.status(200).send({
            status: 'success',
            data: {
                title: newProduct.title,
                price: newProduct.price,
                image: newProduct.image
            }
        })
        
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
}

exports.updateProduct = async (req, res)=> {

    const { id } = req.params
    const products = req.body

    if(req.file){
        products.image = req.file.filename
        const {image} = await product.findOne({
            where: {
                id,
            },
            attributes: ["image"]
        })

        fs.unlink("./uploads/"+image, (err) => {
            if (err) {
              console.error(err)
            }
        })
    }
    
    try {

        await product.update(products,{
            where: {
                id
            }
        })

        const data = await product.findOne({ 
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

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const products = await product.findOne({
            where: {
                id,
            },
            attributes: ["image"]
        })

        const data = await product.destroy({
            where: { id }
        })

        fs.unlink("./uploads/"+products.image, (err) => {
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