import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { ScheduleTable } from '@/components/ScheduleTable'
import { getUpcomingBatches } from '@/lib/batches'

export const metadata = { title: 'Online Training — TinitiateAI' }

export default async function OnlineTrainingPage() {
  const batches = await getUpcomingBatches('online')

  return (
    <>
      <section className="bg-slate-950 py-16 text-white">
        <Container>
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-300">Training</span>
          <h1 className="mt-2 max-w-2xl text-3xl font-bold sm:text-4xl">Online Training</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Join live, instructor-led sessions from anywhere with the same curriculum, mentor access, and
            projects as our classroom batches — ideal if you can&apos;t make it to a physical location.
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
        <h2 className="text-xl font-bold text-slate-900">Upcoming Online Batches</h2>
        <div className="mt-6">
          <ScheduleTable batches={batches} />
        </div>
      </Container>
    </>
  )
}
