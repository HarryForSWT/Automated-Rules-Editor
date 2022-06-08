export class Action {
    public id: number;
    public name: string;
    public params: string[];
    public chosen: boolean;

    constructor(
        id: number,
        name: string,
        params: string[],
        chosen: boolean) {
            this.id = id;
            this.name = name;
            this.params = params;
            this.chosen = chosen;
        }
}