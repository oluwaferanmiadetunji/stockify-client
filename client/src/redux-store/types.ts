export interface AuthState {
  isLogged: boolean
  user: {
    email: string
    blacklisted: boolean
    createdAt: string
    id: string
  }
  token: string
}

export interface LoginInterface {
  user: {
    email: string
    blacklisted: boolean
    createdAt: string
    id: string
  }
  token: string
}
