declare namespace Express {
  export interface Request {
    payload: JwtPayload;    
  }
}

declare interface CurrentUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  active?: boolean;  
}

declare interface JwtPayload {
  /**
   * jwt aud property
   */
  user: CurrentUser;
  /**
   * Roles
   */
  roles: string[];

  /**
   * Permissions
   */
  permissions: string[];  

  /**
   * Time issued (miliseconds)
   */
  iat: number;

  /**
   * Time expired (miliseconds)
   */
  exp: number;
}
