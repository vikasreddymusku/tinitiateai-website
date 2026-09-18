import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { getPayload } from '@/lib/getPayload'

export const metadata = {
  title: 'Workshops — TinitiateAI',
}

export default async function WorkshopsPage() {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'workshops',
    limit: 100,
    sort: 'scheduledAt',
    depth: 1,
  })

  const workshops = result.docs

  return (
    <>
      <section className="relative isolate overflow-hidden py-16 text-white sm:py-20">
        <Image
          src="/images/training/workshops.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/20" />

        <Container>
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-300">
              Services
            </span>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Workshops
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-200">
              Practical, instructor-led workshops designed to help you understand
              technologies through hands-on learning and real-world examples.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white">
                <WorkshopIcon />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                {workshop.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {workshop.shortDescription}
              </p>

              {workshop.duration && (
                <p className="mt-3 text-xs font-medium text-slate-500">
                  Duration: {workshop.duration}
                </p>
              )}

              {workshop.mode && (
                <p className="mt-1 text-xs font-medium capitalize text-slate-500">
                  Mode: {workshop.mode}
                </p>
              )}
            </div>
          ))}
        </div>

        {workshops.length === 0 && (
          <p className="text-sm text-slate-500">
            No workshops available right now.
          </p>
        )}

        <div className="mt-10">
          <Link
            href="/contact"
            className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Enquire About Workshops
          </Link>
        </div>
      </Container>
    </>
  )
}

function WorkshopIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5h16v10H4z" />
      <path d="M8 19h8" />
      <path d="M12 15v4" />
      <path d="M8 9h8" />
    </svg>
  )
}