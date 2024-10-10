import { ofetch } from 'ofetch'

export const baseURL = 'http://localhost:3000/api'

const apiFetch = ofetch.create({ baseURL })

export default apiFetch
