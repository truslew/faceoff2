import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Ident } from '../models/ident';

export class CollectionBase<T, TEx extends Ident> {
    constructor(protected fireStore: AngularFirestore, private collectionName: string) {}

    public collection(): AngularFirestoreCollection<T> {
        return this.fireStore.collection(this.collectionName);
    }

    public all(): Observable<TEx[]> {
        return this.collection()
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(action => {
                        const data = action.payload.doc.data() as any;
                        const id = action.payload.doc.id;
                        return { id, ...data };
                    });
                })
            );
    }

    public getDoc(id: string): AngularFirestoreDocument<T> {
        return this.collection().doc(id);
    }

    public getData(document: AngularFirestoreDocument<T>): Observable<TEx> {
        return document.snapshotChanges().pipe(
            map(s => {
                const data = s.payload.data() as any;
                const id = s.payload.id;
                return { id, ...data };
            })
        );
    }

    public get(id: string): Observable<TEx> {
        return this.getData(this.getDoc(id));
    }

    public add(sponsor: T): Observable<TEx> {
        return from(this.collection().add(sponsor)).pipe(
            switchMap(x => x.get()),
            map(s => {
                const data = s.data() as any;
                const id = s.id;
                return { id, ...data };
            })
        );
    }

    public addWithId(sponsor: TEx): Observable<TEx> {
        const { id, ...data } = sponsor;
        const doc = this.collection().doc(id);
        return from(doc.set(data)).pipe(map(() => sponsor));
    }
}
