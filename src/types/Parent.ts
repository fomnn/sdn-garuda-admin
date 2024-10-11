interface Dependent {
  student_id: string
  relationship: 'father' | 'mother' | 'guardian'
}

export interface Parent {
  _id: string
  first_name: string
  middle_name?: string // Middle name bisa jadi optional jika tidak selalu ada
  last_name?: string
  gender: 'male' | 'female'
  contact_number: string
  email?: string
  address: string
  occupation: string
  dependents: Dependent[]
}

export type CreateParentData = Omit<Parent, '_id'>
