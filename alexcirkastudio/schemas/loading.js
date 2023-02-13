export default {
    name: "loading_screen",
    type: "document",
    title: "Loading Screen",
    fields: [
        {
            name: "loading_video",
            type: "array",
            title: "Loading Video",
            of: [{
                name: "loading_video_embed",
                type: "object",
                description: "Please use the link within the iframe embed and not the direct link provided by vimeo, youtube etc",
                title: "Video Embed",
                fields: [{
                    title: "URL",
                    name: "loading_video_embed",
                    type: "url"
                }],
            },
            {
                name: "loading_video_file",
                type: "file",
                description: "accepts .mp4 file types. To change this file type contact your developer",
                title: "Video upload",
                options: {
                    accept: "video/mp4"
                },
                fields: [{
                    name: "loading_video_width",
                    type: "number",
                    title: "Video width(%)"
                }]
            },
            {
                name: "loading_image_upload",
                type: "image",
                title: "Image Upload",
                fields: [{
                    name: "loading_image_width",
                    type: "number",
                    title: "Image width(%)",
                }],
            }]
        },
        {
            name: "audio_upload",
            type: "file",
            title: "Audio Upload"
        },
        {
            name: "default",
            type: "document",
            title: "Defaults",
            fields: [
                {
                    name: "default_image",
                    type: "image",
                    title: "Default Image"
                },
                {
                    name: "default_text",
                    type: "string",
                    title: "Default Text"
                }
            ]
        }
    ]
}