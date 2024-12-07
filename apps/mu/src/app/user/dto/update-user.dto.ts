import { IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(2, 50, { message: 'First name must be between 2 and 50 characters' })
    firstName?: string;

    @IsOptional()
    @IsString()
    @Length(2, 50, { message: 'Last name must be between 2 and 50 characters' })
    lastName?: string;
}
