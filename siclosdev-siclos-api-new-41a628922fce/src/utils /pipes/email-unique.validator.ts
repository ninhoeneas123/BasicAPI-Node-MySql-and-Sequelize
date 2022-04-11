import { InjectModel } from "@nestjs/mongoose";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Model } from "mongoose";
import { AuthService } from "src/auth/auth.service";
import { User, UserDocument } from "../../user/schema/user.schema";

@ValidatorConstraint({ async: true })
export class EmailIsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
        private authService: AuthService
    ) { }

    async validate(email: string, args: ValidationArguments) {
        const userExistsGoogle = await this.authService.checkUserAlreadyExist(email)

        if (userExistsGoogle) { return false }
        return true
    }

}


export function EmailIsUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: EmailIsUniqueConstraint,
        });
    };
}