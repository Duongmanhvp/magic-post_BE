const jwt = require("jsonwebtoken");

const authenticate = {
  isLogin: (req, res, next) => {
    //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
    const token = req.headers.token;
    //const refreshToken = req.cookies.refreshToken;
    if (token) {
      const accessToken = token;
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },
  isAdmin: (req, res, next) => {
    authenticate.isLogin(req, res, () => {
      const authRole = req.user.role;
      if (authRole == 0) {
        next();
      } else {
        return res.status(403).json("Deny access ");
      }
    });
  },
  isAdminTransaction: (req, res, next) => {
    authenticate.isLogin(req, res, () => {
      const authRole = req.user.role;
      if (authRole == 1) {
        next();
      } else {
        return res.status(403).json("Deny access ");
      }
    });
  },
  isAdminWarehouse: (req, res, next) => {
    authenticate.isLogin(req, res, () => {
      const authRole = req.user.role;
      if (authRole == 3) {
        next();
      } else {
        return res.status(403).json("Deny access ");
      }
    });
  },
};
module.exports = authenticate;
