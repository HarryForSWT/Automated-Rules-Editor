export class Condition {
    public id: number;
    public name: string;
    public negated: boolean;
    public params: string[];
    public chosen: boolean;

    constructor(id:number, name:string, negated:boolean, params:string[], chosen:boolean) {
        this.id = id;
        this.name = name;
        this.negated = negated;
        this.params = params;
        this.chosen = chosen;
    }

    public getStringRepresentation() {
        return [this.name, this.negated, this.params];
    }
}