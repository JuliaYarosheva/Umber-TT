export interface User {
    dob: {
        age: number,
        date: string,
    },
    email: string,
    gender: string,
    id: {
        name: string,
        value: string
    },
    location: {
        street: {
            number: number,
            name: string,
        },
        city: string,
        state: string,
        country: string,
        postcode: string,
    },
    name: {
        title: string,
        first: string,
        last: string
    },
    phone: string,
    picture: {
        large: string,
        medium: string,
        thumbnail: string,
    }
}