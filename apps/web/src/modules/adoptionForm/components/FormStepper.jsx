const steps = [
  { id: 0, label: "Datos personales" },
  { id: 1, label: "Datos de vivienda" },
  { id: 2, label: "Contrato" },
]

const FormStepper = ({ activeStep }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-6 text-sm font-fredoka">
        {steps.map((step, index) => {
          const isActive = activeStep === index
          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  isActive ? "border-peach bg-peach text-white" : "border-peach/30 bg-white text-peach"
                }`}
              >
                {index + 1}
              </span>
              <span className={`text-xs uppercase ${isActive ? "text-peach" : "text-charcoal/60"}`}>{step.label}</span>
            </div>
          )
        })}
      </div>
      <div className="h-2 rounded-full bg-cream">
        <div
          className="h-2 rounded-full bg-peach transition-all"
          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default FormStepper
