import Link from 'next/link'
import type { SiteSetting } from '@/payload-types'

export function Footer({ settings }: { settings: SiteSetting }) {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <p className="text-lg font-bold text-white">{settings.siteName}</p>
          <p className="mt-2 text-sm text-slate-400">{settings.tagline}</p>
          {settings.socialLinks && settings.socialLinks.length > 0 && (
            <div className="mt-4 flex gap-3">
              {settings.socialLinks.map((link) => (
                <a
                  key={link.id ?? link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-slate-400 hover:text-white"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/courses" className="hover:text-white">Courses</Link></li>
            <li><Link href="/trainers" className="hover:text-white">Trainers</Link></li>
            <li><Link href="/placements" className="hover:text-white">Placements</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Company</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/book-a-demo" className="hover:text-white">Book a Demo</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            {settings.contactPhone && <li>{settings.contactPhone}</li>}
            {settings.contactEmail && <li>{settings.contactEmail}</li>}
            {settings.address && <li>{settings.address}</li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
      </div>
    </footer>
  )
}
