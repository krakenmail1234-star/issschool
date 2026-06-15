import { defineField, defineType } from 'sanity'

// Editable course cards for the homepage (trilingual: LV / EN / RU).
// The website reads these via the public API and falls back to built-in
// defaults if none exist yet.
export const courseType = defineType({
  name: 'course',
  title: 'Course (homepage card)',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Order (sort)', type: 'number', initialValue: 0 }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      initialValue: 'sparkle',
      options: {
        list: [
          'rocket', 'chat', 'bolt', 'user', 'sparkle', 'target',
          'clock', 'compass', 'briefcase', 'megaphone', 'pen', 'gear',
        ],
      },
    }),
    defineField({ name: 'stripeUrl', title: 'Stripe / enroll link', type: 'url' }),
    defineField({ name: 'featured', title: 'Featured (highlighted)', type: 'boolean', initialValue: false }),

    defineField({ name: 'titleLv', title: 'Title (LV)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'titleEn', title: 'Title (EN)', type: 'string' }),
    defineField({ name: 'titleRu', title: 'Title (RU)', type: 'string' }),

    defineField({ name: 'descLv', title: 'Description (LV)', type: 'text', rows: 3 }),
    defineField({ name: 'descEn', title: 'Description (EN)', type: 'text', rows: 3 }),
    defineField({ name: 'descRu', title: 'Description (RU)', type: 'text', rows: 3 }),

    defineField({ name: 'ctaLv', title: 'Button (LV)', type: 'string', initialValue: 'Pieteikties' }),
    defineField({ name: 'ctaEn', title: 'Button (EN)', type: 'string', initialValue: 'Enroll' }),
    defineField({ name: 'ctaRu', title: 'Button (RU)', type: 'string', initialValue: 'Записаться' }),

    defineField({ name: 'badgeLv', title: 'Badge (LV, optional)', type: 'string' }),
    defineField({ name: 'badgeEn', title: 'Badge (EN, optional)', type: 'string' }),
    defineField({ name: 'badgeRu', title: 'Badge (RU, optional)', type: 'string' }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'titleLv', subtitle: 'order' },
    prepare: ({ title, subtitle }) => ({ title: title || '(no title)', subtitle: 'Order: ' + (subtitle ?? 0) }),
  },
})
