import Joi from 'joi';

export default function validateUser(data) {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'Missing email',
      'any.required': 'Missing email',
      'string.email': 'Invalid email',
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': 'Missing password',
      'string.empty': 'Missing password',
      'string.min': 'Must be longer than 8 characters',
    }),
  });
  return schema.validate(data, { abortEarly: false });
}
