import type { RefCallback } from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react' 

type UseScrollRestoreProps = {
  getDefaultScroll: () => number
  setScroll: (value: number) => void
}

export const useScrollRestore = <ScrollEl extends HTMLElement, InnerEl extends HTMLElement>(
  props: UseScrollRestoreProps,
) => {
  const _scrollRef = useRef<ScrollEl | null>(null)
  const _innerRef = useRef<InnerEl | null>(null)

  const initScroll = useCallback(() => {
    if (!_scrollRef.current || !_innerRef.current) return
    _scrollRef.current.scrollTop = defaultScrollValue.current
    _innerRef.current.style.transform = `translateY(0px)`

    _scrollRef.current.onscroll = (e) => {
      if (e.currentTarget instanceof HTMLElement) scrollValue.current = e.currentTarget.scrollTop
    }
  }, [])
  const scrollRef = useCallback<RefCallback<ScrollEl>>((el) => {
    _scrollRef.current = el
    initScroll()
  }, [])
  const innerRef = useCallback<RefCallback<InnerEl>>((el) => {
    _innerRef.current = el
    initScroll()
  }, [])
  const defaultScrollValue = useRef(props.getDefaultScroll())
  const scrollValue = useRef(defaultScrollValue.current)
  const style = useMemo(() => {
    return {
      transform: `translateY(-${defaultScrollValue.current}px)`,
    }
  }, [props.getDefaultScroll])

  useEffect(() => {
    return () => {
      props.setScroll(scrollValue.current)
    }
  }, [])

  return {
    scrollRef,
    innerRef,
    innerStyle: style,
  }
}
