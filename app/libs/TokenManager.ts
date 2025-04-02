export class TokenManager {
  private static accessToken = '';

  static getAccessToken() {
    return TokenManager.accessToken;
  }
  static setAccessToken(token: string) {
    TokenManager.accessToken = token;
  }
}
