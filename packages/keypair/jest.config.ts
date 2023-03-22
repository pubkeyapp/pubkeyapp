/* eslint-disable */
export default {
  displayName: 'keypair',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: ['node_modules/(?!ed25519-keygen/)'],
  coverageDirectory: '../../coverage/packages/keypair',
}
