import { Container } from '@/components/ui/Container'
import { ContactForm } from '@/components/ContactForm'
import { getSiteSettings } from '@/lib/siteSettings'

export const metadata = { title: 'Contact — TinitiateAI' }

export default async function ContactPage() {
  const settings = await getSiteSettings()

  return (
    <Container className="grid gap-12 py-16 lg:grid-cols-2">
      <div>
        <span className="text-sm font-semibold uppercase tracking-wide text-brand-600">Contact</span>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Get in touch</h1>
        <p className="mt-4 text-slate-600">
          Have a question about a course, corporate training, or partnerships? Send us a message and we&apos;ll
          respond within one business day.
        </p>
        <div className="mt-8 space-y-3 text-sm text-slate-600">
          {settings.contactPhone && <p><strong className="text-slate-900">Phone:</strong> {settings.contactPhone}</p>}
          {settings.contactEmail && <p><strong className="text-slate-900">Email:</strong> {settings.contactEmail}</p>}
          {settings.address && <p><strong className="text-slate-900">Address:</strong> {settings.address}</p>}
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <ContactForm />
      </div>
    </Container>
  )
}
