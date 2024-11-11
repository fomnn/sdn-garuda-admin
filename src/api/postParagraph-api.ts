import type { CreatePostParagraph, PostParagraph, UpdatePostParagraph } from '@/types/Post'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllPostsParagraphs() {
  return useQuery({
    queryKey: ['postsParagraphs'],
    queryFn: async () => {
      const res = await apiFetch<{ posts_paragraphs: PostParagraph[] }>('/posts-paragraphs')
      return res.posts_paragraphs
    },
  })
}

export function useGetPostParagraphById(id: number) {
  return useQuery({
    queryKey: ['postParagraphs', id],
    queryFn: async () => {
      const res = await apiFetch<{ post_paragraph: PostParagraph }>(`/posts-paragraphs/${id}`)
      return res.post_paragraph
    },
  })
}

export function useCreatePostParagraph() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: CreatePostParagraph) => {
      await apiFetch<{ message: 'Created', post_paragraph: PostParagraph }>('/posts-paragraphs', {
        method: 'POST',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postsParagraphs'] })
    },
  })
}

export function useUpdatePostParagraph(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: UpdatePostParagraph) => {
      await apiFetch<{ message: 'Updated', post_paragraph: PostParagraph }>(`/posts-paragraphs/${id}`, {
        method: 'PUT',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postsParagraphs'] })
    },
  })
}

export function useDeletePostParagraph(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await apiFetch<{ message: 'Deleted', post_paragraph: PostParagraph }>(`/posts-paragraphs/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postsParagraphs'] })
    },
  })
}
