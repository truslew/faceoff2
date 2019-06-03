import { Match } from '../shared/models/match';
import * as moment from 'moment';

export class DayMatch {
    public day: moment.Moment;

    public matches: Match[] = [];

    constructor(day: moment.Moment) {
        this.day = day;
    }

    public get caption(): string {
        return this.day != null ? this.day.format('dddd, DD. MMMM') : '';
    }
}
