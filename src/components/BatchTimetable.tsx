'use client'

import { useMemo, useState } from 'react'
import { formatShortDate, formatTimeLabel } from '@/lib/dateFormat'

type Batch = {
  id: number
  courseName: string
  facultyName: string
  mode: string
  startsAt: string
  meetingLink: string | null
}

const modeTabs: { value: string; label: string }[] = [
  { value: 'online', label: 'Online Training' },
  { value: 'classroom', label: 'Classroom Training' },
  { value: 'weekend', label: 'Weekend Training' },
  { value: 'workshop', label: 'Workshops' },
  { value: 'internship', label: 'Internships' },
]

export function BatchTimetable({ batches }: { batches: Batch[] }) {
  const [activeMode, setActiveMode] = useState(modeTabs[0].value)
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(10)

  const filtered = useMemo(() => {
    return batches
      .filter((b) => b.mode === activeMode)
      .filter((b) => {
        if (!query.trim()) return true
        const q = query.toLowerCase()
        return b.courseName.toLowerCase().includes(q) || b.facultyName.toLowerCase().includes(q)
      })
  }, [batches, activeMode, query])

  const visible = filtered.slice(0, limit)

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {modeTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveMode(tab.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeMode === tab.value
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          Show
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="rounded-lg border border-slate-300 px-2 py-1 text-sm focus:border-brand-500 focus:outline-none"
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          entries
        </label>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search course or faculty…"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 sm:w-64"
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">S No</th>
              <th className="px-4 py-3">Course Name</th>
              <th className="px-4 py-3">Faculty</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Meeting Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visible.map((batch, i) => (
              <tr key={batch.id} className="odd:bg-white even:bg-slate-50">
                <td className="px-4 py-3 text-slate-500">{i + 1}</td>
                <td className="px-4 py-3 font-medium text-slate-900">{batch.courseName}</td>
                <td className="px-4 py-3 text-slate-600">{batch.facultyName}</td>
                <td className="px-4 py-3 text-slate-600">{formatShortDate(batch.startsAt)}</td>
                <td className="px-4 py-3 text-slate-600">{formatTimeLabel(batch.startsAt)} (IST)</td>
                <td className="px-4 py-3">
                  {batch.meetingLink ? (
                    <a
                      href={batch.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-brand-500 px-3 py-1.5 text-xs font-semibold text-brand-600 transition hover:bg-brand-50"
                    >
                      Click here
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">Contact for details</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visible.length === 0 && (
          <p className="p-8 text-center text-sm text-slate-500">No upcoming batches in this category yet.</p>
        )}
      </div>
    </div>
  )
}
