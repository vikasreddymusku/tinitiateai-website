import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { getPayload } from '@/lib/getPayload'

export const metadata = {
  title: 'Real-Time Projects — TinitiateAI',
}

export default async function RealTimeProjectsPage() {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'real-time-projects',
    limit: 100,
    depth: 1,
  })

  const projects = result.docs

  return (
    <>
      <section className="relative isolate overflow-hidden py-16 text-white sm:py-20">
        <Image
          src="/images/training/real-time-projects.png"
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
              Real-Time Projects
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-200">
              Gain practical experience by working on production-style projects
              that simulate real development and deployment environments.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white">
                <ProjectIcon />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                {project.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {project.shortDescription}
              </p>

              {project.level && (
                <p className="mt-3 text-xs font-medium capitalize text-slate-500">
                  Level: {project.level}
                </p>
              )}
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-sm text-slate-500">
            No real-time projects available right now.
          </p>
        )}

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/courses"
            className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Explore Courses
          </Link>

          <Link
            href="/contact"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Enquire Now
          </Link>
        </div>
      </Container>
    </>
  )
}

function ProjectIcon() {
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
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8h4" />
      <path d="M7 12h10" />
      <path d="M7 16h7" />
    </svg>
  )
}