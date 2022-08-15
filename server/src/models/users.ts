import { Schema, model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { IUser } from '../types'
import { paginate, toJSON } from '../utils/helpers'

const userSchema = new Schema<IUser>(
  {
    _id: String,
    name: {
      type: String,
      required: true,
    },
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
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// add plugin that converts mongoose to json
userSchema.plugin(toJSON)
userSchema.plugin(paginate)

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
  return !!user
}

userSchema.methods.isPasswordMatch = async function (
  password: string,
): Promise<boolean> {
  const user = this
  return bcrypt.compare(password, user.password)
}

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = model<IUser>('User', userSchema)

export default User
