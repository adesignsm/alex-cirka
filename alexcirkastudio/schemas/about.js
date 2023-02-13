export default {
    name: "about",
    type: "document",
    title: "About",
    fields: [
        {
            name: "about_description",
            type: "text",
            title: "About Description",
        },
        {
            name: "about_clients",
            type: "array",
            title: "Past Clients",
            of: [{type: "string"}]
        }
    ]
}