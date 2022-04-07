const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { check, validationResult, body } = require("express-validator");
const moment = require('moment');
const jwt = require('jwt-simple');
const { User } = require("../../db-config");

router.post(
  "/register",
  [
    check("userName", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("email", "El Email es invalido")
      .not()
      .isEmpty()
      .isEmail()
      .custom((value) => {
        return User.findOne({ where: { email: value } }).then((user) => {
          if (user) {
            return Promise.reject("El email proporcionado ya está en uso");
          }
        });
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create(req.body);
    res.json(user);
  }
);

router.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });

    if(user) {
        const matchPassword = bcrypt.compareSync(req.body.password, user.password);

        if(matchPassword) {
            res.json({ token: genereateToken(user), user: user });
        } else {
            res.json({ error: 'Email o contraseña incorrectos' });
        }

    } else {
        res.json({ error: 'Email o contraseña incorrectos' });
    }
});

const genereateToken = (user) => {
    const payload = {
        userId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5, 'minute').unix()
    }

    return jwt.encode(payload, process.env.SECRET_KEY)
}

module.exports = router;
