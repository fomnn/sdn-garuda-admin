export interface ParentStudent {
  id: number
  parent_id: number
  student_id: number
  relationship: 'father' | 'mother' | 'guardian'
}

export type UpdateParentStudent =
  | Omit<ParentStudent, 'id'> & { old_parent_id: number, old_student_id?: never }
  | Omit<ParentStudent, 'id'> & { old_student_id: number, old_parent_id?: never }
