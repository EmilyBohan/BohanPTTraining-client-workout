const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");


// When user logs in with their account
exports.postLogin = (req, res, next) => {
    const validationErrors = [];
    
    // Validate email format
    if (!validator.isEmail(req.body.email))
        validationErrors.push({ msg: "Please enter a valid email address." });

    // Handle validation errors
    if (validationErrors.length) {
        return res.status(400).json({ errors: validationErrors })
    }

    // Normalize email
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false,
    });

    // Authenticate user
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Server error during authentication'})
        }
        if (!user) {
            return res.status(401).json({message: 'User not found.'})
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Server error during login.' })
            }
            // Log headers
            console.log('Response Headers:', res.getHeaders());
            res.status(200).json({ user: { userName: user.userName, email: user.email }}) // If successful, return the user details as a JSON response
        });
    })(req, res, next);
};

// When user logs out
exports.logout = (req, res) => {
    req.logout(() => {
        res.status(200).json({ message: 'User has logged out.' })
    })
    req.session.destroy((err) => {
        if (err)
            res.status(500).json({ message: err })
        req.user = null;
    });
};

// When user signs up with a brand new account
exports.postSignup = (req, res, next) => {
    const validationErrors = [];

    // Validate email format
    if (!validator.isEmail(req.body.email))
        validationErrors.push({ msg: "Please enter a valid email address." });

    // Validate password length
    if (!validator.isLength(req.body.password, { min: 8 }))
        validationErrors.push({
            msg: "Password must be at least 8 characters long",
        });

    // Handle validation errors
    if (validationErrors.length) {
        return res.status(400).json({ errors: validationErrors })
    }

    // Normalize email
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false,
    });

    // Create new user instance
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    });

    // Check for existing user with same email or username
    User.findOne(
        { $or: [{ email: req.body.email }, { userName: req.body.userName }] }, // Find a user with the same email or username
        (err, existingUser) => {
            if (err) {
                return res.status(500).json({ message: 'Server error occured during user lookup.' })
            }
            if (existingUser) {
                return res.status(409).json({ message: 'Account with that email address or username already exists.' })
            }

            // Save the new user
            user.save((err) => {
                if (err) {
                    return next(err);
                }

                // Login the new user
                req.logIn(user, (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Server error during login.' })
                    }
                    res.status(200).json({ user: { userName: user.userName, email: user.email } }) // If successful, return the user details as a JSON response
                });
            });
        }
    );
};
