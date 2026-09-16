import Link from 'next/link'
import { getSiteSettings } from '@/lib/siteSettings'

export async function QuickLinks() {
  const settings = await getSiteSettings()

  const links = [
    {
      href: '/book-a-demo',
      label: 'Book a Free Demo',
      sub: 'Reserve your seat',
      gradient: 'from-blue-500 to-blue-700',
    },
    {
      href: '/courses',
      label: 'Explore Courses',
      sub: `${settings.coursesOffered ?? 0} programs available`,
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      href: '/placements',
      label: 'Placement Stories',
      sub: `${settings.studentsPlaced ?? 0}+ students placed`,
      gradient: 'from-fuchsia-500 to-purple-700',
    },
    {
      href: '/course-schedule',
      label: 'Course Schedule',
      sub: 'See upcoming batches',
      gradient: 'from-indigo-600 to-slate-900',
    },
  ]

  return (
    <div className="relative z-10 mx-auto -mt-10 grid w-full max-w-6xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-xl bg-gradient-to-br ${link.gradient} p-5 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl`}
        >
          <p className="text-sm font-bold">{link.label}</p>
          <p className="mt-1 text-xs text-white/80">{link.sub}</p>
        </Link>
      ))}
    </div>
  )
}
