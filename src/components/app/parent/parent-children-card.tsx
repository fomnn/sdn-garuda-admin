import { useGetParentById } from '@/services/parent-service'
import { Icon } from '@iconify/react'
import { Box, Card, Heading, Separator } from '@radix-ui/themes'
import clsx from 'clsx'

interface ProductVariantCardProps {
  showChildren: boolean
  parentId: string
  clodeCard: () => void
}

export default function ParentChildrenCard({ clodeCard, showChildren, parentId }: ProductVariantCardProps) {
  const { isLoading: parentLoading, data: parent } = useGetParentById(parentId)

  return (
    <div className={clsx(
      'bg-white border border-zinc-300 dark:bg-zinc-800 rounded-md p-4 transition-all duration-700 ease-in-out',
      {
        'w-0 translate-x-[100%] opacity-0': !showChildren,
        'block w-2/6 opacity-100': showChildren,
      },
    )}
    >
      {/* <div className={clsx(
      'bg-white dark:bg-zinc-800 rounded-md p-4 transition-all duration-300 ease-in-out',
      {
        'w-0 translate-x-[100%]': !showChildren,
        'block w-2/6': showChildren,
      },
    )}
    > */}
      <div className="flex justify-between">
        <div className="">
          <Heading className="line-clamp-1">Anak/Anak Wali</Heading>
          <p>
            {parent?.first_name}
            {' '}
            {parent?.middle_name ? `${parent?.middle_name} ` : ''}
            {parent?.last_name}
          </p>
        </div>
        <button type="button" onClick={clodeCard}>
          <Icon icon="solar:close-square-bold-duotone" className="text-3xl text-red-700/60" />
        </button>
      </div>
      <Separator my="3" size="4" />
      <div className="flex flex-col gap-2">
        <Box>
          <Card>
            <div className="flex gap-2">
              <div className="w-7/12">
                <p className="text-lg">fadsf</p>
                <p className="text-sm font-thin">
                  Rp. 50
                </p>
              </div>
            </div>
          </Card>
        </Box>
      </div>
    </div>
  )
}
