const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const colors = require("colors");
const admin = require("../firebase");
const User = require("../models/user");
//const admin = require("firebase-admin");

exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  // console.log("REQ HEADERS TOKEN", req.headers.token).blue;
  try {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.token);
    console.log("firebaseUser".black.inverse);
    res.json(firebaseUser);
  } catch (error) {
    console.log(err);
    res.status(401).json({
      err: "Token expirado o inválido",
    });
  }
});

exports.postCurrentUser = asyncHandler(async (req, res, next) => {
  // console.log("REQ HEADERS TOKEN", req.headers.token).blue;
  try {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.token);
    // console.log("firebaseUser".magenta.inverse);
    const user = await User.findOne({ email: firebaseUser.email });
    if (user) {
      // send user response
      console.log("FOUND USER ===> ", user);
      res.json(user);
    } else {
      // create new user and then send user as response
      let newUser = await new User({
        email: firebaseUser.email,
        name: firebaseUser.name
          ? firebaseUser.name
          : firebaseUser.email.split("@")[0],
        picture: firebaseUser.picture ? firebaseUser.picture : "/avatar.png",
      }).save();
      console.log("NEW USER ===> ", newUser);
      res.json(newUser);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      err: "Token expirado o inválido",
    });
  }
});

exports.privateRoute = asyncHandler(async (req, res, next) => {
  console.log(
    "REQ HEADERS IN PRIVATE ROUTE ===>",
    req.headers.token.white.inverse
  );
  res.json({
    ok: true,
  });
});
