import { Posizione } from "./posizione";

export interface Ristorante {
    attributo: string;
    coordinates: Posizione;
    name : string;
    tempo: number;
}
