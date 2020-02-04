import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll({});
    return res.json(users);
  }

  async store(req, res) {
    const { email } = req.body;
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create(req.body);

    return res.json({ ok: true, user });
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new UserController();
