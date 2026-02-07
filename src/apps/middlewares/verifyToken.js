import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Token mavjud emas");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mySecretKey");
    req.user = decoded;
    next();
  } catch (error) {
    return res.send(error);
  }
}

export function isAdmin(req, res, next) {
  if (!req.user) return res.status(401).send("Token topilmadi");
  if (!req.user.role || req.user.role !== "admin") {
    return res.status(403).send("Sizda admin ruxsati yoq");
  }

  next();
}
