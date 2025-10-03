import { Schema, model } from "mongoose"

export const PET_STATUSES = ["disponible", "reservado", "adoptado"]
export const PET_TYPES = ["perro", "gato", "otro"]
export const PET_SIZES = ["pequeno", "mediano", "grande"]
export const PET_GENDERS = ["macho", "hembra"]

const petSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    tipo: {
      type: String,
      enum: PET_TYPES,
      default: "perro",
    },
    raza: {
      type: String,
      trim: true,
    },
    edad: {
      type: Number,
      min: 0,
    },
    tamano: {
      type: String,
      enum: PET_SIZES,
    },
    sexo: {
      type: String,
      enum: PET_GENDERS,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    salud: {
      vacunas: [String],
      esterilizado: Boolean,
      observaciones: String,
    },
    foto: {
      type: String,
    },
    estado: {
      type: String,
      enum: PET_STATUSES,
      default: "disponible",
    },
    fechaIngreso: {
      type: Date,
      default: Date.now,
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

export const Pet = model("Mascota", petSchema)
