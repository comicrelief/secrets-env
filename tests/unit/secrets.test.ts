import SecretsManager from 'aws-sdk/clients/secretsmanager';
import sinon from 'sinon';

import {
  getSecret,
  getSecrets,
  secretsJson,
  secretsBash,
} from '../../src/secrets';
import {
  listFormat,
  valueFormat,
  SECRETS,
  SECRETS_LIST,
} from '../mocks/secrets.mock';

const getContext = (
  single: any = SECRETS.SECRETS_ONE_NAMESPACE_TWO_STAGES,
  list: any = SECRETS_LIST,
  namespace = 'your-service-1',
  stage = 'staging'
) => {
  const client = {
    getSecretValue: sinon.fake.returns({ promise: sinon.fake.resolves(single) }),
    listSecrets: sinon.fake.returns({ promise: sinon.fake.resolves(list) }),
  } as unknown as SecretsManager;

  const context = {
    client,
    command: 'json',
    describe: true,
    namespace,
    stage,
    verbose: false,
  };

  return context;
}

describe('unit.secrets', () => {

  afterEach(() => sinon.restore());

  describe('getSecret', () => {
    describe('Returns the JSON formatted secret', () => {
      Object.entries(SECRETS).forEach(([key, secret]) => {
        it(`Secret: ${key}`, async () => {
          const input = listFormat(secret);
          const metadata = valueFormat(secret);
          const context = getContext(metadata)

          const actual = await getSecret(context, input);

          expect(actual).toMatchSnapshot();
        })
      })
    })
  })

  describe('getSecrets', () => {
    it('Returns the JSON formatted secrets', async () => {
      const context = getContext(undefined, SECRETS_LIST);

      const actual = await getSecrets(context);

      expect(actual).toMatchSnapshot();
    })
  })

  describe('secretsJson', () => {
    it('Returns the JSON formatted secrets', async () => {
      const context = getContext(undefined, SECRETS_LIST);

      const actual = await secretsJson(context);

      expect(actual).toMatchSnapshot();
    })
  })

  describe('secretsBash', () => {
    it('Returns the Bash formatted secrets', async () => {
      const context = getContext(undefined, SECRETS_LIST);

      const actual = await secretsBash(context);

      expect(actual).toMatchSnapshot();
    })
  })

});
