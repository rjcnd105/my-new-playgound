import { useEffect, useMemo, useRef, useState } from 'react'

import classNames from 'classnames'

interface UseHandleBarProps {
  open: boolean
  onClose: () => void
}
export const useBottomHandle = ({ open, onClose }: UseHandleBarProps) => {
  const root = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const bottomSheetHeight = useRef<number | undefined>(undefined)
  const diffPrevMoveY = useRef(0)
  const isTouched = useRef(false)
  const [isMounted, setIsMounted] = useState(false) // 마운트 상태

  const handleCloseManually = () => {
    const handleClose = () => {
      onClose()
      setIsMounted(false) // 언마운트 상태 변경
      if (root.current)
        root.current.removeEventListener('transitionend', handleClose)
    }
    root.current?.addEventListener('transitionend', handleClose)
    if (root.current) root.current.style.transform = 'translateY(0)'
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY
      bottomSheetHeight.current = root.current?.getBoundingClientRect().height
      isTouched.current = true
      if (root.current) root.current.style.transitionDuration = '0ms'
    }
    const handleTouchMove = (() => {
      let prevY: number | undefined
      return (e: TouchEvent) => {
        if (!root.current || !bottomSheetHeight.current || !isTouched.current)
          return
        e.preventDefault()
        const touchY = e.touches[0].clientY
        const diffY = startY.current - touchY
        diffPrevMoveY.current = prevY ? prevY - touchY : 0
        prevY = touchY
        const position = -bottomSheetHeight.current - Math.min(diffY, 0)
        root.current.style.transform = `translateY(${position}px)`
      }
    })()

    const handleTouchEnd = () => {
      if (!root.current) return
      root.current.style.transitionDuration = ''
      isTouched.current = false
      if (diffPrevMoveY.current >= 0) {
        root.current.style.transform = ''
        return
      }
      root.current.style.transform = 'translateY(0)'
      const handleClose = () => {
        onClose()
        setIsMounted(false) // 언마운트 상태 변경
        if (root.current) {
          root.current.removeEventListener('transitionend', handleClose)
        }
      }
      root.current.addEventListener('transitionend', handleClose)
    }

    if (!bar.current) return
    bar.current.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    })
    bar.current.addEventListener('touchmove', handleTouchMove)
    bar.current.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      bar.current?.removeEventListener('touchstart', handleTouchStart)
      bar.current?.removeEventListener('touchmove', handleTouchMove)
      bar.current?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])
  useEffect(() => {
    // NOTE: on/off 상태가 변경될 때 초기화
    if (open && !isMounted) {
      setIsMounted(true)
    }
  }, [open])
  //
  useEffect(() => {
    console.log('isMounted', isMounted, root.current?.classList.toString())

    // 강제 element 렌더링 trick
    root.current?.offsetHeight
    // 마운트 애니메이션 적용
    if (isMounted && root.current) {
      if (!root.current) return
      if (!root.current.classList.contains('-translate-y-full')) {
        root.current?.classList.add('-translate-y-full') // 마운트 애니메이션
      }
    } else {
      if (root.current) root.current.style.transform = ''
    }
  }, [isMounted])

  return {
    rootClassName: useMemo(
      () =>
        classNames(
          'pointer-events-auto absolute inset-x-0 top-full translate-y-0 bg-white transition-transform duration-300 ease-out',
          isMounted && '-translate-y-full',
        ),
      [isMounted],
    ),
    isTouchDevice: isTouchDevice(),
    onBarClick: isTouchDevice() ? undefined : handleCloseManually,
    rootRef: root,
    barRef: bar,
    close: handleCloseManually,
  }
}

function isTouchDevice() {
  return (
    (typeof window !== undefined && 'ontouchstart' in window) ||
    navigator.maxTouchPoints > 0
  )
}
