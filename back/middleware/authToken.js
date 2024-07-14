const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // No token provided

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token

        try {
            const findUser = await User.findById(user.id).select('-password');
            if (!findUser) {
                return res.status(404).send("on te connait pas"); // User not found
            }

            req.user = {
                id: findUser._id,
                name: findUser.name,
                email: findUser.email,
            };

            next();
        } catch (err) {
            console.error(err);
            return res.sendStatus(500); // Server error
        }
    });
};

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error('Not authorized as an admin');
    }
  };

export { authenticateToken, admin };
