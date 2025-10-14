'use client'

import React from 'react'
import { useInView } from '@/hooks/useInView'

interface AnimatedSectionProps {
  children: React.ReactNode
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-in'
  delay?: number
  className?: string
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  className = ''
}) => {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const animationClass = {
    'fade-up': 'animate-fade-in-up',
    'fade-down': 'animate-fade-in-down',
    'fade-left': 'animate-fade-in-left',
    'fade-right': 'animate-fade-in-right',
    'scale-in': 'animate-scale-in'
  }[animation]

  const delayClass = delay > 0 ? `animate-delay-${delay}` : ''

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${className} ${isInView ? animationClass : 'animate-on-scroll'} ${delayClass}`}
    >
      {children}
    </div>
  )
}

export default AnimatedSection