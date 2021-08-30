const { user } = require('../../models')

exports.getUsers = async (req, res) => {
    try {
        const users = await user.findAll({
            attributes: {
                exclude: ["status","password","createdAt","updatedAt"]
            },
        })

        res.send({
            status: 'success',
            data: {
                users
            }
        })
    }catch(error) {
        res.status(500).send({
            status: 'error',
            message: 'Server Error'
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        await user.destroy({
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