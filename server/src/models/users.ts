import { Schema, model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { generateRandomString } from '../utils/helpers'
import { UserType } from '../types'

const userSchema = new Schema<UserType>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email')
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            'Password must contain at least one letter and one number',
          )
        }
      },
      private: true, // used by the toJSON plugin
    },
  },
  {
    timestamps: true,
  },
)

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
  return !!user
}

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this
  return bcrypt.compare(password, user.password)
}

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
    user._id = generateRandomString()
  }
  next()
})

const User = model<UserType>('User', userSchema)

export default User
