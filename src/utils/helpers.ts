import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { Naira } from './constant'
import randomstring from 'randomstring'

export const generateRandomString = (length = 10): string =>
  randomstring.generate(length)

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

export const renderPrice = (payload: number | string): number | string => {
  if (payload) {
    let data = Number(payload).toFixed(2).toString().split('.')
    data[0] = data[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return `${Naira} ${data.join('.')}`
  }
  return `${Naira} ${0}`
}

export const generateMonths = () => {
  return [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
  ]
}

export const getCurrentYear = () => new Date().getFullYear()

export const getCurrentMonth = () => {
  const currentMonth = new Date().getMonth() + 1
  return (
    generateMonths().find((month) => month.value === currentMonth)?.label || ''
  )
}

export const generateYears = (
  start = new Date(2022, 0, 2).toISOString(),
  end = new Date().toISOString(),
) => {
  // for (
  //   var arr = [], dt = new Date(start);
  //   dt <= new Date(end);
  //   dt.setFullYear(dt.getFullYear() + 1)
  // ) {
  //   arr.push(new Date(dt).getFullYear())
  // }
  // return arr
  return [2021, 2022, 2023]
}
