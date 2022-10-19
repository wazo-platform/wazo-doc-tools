import React  from 'react';
import { withPrefix } from "gatsby"

import Layout from '../Layout';
import { buildTable } from './helpers';
import './provisioning.scss';

const slugify = require('../../builder/slugify');

const vendorsUrl = withPrefix('/uc-doc/ecosystem/supported_devices');


const Page = ({ pageContext: { name, vendor, phone, vendor_images } }) => {
  const breadcrumbs = [
    { url: vendorsUrl, label: 'Provd plugins' },
    { url: withPrefix(`/provisioning/${slugify(vendor)}`), label: vendor },
  ];

  return (
    <Layout pageTitle={`<a href="${vendorsUrl}">Provd Plugins</a> &gt; <a href="${withPrefix(`/provisioning/${slugify(vendor)}`)}">${vendor}</a> &gt; ${name}`} breadcrumbs={breadcrumbs} currentPageName={name}>
      <div className="doc-wrapper provisioning-phone">
        <div className="container">
          <div className="row">
            <div className="col-card col col-3">
              <div className="card">
                <div className="body">
                  {vendor_images && vendor_images.indexOf(`${slugify(name)}.png`) !== -1 ? <img src={withPrefix(`/provisioning/${slugify(vendor)}-${slugify(name)}.png`)} alt={`${slugify(vendor)}-${name}`}/> : <img src={withPrefix('/provisioning/img-placeholder.png')} alt={`${slugify(vendor)}-${name}`} />}
                </div>
              </div>
            </div>
            <div className="col col-9">{buildTable(phone)}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Page
