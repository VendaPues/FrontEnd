const initialState = {
    email: "",
    userLogged: false,
    sales: [
        {
            id: 123,
            name: "Venta #534",
            total: 1000,
            units: 13
        },
        {
            id: 456,
            name: "Venta #533",
            total: 2000,
            units: 7
        }
    ],
    products: [
        {
            id: 123,
            name: "Gansito",
            price: 1000,
            units: 13,
            image: "https://i.ibb.co/7y7ybNG/product-Example.jpg"
        },
        {
            id: 456,
            name: "De Todito BBQ",
            price: 2000,
            units: 7,
            image: "https://i.ibb.co/7y7ybNG/product-Example.jpg"
        }
    ]
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "VALIDATE_LOGIN":
            return {
                ...state,
                userLogged: action.payload
            }
        default:
            return state;
    }
}