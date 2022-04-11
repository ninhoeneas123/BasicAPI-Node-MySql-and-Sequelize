import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Model } from "mongoose";
import { User, UserDocument } from "../../user/schema/user.schema";

@Injectable()
@ValidatorConstraint({ async: true })
export class CpfIsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async validate(cpf: string, args: ValidationArguments) {
        const user = await this.userModel.findOne({ cpf })
        if (user) { return false }
        return true
    }

}

export function CpfIsUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: CpfIsUniqueConstraint,
        });
    };
}