import { useState } from "react"
import FormHero from "./components/FormHero.jsx"
import FormStepper from "./components/FormStepper.jsx"
import PersonalDataStep from "./components/PersonalDataStep.jsx"
import HomeDataStep from "./components/HomeDataStep.jsx"
import ContractStep from "./components/ContractStep.jsx"

const defaultForm = {
  personales: {
    nombre: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
    ciudad: "",
    codigoPostal: "",
    direccion: "",
    identificacion: "",
  },
  vivienda: {
    tipoVivienda: "",
    espacios: "",
    tipoZona: "",
    numeroPersonas: "",
    ninos: "",
    otrasMascotas: "",
    lugarMascota: "",
    frecuenciaSola: "",
    transporte: "",
    adaptaciones: "",
    accesos: "",
    descripcionArea: "",
  },
  contrato: {
    tipoContrato: "Adopción",
    fecha: new Date().toISOString().split("T")[0],
    numero: "",
    adoptanteNombre: "",
    adoptanteId: "",
    adoptanteTelefono: "",
    adoptanteDireccion: "",
    adoptanteEmail: "",
    adoptanteRedes: "",
    mascotaNombre: "",
    mascotaRaza: "",
    mascotaSexo: "",
    mascotaEdad: "",
    mascotaTamano: "",
    mascotaSalud: "",
  },
}

const steps = ["personales", "vivienda", "contrato"]

const AdoptionFormPage = () => {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(defaultForm)
  const [feedback, setFeedback] = useState(null)

  const currentKey = steps[step]

  const updateStep = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [currentKey]: {
        ...prev[currentKey],
        ...value,
      },
    }))
  }

  const isFirst = step === 0
  const isLast = step === steps.length - 1

  const handleNext = () => {
    setFeedback(null)
    setStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrev = () => {
    setFeedback(null)
    setStep((prev) => Math.max(prev - 1, 0))
  }

  const handleGenerate = () => {
    setFeedback("Contrato generado. Puedes descargarlo o imprimirlo desde aquí cuando la plataforma esté conectada al backend.")
  }

  const handleClear = () => {
    setForm(defaultForm)
    setStep(0)
    setFeedback("Formulario reiniciado.")
  }

  const handleSaveSignature = () => {
    setFeedback("Firma guardada temporalmente.")
  }

  const handleClearSignature = () => {
    setFeedback("Espacio de firma limpio.")
  }

  const renderStep = () => {
    switch (currentKey) {
      case "personales":
        return <PersonalDataStep data={form.personales} onChange={(value) => updateStep("personales", value)} />
      case "vivienda":
        return <HomeDataStep data={form.vivienda} onChange={(value) => updateStep("vivienda", value)} />
      case "contrato":
        return (
          <ContractStep
            data={form.contrato}
            onChange={(value) => updateStep("contrato", value)}
            onSaveSignature={handleSaveSignature}
            onClearSignature={handleClearSignature}
          />
        )
      default:
        return null
    }
  }

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
      <FormHero />
      <FormStepper activeStep={step} />
      {renderStep()}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-3">
          {!isFirst && (
            <button
              type="button"
              onClick={handlePrev}
              className="rounded-full bg-white px-6 py-3 text-sm text-charcoal shadow-md transition hover:bg-cream"
            >
              Regresar
            </button>
          )}
          {!isLast && (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-peach px-6 py-3 font-fredoka text-white transition hover:bg-peach/90"
            >
              Siguiente
            </button>
          )}
        </div>
        {isLast && (
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-full bg-cream px-6 py-3 text-sm text-charcoal shadow-sm transition hover:bg-cream/80"
              onClick={handleClear}
            >
              Limpiar formulario
            </button>
            <button
              type="button"
              className="rounded-full bg-peach px-6 py-3 font-fredoka text-white transition hover:bg-peach/90"
              onClick={handleGenerate}
            >
              Generar contrato
            </button>
          </div>
        )}
      </div>
      {feedback && <p className="rounded-2xl bg-mint/30 px-4 py-3 text-sm text-charcoal/80">{feedback}</p>}
    </section>
  )
}

export default AdoptionFormPage
