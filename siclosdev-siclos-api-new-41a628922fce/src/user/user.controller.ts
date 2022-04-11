import { Controller, Get, Post, Body, Patch, Delete, UseGuards, Req, Param, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { SendCodeChangePasswordDto } from './dto/send-change-password.dto'
import { UpdateEmailUserDto } from './dto/update-email-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/validate-oob-code.dto';
import { diskStorage } from 'multer';
import { FilesUpload } from './dto/files-upload.dto';
import { FastifyFilesInterceptor } from 'src/utils /upload-utils/fastify-files-interceptor';
import { filesMapper } from 'src/utils /upload-utils/file-mappter';
import { editFileName, fileFilter } from 'src/utils /upload-utils/arquivo-upload-util';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard('firebase-auth'))
  @Get('all-users')
  getAllUsers(){
    return this.userService.getAllUsers()
  }

  @UseInterceptors(
    FastifyFilesInterceptor('file_url', 10, {
      storage: diskStorage({
        filename: editFileName,
      }),
      fileFilter:  fileFilter
    }),
  )
  @Post('upload-files')
  multiple(
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: FilesUpload,
  ): object{
    const dataReturn = { ...body, file_url: filesMapper({ files, req }) }
    return this.userService.convertUpload(dataReturn)
  }
  
  @Post("create")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard('firebase-auth'))
  @Post("update-email")
  updateEmail(@Req() req: any, @Body() updateEmailUserDto: UpdateEmailUserDto) {
    const idToken = req.headers.authorization
    return this.userService.updateEmail(updateEmailUserDto, idToken)

  }

  @UseGuards(AuthGuard('firebase-auth'))
  @Post("update-password")
  updatePAssword(@CurrentUser() @Req() req: any, @Body() updatePasswordDto: UpdatePasswordDto) {
    const reqData = req

    return this.userService.updatePassword(updatePasswordDto, reqData.idToken, reqData.email)
  }

  @Post("forgot-password")
  changePassword(@Body() sendCodeChangePasswordDto: SendCodeChangePasswordDto) {

    return this.userService.sendEmailChangePassword(sendCodeChangePasswordDto)
  }

  @Post("forgot-password/validate-code")
  validateOobCode(@Body() changePasswordDto: ChangePasswordDto) {

    return this.userService.validateCodeChangePassword(changePasswordDto)
  }

  @UseGuards(AuthGuard('firebase-auth'))
  @Patch('update/:id')
  updateUserData(@CurrentUser() @Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    let id = req.localId
    return this.userService.updateUserData(id, updateUserDto)
  }

  @UseGuards(AuthGuard('firebase-auth'))
  @Delete("delete")
  deleteUser(@CurrentUser() @Req() req: any) {
    const reqData = req
    return this.userService.deleteUser(reqData.idToken, reqData.email)
  }
}
