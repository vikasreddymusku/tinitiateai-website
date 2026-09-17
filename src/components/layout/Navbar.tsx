'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SearchBox } from '@/components/SearchBox'
import { NavDropdown } from '@/components/layout/NavDropdown'

const navLinks = [{ href: '/courses', label: 'Courses' }]

const trainingLinks = [
  { href: '/classroom-training', label: 'Classroom Training' },
  { href: '/online-training', label: 'Online Training' },
  { href: '/weekend-training', label: 'Weekend Training' },
  { href: '/internships', label: 'Internships' },
  { href: '/course-schedule', label: 'Course Schedule' },
]

const servicesLinks = [
  { href: '/placement-registration', label: 'Placement Registration' },
  { href: '/job-assistance', label: 'Job Assistance' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/real-time-projects', label: 'Real-Time Projects' },
]

const dropdownGroups = [
  { label: 'Training', items: trainingLinks },
  { label: 'Services', items: servicesLinks },
]

const trailingLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar({ siteName }: { siteName: string }) {
  const [open, setOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <span className="rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 px-2 py-1 text-white">
            AI
          </span>
          {siteName}
        </Link>

        <SearchBox className="mx-6 hidden max-w-xs flex-1 lg:flex" />

        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-brand-600"
              >
                {link.label}
              </Link>
            ))}
            {dropdownGroups.map((group) => (
              <NavDropdown key={group.label} label={group.label} items={group.items} />
            ))}
            {trailingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-brand-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/book-a-demo"
            className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Book a Demo
          </Link>
        </div>

        <button
          className="flex items-center justify-center rounded-md p-2 text-slate-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <SearchBox className="mb-4" />
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-medium text-slate-700"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {dropdownGroups.map((group) => (
              <div key={group.label}>
                <button
                  onClick={() => setOpenGroup((v) => (v === group.label ? null : group.label))}
                  className="flex w-full items-center justify-between py-2 text-left text-sm font-medium text-slate-700"
                >
                  {group.label}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className={`transition-transform ${openGroup === group.label ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {openGroup === group.label && (
                  <div className="ml-3 flex flex-col border-l border-slate-100 pl-3">
                    {group.items.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="py-2 text-sm text-slate-600"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {trailingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-medium text-slate-700"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/book-a-demo"
              className="mt-3 rounded-full bg-brand-600 px-4 py-2 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Book a Demo
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
