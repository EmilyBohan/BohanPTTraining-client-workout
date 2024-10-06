module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(401).json({ message: 'Unauthorized.' })
        }
    },
    ensureGuest: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            res.status(403).json({ message: 'Forbidden.' })
        }
    },
};