import { Schema, model } from "mongoose"

export const ORDER_STATUS = ["pendiente", "pagado", "enviado", "entregado", "cancelado"]

const orderItemSchema = new Schema(
  {
    producto: {
      type: Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1,
    },
    precioUnitario: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
)

const orderSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    items: {
      type: [orderItemSchema],
      validate: (value) => Array.isArray(value) && value.length > 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    estado: {
      type: String,
      enum: ORDER_STATUS,
      default: "pendiente",
    },
    direccionEnvio: {
      calle: String,
      ciudad: String,
      estado: String,
      codigoPostal: String,
      referencias: String,
    },
    notas: {
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
        return ret
      },
    },
  },
)

export const Order = model("Pedido", orderSchema)
