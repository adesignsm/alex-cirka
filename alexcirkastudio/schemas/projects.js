export default {
    name: "projects",
    type: "document",
    title: "Projects",
    fields: [
        {
            name: "project_title",
            type: "string",
            title: "Project title",
        },
        {
            name: "project_media",
            type: "array",
            title: "Project media",
            of: [{
                    type: "image",
                    fields: [{
                        name: "image_width",
                        type: "number",
                        title: "Image width(%)"
                    }]
            }]
        },
        {
            name: "project_description",
            type: "string",
            title: "Project description"
        }
    ]
}