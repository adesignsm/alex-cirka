export default {
    name: "header_logo",
    type: "document",
    title: "Header Logo",
    fields: [
        {
          name: "header_logo_upload",
          title: "Header Image",
          type: "image",
          description: 'If "Header Text" is set then "Header Image" will not be applied. If you would like "Header Image" to take effect please remove the text in "Header Text".',
          options: {
            hotspot: "true"
          }
        },
        {
            name: "header_text",
            title: "Header Text",
            type: "string",
            description: 'If "Header Image" is set then "Header Text" will not be applied. If you would like "Header Text" to take effect please remove the file in "Header Image".'
        }
    ]
}