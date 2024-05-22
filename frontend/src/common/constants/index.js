export const userData = {
    nome: "Max Fernandes de Souza",
    email: "xaamax@gmail.com",
};

export const menuDefault = [
    {
        id: 1,
        header: "MENU",
        items: [
            { id: 1, label: "Link 1", style: "link", icon: "th", childrens: [] },
            { id: 2, label: "Link 2", style: "link", icon: "th", childrens: [] },
        ],
    },
    {
        id: 2,
        header: "MENU",
        items: [
            {
                id: 1,
                label: "Treeview 1",
                icon: "bars",
                style: "treeview",
                childrens: [
                    { id: 1, label: "Link 3", style: "link", icon: "file" },
                    { id: 2, label: "Link 4", style: "link", icon: "copy" },
                ],
            },
        ],
    }]


export const optionsEstiloMenu = [
    { label: "MenuLink", value: "link" },
    { label: "MenuTreeview", value: "treeview" },
]