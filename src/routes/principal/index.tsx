import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/principal/')({
  component: () => <div>Hello /principal/!</div>,
})
