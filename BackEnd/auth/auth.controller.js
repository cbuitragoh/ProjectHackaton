const { User } = require("../users/user.schema");


exports.login = async (req, res, next) => {
    var body = req.body;
    try {
        const user = await User.find({email: body.email});
        if (!user.length) {return res.status(404).send('User not found')}
        if (!user[0].active) {return res.status(401).send('User not authorized')}
        /* if (bcrypt.compareSync(body.password, user[0].password)) {
            user[0].password = null;
            const token = getToken(user[0]);
            return res.status(200).json({
                ...user[0]._doc,
                token,
                locations
            })
        } else {
            return res.status(401).send('Unauthorized');
        }  */   

        return user[0].password === body.password ? res.status(200).send(user[0]) : res.status(401).send('Unauthorized');
    } catch (error) {
        console.log(error)
        returnres.status(500).send(error.message || error);
    }
}