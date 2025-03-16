import Joi from 'joi';
import { BadRequestError } from '../utils/errors.js';

// Common validation schemas
const passwordSchema = Joi.string()
  .min(8)
  .max(30)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
  .messages({
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    'string.min': 'Password must be at least 8 characters long',
    'string.max': 'Password must not exceed 30 characters'
  });

const emailSchema = Joi.string()
  .email()
  .required()
  .messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  });

// Create user validation schema
const createUserSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema.required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  role: Joi.string().valid('user', 'admin', 'manager').default('user')
});

// Update user validation schema
const updateUserSchema = Joi.object({
  email: emailSchema.optional(),
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
  status: Joi.string().valid('active', 'inactive').optional()
}).min(1);

// Change password validation schema
const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: passwordSchema.required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Passwords do not match'
    })
});

// Validation functions
export const validateCreateUser = async (data) => {
  try {
    return await createUserSchema.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw new BadRequestError(error.details.map(d => d.message).join(', '));
  }
};

export const validateUpdateUser = async (data) => {
  try {
    return await updateUserSchema.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw new BadRequestError(error.details.map(d => d.message).join(', '));
  }
};

export const validateChangePassword = async (data) => {
  try {
    return await changePasswordSchema.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw new BadRequestError(error.details.map(d => d.message).join(', '));
  }
};

export default {
  validateCreateUser,
  validateUpdateUser,
  validateChangePassword
}; 