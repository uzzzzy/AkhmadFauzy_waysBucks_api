const { user } = require('../../models')

const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required()
    })

    const { error } = schema.validate(req.body)
    
    if(error){
        return res.status(400).send({
            error: {
                message: error.details[0].message,
              },
        })
    }

    try {
        const userExist = await user.findOne({
            where: { 
                email: req.body.email
            },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
        })

        const isValid = await bcrypt.compare(req.body.password, userExist.password)

        if (!isValid) {
            return res.status(400).send({
              status: "failed",
              message: "credential is invalid",
            });
        }

        const token = jwt.sign({id: userExist.id, role: userExist.status}, process.env.TOKEN)

        res.status(200).send({
            status: "success",
            data: {
                fullName: userExist.fullName,
                email: userExist.email,
                token
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
        status: "failed",
        message: "Server Error",
        });
    }

    
}