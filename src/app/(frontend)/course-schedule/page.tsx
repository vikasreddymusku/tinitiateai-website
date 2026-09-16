import { Container } from '@/components/ui/Container'
import { BatchTimetable } from '@/components/BatchTimetable'
import { getUpcomingBatches } from '@/lib/batches'

export const metadata = { title: 'Course Schedule — TinitiateAI' }

export default async function CourseSchedulePage() {
  const batches = await getUpcomingBatches()

  return (
    <Container className="py-16">
      <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">Training</span>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Course Schedule</h1>
      <p className="mt-3 text-slate-600">Explore new and upcoming training batches across all formats.</p>

      <div className="mt-10">
        <BatchTimetable batches={batches} />
      </div>
    </Container>
  )
}
