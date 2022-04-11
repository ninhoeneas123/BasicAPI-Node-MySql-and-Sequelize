import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Model } from "mongoose";
import { User, UserDocument } from "../../user/schema/user.schema";

@ValidatorConstraint({ async: true })
export class RgIsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async validate(identidade: string, args: ValidationArguments) {
        const user = await this.userModel.findOne({ identidade })
        if (user) { return false }
        return true
    }

}

export function RgIsUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: RgIsUniqueConstraint,
        });
    };
}