const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const { getProvisioningPlugins, walk } = require('./utils');
const slugify = require('./slugify');

const generatePages = async ({ plugins, actions }) => {
  // Retrieve images
  const destPath = './static/provisioning/';
  exec(`mkdir -p ${destPath}`);
  const imagesPaths = walk('../content/provisioning/img', /.png$/, 'binary');

  const images = {};

  // Move only needed images to plulic folder
  Object.keys(imagesPaths).forEach(basePath => {
    const vendorName = basePath.split('/').pop();
    const isVendor = vendorName === 'vendors';

    Object.keys(imagesPaths[basePath]).forEach(fileName => {
      const filePath = `${destPath}/${isVendor ? '' : `${vendorName}-`}${fileName}`;

      if (!images[vendorName]) images[vendorName] = [];
      images[vendorName].push(fileName);

      fs.writeFileSync(filePath, imagesPaths[basePath][fileName], { encoding: 'binary' });
    });
  });

  // Create vendors page
  // await newPage('/uc-doc/ecosystem/supported_devices', 'provisioning/vendors', {
  //   plugins,
  //   images: imgs,
  // });

  // Create external page
  // await newPage('/provisioning/external', 'provisioning/external', { plugins, images: imgs });
  await actions.addRoute({
    path: '/provisioning/external/',
    component: "@site/src/plugins/provisioning/External.tsx",
    exact: true,
    customData: { plugins, images }
  });


  // Create vendor pages
  // await Promise.all(
  //   Object.keys(plugins).map(vendor =>
  //     newPage(`/provisioning/${slugify(vendor)}`, 'provisioning/vendor', {
  //       name: vendor,
  //       vendor_plugins: plugins[vendor],
  //       vendor_images: imgs[slugify(vendor)],
  //     })
  //   )
  // );

  // Create phone pages
  // const phonePagesPromises = [];
  // Object.keys(plugins).forEach(vendor => {
  //   Object.keys(plugins[vendor]).forEach(name => {
  //     phonePagesPromises.push(
  //       newPage(`/provisioning/${slugify(vendor)}/${slugify(name)}`, 'provisioning/phone', {
  //         name,
  //         vendor,
  //         phone: plugins[vendor][name],
  //         vendor_images: imgs[slugify(vendor)],
  //       })
  //     );
  //   });
  // });
  // await Promise.all[phonePagesPromises];
};


export default async (context, options) => ({
    name: "provisioning-pages-build",

    async loadContent() {
      const plugins = getProvisioningPlugins();
      return { plugins } ;
    },

    async contentLoaded({ content, actions }) {
      await generatePages({ plugins: content.plugins, actions });
    },
})
