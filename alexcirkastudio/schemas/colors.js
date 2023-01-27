const optionsList = ["Nav Bar Background", "Body Background", "Fonts", "Footer Background"];

export default {
    name: "colors",
    type: "document",
    title: "Colors",
    fields: [
        {
            name: "color_code_element_name",
            type: "string",
            title: "Color Code Title (e.g background, project title font, project body font, etc.)",
        },
        {
            name: "color_code",
            type: "string",
            title: "Color Code (hexcode)"
        }
    ]
}