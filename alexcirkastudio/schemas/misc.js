export default {
    name: "misc",
    type: "document",
    title: "Misc Styles",
    fields: [
        {
            name: "project_margin",
            type: "number",
            title: "Project Margin(px)",
            description: "Sets the margins for the media in each project row as well as in the single projects page."
        },
        {
            name: "page_margin",
            type: "number",
            title: "Page Margin(px)",
            description: "Sets the general margin for the entire html document page."
        }, 
        {
            name: "heading_margin",
            type: "number",
            title: "Heading Margin(px)",
            description: "Sets the margin for all heading text."
        },
        {
            name: "body_margin",
            type: "number",
            title: "Body Margin(px)",
            description: "Sets the margin for all body text."
        },
        {
            name: "project_media_size",
            type: "number",
            title: "Project Video Size(%)",
            description: "Sets the size for all the media in each project to make sure they are equal in height and width."
        }
    ]
}