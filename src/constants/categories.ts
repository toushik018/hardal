export interface MenuContent {
    name: string;
    ids: number[];
    count: number;
}

export interface Package {
    name: string;
    id: number;
    price: string;
    minimumClients: number;
}

// Static packages data
export const PACKAGES: Package[] = [
    {
        name: "Classic Menü",
        id: 1,
        price: "19,90 €",
        minimumClients: 20
    },
    {
        name: "Signature Menü",
        id: 2,
        price: "24,90 €",
        minimumClients: 30
    },
    {
        name: "Exclusive Menü",
        id: 3,
        price: "29,90 €",
        minimumClients: 50
    },
    {
        name: "Fingerfood Menü",
        id: 4,
        price: "16,90 €",
        minimumClients: 20
    },
    {
        name: "BBQ Menü",
        id: 5,
        price: "34,90 €",
        minimumClients: 20
    },
    {
        name: "Fisch Menü",
        id: 6,
        price: "34,90 €",
        minimumClients: 20
    }
];

// Static fallback menu contents
export const MENU_CONTENTS: { [key: number]: MenuContent[] } = {
    1: [ // Classic Menu
        {
            name: "Vorspeise",
            ids: [60, 61, 59],
            count: 1
        },
        {
            name: "Hauptspeise",
            ids: [62],
            count: 1
        },
        {
            name: "Beilage",
            ids: [64],
            count: 2
        },
        {
            name: "Extras",
            ids: [66, 69],
            count: 0
        }
    ],
    2: [ // Signature Menu
        {
            name: "Vorspeise",
            ids: [60, 61, 59],
            count: 3
        },
        {
            name: "Hauptspeise",
            ids: [62],
            count: 2
        },
        {
            name: "Beilage",
            ids: [64],
            count: 2
        },
        {
            name: "Dessert",
            ids: [65],
            count: 1
        },
        {
            name: "Extras",
            ids: [66, 69],
            count: 1
        }
    ],
    3: [ // Exclusive Menu
        {
            name: "Vorspeise",
            ids: [60, 61, 59],
            count: 6
        },
        {
            name: "Hauptspeise",
            ids: [62],
            count: 3
        },
        {
            name: "Beilage",
            ids: [64],
            count: 3
        },
        {
            name: "Dessert",
            ids: [65],
            count: 3
        },
        {
            name: "Extras",
            ids: [66, 69],
            count: 1,
        }
    ],
    4: [ // Fingerfood Menu
        {
            name: "Vorspeise",
            ids: [60, 61, 59],
            count: 6
        },
        {
            name: "Teigwaren",
            ids: [63],
            count: 3
        },
        {
            name: "Dessert",
            ids: [65],
            count: 2
        },
        {
            name: "Extras",
            ids: [ 66, 69],
            count: 1
        }
    ],
    5: [ // BBQ Menu
        {
            name: "Vorspeise",
            ids: [60, 61, 59],
            count: 4
        },
        {
            name: "Hauptspeise",
            ids: [67],
            count: 2
        },
        {
            name: "Beilage",
            ids: [64],
            count: 3
        },
        {
            name: "Dessert",
            ids: [65],
            count: 2
        },
        {
            name: "Extras",
            ids: [ 66, 69],
            count: 1
        }
    ],
    6: [ // Fish Menu
        {
            name: "Vorspeise",
            ids: [60, 61, 59],
            count: 4
        },
        {
            name: "Hauptspeise",
            ids: [68],
            count: 2
        },
        {
            name: "Beilage",
            ids: [64],
            count: 3
        },
        {
            name: "Dessert",
            ids: [65],
            count: 2
        },
        {
            name: "Extras",
            ids: [ 66, 69],
            count: 1
        }
    ]
};

// Helper function to get menu contents for a package
export const getMenuContents = (packageId: number): MenuContent[] => {
    return MENU_CONTENTS[packageId] || [];
};

// Helper function to identify extra categories
export const isExtraCategory = (categoryId: string): boolean => {
    return ["63", "66", "69"].includes(categoryId);
}; 