import { apiClient } from "./apiClient.js"

export const ordersService = {
  createOrder(token, payload) {
    return apiClient.post("/orders", { token, body: payload })
  },
  listOrders(token, filters) {
    return apiClient.get("/orders", { token, params: filters })
  },
  updateStatus(token, id, payload) {
    return apiClient.patch(`/orders/${id}`, { token, body: payload })
  },
  getOrder(token, id) {
    return apiClient.get(`/orders/${id}`, { token })
  },
}
