import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'

export const DemoBookings: CollectionConfig = {
  slug: 'demo-bookings',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'slot', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
    update: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
    delete: ({ req: { user } }) => Boolean(user && user.collection === 'users'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
    },
    {
      name: 'slot',
      type: 'relationship',
      relationTo: 'demo-slots',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation !== 'create') return data

        const slotId = typeof data.slot === 'object' ? data.slot.id : data.slot

        const slot = await req.payload.findByID({
          collection: 'demo-slots',
          id: slotId,
        })

        if (!slot || !slot.isActive) {
          throw new APIError('This demo slot is no longer available.', 400)
        }

        const existingBookings = await req.payload.count({
          collection: 'demo-bookings',
          where: {
            slot: { equals: slotId },
            status: { not_equals: 'cancelled' },
          },
        })

        if (existingBookings.totalDocs >= slot.capacity) {
          throw new APIError('This demo slot is fully booked. Please choose another time.', 400)
        }

        return data
      },
    ],
  },
}
