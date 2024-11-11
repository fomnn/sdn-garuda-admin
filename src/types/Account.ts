enum AccountType {
  TEACHER = 'teacher',
  PARENT = 'parent',
}

export interface Account {
  id: number
  email: string
  password: string
  type: AccountType
  user_id: number
}

export type CreateAccount = Omit<Account, 'id'>
export type UpdateAccount = Omit<Account, 'id' | 'type' | 'user_id'>
