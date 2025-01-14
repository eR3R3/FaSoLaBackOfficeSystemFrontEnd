export {}

// Create a type for the roles
export type Roles = 'admin' | 'worker' | 'leader' | 'superAdmin'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}