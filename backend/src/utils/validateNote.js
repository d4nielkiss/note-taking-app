import Joi from 'joi';

export default function validateNote(data) {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      'string.empty': 'Missing title',
      'any.required': 'Missing title',
    }),
    description: Joi.string().required().max(201).messages({
      'any.required': 'Missing description',
      'string.empty': 'Missing description',
      'string.max': 'Cannot be longer than 200 characters',
    }),
  });
  return schema.validate(data, { abortEarly: false });
}
