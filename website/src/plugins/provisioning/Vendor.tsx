import React  from 'react';
import Layout from "@theme/Layout";

import './provisioning.css';
import slugify from './builder/slugify';
import Head from '@docusaurus/Head';

const vendorsUrl = '/uc-doc/ecosystem/supported_devices';

type Props = {
  route: {
    customData?: {
      name: string;
      vendor_plugins: Record<string, any>
      vendor_images: Record<string, any>
    }
  },
};

const VendorPage = ({ route }: Props) => {
  const { name, vendor_plugins, vendor_images } = route?.customData || {};

  const breadcrumbs = [
    { url: vendorsUrl, label: 'Provd plugins' },
    { url: `/provisioning/${slugify(name)}`, label: name },
  ];

  return (
    <Layout>
      <Head>
        <title>{ breadcrumbs.map(({ label }) => label).join(' - ') }</title>
      </Head>
      <div className="doc-wrapper provisioning-vendor">
        <div className="container">
          <div className="section-block">
            <div className="row">
              {Object.keys(vendor_plugins).map(phoneName => (
                <div className="col col--4" key={phoneName}>
                  <div className="card">
                    <a className="card__header" href={`/provisioning/${slugify(name)}/${slugify(phoneName)}`}>{phoneName}</a>
                    <div className="body">
                        <a className="phone-picture" href={`/provisioning/${slugify(name)}/${slugify(phoneName)}`}>
                          {vendor_images && vendor_images.indexOf(`${slugify(phoneName)}.png`) !== -1
                            ? <img src={`/provisioning/${slugify(name)}-${slugify(phoneName)}.png`} alt={phoneName} />
                            : <img src={`/provisioning/img-placeholder.png`} alt={phoneName} />}
                        </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default VendorPage;
