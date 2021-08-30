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

exports.register = async (req, res) => {
    const schema = Joi.object({
        fullName: Joi.string().min(1).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required()
    })

    const { error } = schema.validate(req.body)
    
    if(error) 
        return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })

    const userExist = await user.findOne({
        where: { 
            email: req.body.email
        },
        attributes: ["id"],
    })

    if(userExist)
        return res.status(400).send({
            status: "failed",
            message: "User Already Registered",
        })
        
    try {
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await user.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            status: 'user'
        })

        console.log(newUser)

        const token = jwt.sign({
            id: newUser.id,
            role: newUser.status,
        }, process.env.TOKEN)

        res.status(200).send({
            status: 'success',
            data: {
                fullName: newUser.fullName,
                token
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
}
