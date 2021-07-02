import { Posizione } from "./posizione";

export class CriteriRicerca {
    constructor(
    public readonly preferenzaCibo: string,
    public readonly posizione :Posizione,
    public readonly minutiDisponibili: number,
    ){}
    
}
