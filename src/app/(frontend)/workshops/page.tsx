import Link from 'next/link'
import { Container } from '@/components/ui/Container'

export const metadata = {
  title: 'Workshops — TinitiateAI',
}

const workshops = [
  {
    title: 'Generative AI Workshop',
    description:
      'Hands-on workshop covering practical Generative AI concepts, prompt engineering, LLM workflows, and real-world use cases.',
  },
  {
    title: 'Full Stack Development Workshop',
    description:
      'Build a practical web application using modern frontend, backend, database, and deployment concepts.',
  },
  {
    title: 'Data Science Workshop',
    description:
      'Learn how real-world datasets are cleaned, analyzed, visualized, and used to build machine learning solutions.',
  },
]

export default function WorkshopsPage() {
  return (
    <>
      <section className="bg-slate-950 py-16 text-white">
        <Container>
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-300">
            Services
          </span>

          <h1 className="mt-2 max-w-2xl text-3xl font-bold sm:text-4xl">
            Workshops
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            Practical, instructor-led workshops designed to help you understand
            technologies through hands-on learning and real-world examples.
          </p>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {workshops.map((workshop) => (
            <div
              key={workshop.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white">
                <WorkshopIcon />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                {workshop.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {workshop.description}
              </p>
            </div>
          ))}
        </div>

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