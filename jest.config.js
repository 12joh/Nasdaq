module.exports = {
  preset: 'react-native',
  testEnvironment: "node",
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json', 
    }],
   
  },
 
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  transformIgnorePatterns: [
    'node_modules/(?!@toolz/allow-react)/\" --env=jsdom',
  ],
  setupFiles: ['./jest.setup.js'],
};
