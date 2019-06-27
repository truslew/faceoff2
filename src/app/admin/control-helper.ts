import { AbstractControl, FormGroup } from '@angular/forms';

export class ControlHelper<T> {
    constructor(private form: FormGroup, private name: string) {}

    public get control(): AbstractControl {
        return this.form.get(this.name);
    }

    public get value(): T {
        const c = this.control;
        return c != null ? c.value : null;
    }

    public get intValue(): number {
        const c = this.control;
        return c != null ? Number.parseInt(c.value, 10) : null;
    }

    public get invalid(): boolean {
        return this.control.invalid && this.control.touched;
    }
}
