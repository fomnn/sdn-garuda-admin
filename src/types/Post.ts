export interface Post {
  id: number
  title: string
  image_path?: string
  created_at: string
  updated_at: string
}

export interface PostParagraph {
  id: number
  post_id: number
  content: string
  paragraph_order: number
}

export type CreatePost = Omit<Post, 'id' | 'created_at' | 'updated_at'>
export type UpdatePost = Omit<Post, 'id' | 'created_at' | 'updated_at'>
export type CreatePostParagraph = Omit<PostParagraph, 'id'>
export type UpdatePostParagraph = Omit<PostParagraph, 'id' | 'post_id'>
