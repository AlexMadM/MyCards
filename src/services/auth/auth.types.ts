export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}
export type User = {
  avatar: null | string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
export type SignUpBody = {
  email: string
  password: string
  passwordConfirmation: string
  rememberMe?: boolean
}
export type UserData = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
