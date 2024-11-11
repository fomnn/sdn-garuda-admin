export interface Principal {
  id: number
  nama: string
  email: string
  contact_number: string
}

export type CreatePrincipal = Omit<Principal, 'id'>
export type UpdatePrincipal = Omit<Principal, 'id'>
