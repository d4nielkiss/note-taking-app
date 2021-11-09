import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import validateUser from '../utils/validateUser';
import { config } from '../config';
import Note from '../models/Note';

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
      return { status: 200, message: 'User created successfully' };
    } catch (err) {
      console.error(err.message);
      return { status: 500, error: err };
    }
  },
  async loginUser(data) {
    try {
      const { error } = validateUser(data);
      if (error) {
        return { status: 400, error: error.details[0].message };
      }

      const user = await User.findOne({ email: data.email });
      if (!user) {
        return { status: 400, error: `No user found with this email` };
      }

      const validPassword = await bcrypt.compare(data.password, user.password);
      if (!validPassword) {
        return { status: 400, error: 'Invalid password' };
      }

      const token = jwt.sign(
        { email: user.email },
        config.token,
        {
          expiresIn: '1day',
        }
      );

      return {
        status: 200,
        user: {
          id: user._id,
          email: user.email,
          token,
        },
      };
    } catch (err) {
      console.error(err.message);
      return { status: 500, error: err };
    }
  },
  async getNotesByUser(id) {
    try {
      const notes = await Note.find({ authorId: id }).sort({ isPinned: -1, date: -1 });
      if (notes.length === 0) {
        return { status: 400, error: 'Notes not found' };
      }

      return { status: 200, notes };
    } catch (err) {
      console.error(err.message);
      return { status: 500, error: err };
    }
  }
}
