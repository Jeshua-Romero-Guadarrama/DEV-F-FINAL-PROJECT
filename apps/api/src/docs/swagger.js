import swaggerUI from "swagger-ui-express"
import YAML from "yamljs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const openapiDocument = YAML.load(path.resolve(__dirname, "../../openapi.yaml"))

export const swaggerServe = swaggerUI.serve
export const swaggerSetup = swaggerUI.setup(openapiDocument, {
  explorer: true,
  customSiteTitle: "PawMatch API Docs",
})