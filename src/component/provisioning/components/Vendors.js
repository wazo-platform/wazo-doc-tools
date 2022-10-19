import React, { useState } from 'react';
import { withPrefix } from "gatsby"

import { buildTable } from '../helpers';
const slugify = require('../../../builder/slugify');

const Page = ({ plugins, images }) => {
  const [currentVendor, setCurrentVendor] = useState(null);
  const [currentDevice, setCurrentDevice] = useState(null);

  const onDeviceClick = event => {
    event.preventDefault();
    setCurrentDevice(currentDevice === event.target.id ? null : event.target.id);
  }

  const onVendorClick = event => {
    event.preventDefault();
    setCurrentVendor(currentVendor === event.target.id ? null : event.target.id);
  }

  return Object.keys(plugins).map(vendor => (
      <div className="vendor" key={vendor}>
        <a className="title" href={withPrefix(`/provisioning/${slugify(vendor)}`)} id={vendor} onClick={onVendorClick}>{vendor}</a>
        {vendor === currentVendor && 
          <div className="phones">
            {Object.keys(plugins[vendor]).sort().map(name => {
              const id = `${slugify(vendor)}-${slugify(name)}`;
              return <div className={id === currentDevice ? 'selected' : ''} key={id} >
                <a href={withPrefix(`/provisioning/${slugify(vendor)}/${slugify(name)}`)} onClick={onDeviceClick} id={id}>{name}</a>
                {id === currentDevice && <div className="slide">
                  <div className="image">
                    <div className="name">{name}</div>
                    {images[slugify(vendor)] && images[slugify(vendor)].indexOf(`${slugify(name)}.png`) !== -1 ? <img src={withPrefix(`/provisioning/${slugify(vendor)}-${slugify(name)}.png`)} alt={`${slugify(vendor)}-${name}`}/> : <img src={withPrefix('/provisioning/img-placeholder.png')} alt={`${slugify(vendor)}-${name}`} />}
                  </div>
                  <div className="content">{buildTable(plugins[vendor][name])}</div>
            </div>}
              </div>;
            })}
        </div>}
      </div>
  ));
};

export default Page
