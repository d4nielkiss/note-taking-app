import Joi from 'joi';

export default function validateNote(data) {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      'string.empty': 'Missing title',
      'any.required': 'Missing title',
    }),
    description: Joi.string().required().max(1000).messages({
      'any.required': 'Missing description',
      'string.empty': 'Missing description',
      'string.max': 'Description cannot be longer than 1000 characters',
    }),
    date: Joi.date().required().messages({
      'any.required': 'Missing date',
    }),
    isPinned: Joi.boolean().required().messages({
      'any.required': 'Missing isPinned',
    }),
    authorId: Joi.string().required().messages({
      'string.empty': 'Missing author ID',
      'any.required': 'Missing author ID',
    }),
  });
  return schema.validate(data, { abortEarly: false });
}
