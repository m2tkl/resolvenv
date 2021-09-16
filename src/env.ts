import { EnvParam } from './types'

/**
 * Check hostname is localhost or not.
 * @returns If hostname is localhost, return true
 */
const isLocalhost = (): boolean => Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.1/8 is considered localhost for IPv4
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
)


/**
 * Check if the hostname matches the hosted location.
 * @param name - hostname e.g. https://localhost:3000 -> localhost
 * @returns If hostname matches, return true
 */
const hostname = (name: string): () => boolean => {
  if (name === 'localhost') {
    return isLocalhost
  }
  return () => window.location.hostname === name
}


/**
 *
 * @param envParams
 * @returns
 */
const resolvenv = (envParams: Array<EnvParam>) => {
  for (let envParam of envParams) {
    if (envParam.env()) {
      return envParam.value
    }
  }
}

export { hostname, resolvenv }
