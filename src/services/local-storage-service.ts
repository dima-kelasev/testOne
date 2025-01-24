class LocalStorageService {
  private static USERS_KEY = 'users';
  private static AUTH_TOKEN_KEY = 'authToken';
  private static RESET_TOKEN_KEY = 'resetToken';

  static getUsers(): { email: string; password: string }[] {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }

  static addUser(email: string, hashedPassword: string): void {
    const users = this.getUsers();
    users.push({ email, password: hashedPassword });
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  static findUserByEmail(
    email: string
  ): { email: string; password: string } | undefined {
    return this.getUsers().find((user) => user.email === email);
  }

  static updatePassword(email: string, hashedPassword: string): void {
    const users = this.getUsers().map((user) =>
      user.email === email ? { ...user, password: hashedPassword } : user
    );
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  static clearUsers(): void {
    localStorage.removeItem(this.USERS_KEY);
  }

  static setAuthToken(token: string): void {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
  }

  static getAuthToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  static removeAuthToken(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
  }

  static setResetToken(email: string, token: string): void {
    localStorage.setItem(
      this.RESET_TOKEN_KEY,
      JSON.stringify({ email, token })
    );
  }

  static getResetToken(): { email: string; token: string } | null {
    return JSON.parse(localStorage.getItem(this.RESET_TOKEN_KEY) || 'null');
  }

  static removeResetToken(): void {
    localStorage.removeItem(this.RESET_TOKEN_KEY);
  }

  static clearAll(): void {
    localStorage.clear();
  }
}

export default LocalStorageService;
