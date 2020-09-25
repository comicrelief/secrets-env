export const listFormat = (secret: any) => {
  return {
    ARN: secret.ARN,
    Name: secret.Name,
    Description: secret.Description,
    LastChangedDate: secret.LastChangedDate,
    LastAccessedDate: secret.LastAccessedDate,
    Tags: secret.Tags,
    SecretVersionsToStages: secret.SecretVersionsToStages,
    CreatedDate: secret.CreatedDate,
  }
};

export const valueFormat = (secret: any) => {
  return {
    ARN: secret.ARN,
    Name: secret.Name,
    VersionId: secret.VersionId,
    SecretString: secret.SecretString,
    VersionStages: secret.VersionStages,
    CreatedDate: secret.CreatedDate,
  }
}

export const jsonFormat = (secret: any) => {
  return {
    ARN: secret.ARN,
    Name: secret.Name.split('/').pop(),
    Path: secret.Name,
    Description: secret.Description || '',
    Value: secret.SecretString,
    Tags: secret.Tags,
  }
}

export const SECRETS_NO_TAG = {
  "ARN": "arn:aws:secretsmanager:eu-west-1:some-account858584:secret:SECRET_NO_TAG",
  "Name": "staging/your-namespace-1/SECRET_NO_TAG",
  "LastChangedDate": "2020-09-22T14:43:48.173000+01:00",
  "LastAccessedDate": "2020-09-22T01:00:00+01:00",
  "Tags": [
      {
          "Key": "SomeTag",
          "Value": "SomeValue"
      }
  ],
  "SecretVersionsToStages": {
      "87c2a7a5-7fcd-4cc5-a8bc-a9e791be3d00": [
          "AWSCURRENT"
      ]
  },
  "CreatedDate": "2019-04-26T23:27:41.452000+01:00",
  "SecretString": "SECRET-SECRETS_NO_TAG",
  "VersionId": "87c2a7a5-7fcd-4cc5-a8bc-a9e791be3d00",
  "VersionStages": [
    "AWSCURRENT"
  ],
};

export const SECRETS_ONE_NAMESPACE_TWO_STAGES = {
  "ARN": "arn:aws:secretsmanager:eu-west-1:some-account858584:secret:SECRETS_ONE_NAMESPACE_TWO_STAGES",
  "Name": "staging/your-namespace-1/SECRETS_ONE_NAMESPACE_TWO_STAGES",
  "Description": "A key used in one namespace only, but in two stage environments",
  "LastChangedDate": "2020-09-25T13:57:31.148000+01:00",
  "LastAccessedDate": "2020-09-25T01:00:00+01:00",
  "Tags": [
      {
          "Key": "env:your-service-1/dev",
          "Value": ""
      },
      {
          "Key": "env:your-service-1/staging",
          "Value": ""
      },
  ],
  "SecretVersionsToStages": {
      "65cab904-fcfd-4b71-ae13-1c618f224b9a": [
          "AWSPREVIOUS"
      ],
      "0d890afe-6b51-44ce-a41c-d7d3a89d02ba": [
          "AWSCURRENT"
      ]
  },
  "CreatedDate": "2019-04-26T23:27:41.452000+01:00",
  "SecretString": "SECRET-SECRETS_ONE_NAMESPACE_TWO_STAGES",
  "VersionId": "0d890afe-6b51-44ce-a41c-d7d3a89d02ba",
  "VersionStages": [
    "AWSCURRENT"
  ],
};

export const SECRETS_TWO_NAMESPACES_THREE_STAGES = {
  "ARN": "arn:aws:secretsmanager:eu-west-1:some-account858584:secret:SECRETS_TWO_NAMESPACES_THREE_STAGES",
  "Name": "staging/your-namespace-2/SECRETS_TWO_NAMESPACES_THREE_STAGES",
  "Description": "A key used in two namespaces for a total of three stages",
  "LastChangedDate": "2020-09-25T13:49:38.013000+01:00",
  "LastAccessedDate": "2020-09-25T01:00:00+01:00",
  "Tags": [
      {
          "Key": "env:your-service-2/staging",
          "Value": ""
      },
      {
          "Key": "env:your-service-1/dev",
          "Value": ""
      },
      {
          "Key": "env:your-service-1/staging",
          "Value": ""
      }
  ],
  "SecretVersionsToStages": {
      "4ab4b4d3-2ecb-4319-9377-bbaeb2fe89c4": [
          "AWSCURRENT"
      ]
  },
  "CreatedDate": "2019-04-26T23:27:41.452000+01:00",
  "SecretString": "SECRET-SECRETS_TWO_NAMESPACES_THREE_STAGES",
  "VersionId": "34bb0026-a8d6-4adc-8c2e-be8c46c5ff46",
  "VersionStages": [
    "AWSCURRENT"
  ],
};

export const SECRETS = {
  SECRETS_NO_TAG,
  SECRETS_ONE_NAMESPACE_TWO_STAGES,
  SECRETS_TWO_NAMESPACES_THREE_STAGES,
};

export const SECRETS_LIST = {
  "SecretList": Object.values(SECRETS).map((secret) => listFormat(secret)),
};
