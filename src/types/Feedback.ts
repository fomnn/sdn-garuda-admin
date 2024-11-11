export interface Feedback {
  id: number
  feedback_text: string
  rating: number
  date: Date
  teacher_id: number
  parent_id: number
}

export type CreateFeedback = Omit<Feedback, 'id'>
export type UpdateFeedback = Omit<Feedback, 'id'>
