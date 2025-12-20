// Sanity Schema for Blog Post
// Copy this file to your Sanity Studio: studio/schemas/blogPost.ts

export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the blog post',
      validation: (Rule: any) => Rule.required().max(100),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the title',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary of the post (shown in cards)',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'The main content of the blog post',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Main image for the blog post',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule: any) => Rule.required(),
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      description: 'The author of this post',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Primary category for this post',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      description: 'Tags for filtering and SEO',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this post in the featured section?',
      initialValue: false,
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Is this post published?',
      initialValue: false,
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'When should this post be published?',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      description: 'Last update timestamp',
    },
    {
      name: 'readTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
      validation: (Rule: any) => Rule.required().min(1).max(60),
    },
    {
      name: 'viewCount',
      title: 'View Count',
      type: 'number',
      description: 'Number of views (managed by application)',
      initialValue: 0,
      readOnly: true,
    },
    {
      name: 'likeCount',
      title: 'Like Count',
      type: 'number',
      description: 'Number of likes (managed by application)',
      initialValue: 0,
      readOnly: true,
    },
    {
      name: 'commentsCount',
      title: 'Comments Count',
      type: 'number',
      description: 'Number of comments (managed by application)',
      initialValue: 0,
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
      published: 'published',
    },
    prepare({ title, author, media, published }: any) {
      return {
        title,
        subtitle: `By ${author} • ${published ? '✓ Published' : '✗ Draft'}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Title, A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
};
