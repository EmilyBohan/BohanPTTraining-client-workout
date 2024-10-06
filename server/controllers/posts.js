// const cloudinary = require("../middleware/cloudinary");
const { ObjectId } = require("mongodb");

module.exports = {
    getProfile: async (req, res) => {
        try {
            if(req.user) {
                res.status(200).json({ userName: req.user.userName, email: req.user.email })
            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }
};
