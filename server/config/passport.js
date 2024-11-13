import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth20"
import { User } from "../models/User.js";


export function configurePassport(passport) {
  passport.use(
    // Configuring Passport to use Local Strategy for authentication
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Creates a new Local Strategy with email as the username field
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        // Finding a user in the database with the provided email
        if (err) {
          // Handles error if there's an issue with the database query
          return done(err);
        }
        if (!user) {
          // Handles scenerio if user with provided email does not exist
          return done(null, false, { msg: `Email ${email} not found.` }); // return error message
        }
        if (!user.password) {
          // Handling scenerio if user exists but has no password
          return done(null, false, {
            msg: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          // Comparing provided password with the user's password
          if (err) {
            // Handling error if there's an issue with PW comparison
            return done(err);
          }
          if (isMatch) {
            // Handling scenerio if PW's match
            return done(null, user); // Returning user object
          }
          return done(null, false, { msg: "Invalid email or password." }); // return error if passwords don't match
        });
      });
    }),
  );

  //Google Strategy 
  passport.use(new GoogleStrategy(
    {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5050/auth/google/callback"
    },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
  
));
  passport.serializeUser((user, done) => {
    // Serializing user to store in session
    done(null, user.id); // Storing user's ID in session
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });

  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: process.env.GOOGLE_CLIENT_ID,
  //       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //       callbackURL: "http://localhost:5050/auth/google/callback"
  //     },
  //     async (accessToken, refreshToken, profile, done) => {
  //         const newUser = {
  //             googleId: profile.id,
  //             userName: profile.displayName,
  //         }
  //         try{
  //             let user = await User.findOne({ googleId: profile.id })
  //             if(user){
  //                 done(null, user)
  //             } else{
  //                 user = await User.create(newUser)
  //                 done(null, user)
  //             }
  //         } catch(err){
  //             console.error(err)
  //         }
  //     }
  //   )
  // )
 

}

export default configurePassport;
