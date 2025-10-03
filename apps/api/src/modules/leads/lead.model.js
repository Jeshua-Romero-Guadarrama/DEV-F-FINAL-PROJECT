import { Schema, model } from "mongoose"

const leadSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    edad: {
      type: Number,
      required: true,
      min: 18,
    },
    lada: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
    },
    perros: {
      type: Number,
      default: 0,
      min: 0,
    },
    gatos: {
      type: Number,
      default: 0,
      min: 0,
    },
    aceptoTerminos: {
      type: Boolean,
      required: true,
    },
    fuente: {
      type: String,
      default: "care-guide",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id
        delete ret._id
        return ret
      },
    },
  },
)

export const Lead = model("Lead", leadSchema)
