import { inspect } from 'util';

import { secretsJson, secretsBash } from './secrets';
import { getArgs } from './utils';


const main = async () => {
  const context = getArgs();

  try {
    let secrets;
    if (!context.stage) {
      throw new Error('`stage` or env $STAGE must be defined.');
    }

    if (context.command === 'json') {
      secrets = inspect(await secretsJson(context), false, null, true);
    } else if (context.command === 'bash') {
      secrets = await secretsBash(context);
    } else {
      throw new Error(`Invalid command: ${context.command}`);
    }

    console.log(secrets);
  } catch (error) {
    if (context.verbose) {
      console.error(error);
    } else {
      console.error(error.message);
    }
  }
}

main();
