'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Course } from '@/payload-types'
import Image from 'next/image'

const gradients = [
  'from-blue-500 to-blue-700',
  'from-orange-400 to-orange-600',
  'from-violet-500 to-purple-700',
  'from-indigo-700 to-slate-900',
  'from-emerald-500 to-teal-700',
  'from-rose-500 to-pink-700',
]

export function CourseFeatureCard({ course, index = 0 }: { course: Course; index?: number }) {
const cardLogo =
  course.cardLogo && typeof course.cardLogo === 'object'
    ? course.cardLogo
    : null

const cardLogoUrl = cardLogo?.url ?? null

const skills = course.tools?.slice(0, 4) ?? []
  const [shareOpen, setShareOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [copied, setCopied] = useState(false)
  function handleShare(e: React.MouseEvent) {
  e.preventDefault()

  const url = `${window.location.origin}/courses/${course.slug}`

  setShareUrl(url)
  setCopied(false)
  setShareOpen(true)
}

async function copyShareLink() {
  try {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  } catch {
    // Fallback for browsers where clipboard access is unavailable
    const textarea = document.createElement('textarea')
    textarea.value = shareUrl
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)

    setCopied(true)
  }
}

function shareOnWhatsApp() {
  const text = `${course.title}\n${shareUrl}`

  window.open(
    `https://wa.me/?text=${encodeURIComponent(text)}`,
    '_blank',
    'noopener,noreferrer',
  )
}

  return (
  <>
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

  {/* Light logo section */}
  <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-white via-slate-50 to-blue-50">

    {/* Skills badge */}
    <span className="absolute left-3 top-3 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm">
      ✦ Skills Covered
    </span>

    {/* Premium badge */}
    {course.isPremium && (
      <span className="absolute right-3 top-3 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600 shadow-sm">
        ☆ Premium
      </span>
    )}

    {/* Course logo */}
    {cardLogoUrl ? (
      <div className="relative h-24 w-24 overflow-hidden rounded-3xl border border-indigo-200 bg-white shadow-sm">
        <Image
          src={cardLogoUrl}
          alt={cardLogo?.alt || `${course.title} logo`}
          fill
          sizes="96px"
          className="object-contain p-4"
        />
      </div>
    ) : (
      <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-indigo-200 bg-white text-xl font-bold text-indigo-600 shadow-sm">
        {course.bannerLabel || course.title.charAt(0)}
      </div>
    )}
  </div>

  {/* Content */}
  <div className="flex flex-1 flex-col p-6">

    <Link href={`/courses/${course.slug}`}>
      <h3 className="text-xl font-bold leading-tight text-slate-950 transition hover:text-indigo-600">
        {course.title}
      </h3>
    </Link>

    <p className="mt-4 text-sm leading-6 text-slate-600">
      {course.shortDescription}
    </p>

    {/* Skills */}
    {skills.length > 0 && (
      <div className="mt-5 rounded-xl border border-indigo-100 bg-slate-50/70 p-3">
        <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-indigo-700">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100">
            ☆
          </span>
          Included in this course
        </div>

        <div className="grid grid-cols-2 gap-2">
          {skills.map((item, i) => (
            <div
              key={`${item.tool}-${i}`}
              className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-sm"
            >
              <SkillIcon index={i} />

              <span className="truncate">
                {item.tool}
              </span>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Actions */}
    <div className="mt-auto pt-5">
      <Link
        href={`/courses/${course.slug}`}
        className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        View Course
        <span>→</span>
      </Link>

      <button
        type="button"
        onClick={handleShare}
        className="mt-3 flex w-full items-center justify-center gap-2 py-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
      >
        <ShareIcon />
        Share Course
      </button>
    </div>

  </div>
</div>

    {shareOpen && (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
    onClick={() => setShareOpen(false)}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Share this course"
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-xl rounded-xl bg-white p-6 shadow-2xl sm:p-8"
    >
      {/* Close */}
      <button
        type="button"
        aria-label="Close share dialog"
        onClick={() => setShareOpen(false)}
        className="absolute right-5 top-5 text-3xl leading-none text-slate-500 transition hover:text-slate-900"
      >
        ×
      </button>

      <h2 className="pr-10 text-xl font-bold text-violet-600">
        Share this course
      </h2>

      <p className="mt-1 text-sm text-slate-600">
        Share this course&apos;s details with your family &amp; friends
      </p>

      {/* URL + Copy */}
      <div className="mt-6 flex overflow-hidden rounded-lg border border-slate-300">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="min-w-0 flex-1 bg-white px-4 py-3 text-sm text-slate-600 outline-none"
        />

        <button
          type="button"
          onClick={copyShareLink}
          className="shrink-0 bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {copied ? '✓ Copied' : '▣ Copy Link'}
        </button>
      </div>

      {/* WhatsApp */}
      <div className="mt-8">
        <button
  type="button"
  onClick={shareOnWhatsApp}
  aria-label="Share on WhatsApp"
  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition hover:scale-105 hover:bg-[#20bd5a]"
>
  <WhatsAppIcon />
</button>

        <span className="mt-2 block text-xs font-medium text-slate-500">
          WhatsApp
        </span>
      </div>
    </div>
  </div>
)}
  </>

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
function WhatsAppIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.01 3C8.84 3 3 8.82 3 15.98c0 2.29.6 4.52 1.73 6.48L3 29l6.72-1.76a12.96 12.96 0 0 0 6.28 1.6h.01C23.17 28.84 29 23.02 29 15.86 29 8.7 23.17 3 16.01 3Zm0 23.65h-.01a10.76 10.76 0 0 1-5.49-1.5l-.39-.23-3.99 1.05 1.07-3.89-.25-.4a10.76 10.76 0 0 1-1.65-5.72c0-5.94 4.84-10.78 10.8-10.78 5.95 0 10.79 4.84 10.79 10.78 0 5.95-4.84 10.79-10.88 10.79Zm5.92-8.09c-.32-.16-1.91-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.59-.96-.86-1.61-1.92-1.8-2.24-.19-.32-.02-.49.14-.65.15-.14.32-.38.49-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.68 0 1.59 1.16 3.12 1.32 3.34.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.24 1.48.21 2.03.13.62-.09 1.91-.78 2.18-1.54.27-.75.27-1.4.19-1.54-.08-.13-.3-.21-.62-.37Z" />
    </svg>
  )
}

function SkillIcon({ index }: { index: number }) {
  const icons = [
    <path key="1" d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" />,
    <>
      <rect key="2a" x="7" y="7" width="10" height="10" rx="1" />
      <path key="2b" d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </>,
    <>
      <rect key="3a" x="4" y="7" width="16" height="12" rx="2" />
      <path key="3b" d="M9 3h6M12 3v4M8 11h.01M16 11h.01" />
    </>,
    <path key="4" d="m5 12 4 4L19 6" />,
  ]

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={
        [
          'shrink-0 text-red-500',
          'shrink-0 text-emerald-500',
          'shrink-0 text-sky-500',
          'shrink-0 text-teal-500',
        ][index % 4]
      }
    >
      {icons[index % 4]}
    </svg>
  )
}