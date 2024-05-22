export const userData = {
    nome: "Max Fernandes de Souza",
    email: "xaamax@gmail.com",
};

export const menuDefault = [
    {
        id: 1,
        header: "MENU",
        items: [
            { id: 1, label: "Link 1", style: "link", icon: "th", visible: true, order: 1, route: "/", childrens: [] },
            { id: 2, label: "Link 2", style: "link", icon: "th", visible: true, order: 2, route: "/", childrens: [] },
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
                visible: true, 
                order: 1,
                childrens: [
                    { id: 1, label: "Link 3", style: "link", icon: "file", visible: true, order: 1, route: "/" },
                    { id: 2, label: "Link 4", style: "link", icon: "copy", visible: true, order: 1, route: "/" },
                ],
            },
        ],
    }]


export const optionsEstiloMenu = [
    { label: "MenuLink", value: "link" },
    { label: "MenuTreeview", value: "treeview" },
]