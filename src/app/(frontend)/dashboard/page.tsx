import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { getCurrentStudent } from '@/lib/auth'
import { getPayload } from '@/lib/getPayload'

export default async function DashboardPage() {
  const student = await getCurrentStudent()
  if (!student) redirect('/login?redirect=/dashboard')

  const payload = await getPayload()
  const enrollments = await payload.find({
    collection: 'enrollments',
    where: { student: { equals: student.id } },
    depth: 1,
    sort: '-enrolledAt',
  })

  return (
    <Container className="py-16">
      <h1 className="text-2xl font-bold text-slate-900">Welcome back, {student.name.split(' ')[0]}</h1>
      <p className="mt-1 text-slate-500">Here&apos;s what you&apos;re enrolled in.</p>

      <div className="mt-8 space-y-4">
        {enrollments.docs.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            <p>You haven&apos;t enrolled in any courses yet.</p>
            <Link href="/courses" className="mt-3 inline-block text-sm font-semibold text-brand-600 hover:underline">
              Browse courses →
            </Link>
          </div>
        )}

        {enrollments.docs.map((enrollment) => {
          const course = typeof enrollment.course === 'object' ? enrollment.course : null
          if (!course) return null
          return (
            <div
              key={enrollment.id}
              className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
            >
              <div>
                <Link href={`/courses/${course.slug}`} className="font-semibold text-slate-900 hover:text-brand-700">
                  {course.title}
                </Link>
                <p className="text-sm text-slate-500">
                  Enrolled {enrollment.enrolledAt ? new Date(enrollment.enrolledAt).toLocaleDateString('en-IN') : ''}
                </p>
              </div>
              <span className="inline-block w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold capitalize text-brand-700">
                {enrollment.status}
              </span>
            </div>
          )
        })}
      </div>
    </Container>
  )
}
