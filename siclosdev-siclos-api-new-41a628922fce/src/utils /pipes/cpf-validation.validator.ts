import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ async: true })
export class CpfIsValidConstraint implements ValidatorConstraintInterface {
    validate(cpf: string, args: ValidationArguments) {
        const regexValidation = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/
        const regexValidate = regexValidation.test(cpf)

        return regexValidate;

    }
}

export function CpfIsValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: CpfIsValidConstraint,
        });
    };
}