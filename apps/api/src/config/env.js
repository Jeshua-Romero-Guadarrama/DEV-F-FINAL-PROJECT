import "dotenv/config"

const parseNumber = (value, defaultValue) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue
  }
  const parsed = Number(value)
  return Number.isNaN(parsed) ? defaultValue : parsed
}

const parseBoolean = (value, defaultValue = false) => {
  if (value === undefined) {
    return defaultValue
  }
  const normalized = String(value).toLowerCase().trim()
  if (["true", "1", "yes"].includes(normalized)) {
    return true
  }
  if (["false", "0", "no"].includes(normalized)) {
    return false
  }
  return defaultValue
}

const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
  : ["http://localhost:5173"]

export const config = {
  env: process.env.NODE_ENV ?? "development",
  isProduction: (process.env.NODE_ENV ?? "development") === "production",
  port: parseNumber(process.env.PORT, 4000),
  apiPrefix: process.env.API_PREFIX ?? "/api/v1",
  database: {
    uri: process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/pawmatch",
    name: process.env.MONGO_DB ?? "pawmatch",
  },
  security: {
    jwtSecret: process.env.JWT_SECRET ?? "supersecret",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
    passwordSaltRounds: parseNumber(process.env.BCRYPT_SALT_ROUNDS, 10),
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseNumber(process.env.SMTP_PORT, 587),
    secure: parseBoolean(process.env.SMTP_SECURE, false),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM ?? "PawMatch <no-reply@pawmatch.com>",
  },
  cors: {
    origins: corsOrigins,
  },
}
