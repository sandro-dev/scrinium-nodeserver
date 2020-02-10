import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'is_admin'],
      order: ['id'],
    });
    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
      is_admin: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validations fail on insert new user' });
    }

    const { email } = req.body;
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create(req.body);

    return res.json({ ok: true, user });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string(),
      is_admin: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails on update user ' });
    }

    const { email } = req.body;
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res
        .status(400)
        .json({ error: 'This email is already registered' });
    }
    const { id } = req.params;
    const { name, password } = req.body;

    const user = await User.findByPk(id);
    user.name = name;
    user.email = email;
    user.password = password;
    user.save();

    return res.json({ ok: true, user });
  }

  async delete(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.json({
        error: 'There was a problem on trying to delete user ',
      });
    }

    return res.json({ ok: true, message: 'The user was successfully deleted' });
  }
}

export default new UserController();
