import React from 'react';

import Layout from '@theme/Layout';

import slugify from './builder/slugify';
import { buildTable } from './helpers';
import './provisioning.css';
import Head from '@docusaurus/Head';

const VENDORS_URL = '/uc-doc/ecosystem/supported_devices';

type Props = {
  route: {
    customData?: {
      name: string;
      vendor: string;
      phone: Record<string, any>;
      vendor_images: Record<string, any>;
    };
  };
};

const PhonePage = ({ route }: Props) => {
  const { name, vendor, phone, vendor_images } = route?.customData || {};

  const breadcrumbs = [
    { url: VENDORS_URL, label: 'Provd plugins' },
    { url: `/provisioning/${slugify(vendor)}`, label: vendor },
    { label: name },
  ];

  return (
    <Layout>
      <Head>
        <title>{breadcrumbs.map(({ label }) => label).join(' - ')}</title>
      </Head>
      <div className="doc-wrapper provisioning-phone">
        <div className="container">
          <div className="row">
            <div className="col col--3">
              <div className="card card--full-height">
                <div className="body">
                  {vendor_images &&
                  vendor_images.indexOf(`${slugify(name)}.png`) !== -1 ? (
                    <img
                      src={`/provisioning/${slugify(vendor)}-${slugify(name)}.png`}
                      alt={`${slugify(vendor)}-${name}`}
                    />
                  ) : (
                    <img
                      src="/provisioning/img-placeholder.png"
                      alt={`${slugify(vendor)}-${name}`}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col col--9">{buildTable(phone)}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PhonePage;
