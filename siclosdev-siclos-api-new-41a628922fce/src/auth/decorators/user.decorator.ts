import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';

export function getJwtFromRequest(req: any) {
  if (!req?.headers?.authorization) {
    throw new UnauthorizedException('JWT_MISSING');
  }
  const authHeader = req.headers.authorization;

  if (!authHeader.startsWith('Bearer ') && !authHeader.startsWith('bearer ')) {
    throw new UnauthorizedException('INVALID_AUTH_STRATEGY');
  }

  return authHeader.substring(7, authHeader.length);
}

export const CurrentUser = createParamDecorator(
  async (data, ctx: ExecutionContext): Promise<any> => {
    const req = ctx.switchToHttp().getRequest();
    const jwt = getJwtFromRequest(req);
    const decodedToken = await admin.auth().verifyIdToken(jwt);

    const decodedData = {
      email: decodedToken.email,
      user_id: decodedToken.user_id,
      idToken: jwt,
      localId: decodedToken.uid
    }
    return decodedData
  },
);