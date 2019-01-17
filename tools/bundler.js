import webpack from 'webpack';
import config from '../webpack.config.dev';
import colors from 'colors';

const bundler = webpack(config);
bundler.run(err => {
  if(err) {
    console.log(err.bold.red);
  }
});
