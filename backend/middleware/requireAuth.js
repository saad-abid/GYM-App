const jwt = require("jsonwebtoken");
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  //varify authorization
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization tokren required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    //just getting the id from database
    req.user = await User.findOne({ _id }).select('_id')
    next();
    
  } catch (error) {
    console.log(error)
    return res.status(401).json({error: 'Request is not authorized'})
  }
};


module.exports = requireAuth;