import { ComponentProps, forwardRef } from 'react'

import { cn } from '@/utils/tailwind'

export const HandleBar = forwardRef<HTMLDivElement, ComponentProps<'div'>>(function HandleBar(
  { className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('absolute inset-x-0 top-0 z-10 h-[60px]', className)} {...props}>
      <div className="m-auto mt-3 h-[5px] w-[50px] rounded-[2px] bg-[#DBDBDB]" />
    </div>
  )
})
