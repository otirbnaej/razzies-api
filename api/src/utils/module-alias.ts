import moduleAlias from 'module-alias';
import * as path from 'path';

const files = path.resolve(__dirname, '../..');

moduleAlias.addAliases({
  '@src': path.join(files, 'src'),
  '@modules': path.join(files, 'src/modules'),
  '@shared': path.join(files, 'src/shared'),
  '@test': path.join(files, 'test'),
});
