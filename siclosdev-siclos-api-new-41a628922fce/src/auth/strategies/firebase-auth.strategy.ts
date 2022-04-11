/* eslint-disable @typescript-eslint/no-var-requires */
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(idToken: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      return !!decodedToken.firebase;
    } catch {
      throw new UnauthorizedException();
    }
      
    }
}
