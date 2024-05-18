export const userData = {
    nome: "Max Fernandes de Souza",
    email: "xaamax@gmail.com",
};

export const menuData = [
    {
        header: "MENU",
        items: [
            { label: "Link 1", style: "link", icon: "th" },
            { label: "Link 2", style: "link", icon: "th" },
        ],
    },
    {
        header: "MENU",
        items: [
            {
                label: "Treeview 1",
                icon: "bars",
                style: "treeview",
                childrens: [
                    { label: "Link 3", style: "link", icon: "file" },
                    { label: "Link 4", style: "link", icon: "copy" },
                ],
            },
        ],
    },
    {
        header: "MENU",
        items: [
            {
                label: "Treeview 2",
                icon: "bars",
                style: "treeview",
                childrens: [{ label: "Link 5", style: "link", icon: "file" }],
            },
        ],
    },
    { header: "MENU", items: [{ label: "Link 6", style: "link", icon: "th" }] }]


export const optionsEstiloMenu = [
    { label: "MenuLink", value: "link" },
    { label: "MenuTreeview", value: "treeview" },
]