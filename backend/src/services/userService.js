import bcrypt from 'bcryptjs';
import User from '../models/User';
import validateUser from '../utils/validateUser';

export const userService = {
  async createUser(data) {
    try {
      const { error } = validateUser(data);
      if (error) {
        return { status: 400, error: error.details[0].message };
      }

      const isEmailExist = await User.findOne({ email: data.email });
      if (isEmailExist) {
        return { status: 400, error: 'Account already exists with this email' };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      const user = await new User({
        email: data.email,
        password: hashedPassword,
      });
      await user.save();
      return { status: 204 };
    } catch (err) {
      console.error(err.message);
      return { status: 500, error: err };
    }
  },
}
