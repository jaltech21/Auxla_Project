// Sanity Schema for Author
// Copy this file to your Sanity Studio: studio/schemas/author.ts

export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full name of the author',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      description: 'Professional title or role',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Short biography',
      rows: 4,
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      description: 'Profile picture',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Professional credentials (e.g., PhD, Licensed Therapist)',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'email',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'avatar',
    },
  },
};
