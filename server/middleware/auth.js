export function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "Unauthorized." });
  }
}

export function ensureGuest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.status(403).json({ message: "Forbidden." });
  }
}
