import Link from 'next/link'
import { Container } from '@/components/ui/Container'

export const metadata = {
  title: 'Real-Time Projects — TinitiateAI',
}

const projects = [
  {
    title: 'Full Stack Application',
    description:
      'Build an end-to-end application with frontend, backend APIs, database integration, authentication, and deployment.',
  },
  {
    title: 'AI & Machine Learning Project',
    description:
      'Work with real datasets and build an AI or machine learning solution using practical industry workflows.',
  },
  {
    title: 'Cloud & DevOps Project',
    description:
      'Learn deployment, CI/CD, containerization, cloud hosting, and production-style application delivery.',
  },
]

export default function RealTimeProjectsPage() {
  return (
    <>
      <section className="bg-slate-950 py-16 text-white">
        <Container>
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-300">
            Services
          </span>

          <h1 className="mt-2 max-w-2xl text-3xl font-bold sm:text-4xl">
            Real-Time Projects
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            Gain practical experience by working on production-style projects
            that simulate real development and deployment environments.
          </p>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white">
                <ProjectIcon />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                {project.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {project.description}
              </p>
            </div>
          ))}
        </div>

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