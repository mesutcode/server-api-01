import express from 'express';
import config from '../../config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../../model/User';

const route = () => {
  const router = new express.Router();

  router.route('/login').post((req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        res.send({
          status: false,
          emailError: true,
          message: 'Email address is not registered',
        });
      } else {
        if (
          user.password ===
          crypto
            .createHash('sha256', config.passSecret)
            .update(password)
            .digest('hex')
        ) {
          const token = jwt.sign(
            { userName: user.firstName },
            config.jwtSecret
          );

          res.send({ status: true, token: token });
        } else {
          res.send({
            status: false,
            message: 'You entered the wrong password',
          });
        }
      }
    });
  });

  router.route('/sign-up').post((req, res) => {
    const { email, password } = req.body;

    const passwordHashed = crypto
      .createHash('sha256', config.passSecret)
      .update(password)
      .digest('hex');

    const newUser = new User({
      email: email,
      password: passwordHashed,
      dateCretated: new Date(),
      dateModified: new Date(),
    });

    newUser.save().then(
      (data) => {
        res.send({ status: true, user: data });
      },
      (err) => {
        res.send({ status: false, error: err });
      }
    );

    console.log('success');
  });

  return router;
};

export default {
  route,
  routePrefix: `/${config.version}/auth`,
};
