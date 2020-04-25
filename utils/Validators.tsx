export const validateForm = (values: Object, inputs: { property: string, validators?: string[], customValidations?: Function[] }[]): Object => {
    let errors = {}
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const property = input.property;
        errors[property] = validateInput(values ? values[property] : null, input.validators, input.customValidations);
    }
    return errors;
};

export const validateInput = (value: any, validators?: string[], customValidations?: Function[]): Object => {
    let error = '';

    if (validators)
        for (let j = 0; j < validators.length; j++) {
            const validator = validators[j];
            error += genericValidator(value, validator);
        }
    if (customValidations)
        for (let j = 0; j < customValidations.length; j++) {
            const customValidator = customValidations[j];
            error += customValidator(value);
        }
    return error;
};
export const hasErrors = (errors: Object): boolean => {
    let res = false;
    for (var prop in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, prop)) {
            if (errors[prop] !== '') {
                res = true;
                break;
            }
        }
    }
    return res;
};

const genericValidator = (value: any, validator: string) => {
    let res = '';
    switch (validator) {
        case 'required':
            res = required(value);
            break;
        case 'email':
            res = email(value);
            break;
    }
    return res;
};

const hasTrue = (object: Object): boolean => {
    let res = false;
    for (var prop in object) {
        if (Object.prototype.hasOwnProperty.call(object, prop)) {
            if (object[prop] === true) {
                res = true;
                break;
            }
        }
    }
    return res;
};

const required = (value: any) => {
    if ((typeof value) === 'object') {
        return hasTrue(value) ? '' : 'Este campo es obligatorio.'
    }
    if (!value || value === '') return 'Este campo es obligatorio.'
    return '';
};
const email = (value: string) => {
    const esEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value);
    if (!esEmail) return 'Hay que introducir un email válido.'
    return '';
};
