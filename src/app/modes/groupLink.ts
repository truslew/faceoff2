import { Group } from './group';

export class GroupLink {
    public groupId: number;
    public rank: number;

    public group: Group;

    public get isValid(): boolean {
        return this.group != null && this.rank != null;
    }
}
