export default {
    name: "font",
    type: "document",
    title: "Fonts",
    fields: [
        {
            name: "font_name",
            type: "string",
            title: "Font Name e.g 'Hero description font'",
            accept: "font/*"
        },
        {
            name: "font_file_upload",
            type: "file",
            title: "Upload file"
        }
    ]
}