import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Utiliser ts-jest pour préprocesser les fichiers TypeScript
  testEnvironment: 'node', // Environnement de test Node.js
  globals: {
    'ts-jest': {
      isolatedModules: true, // Permet de ne pas isoler les modules TypeScript pour améliorer la vitesse
    },
  },
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transforme les fichiers TypeScript en JavaScript avant les tests
  },
  moduleFileExtensions: ['ts', 'js'], // Extensions de fichiers à tester
  testMatch: ['**/*.test.ts', '**/*.spec.ts'], // Pattern pour trouver les fichiers de test
};

export default config;