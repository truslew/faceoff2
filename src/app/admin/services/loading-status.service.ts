import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class LoadingStatusService {
    public loading = false;
    public loaded = false;
    public loadError = false;

    public saving = false;
    public saved = false;
    public saveError = false;

    public get loadSuccess(): boolean {
        return !this.loadError;
    }

    public get saveSuccess(): boolean {
        return !this.saveError;
    }

    constructor(private toaster: ToastrService) {}

    public loadingStart(message: string = null): void {
        this.loading = true;
        this.loaded = false;
        this.loadError = false;
        if (message != null) {
            this.toaster.info(message);
        }
    }

    public loadingSuccess(message: string = null): void {
        this.loading = false;
        this.loaded = true;
        this.loadError = false;
        if (message != null) {
            this.toaster.success(message);
        }
    }

    public loadingError(message: string = null): void {
        this.loading = false;
        this.loaded = false;
        this.loadError = true;
        if (message != null) {
            this.toaster.error(message, 'Feil under lasting', {
                timeOut: 10000
            });
        }
    }

    public savingStart(message: string = null): void {
        this.saving = true;
        this.saved = false;
        this.saveError = false;
        if (message != null) {
            this.toaster.info(message);
        }
    }

    public savingSuccess(message: string = null): void {
        this.saving = false;
        this.saved = true;
        this.saveError = false;
        if (message != null) {
            this.toaster.success(message);
        }
    }

    public savingError(message: string = 'Noe feil skjedde under lagring. Prøv igjen.'): void {
        this.saving = false;
        this.saved = false;
        this.saveError = true;
        if (message != null) {
            this.toaster.error(message, 'Feil under lagring', {
                timeOut: 10000
            });
        }
    }
}
