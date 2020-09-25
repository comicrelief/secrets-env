import SecretsManager from 'aws-sdk/clients/secretsmanager';
import yargs from 'yargs';

import { ExecutionContext } from './secrets';

export const getClient = (region?: string): SecretsManager => {
  return new SecretsManager({
    region: region || process.env.AWS_REGION,
  });
};

export const getArgs = (): ExecutionContext => {
  const argv = yargs
  .option('verbose', {
    description: 'Enables debug statements',
  })
  .option('describe', {
    description: 'Adds description to each secret',
  })
  .command('json <namespace> [stage]', 'Outputs the secrets as a JSON string', (y) => {
    y.positional('namespace', {
      describe: 'Secrets namespace',
    });

    y.positional('stage', {
      describe: 'Secrets stage, defaults to env $STAGE',
    });
  })
  .command('bash <namespace> [stage]', 'Outputs the secrets as a Bash script', (y) => {
    y.positional('namespace', {
      describe: 'Secrets namespace',
    });

    y.positional('stage', {
      describe: 'Secrets stage, defaults to env $STAGE',
    });
  })
  .help()
  .argv;

  const context = {
    client: getClient(),
    command: argv._[0] as string,
    describe: argv.describe as boolean,
    namespace: argv.namespace as string,
    stage: (argv.stage || process.env.STAGE) as string,
    verbose: argv.verbose as boolean,
  };

  return context;
}
