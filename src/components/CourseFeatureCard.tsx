'use client'

import Link from 'next/link'
import type { Course } from '@/payload-types'
import { formatShortDate } from '@/lib/dateFormat'

const gradients = [
  'from-blue-500 to-blue-700',
  'from-orange-400 to-orange-600',
  'from-violet-500 to-purple-700',
  'from-indigo-700 to-slate-900',
  'from-emerald-500 to-teal-700',
  'from-rose-500 to-pink-700',
]

export function CourseFeatureCard({ course, index = 0 }: { course: Course; index?: number }) {
  const trainer = typeof course.trainer === 'object' ? course.trainer : null
  const gradient = gradients[index % gradients.length]
  const rating = course.rating ?? 5

  async function handleShare(e: React.MouseEvent) {
    e.preventDefault()
    const url = `${window.location.origin}/courses/${course.slug}`
    if (navigator.share) {
      try {
        await navigator.share({ title: course.title, url })
      } catch {
        // user cancelled share sheet — no action needed
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      window.alert('Course link copied to clipboard!')
    } catch {
      window.prompt('Copy this link:', url)
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/courses/${course.slug}`}>
        <div className={`relative flex h-36 flex-col items-center justify-center gap-2 bg-gradient-to-br ${gradient} p-4 text-center text-white`}>
          <svg className="absolute inset-0 h-full w-full opacity-15" viewBox="0 0 200 140" fill="none">
            <rect x="30" y="20" width="140" height="90" rx="6" stroke="currentColor" strokeWidth="4" />
            <path d="M55 60l15 15-15 15M100 90h30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
          {course.bannerLabel ? (
            <>
              <span className="relative text-2xl font-extrabold tracking-wide">{course.bannerLabel}</span>
              {course.bannerTag && (
                <span className="relative rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900">
                  {course.bannerTag}
                </span>
              )}
            </>
          ) : (
            <span className="relative text-lg font-bold leading-snug">{course.title}</span>
          )}
        </div>
      </Link>

      <div className="flex-1 p-5">
        <Link href={`/courses/${course.slug}`}>
          <h3 className="font-semibold text-slate-900 hover:text-brand-700">{course.title}</h3>
        </Link>

        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill={i < rating ? '#f59e0b' : '#e2e8f0'}>
              <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
            </svg>
          ))}
          <span className="ml-1 text-sm font-semibold text-slate-700">{rating}</span>
        </div>

        <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
          <li className="flex items-center gap-2">
            <ClockIcon />
            Start Date: {course.startDate ? formatShortDate(course.startDate) : 'Batch Starts Soon'}
          </li>
          {trainer && (
            <li className="flex items-center gap-2">
              <PersonIcon />
              by: {trainer.name}
            </li>
          )}
          <li className="flex items-center gap-2">
            <ClockIcon />
            Dur: {course.duration}
          </li>
        </ul>
      </div>

      <div className="flex border-t border-slate-100">
        <Link
          href={`/book-a-demo?course=${course.slug}`}
          className="flex-1 bg-brand-600 py-3 text-center text-sm font-bold text-white transition hover:bg-brand-700"
        >
          ENROLL
        </Link>
        <button
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-1.5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          <ShareIcon />
          SHARE
        </button>
      </div>
    </div>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-slate-400">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  )
}

function PersonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-slate-400">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 3.9M15.4 6.6L8.6 10.5" />
    </svg>
  )
}
