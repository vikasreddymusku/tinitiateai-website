import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { ScheduleTable } from '@/components/ScheduleTable'
import { getUpcomingBatches } from '@/lib/batches'
import { getSiteSettings } from '@/lib/siteSettings'

export const metadata = { title: 'Classroom Training — TinitiateAI' }

export default async function ClassroomTrainingPage() {
  const [batches, settings] = await Promise.all([getUpcomingBatches('classroom'), getSiteSettings()])

  return (
    <>
      <section className="bg-slate-950 py-16 text-white">
        <Container>
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-300">Training</span>
          <h1 className="mt-2 max-w-2xl text-3xl font-bold sm:text-4xl">Classroom Training</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Prefer learning in person? Our classroom sessions run in small groups with direct, in-room access to
            your trainer for hands-on practice and immediate feedback.
            {settings.address && ` Sessions are held at ${settings.address}.`}
          </p>
          <Link
            href="/book-a-demo"
            className="mt-6 inline-block rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-400"
          >
            Book a Free Demo
          </Link>
        </Container>
      </section>

      <Container className="py-16">
        <h2 className="text-xl font-bold text-slate-900">Upcoming Classroom Batches</h2>
        <div className="mt-6">
          <ScheduleTable batches={batches} />
        </div>
      </Container>
    </>
  )
}
