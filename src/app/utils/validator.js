import { isNull, isUndefined } from 'lodash';

export function validator(data, config) {
    const errors = {};
    
    function validate(validateMethod, data, config) {
        let statusValidate;
        //     const validDate = /((19|20)\\d\\d)-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])(?=\\D|$)/;
        // } else if (validDate.test(data)) {
        //     statusValidate = !data;
        // }
        switch (validateMethod) {
            case 'isRequired': {
                if (typeof data === 'boolean') {
                    statusValidate = !data;
                } else if (typeof data === 'number') {
                    statusValidate = !isNull(data) || !isUndefined(data);
                } else {
                    statusValidate = data.trim() === '';
                }
                break;
            }
            case 'isEmail': {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case 'isCapitalSymbol': {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case 'isDigit': {
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }
            case 'min': {
                statusValidate = data.length < config.value;
                break;
            }
            case 'max': {
                statusValidate = data.length > config.value;
                break;
            }
            case 'positiveNum': {
                statusValidate = data < 0;
                break;
            }
            case 'year': {
                statusValidate = data < 1900 || data > (new Date(Date.now()).getFullYear());
                break;
            }
            case 'date': {
                statusValidate = new Date(data) > new Date(Date.now());
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    }
    
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
