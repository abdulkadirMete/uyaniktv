import avatar from "../assets/images/default-avatar.png";

export const textData = {
    brandName: "Uyanık TV",
};

export const menuItems = [
    {
        id: 1,
        title: "Üyelik",
        icon: "fa-solid fa-cart-shopping",
        path: "/uyelik",
    },
    {
        id: 2,
        title: "Tv Rehberi",
        icon: "fa-solid fa-clock-rotate-left",
        path: "/",
    },
    {
        id: 3,
        title: "Kanal Düzenleme",
        icon: "fa-solid fa-arrow-right-arrow-left",
        path: "/",
    },
    {
        id: 4,
        title: "Ayarlar",
        icon: "fa-solid fa-gear",
        path: "/",
    },
    {
        id: 5,
        title: "Yardım",
        icon: "fa-solid fa-circle-question",
        path: "/",
    },
    {
        id: 6,
        title: "Çıkış",
        icon: "fa-solid fa-right-from-bracket",
        path: "/",
    },
];

export const dropdownItems = [
    {
        id: 3,
        title: "Profil",
        icon: "fa-solid fa-user",
        path: "/profil",
    },
    // {
    //     id: 3,
    //     title: "Kanal Düzenleme",
    //     icon: "fa-solid fa-arrow-right-arrow-left",
    //     path: "/",
    // },
    // {
    //     id: 4,
    //     title: "Ayarlar",
    //     icon: "fa-solid fa-gear",
    //     path: "/",
    // },
    {
        id: 5,
        title: "Yardım",
        icon: "fa-solid fa-circle-question",
        path: "/",
    },
];

export const defaultAvatar = avatar;

export const memberPackets = [
    {
        title: "1 Aylık 24DVR aboneliği",
        price: "33.76₺",
        day: 30,
        priceToken: "price_1LN9gFHYNlA8pJCLFl03AVQp",
    },
    {
        title: "6 Aylık 24DVR aboneliği",
        price: "134.23₺",
        day: 180,
        priceToken: "price_1LN9jvHYNlA8pJCLeyNfAvNn",
    },
    {
        title: "1 Senelik 24DVR aboneliği",
        price: "235.91₺",
        day: 365,
        priceToken: "price_1LN9taHYNlA8pJCLTsTbUMOU",
    },
];
