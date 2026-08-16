import { defineField, defineType } from "sanity";

export const testimonial = defineType({
    name: "testimonial",
    title: "Testimonials",
    type: "document",
    // The carousel opens on the first one, so the studio decides which
    // quote leads rather than GROQ's unspecified default order.
    orderings: [
        {
            title: "Display order",
            name: "displayOrderAsc",
            by: [{ field: "displayOrder", direction: "asc" }],
        },
    ],
    fields: [
        defineField({
            name: "quote",
            title: "Quote",
            type: "text",
            validation: (Rule) => Rule.required().max(250).warning("Longer quotes may be truncated on smaller screens."),
        }),
        defineField({
            name: "author",
            title: "Author Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "role",
            title: "Role / Description",
            type: "string",
            description: "e.g. 'Client' or 'Interior Designer'",
        }),
        defineField({
            name: "displayOrder",
            title: "Display Order",
            type: "number",
            description:
                "Lower numbers come first. The carousel opens on the lowest. Leave blank and the quote falls to the end.",
            validation: (Rule) => Rule.integer().min(0),
        }),
    ],
});
