var jwt = require("jsonwebtoken");
const JWT_SECRET = "itsfarrukh";
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  //console.log(token);
  if (!token) {
    res.status(401).send("token not found");
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.id;
    console.log(data.id, data);
    next();
  } catch (error) {
    res.status(401).send("token not found");
  }
};
module.exports = fetchuser;
