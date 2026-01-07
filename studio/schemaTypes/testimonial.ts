import { defineField, defineType } from "sanity";

export const testimonial = defineType({
    name: "testimonial",
    title: "Testimonials",
    type: "document",
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
            name: "image",
            title: "Author Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
    ],
});
