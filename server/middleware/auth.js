import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Access Denied: No Token" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // { id, role }
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default auth;
