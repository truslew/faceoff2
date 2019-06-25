import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class TakeUntilBase implements OnDestroy {
    protected destroy$: Subject<boolean> = new Subject<boolean>();

    ngOnDestroy() {
        this.stop();
    }

    protected start(): void {
        this.stop();
        this.destroy$ = new Subject<boolean>();
    }

    protected stop(): void {
        if (this.destroy$ != null) {
            this.destroy$.next(true);
            this.destroy$.unsubscribe();
        }
        this.destroy$ = null;
    }
}
