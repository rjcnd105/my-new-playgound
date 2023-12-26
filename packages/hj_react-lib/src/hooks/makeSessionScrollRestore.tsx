import { type RefCallback } from 'react'
import { useCallback, useEffect, useMemo, useRef } from 'react' 

export const makeUseSessionScrollRestore = <K extends string>(key: K) => {
  let _scroll = sessionStorage.getItem(key) ? Number(sessionStorage.getItem(key)) : 0
  let _tempScroll = _scroll

  const initialTransform = 'translateY(0px)' 

  const _setSessionScrollValue = (scrollValue: number) => {
    _scroll = scrollValue
    sessionStorage.setItem(key, `${_scroll}`)
  }

  let isEnableEvent = true

  const disableEvent = () => {
    isEnableEvent = false
  }
  const enableEvent = () => {
    isEnableEvent = true
  }

  function useScrollRestore<ScrollEl extends HTMLElement, InnerEl extends HTMLElement>() {
    const _scrollRef = useRef<ScrollEl | null>(null)
    const _innerRef = useRef<InnerEl | null>(null)

    // 재귀용 setScroll
    const _setScroll = (value: number) => {
      if (!_scrollRef.current || !_innerRef.current) return
      _scrollRef.current.scrollTop = value
      if (_innerRef.current.style.transform !== initialTransform) {
        _innerRef.current.style.transform = initialTransform
      }
      // 값이 제대로 설정 되었다면.. 렌더링이 제대로 되기 전에는 scrollTop을 넣어도 값이 안들어감.
      if (
        _scrollRef.current.scrollTop === value &&
        _innerRef.current.style.transform === initialTransform
      ) {
        _tempScroll = value
        _setSessionScrollValue(value)
        return
      }

      return requestAnimationFrame(() => _setScroll(value))
    }

    const setScroll = useCallback((value: number) => {
      if (!_scrollRef.current || !_innerRef.current) return

      _setScroll(value)
    }, [])

    // 두 ref가 존재할시 scroll 초기화 및 이벤트 부여
    const initScroll = useCallback(() => {
      if (!_scrollRef.current || !_innerRef.current) return

      _scrollRef.current.onscroll = (e) => {
        if (!isEnableEvent) return
        if (e.currentTarget instanceof HTMLElement) {
          _tempScroll = e.currentTarget.scrollTop
        }
      }

      setScroll(_scroll)
    }, [])

    const scrollRefCallback = useCallback<RefCallback<ScrollEl>>((el) => {
      if (!el) return
      _scrollRef.current = el
      initScroll()
    }, [])

    const innerRefCallback = useCallback<RefCallback<InnerEl>>((el) => {
      if (!el) return
      _innerRef.current = el
      initScroll()
    }, [])

    // 초기 스크롤에 대한 Transform Style
    const style = useMemo(() => {
      return {
        transform: `translateY(-${_scroll}px)`,
      }
    }, [])

    useEffect(() => {
      function saveScroll() {
        _setSessionScrollValue(_tempScroll)
      }

      // 브라우저 unload시 set scroll value
      window.addEventListener('beforeunload', saveScroll)

      return () => {
        // unmount시 set scroll value
        saveScroll()
        window.removeEventListener('beforeunload', saveScroll)
      }
    }, [])

    return {
      scrollRefCallback,
      innerRefCallback,
      innerStyle: style,
      disableEvent,
      enableEvent,
      setScroll,
    }
  }

  return useScrollRestore
}
