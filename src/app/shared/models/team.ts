import { Group } from './group';
import { Ident } from './ident';
import { Match } from './match';

export class Team {
    public id: string;
    public groupId: string;
    public name: string;
    public ident: string;

    public weight: number;

    public group: Group;

    public matches: Match[];
}

export interface TeamDao {
    groupId: string;
    name: string;
    ident: string;
    weight: number;
}

export interface TeamDaoEx extends TeamDao, Ident {}
