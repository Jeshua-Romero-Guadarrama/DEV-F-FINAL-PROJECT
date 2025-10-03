import { apiClient } from "./apiClient.js"

export const leadsService = {
  createLead(payload) {
    return apiClient.post("/leads", { body: payload })
  },
  listLeads(token, filters) {
    return apiClient.get("/leads", { token, params: filters })
  },
}
