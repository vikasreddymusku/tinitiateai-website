import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { ScheduleTable } from '@/components/ScheduleTable'
import { getUpcomingBatches } from '@/lib/batches'
import { getSiteSettings } from '@/lib/siteSettings'

export const metadata = { title: 'Classroom Training — TinitiateAI' }

export default async function ClassroomTrainingPage() {
  const [batches, settings] = await Promise.all([
    getUpcomingBatches('classroom'),
    getSiteSettings(),
  ])

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden py-16 text-white sm:py-20">
        {/* Background image */}
        <Image
          src="/images/training/classroom-training.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/20" />

        {/* Slight bottom shading */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10" />

        <Container>
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-300">
              Training
            </span>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Classroom Training
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-200">
              Prefer learning in person? Our classroom sessions run in small groups
              with direct, in-room access to your trainer for hands-on practice and
              immediate feedback.
              {settings.address && ` Sessions are held at ${settings.address}.`}
            </p>

            <Link
              href="/book-a-demo"
              className="mt-6 inline-block rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-400 hover:shadow-xl"
            >
              Book a Free Demo
            </Link>
          </div>
        </Container>
      </section>

      {/* Upcoming batches */}
      <Container className="py-16">
        <h2 className="text-xl font-bold text-slate-900">
          Upcoming Classroom Batches
        </h2>

        <div className="mt-6">
          <ScheduleTable batches={batches} />
        </div>
      </Container>
    </>
  )
}