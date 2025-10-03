const donationTiers = [
  {
    title: "Padrino por un día",
    amount: 250,
    description: "Cubre alimento húmedo y premios naturales para un peludito durante 24 horas.",
  },
  {
    title: "Héroe mensual",
    amount: 600,
    description: "Financia desparasitación, vitaminas y seguimiento veterinario de un rescate.",
  },
  {
    title: "Rescate estrella",
    amount: 1200,
    description: "Incluye evaluación médica completa, rehabilitación conductual y kit de adopción.",
  },
]

const inKindDonations = [
  {
    title: "Alimento y suplementos",
    items: "Croquetas premium, latas gastrointestinales, Omega 3.",
  },
  {
    title: "Salud e higiene",
    items: "Shampoo hipoalergénico, gasas, desinfectante grado veterinario, guantes.",
  },
  {
    title: "Confort",
    items: "Camas antiestrés, cobijas térmicas, transportadoras medianas.",
  },
]

const bankDetails = [
  {
    label: "Transferencia SPEI",
    info: [
      "Banco: Banorte",
      "Cuenta: 0567891234",
      "CLABE: 072680005678912349",
      "Beneficiario: PawMatch A.C.",
    ],
  },
  {
    label: "Depósito en tienda",
    info: [
      "Convenio: 225678",
      "Referencia: 9988",
      "Concepto: Donativo PawMatch",
    ],
  },
]

const faqs = [
  {
    question: "¿Los donativos son deducibles de impuestos?",
    answer:
      "Sí. Al realizar tu transferencia envía el comprobante a hola@pawmatch.com con tus datos fiscales y emitiremos el CFDI correspondiente en un plazo máximo de 5 días hábiles.",
  },
  {
    question: "¿Puedo visitar el refugio para entregar en especie?",
    answer:
      "Claro. Agenda una cita al 222-222-2222 para coordinar la entrega en la Colonia Roma Sur. También contamos con voluntariado para recoger en algunos puntos de la CDMX.",
  },
  {
    question: "¿Cómo se usa mi aportación?",
    answer:
      "El 70% cubre alimentación y atención médica, el 20% rehabilitación emocional y el 10% gestión de adopciones y transparencia.",
  },
]

export const donateContent = {
  donationTiers,
  inKindDonations,
  bankDetails,
  faqs,
}
