export interface Teacher {
  id: number // @id @default(autoincrement())
  nama: string // String
  email: string // String @unique
  jenis_kelamin: 'male' | 'female' // jenis_kelamin (misalnya enum atau string literal type)
  NIP: string // String @unique
  tanggal_lahir?: string // DateTime? (optional, with Date type for DateTime)
  NUPTK: string
}

export type CreateTeacherData = Omit<Teacher, 'id' | 'tanggal_lahir'> & { tanggal_lahir?: Date }
export type UpdateTeacherData = Omit<Teacher, 'id' | 'tanggal_lahir'> & { tanggal_lahir?: Date }
