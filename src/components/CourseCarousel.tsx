'use client'

import { useRef } from 'react'
import type { Course } from '@/payload-types'
import { CourseCarouselCard } from '@/components/CourseCarouselCard'

export function CourseCarousel({ courses }: { courses: Course[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollBy(direction: 1 | -1) {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: direction * (288 + 24), behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <button
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
        className="absolute -left-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:bg-slate-50 sm:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <div
        ref={scrollerRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {courses.map((course, i) => (
          <CourseCarouselCard key={course.id} course={course} index={i} />
        ))}
      </div>

      <button
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
        className="absolute -right-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:bg-slate-50 sm:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  )
}
