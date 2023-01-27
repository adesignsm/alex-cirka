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
            of: [
                    {
                        name: "video_embed",
                        type: "object",
                        description: "Please use the link within the iframe embed and not the direct link provided by vimeo, youtube etc",
                        title: "Video Embed",
                        fields: [
                            {
                                title: "URL",
                                name: "video_embed",
                                type: "url"
                            },
                            {
                                name: "video_width",
                                type: "number",
                                title: "Video width(%)"
                            }
                        ]
                    },
                    {
                        name: "video_file",
                        type: "file",
                        description: "accepts .mp4 file types. To change this file type contact your developer",
                        title: "Video upload",
                        options: {
                            accept: "video/mp4"
                        },
                        fields: [{
                            name: "video_width",
                            type: "number",
                            title: "Video width(%)"
                        }]
                    },
                    {
                        name: "image_upload",
                        type: "image",
                        title: "Image Upload",
                        fields: [{
                            name: "image_width",
                            type: "number",
                            title: "Image width(%)",
                        }],
                    }
                ],
        },
        {
            name: "project_description",
            type: "string",
            title: "Project description"
        }
    ]
}