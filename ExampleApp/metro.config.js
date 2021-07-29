const path = require('path');

module.exports = {
  watchFolders: [path.resolve(__dirname, '../')],
  resolver: {
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          if (Object.prototype.hasOwnProperty.call(target, 'name')) {
            return target[name];
          }
          return path.join(process.cwd(), `node_modules/${name}`);
        }
      }
    )
  }
};
