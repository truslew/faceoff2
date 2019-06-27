import * as moment from 'moment';
import { MatchDaoEx } from '../models/match';

export class MatchExtensions {
    public static toMoment(dt: MatchDaoEx): moment.Moment {
        return moment(dt.start.seconds * 1000);
    }
}
