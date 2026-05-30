'use client'

import { useEffect, useRef } from 'react'

export function useCustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Only on desktop
    if (typeof window === 'undefined' || window.innerWidth < 1024) return

    const dot = document.createElement('div')
    dot.className = 'cursor-dot'
    document.body.appendChild(dot)

    const ring = document.createElement('div')
    ring.className = 'cursor-ring'
    document.body.appendChild(ring)

    dotRef.current = dot
    ringRef.current = ring

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const onMouseEnterInteractive = () => {
      ring.classList.add('expanded')
      dot.style.opacity = '0'
    }

    const onMouseLeaveInteractive = () => {
      ring.classList.remove('expanded')
      dot.style.opacity = '1'
    }

    // Smooth ring follow
    let animFrame: number
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`
      animFrame = requestAnimationFrame(animate)
    }
    animate()

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor="expand"]'
    )
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive)
      el.addEventListener('mouseleave', onMouseLeaveInteractive)
    })

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animFrame)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive)
        el.removeEventListener('mouseleave', onMouseLeaveInteractive)
      })
      dot.remove()
      ring.remove()
    }
  }, [])

  return { dotRef, ringRef }
}
