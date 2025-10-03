import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"
import { config } from "../../config/env.js"

export const USER_ROLES = ["admin", "voluntario", "adoptante"]

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    rol: {
      type: String,
      enum: USER_ROLES,
      default: "adoptante",
    },
    telefono: {
      type: String,
      trim: true,
    },
    direccion: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        return ret
      },
    },
  },
)

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) {
    return next()
  }

  const salt = await bcrypt.genSalt(config.security.passwordSaltRounds)
  this.password = await bcrypt.hash(this.password, salt)
  return next()
})

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password)
}

export const User = model("Usuario", userSchema)
