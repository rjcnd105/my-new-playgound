import classNames from 'classnames'

import { HandleBar } from '@/components/bottomSheet/HandleBar'
import { useBottomHandle } from '@/components/bottomSheet/useBottomHandle'
import { cn } from '@/utils/tailwind'

import { Dimm } from '../modal/Dimm'

interface BottomSheetProps {
  on: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  hasDimm?: boolean
  barArea?: number
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  on,
  className,
  children,
  onClose,
  hasDimm = true,
  barArea = 30,
}) => {
  const { barRef, rootRef, onBarClick, rootClassName, close } = useBottomHandle({
    open: on,
    onClose,
  })

  return (
    <div
      className={classNames(
        'fixed inset-0 mx-auto size-full max-w-screen-lg overflow-hidden',
        !hasDimm && 'pointer-events-none',
      )}
    >
      <div ref={rootRef} className={cn('inset-x-0 z-10 bg-white', className, rootClassName)}>
        <div className="sticky top-0 z-10 h-[30px] bg-white">
          <HandleBar ref={barRef} onClick={onBarClick} className={`h-[${barArea}px]`} />
        </div>
        {children}
      </div>
      {hasDimm && <Dimm onClick={close} />}
    </div>
  )
}
