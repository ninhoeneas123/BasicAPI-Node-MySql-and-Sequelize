export interface UpdateFormatReturn {
    "localId": string,
    "email": string,
    "passwordHash": string,
    "providerUserInfo": [
        {
            "providerId": string,
            "federatedId": string
        }
    ],
    "idToken": string,
    "refreshToken": string,
    "expiresIn": string
}
