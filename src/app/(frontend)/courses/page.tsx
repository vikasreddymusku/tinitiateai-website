import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { CourseFeatureCard } from '@/components/CourseFeatureCard'
import { getPayload } from '@/lib/getPayload'
import type { Where } from 'payload'

export const metadata = { title: 'Our Courses — TinitiateAI' }

const views = [
  { value: 'trending', label: 'Trending' },
  { value: 'placement-assistance', label: 'Job Placement Programs' },
  { value: 'internship', label: 'Internships' },
  { value: 'certification', label: 'Certification Courses' },
] as const

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; view?: string }>
}) {
  const { category, q, view } = await searchParams
  const activeView = view && views.some((v) => v.value === view) ? view : 'trending'
  const payload = await getPayload()

  const categories = await payload.find({ collection: 'categories', limit: 20 })

  const conditions: Where[] = []
  if (activeView === 'trending') {
    conditions.push({ featured: { equals: true } })
  } else {
    conditions.push({ tags: { equals: activeView } })
  }
  if (category) {
    conditions.push({ 'category.slug': { equals: category } })
  }
  if (q) {
    conditions.push({
      or: [{ title: { like: q } }, { shortDescription: { like: q } }],
    })
  }
  const where: Where = { and: conditions }

  const courses = await payload.find({ collection: 'courses', where, limit: 50, depth: 1, sort: 'title' })

  return (
    <Container className="py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold sm:text-4xl">
          <span className="bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent">Our</span>{' '}
          <span className="text-slate-900">Courses</span>
        </h1>
        <p className="mt-2 text-slate-600">Explore new and trending IT &amp; AI training programs.</p>
        {q && (
          <p className="mt-3 text-sm text-slate-500">
            Showing results for &ldquo;{q}&rdquo; &middot;{' '}
            <Link href="/courses" className="font-medium text-brand-600 hover:underline">
              Clear search
            </Link>
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-6 border-b border-slate-200">
        {views.map((v) => (
          <Link
            key={v.value}
            href={`/courses?view=${v.value}${category ? `&category=${category}` : ''}`}
            className={`-mb-px border-b-2 pb-3 text-sm font-semibold transition ${
              activeView === v.value
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {v.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={`/courses?view=${activeView}`}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            !category ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          All Categories
        </Link>
        {categories.docs.map((c) => (
          <Link
            key={c.id}
            href={`/courses?view=${activeView}&category=${c.slug}`}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              category === c.slug ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {courses.docs.map((course, i) => (
          <CourseFeatureCard key={course.id} course={course} index={i} />
        ))}
      </div>

      {courses.docs.length === 0 && (
        <p className="mt-10 text-center text-slate-500">No courses found in this view yet.</p>
      )}
    </Container>
  )
}
