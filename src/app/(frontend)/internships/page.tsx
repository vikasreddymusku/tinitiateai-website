import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { ScheduleTable } from '@/components/ScheduleTable'
import { getUpcomingBatches } from '@/lib/batches'

export const metadata = { title: 'Internships — TinitiateAI' }

export default async function InternshipsPage() {
  const batches = await getUpcomingBatches('internship')

  return (
    <>
      <section className="relative isolate overflow-hidden py-16 text-white sm:py-20">
        <Image
          src="/images/training/internships.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/20" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10" />

        <Container>
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-300">
              Training
            </span>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Internships
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-200">
              Apply what you&apos;ve learned on a real project with mentorship
              from our engineering team. Internship batches are project-based
              and run alongside our core courses.
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

      <Container className="py-16">
        <h2 className="text-xl font-bold text-slate-900">
          Upcoming Internship Batches
        </h2>

        <div className="mt-6">
          <ScheduleTable batches={batches} />
        </div>
      </Container>
    </>
  )
}