import { Condition } from "./condition.module";

export class ConditionNode {
    public conditions: Condition[] = [];
    public children: ConditionNode[] = [];

    constructor(conditions: Condition[], children: ConditionNode[]) {
        this.conditions = conditions;
        this.children = children;
    }

    public addChild(child: ConditionNode) {
        this.children.push(child);
    }

    public addCondition(condition: Condition) {
        this.conditions.push(condition);
    }
}