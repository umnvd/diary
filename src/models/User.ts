export default interface User {
    name: string;
    image: string
    role: number;
}

export const currentUser: User = {
    name: "Митя",
    image: "mitya.jpg",
    role: 1
}