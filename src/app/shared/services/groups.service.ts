import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GroupDao, GroupDaoEx } from '../models/group';
import { CollectionBase } from './collection-base';

@Injectable({
    providedIn: 'root'
})
export class GroupsService extends CollectionBase<GroupDao, GroupDaoEx> {
    constructor(protected fireStore: AngularFirestore) {
        super(fireStore, 'groups');
    }
}
