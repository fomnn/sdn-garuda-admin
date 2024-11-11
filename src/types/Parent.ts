export interface Parent {
  id: number;                 // @id @default(autoincrement())
  nama: string;               // String
  tahun_lahir?: number;      // Int? (optional)
  email: string;              // String @unique
  jenjang_pendidikan: string; // String
  pekerjaan: string;         // String
  penghasilan: string;       // String
  NIK: string;               // String
}

export type CreateParentData = Omit<Parent, 'id'>
