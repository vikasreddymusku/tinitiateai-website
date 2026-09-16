'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Slide = {
  eyebrow: string
  headline: string
  gradient: string
  techs: string[]
  courseHref: string
  courseLabel: string
}

const slides: Slide[] = [
  {
    eyebrow: 'Step Into AI With TinitiateAI',
    headline: 'Generative AI Engineering with LLMs',
    gradient: 'from-rose-600 via-red-600 to-orange-500',
    techs: ['LLMs', 'LangChain', 'RAG', 'AI Agents'],
    courseHref: '/courses/generative-ai-engineering-with-llms',
    courseLabel: 'View Course',
  },
  {
    eyebrow: 'Turn Data Into Decisions',
    headline: 'Become a Data Scientist in 12 Weeks',
    gradient: 'from-violet-700 via-purple-600 to-fuchsia-500',
    techs: ['Python', 'Pandas', 'SQL', 'scikit-learn'],
    courseHref: '/courses/data-science-bootcamp',
    courseLabel: 'View Course',
  },
  {
    eyebrow: 'Ship AI That Scales',
    headline: 'MLOps & Cloud AI — AWS + Azure',
    gradient: 'from-blue-700 via-sky-600 to-cyan-500',
    techs: ['AWS SageMaker', 'Azure ML', 'Kubernetes', 'Docker'],
    courseHref: '/courses/mlops-cloud-ai',
    courseLabel: 'View Course',
  },
  {
    eyebrow: 'Go Deep',
    headline: 'Master Deep Learning & NLP with Transformers',
    gradient: 'from-emerald-700 via-teal-600 to-cyan-600',
    techs: ['PyTorch', 'Hugging Face', 'BERT', 'Computer Vision'],
    courseHref: '/courses/nlp-with-transformers',
    courseLabel: 'View Course',
  },
]

export function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length)
  }
  function next() {
    setIndex((i) => (i + 1) % slides.length)
  }

  const slide = slides[index]

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${slide.gradient} text-white transition-colors duration-700`}>
      <NetworkPattern />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
            {slide.eyebrow}
          </span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">{slide.headline}</h1>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {slide.techs.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide backdrop-blur"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/book-a-demo"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Book a Free Demo →
            </Link>
            <Link
              href={slide.courseHref}
              className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {slide.courseLabel}
            </Link>
          </div>
        </div>
      </div>

      <button
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30 sm:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30 sm:flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.headline}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  )
}

function NetworkPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <g stroke="white" strokeWidth="1">
        <line x1="560" y1="80" x2="680" y2="150" />
        <line x1="680" y1="150" x2="640" y2="280" />
        <line x1="640" y1="280" x2="740" y2="360" />
        <line x1="560" y1="80" x2="500" y2="200" />
        <line x1="500" y1="200" x2="640" y2="280" />
        <line x1="500" y1="200" x2="420" y2="340" />
        <line x1="420" y1="340" x2="560" y2="420" />
        <line x1="640" y1="280" x2="560" y2="420" />
      </g>
      <g fill="white">
        <circle cx="560" cy="80" r="5" />
        <circle cx="680" cy="150" r="5" />
        <circle cx="640" cy="280" r="6" />
        <circle cx="740" cy="360" r="4" />
        <circle cx="500" cy="200" r="5" />
        <circle cx="420" cy="340" r="4" />
        <circle cx="560" cy="420" r="5" />
      </g>
    </svg>
  )
}
