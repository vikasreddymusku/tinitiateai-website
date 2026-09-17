'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Slide = {
  headline: string
  backgroundImage: string
  courseHref: string
}

const slides: Slide[] = [
  {
    headline: 'Generative AI Engineering with LLMs',
    backgroundImage: '/images/hero/generative-ai-llms.png',
    courseHref: '/courses/generative-ai-engineering-with-llms',
  },
  {
    headline: 'Become a Data Scientist in 12 Weeks',
    backgroundImage: '/images/hero/data-scientist-12-weeks.png',
    courseHref: '/courses/data-science-bootcamp',
  },
  {
    headline: 'MLOps & Cloud AI — AWS + Azure',
    backgroundImage: '/images/hero/mlops-cloud-ai-aws-azure.png',
    courseHref: '/courses/mlops-cloud-ai',
  },
  {
    headline: 'Master Deep Learning & NLP with Transformers',
    backgroundImage: '/images/hero/deep-learning-nlp-transformers.png',
    courseHref: '/courses/nlp-with-transformers',
  },
]

export function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 3000)

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
<section className="relative h-[420px] w-full overflow-hidden sm:h-[500px] lg:h-[540px]">
  {/* Animated hero background */}
  <div
    key={slide.backgroundImage}
    className="absolute inset-0 animate-[heroFade_700ms_ease-out] bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url(${slide.backgroundImage})`,
    }}
  />

  {/* keep all your existing buttons/arrows/dots below */}
  {/* Action buttons */}
  <div className="absolute bottom-10 left-[8%] z-20 flex flex-wrap gap-3">
    <Link
      href="/book-a-demo"
      className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
    >
      Book a Free Demo →
    </Link>

    <Link
      href={slide.courseHref}
      className="rounded-full border border-slate-300 bg-white/90 px-6 py-3 text-sm font-bold text-slate-800 shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
    >
      View Course →
    </Link>
  </div>

  {/* Previous slide */}
  <button
    type="button"
    aria-label="Previous slide"
    onClick={prev}
    className="absolute left-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:scale-105 hover:bg-white sm:flex"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M15 6l-6 6 6 6" />
    </svg>
  </button>

  {/* Next slide */}
  <button
    type="button"
    aria-label="Next slide"
    onClick={next}
    className="absolute right-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:scale-105 hover:bg-white sm:flex"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  </button>

  {/* Slide dots */}
  <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2">
    {slides.map((s, i) => (
      <button
        type="button"
        key={s.headline}
        aria-label={`Go to slide ${i + 1}`}
        onClick={() => setIndex(i)}
        className={`h-2.5 rounded-full transition-all ${
          i === index
            ? 'w-7 bg-slate-800'
            : 'w-2.5 bg-slate-500/40 hover:bg-slate-700'
        }`}
      />
    ))}
  </div>
</section>
  )
}