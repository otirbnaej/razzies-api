const dotEnv = require('dotenv');

const path = require('path');

dotEnv.config({ path: '.env' });

const ENV = process.env.NODE_ENV?.trim();

switch (ENV) {
  case 'development':
    dotEnv.config({ path: '.env.development' });
    break;
  case 'beta':
    dotEnv.config({ path: '.env.beta' });
    break;
  case 'production':
    dotEnv.config({ path: '.env.production' });
    break;
  case 'test':
    dotEnv.config({ path: '.env.test' });
    break;
  default:
    dotEnv.config({ path: '.env.development' });
}
