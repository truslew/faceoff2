import { Group } from 'app/models/group';
import { Match } from 'app/models/match';

export class Team {
    public id: number;
    public groupId: number;
    public name: string;
    public ident: string;

    public weight: number;

    public group: Group;

    public matches: Match[];
}
