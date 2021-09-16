/**
 * @jest-environment jsdom
 */
import { hostname, resolvenv, EnvParam } from '../index'

describe('judgenv test', () => {
  let windowSpy: any;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get')
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  const testEnvParams: Array<EnvParam> = [
    { env: hostname('localhost'), value: 'api.local-env' },
    { env: hostname('dev-hostname'), value: 'api.dev-env' },
    { env: hostname('prod-hostname'), value: 'api.prod-env' },
  ]

  it('localhost', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        hostname: 'localhost'
      }
    }));
    expect(resolvenv(testEnvParams)).toBe('api.local-env')
  })

  it('dev', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        hostname: 'dev-hostname'
      }
    }));
    expect(resolvenv(testEnvParams)).toBe('api.dev-env')
  })

  it('prod', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        hostname: 'prod-hostname'
      }
    }));
    expect(resolvenv(testEnvParams)).toBe('api.prod-env')
  })
})
