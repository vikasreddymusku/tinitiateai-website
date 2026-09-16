import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'level', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 200,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      defaultValue: 'beginner',
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
      ],
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "8 weeks" or "45 hours"',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'discountedPrice',
      type: 'number',
    },
    {
      name: 'trainer',
      type: 'relationship',
      relationTo: 'trainers',
    },
    {
      name: 'curriculum',
      type: 'array',
      fields: [
        {
          name: 'moduleTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'topics',
          type: 'array',
          fields: [
            {
              name: 'topic',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'keyFeatures',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'tools',
      type: 'array',
      fields: [
        {
          name: 'tool',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'targetAudience',
      type: 'array',
      fields: [
        {
          name: 'audience',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        description: 'Displayed as a star rating on course cards',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Shows in the "Trending" tab on the courses page',
      },
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Job Placement Assistance Program', value: 'placement-assistance' },
        { label: 'Internship', value: 'internship' },
        { label: 'Certification Course', value: 'certification' },
      ],
      admin: {
        description: 'Controls which tabs this course appears under on the courses page',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        description: 'Next batch start date shown on course cards. Leave blank to show "Batch Starts Soon".',
      },
    },
    {
      name: 'bannerLabel',
      type: 'text',
      admin: {
        description: 'Optional large text shown on the card banner, e.g. "JAVA" or ".NET". Falls back to the course title if left blank.',
      },
    },
    {
      name: 'bannerTag',
      type: 'text',
      admin: {
        description: 'Optional small pill shown under the banner label, e.g. "Full Stack"',
      },
    },
  ],
}
