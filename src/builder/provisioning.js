const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const { getProvisioningPlugins, walk } = require('./utils');
const slugify = require('./slugify');

module.exports = async newPage => {
  const plugins = getProvisioningPlugins();

  // Retrieve images
  const destPath = path.resolve('./public/provisioning/');
  exec(`mkdir -p ${destPath}`);
  const images = walk('content/provisioning/img', /.png$/, 'binary');

  const imgs = {};

  Object.keys(images).forEach(basePath => {
    const vendorName = basePath.split('/').pop();
    const isVendor = vendorName === 'vendors';

    Object.keys(images[basePath]).forEach(fileName => {
      const filePath = `${destPath}/${isVendor ? '' : `${vendorName}-`}${fileName}`;

      if (!imgs[vendorName]) imgs[vendorName] = [];
      imgs[vendorName].push(fileName);

      fs.writeFileSync(filePath, images[basePath][fileName], { encoding: 'binary' });
    });
  });

  // Create vendors page
  await newPage('/uc-doc/ecosystem/supported_devices', 'provisioning/vendors', {
    plugins,
    images: imgs,
  });

  // Create external page
  await newPage('/provisioning/external', 'provisioning/external', { plugins, images: imgs });

  // Create vendor pages
  await Promise.all(
    Object.keys(plugins).map(vendor =>
      newPage(`/provisioning/${slugify(vendor)}`, 'provisioning/vendor', {
        name: vendor,
        vendor_plugins: plugins[vendor],
        vendor_images: imgs[slugify(vendor)],
      })
    )
  );

  // Create phone pages
  const phonePagesPromises = [];
  Object.keys(plugins).forEach(vendor => {
    Object.keys(plugins[vendor]).forEach(name => {
      phonePagesPromises.push(
        newPage(`/provisioning/${slugify(vendor)}/${slugify(name)}`, 'provisioning/phone', {
          name,
          vendor,
          phone: plugins[vendor][name],
          vendor_images: imgs[slugify(vendor)],
        })
      );
    });
  });
  await Promise.all[phonePagesPromises];
};
