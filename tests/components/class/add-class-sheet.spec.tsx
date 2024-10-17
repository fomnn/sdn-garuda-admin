import AddClassSheet from '@/components/app/class/add-class-sheet'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'

const queryClient = new QueryClient()

it('render add class sheet', async () => {
  const { getByText } = render(
    <QueryClientProvider client={queryClient}>
      <AddClassSheet />
    </QueryClientProvider>,
  )

  expect(getByText('Masukkan Data Kela').element()).toContain('fsdf')
})
