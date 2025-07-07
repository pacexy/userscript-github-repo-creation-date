import { name } from '../package.json'

export function log(message: any) {
  if (import.meta.env.DEV) {
    console.log(`[${name}]`, message)
  }
}
