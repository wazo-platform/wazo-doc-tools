import { exec } from 'node:child_process';
import fs from 'node:fs';

import { PluginContentLoadedActions, PluginModule } from '@docusaurus/types';
import slugify from './slugify';
import { getProvisioningPlugins, walk } from './utils';

type LoadedContent = {
  plugins: Record<string, unknown>;
};

type GeneratePagesOpts = {
  plugins: LoadedContent['plugins'];
  actions: PluginContentLoadedActions;
};

const generatePages = async ({ plugins, actions }: GeneratePagesOpts) => {
  // Retrieve images
  const destPath = './static/provisioning/';
  exec(`mkdir -p ${destPath}`);
  const imagesPaths = walk('../content/provisioning/img', /.png$/, 'binary');

  const images = {};

  // Move only needed images to plulic folder
  Object.keys(imagesPaths).forEach((basePath) => {
    const vendorName = basePath.split('/').pop();
    const isVendor = vendorName === 'vendors';

    Object.keys(imagesPaths[basePath]).forEach((fileName) => {
      const filePath = `${destPath}/${isVendor ? '' : `${vendorName}-`}${fileName}`;

      if (!images[vendorName]) images[vendorName] = [];
      images[vendorName].push(fileName);

      fs.writeFileSync(filePath, imagesPaths[basePath][fileName], {
        encoding: 'binary',
      });
    });
  });

  // Create external page
  actions.addRoute({
    path: '/provisioning/external',
    component: '@site/src/plugins/provisioning/External.tsx',
    exact: true,
    customData: { plugins, images },
  });

  // Create vendor pages
  Object.keys(plugins).forEach((vendor) => {
    if (!plugins?.[vendor]) {
      return;
    }

    actions.addRoute({
      path: `/provisioning/${slugify(vendor)}`,
      component: '@site/src/plugins/provisioning/Vendor.tsx',
      exact: true,
      customData: {
        name: vendor,
        vendor_plugins: plugins[vendor],
        vendor_images: images[slugify(vendor)],
      },
    });
  });

  // Create phone pages
  Object.keys(plugins).forEach((vendor) => {
    Object.keys(plugins?.[vendor] || {}).forEach((phone) => {
      actions.addRoute({
        path: `/provisioning/${slugify(vendor)}/${slugify(phone)}`,
        component: '@site/src/plugins/provisioning/Phone.tsx',
        exact: true,
        customData: {
          name: phone,
          vendor,
          phone: plugins[vendor][phone],
          vendor_images: images[slugify(vendor)],
        },
      });
    });
  });
};

const plugin: PluginModule<LoadedContent> = async () => ({
  name: 'provisioning-pages-build',

  async loadContent() {
    const plugins = getProvisioningPlugins();
    return { plugins };
  },

  async contentLoaded({ content, actions }) {
    await generatePages({ plugins: content.plugins, actions });
  },
});

export default plugin;
