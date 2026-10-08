export type ContentFieldType = "text" | "textarea" | "image" | "list" | "repeatable";

export type ContentField = {
  key: string;
  label: string;
  type: ContentFieldType;
  /** For type "repeatable": the sub-fields of each item in the array. */
  itemFields?: { key: string; label: string; type: "text" | "textarea" }[];
};

export type ContentSectionSchema = {
  section: string;
  label: string;
  fields: ContentField[];
};

export const CONTENT_SCHEMA: ContentSectionSchema[] = [
  {
    section: "hero",
    label: "Hero",
    fields: [
      { key: "headline", label: "Headline", type: "text" },
      { key: "subtext", label: "Subtext", type: "textarea" },
      { key: "image", label: "Hero image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text" },
    ],
  },
  {
    section: "trustStrip",
    label: "Trust Strip",
    fields: [
      {
        key: "items",
        label: "Badges",
        type: "repeatable",
        itemFields: [{ key: "label", label: "Label", type: "text" }],
      },
    ],
  },
  {
    section: "shopCategories",
    label: "Shop By Category (section heading)",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
    ],
  },
  {
    section: "howItWorks",
    label: "How It Works",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "textarea" },
      {
        key: "steps",
        label: "Steps",
        type: "repeatable",
        itemFields: [
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    section: "bulkOrders",
    label: "Bulk Orders",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "body", label: "Body", type: "textarea" },
      { key: "benefits", label: "Benefits", type: "list" },
    ],
  },
  {
    section: "testimonials",
    label: "Testimonials",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      {
        key: "items",
        label: "Testimonials",
        type: "repeatable",
        itemFields: [
          { key: "name", label: "Name", type: "text" },
          { key: "initials", label: "Initials", type: "text" },
          { key: "quote", label: "Quote", type: "textarea" },
        ],
      },
    ],
  },
  {
    section: "aboutFounder",
    label: "Our Story",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "heading", label: "Heading", type: "text" },
      { key: "paragraph1", label: "Paragraph 1", type: "textarea" },
      { key: "paragraph2", label: "Paragraph 2", type: "textarea" },
      { key: "image", label: "Image", type: "image" },
    ],
  },
  {
    section: "ctaBanner",
    label: "CTA Banner",
    fields: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "headingAccent", label: "Heading accent (script text)", type: "text" },
      { key: "body", label: "Body", type: "textarea" },
    ],
  },
  {
    section: "footer",
    label: "Footer",
    fields: [
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "instagramHandle", label: "Instagram handle text", type: "text" },
    ],
  },
];
