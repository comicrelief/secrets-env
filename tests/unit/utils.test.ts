import SecretsManager from 'aws-sdk/clients/secretsmanager';

import { getClient } from '../../src/utils';

describe('unit.utils', () => {
  describe('getClient', () => {

    it('Returns a SecretsManager', () => {
      const actual = getClient();
      expect(actual instanceof SecretsManager).toEqual(true);
    });
  });
});
