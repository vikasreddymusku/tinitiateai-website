import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Students } from './collections/Students'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Trainers } from './collections/Trainers'
import { Courses } from './collections/Courses'
import { Testimonials } from './collections/Testimonials'
import { BlogPosts } from './collections/BlogPosts'
import { Enrollments } from './collections/Enrollments'
import { DemoSlots } from './collections/DemoSlots'
import { DemoBookings } from './collections/DemoBookings'
import { ContactMessages } from './collections/ContactMessages'
import { Batches } from './collections/Batches'
import { PlacementRegistrations } from './collections/PlacementRegistrations'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Students,
    Media,
    Categories,
    Trainers,
    Courses,
    Testimonials,
    BlogPosts,
    Enrollments,
    DemoSlots,
    DemoBookings,
    ContactMessages,
    Batches,
    PlacementRegistrations,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./tinitiateai.db',
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
})
