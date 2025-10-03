import { Schema, model } from "mongoose"

export const REQUEST_STATUS = ["pendiente", "en_proceso", "aprobada", "rechazada", "cerrada"]

const trackingSchema = new Schema(
  {
    estado: {
      type: String,
      enum: REQUEST_STATUS,
      required: true,
    },
    comentario: {
      type: String,
      trim: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
)

const requestSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    mascota: {
      type: Schema.Types.ObjectId,
      ref: "Mascota",
      required: true,
    },
    comentarios: {
      type: String,
      trim: true,
    },
    estado: {
      type: String,
      enum: REQUEST_STATUS,
      default: "pendiente",
    },
    seguimiento: {
      type: [trackingSchema],
      default: [],
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

export const Request = model("Solicitud", requestSchema)
