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
          description: "Only upload one or the other. Please do not upload all three media types",
          options: {
            hotspot: true,
          },
        },
        {
            name: "image_width",
            type: "number",
            title: "Image width(%)"
        },
        {
          name: "video_embed",
          type: "url",
          description: "Please use the link within the iframe embed and not the direct link provided by vimeo, youtube etc",
          title: "Video Embed"
        },
        {
          name: "video_file",
          type: "file",
          description: "accepts .mp4 file types. To change this file type contact your developer",
          options: {
            accept: "video/mp4"
          }
        }
      ],
}
