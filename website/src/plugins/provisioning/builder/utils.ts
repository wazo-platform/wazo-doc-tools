const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let cachedPlugins = null;

export const walk = (basePath, regexp, encoding = 'utf8', custom = false) => {
  const files = fs.readdirSync(basePath);
  const dirname = basePath.split('/').pop();
  let results = { [dirname]: {} };

  files.forEach(file => {
    const filePath = `${basePath}/${file}`;
    const stat = fs.lstatSync(filePath);

    // Do not follow symlinks to avoid max recursion on OSX with filename in different case
    // eg: Ringlist.xml symlink to RINGLIST.XML
    if (stat.isSymbolicLink()) {
      return;
    }

    if (stat.isDirectory()) {
      results = { ...results, ...walk(filePath, regexp, encoding, custom) };
    } else if (file.match(regexp)) {
      // HEADS UP: hard code
      const wazo_plugin = `${basePath.split('/')[4]}-${basePath.split('/')[5]}`;
      const content = fs.readFileSync(filePath, encoding);
      results[dirname][file] = custom ? {
          path: path.dirname(filePath),
          file: content,
          wazo_plugin,
        } : content;
    }
  });

  return results;
};

export const getProvisioningPlugins = () => {
  if (cachedPlugins) {
    return cachedPlugins;
  }

  // Clone the repo
  const repoPath = '/tmp/wazo-provd-plugins';
  execSync(`
    rm -rf ${repoPath};
    git clone https://github.com/wazo-platform/wazo-provd-plugins.git ${repoPath};
  `);

  const pluginInfoFiles = walk(repoPath, /plugin-info/, null, true);
  cachedPlugins = {};

  // Parse plugin-info files
  Object.keys(pluginInfoFiles).forEach(basePath => {
    Object.keys(pluginInfoFiles[basePath]).forEach(fileName => {
      try {
        const { wazo_plugin, file, path: localPath } = pluginInfoFiles[basePath][fileName];
        const content = JSON.parse(file);

        Object.keys(content.capabilities).forEach(capabilityName => {
          const [vendor, phone, firmware] = capabilityName.split(', ');
          if (!(vendor in cachedPlugins)) {
            cachedPlugins[vendor] = {};
          }
          if (!(phone in cachedPlugins[vendor])) {
            cachedPlugins[vendor][phone] = {};
          }

          const installPath = `${localPath}/install.md`;
          const limitationsPath = `${localPath}/limitations.md`;
          const install = fs.existsSync(installPath) ? fs.readFileSync(installPath, { encoding:'utf8', flag:'r' }) : null;
          const limitations = fs.existsSync(limitationsPath) ? fs.readFileSync(limitationsPath, { encoding:'utf8', flag:'r' }) : null;

          cachedPlugins[vendor][phone][firmware] = content.capabilities[capabilityName];
          cachedPlugins[vendor][phone][firmware].wazo_plugin = `${wazo_plugin} (v${content.version})`;
          cachedPlugins[vendor][phone][firmware].install = install;
          cachedPlugins[vendor][phone][firmware].limitations = limitations;
        });
      } catch (error) {
        console.log('json error in ', basePath, fileName, error);
      }
    });
  });

  delete cachedPlugins['*'];

  return cachedPlugins;
};
