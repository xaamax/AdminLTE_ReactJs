export const userData = {
    nome: "Max Fernandes de Souza",
    email: "xaamax@gmail.com",
};

export const menuData = [
    {
        header: "MENU",
        items: [
            { label: "Item 1", icon: "th" },
            { label: "Item 2", icon: "th" },
        ],
    },
    {
        header: "MENU",
        items: [
            {
                label: "Treeview",
                icon: "bars",
                childrens: [
                    { label: "Subitem", icon: "file" },
                    { label: "Subitem", icon: "copy" },
                ],
            },
        ],
    },
    {
        header: "MENU",
        items: [
            {
                label: "Treeview",
                icon: "bars",
                childrens: [{ label: "Subitem", icon: "file" }],
            },
        ],
    },
    { header: "MENU", items: [{ label: "Item", icon: "th" }] }]