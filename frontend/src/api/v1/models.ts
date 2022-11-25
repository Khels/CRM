export interface User {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  last_online: Date | string;
  is_active: boolean;
  is_admin: boolean;
}
export interface Tokens {
  access_token: string;
  refresh_token: string;
}
