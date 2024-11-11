import type { CreatePost, Post, UpdatePost } from '@/types/Post'
import apiFetch from '@/lib/ofetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetAllPosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await apiFetch<{ posts: Post[] }>('/posts')
      return res.posts
    },
  })
}

export function useGetPostById(id: number) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const res = await apiFetch<{ post: Post }>(`/posts/${id}`)
      return res.post
    },
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: CreatePost) => {
      await apiFetch<{ message: 'Created', post: Post }>('/posts', {
        method: 'POST',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useUpdatePost(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: UpdatePost) => {
      await apiFetch<{ message: 'Updated', post: Post }>(`/posts/${id}`, {
        method: 'PUT',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}

export function useDeletePost(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await apiFetch<{ message: 'Deleted', post: Post }>(`/posts/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
