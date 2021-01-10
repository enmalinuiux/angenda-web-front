export interface Contact {
    id?: string;
    name: string;
    lastName: string;
    email: string;
    business: string;
    birth: Date;
    userType: number;
    addressStreet: string;
    addressCity: string;
    addressCountry: string;
    phones?: string[];
}
