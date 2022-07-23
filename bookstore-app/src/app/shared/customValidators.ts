import { AbstractControl,ValidationErrors, ValidatorFn } from "@angular/forms";

export function stringValidator(pattern:RegExp) : ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const isString:boolean=pattern.test(control.value);
        return !isString ? {isString:{value:control.value}} :null;
    }
}

export function priceValidator(pattern:RegExp) : ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const isNumber:boolean=pattern.test(control.value);
        return !isNumber ? {isNumber:{value:control.value}} :null;
    }
}

export function dateValidator(pattern:RegExp) : ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const isDate:boolean=pattern.test(control.value);
        return !isDate ? {isDate:{value:control.value}} :null;
    }
}




