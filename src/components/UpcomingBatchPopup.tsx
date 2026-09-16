'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
const SEEN_KEY = 'tinitiateai_seen_batch_popup'

function formatIST(iso: string) {
  const d = new Date(new Date(iso).getTime() + IST_OFFSET_MS)
  const hours24 = d.getUTCHours()
  const minutes = d.getUTCMinutes().toString().padStart(2, '0')
  const period = hours24 >= 12 ? 'PM' : 'AM'
  const hours12 = hours24 % 12 || 12
  return {
    weekday: WEEKDAYS[d.getUTCDay()],
    date: `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`,
    time: `${hours12}:${minutes} ${period}`,
  }
}

const trainingFeatures = [
  'Live Instructor-Led Sessions',
  'Real-Time Projects & Case Studies',
  'Mock Interviews & Resume Support',
  'Recordings for Every Session',
  'Placement Assistance',
  'Classroom & Online Batches',
]

export function UpcomingBatchPopup({
  slotId,
  startsAt,
  courseTitle,
  trainerName,
}: {
  slotId: number
  startsAt: string
  courseTitle: string | null
  trainerName: string | null
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let alreadySeen = false
    try {
      alreadySeen = sessionStorage.getItem(SEEN_KEY) === String(slotId)
    } catch {
      alreadySeen = false
    }
    if (alreadySeen) return

    const timer = setTimeout(() => {
      setOpen(true)
      try {
        sessionStorage.setItem(SEEN_KEY, String(slotId))
      } catch {
        // ignore storage errors (private browsing, etc.)
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [slotId])

  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open])

  if (!open) return null

  const { weekday, date, time } = formatIST(startsAt)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow transition hover:bg-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 px-6 pb-6 pt-8 text-white">
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
            Classroom &amp; Online Training
          </span>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-100">Upcoming Batch</p>
          <h2 className="mt-1 text-2xl font-bold leading-snug">
            {courseTitle ?? 'Free AI & Data Careers Orientation'}
          </h2>
          {trainerName && <p className="mt-2 text-sm text-brand-100">with {trainerName}</p>}

          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {weekday}, {date}
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
              {time} IST
            </span>
          </div>
        </div>

        <div className="px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Training Features</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
            {trainingFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-1.5 text-xs text-slate-600">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href="/book-a-demo"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full bg-brand-600 px-6 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-brand-700"
          >
            Reserve Your Free Seat →
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="mt-2 w-full text-center text-xs font-medium text-slate-400 hover:text-slate-600"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
