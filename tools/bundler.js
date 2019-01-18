import webpack from 'webpack';
import config from '../webpack.config.dev';
import colors from 'colors';

const bundler = webpack(config);
bundler.run(err => {
  if(err) {
    /* eslint-disable no-console */
    console.log(err.bold.red);
  }
});
