import type { CollectionConfig } from 'payload'

export const DemoSlots: CollectionConfig = {
  slug: 'demo-slots',
  admin: {
    useAsTitle: 'startsAt',
    defaultColumns: ['startsAt', 'endsAt', 'course', 'capacity', 'isActive'],
  },
  defaultSort: 'startsAt',
  access: {
    read: ({ req: { user } }) => {
      if (user?.collection === 'users') return true
      return { isActive: { equals: true } }
    },
    create: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
    update: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
    delete: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
  },
  fields: [
    {
      name: 'startsAt',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endsAt',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      admin: {
        description: 'Leave blank for a general orientation demo covering all courses',
      },
    },
    {
      name: 'capacity',
      type: 'number',
      required: true,
      defaultValue: 20,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
