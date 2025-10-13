import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    icon: z.string().optional(),
    iconName: z.string().optional(),
    client: z.string().optional(),
    affiliation: z
      .object({
        type: z.enum(["enterprise", "independent", "personal"]),
        logo: z.string().optional(),
        label: z.string(),
        client: z.string().optional(),
      })
      .optional(),
    links: z
      .object({
        appStore: z.string().optional(),
        playStore: z.string().optional(),
        repo: z.string().optional(),
        live: z.string().optional(),
        docs: z.string().optional(),
      })
      .partial()
      .default({}),
    media: z
      .object({
        video: z.string().optional(),
        images: z
          .array(
            z.object({
              src: z.string(),
              alt: z.string(),
              caption: z.string().optional(),
            })
          )
          .optional(),
      })
      .partial()
      .default({}),
    badges: z.array(z.string()).default([]),
    platforms: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    weight: z.number().default(0),
    date: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
