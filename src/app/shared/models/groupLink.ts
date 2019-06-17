import { Group } from './group';

export class GroupLink {
    public groupId: string;
    public rank: number;

    public group: Group;

    public get isValid(): boolean {
        return this.group != null && this.rank != null;
    }
}

export interface GroupLinkDao {
    groupId: string;
    rank: number;
}
