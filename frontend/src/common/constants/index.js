import LogoDefault from "../../assets/images/logo_default.png"
import Logo from "../../assets/images/logo.png"

export const appData = () => {
    return JSON.parse(localStorage.getItem("appData")) || "";
};


export const userData = () => {
    return JSON.parse(localStorage.getItem("userData")) || "";
};

export const hubsData = () => {
    return JSON.parse(localStorage.getItem("hubsData")) || [];
};

export const menuData = () => {
    return JSON.parse(localStorage.getItem("menuData")) || [];
};

export { LogoDefault, Logo };

export const appDefault = {
    name: "MyApp",
    darkMode: true,
    logoCircle: false,
    style: "default"
}


export const userDefault = {
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
                route: "#",
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


export const bgColors = [
    {key: "bg-primary", text: "Primary" },
    {key: "bg-warning", text: "Warning" },
    {key: "bg-info", text: "Info" },
    {key: "bg-danger", text: "Danger" },
    {key: "bg-success", text: "Success" },
    {key: "bg-indigo", text: "Indigo" },
    {key: "bg-lightblue", text: "Lightblue" },
    {key: "bg-navy", text: "Navy" },
    {key: "bg-purple", text: "Purple" },
    {key: "bg-fuchsia", text: "Fuchsia" },
    {key: "bg-pink", text: "Pink" },
    {key: "bg-maroon", text: "Maroon" },
    {key: "bg-orange", text: "Orange" },
    {key: "bg-lime", text: "Lime" },
    {key: "bg-teal", text: "Teal" },
    {key: "bg-olive", text: "Olive" },
]
