import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { Naira } from './constant'

export function storeTokenInLocalStorage(token: string) {
  localStorage.setItem('token', token)
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem('token')
}

export const isValidToken = (token: string): boolean => {
  if (token == '') return false
  const decodedToken: { iat: number; exp: number; user: any } = jwtDecode(token)

  if (decodedToken.exp * 1000 < Date.now()) {
    return false
  }

  return true
}

export const saveToken = (token: string): void => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const shortenCompany = (company: string) => `${company.slice(0, 12)} ...`

export const getBooleanValue = (data: string | number): boolean => {
  switch (data) {
    case '1':
    case 'true':
    case 'yes':
      return true
    case '0':
    case 'false':
    case 'no':
      return false
    default:
      return false
  }
}

export const renderPrice = (number: number | string): number | string => {
  if (typeof number === 'number') {
    return `${Naira} ${Number(number).toFixed(2)}`
  }

  return `${Naira} ${number}`
}
