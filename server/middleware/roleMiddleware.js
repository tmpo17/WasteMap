export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

export const verifyCollectorOrAdmin = (req, res, next) => {
  if (req.user.role === 'collector' || req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Not authorized' });
  }
};