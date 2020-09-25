import SecretsManager from 'aws-sdk/clients/secretsmanager';


export interface ExecutionContext {
  client: SecretsManager;
  command: string;
  describe: boolean;
  namespace: string;
  stage: string;
  verbose: boolean;
}

export interface JsonSecret {
  ARN: string;
  Name: string;
  Path: string;
  Description: string;
  Value: string;
  Tags: Array<{ Key?: string, Value?: string }>,
}

export const getSecret = async (context: ExecutionContext, metadata: SecretsManager.SecretListEntry): Promise<JsonSecret> => {
  if (!metadata.Name) {
    throw new Error(`Malformed secret: '${JSON.stringify(metadata)}'`);
  }

  const params = {
    SecretId: metadata.Name,
  }

  if (context.verbose) {
    console.error(`>>> ${metadata.Name}`);
  }
  const response = await context.client.getSecretValue(params).promise();

  if (!response.SecretString) {
    throw new Error(`Secret without value: '${JSON.stringify(response)}'`);
  }

  return {
    ARN: metadata.ARN || '',
    Name: metadata.Name.split('/').pop() || metadata.Name,
    Path: metadata.Name,
    Description: metadata.Description || '',
    Tags: metadata.Tags || [],
    Value: response.SecretString,
  }
}

export const getSecrets = async (context: ExecutionContext): Promise<JsonSecret[]> => {
  if (context.verbose) {
    console.error(`Retrieving secrets for namespace='${context.namespace}', stage='${context.stage}'`);
  }
  const params = {
    Filters: [
      {
        Key: 'tag-key',
        Values: [
          `env:${context.namespace}/${context.stage}`,
        ]
      },
    ]
  }

  const { SecretList } = await context.client.listSecrets(params).promise();

  if (!SecretList) {
    throw new Error('Could not fetch secrets.');
  }

  const secrets = await Promise.all(
    SecretList.map((secret) => {
      if (!secret.Name) {
        throw new Error(`Malformed secret: '${JSON.stringify(secret)}'`);
      }

      return getSecret(context, secret);
    })
  );

  return secrets;
};


export const secretsJson = async (context: ExecutionContext): Promise<JsonSecret[]> => {
  return getSecrets(context);
}

export const secretsBash = async (context: ExecutionContext): Promise<string> => {
  const secrets = await secretsJson(context);

  return secrets
    .map((secret) => {
      let line = `export ${secret.Name}="${secret.Value}"\n`

      if (context.describe) {
        line = `# ${secret.Description} [${context.namespace}, ${context.stage}]\n${line}`;
      }

      return line;
    })
    .join('\n')
}
