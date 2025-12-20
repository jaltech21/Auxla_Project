// Sanity Schema for Category
// Copy this file to your Sanity Studio: studio/schemas/category.ts

export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Category name',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the name',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of this category',
      rows: 3,
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code for badges (e.g., #3B82F6)',
      validation: (Rule: any) =>
        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
          name: 'hex color',
          invert: false,
        }),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
};
