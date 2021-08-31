const { product, topping, transaction, transactiondetail, orderitem, ordertopping } = require('../../models')
const jwt = require('jsonwebtoken')

exports.getTransactions = async (req, res) => {
    try {
        const data = await transaction.findAll({
            attributes: ['id','status'],
            include: [
                {
                    model: transactiondetail,
                    as: "userOrder",
                    attributes:["id", "fullName", "email"]
                },
                {
                    model: orderitem,
                    as: "order",
                    attributes: {
                        exclude: ["transactionId","productId","createdAt", "updatedAt"],
                    },
                    include: {
                        model: ordertopping,
                        as: "toppings",
                        attributes: [['toppingId', 'id'],'title']
                    }
                }
            ],
        })

        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'server error'
        })
    }
}

exports.getTransaction = async (req, res) => {
    try {
        const data = await transaction.findAll({
            where : {
                id: req.params.id,
            },
            attributes: ['id','status'],
            include: [
                {
                    model: transactiondetail,
                    as: "userOrder",
                    attributes:["id", "fullName", "email"]
                },
                {
                    model: orderitem,
                    as: "order",
                    attributes: {
                        exclude: ["transactionId","productId","createdAt", "updatedAt"],
                    },
                    include: {
                        model: ordertopping,
                        as: "toppings",
                        attributes: [['toppingId', 'id'],'title']
                    }
                }
            ],
        })

        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'server error'
        })
    }
}

exports.addTransaction = async (req, res) => {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(' ')[1]
    const verified = jwt.verify(token, process.env.TOKEN)

    try {
        const details = await transactiondetail.create(req.body.userOrder)

        const order = await transaction.create({
            userId: verified.id,
            orderDetailId: details.id,
            status: 'waiting'
        })
        
        req.body.products.forEach(async v => {
            console.log(v)
            const produk = await product.findOne({
                where: {
                    id: v.id,
                }
            })

            const item = await orderitem.create({
                transactionId: order.id,
                productId: produk.id,
                title: produk.title,
                price: produk.price,
                image: produk.image,
                qty: 1
            })

            v.toppings.forEach(async toppingId => {
                const toping = await topping.findOne({
                    where: {
                        id: toppingId
                    }
                })

                await ordertopping.create({
                    orderId: item.id,
                    toppingId: toppingId,
                    title: toping.title,
                    price: toping.price,
                })
            })
        })

        res.send({
            status: 'success',
            message: 'Transaction added'
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'server error'
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

exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params
        
        const data = await transaction.update(
            req.body,{
            where: {
                id
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

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params

        await transaction.destroy({
            where: { id }
        })

        res.send({
            status: 'success',
            data: {
                id: id
            }
        })
    }catch(error) {
        console.log(error);
        res.send({
          status: "failed",
          message: "Server Error",
        });
    }
}

exports.getTransactionByUser = async (req, res) => {
    
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(' ')[1]
    const verified = jwt.verify(token, process.env.TOKEN)
    
    console.log(verified.id)
    try {
        const data = await transaction.findAll({
            where: { 
                userId: verified.id
            },
            attributes: ['id','status'],
            include: [
                {
                    model: transactiondetail,
                    as: "userOrder",
                    attributes:["id", "fullName", "email"]
                },
                {
                    model: orderitem,
                    as: "order",
                    attributes: {
                        exclude: ["transactionId","productId","createdAt", "updatedAt"],
                    },
                    include: {
                        model: ordertopping,
                        as: "toppings",
                        attributes: [['toppingId', 'id'],'title']
                    }
                }
            ],
        })

        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'server error'
        })
    }
}