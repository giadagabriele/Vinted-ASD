import { City } from './city.model';

export class User {
    id: number;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: number;
    password: string;
    firstName: string;
    address : string;
    profilePic: string;
    firstLogin :boolean;
    city :City;
}

