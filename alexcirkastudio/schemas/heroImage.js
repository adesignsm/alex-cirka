export default {
    name: "heroimage",
    title: "Hero Image", // name of the model
    type: "document",
    fields: [
        {
          name: "hero_image_upload", // name of the field
          title: "Image",
          // photos are identified in the sanity database by the keyword image
          type: "image",
          options: {
            hotspot: true,
          },
        },
        {
            name: "image_width",
            type: "number",
            title: "Image width(%)"
        }
      ],
}
