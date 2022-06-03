export class Rule{
    public id: number;
    public name: string;
    public desc: string;
    public created: string[];
    public last_edit: string[];
    public conditions: any[];
    public actions: any[];

    constructor(
        id: number,
        name: string, 
        desc: string, 
        created: string[],
        last_edit: string[],
        conditions: any[],
        action:any[]){
            this.id = id;
            this.name = name;
            this.desc = desc;
            this.created= created;
            this.last_edit = last_edit;
            this.conditions = conditions;
            this.actions = action;
    }
}