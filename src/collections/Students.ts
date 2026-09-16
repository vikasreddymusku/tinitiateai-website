import type { CollectionConfig } from 'payload'

export const Students: CollectionConfig = {
  slug: 'students',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'phone'],
  },
  auth: true,
  access: {
    create: () => true,
    read: ({ req: { user } }) => {
      if (user?.collection === 'users') return true
      if (user?.collection === 'students') {
        return { id: { equals: user.id } }
      }
      return false
    },
    update: ({ req: { user } }) => {
      if (user?.collection === 'users') return true
      if (user?.collection === 'students') {
        return { id: { equals: user.id } }
      }
      return false
    },
    delete: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
  ],
}
