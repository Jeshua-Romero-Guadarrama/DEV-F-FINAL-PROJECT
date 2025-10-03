import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from '../src/app/app.js'

const app = createApp()

describe('PawMatch API health check', () => {
  it('responde con estado ok', async () => {
    const response = await request(app).get('/health')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('status', 'ok')
  })
})

describe('Endpoint de semillas de mascotas', () => {
  it('devuelve al menos un ejemplo con datos clave', async () => {
    const response = await request(app).get('/api/v1/pets/seeds')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThan(0)
    const toby = response.body[0]
    expect(toby).toMatchObject({
      nombre: expect.any(String),
      descripcion: expect.any(String),
    })
  })
})
