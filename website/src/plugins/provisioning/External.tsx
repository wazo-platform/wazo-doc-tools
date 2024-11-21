import React from 'react';

import Vendors from './components/Vendors';
import './provisioning.css';

const ExternalPage = ({ route }) => {
  const { plugins, images } = route?.customData || {};

  return (
    <div className="provisioning-vendors provisioning-vendors-external wazo-inc">
      <Vendors plugins={plugins} images={images} />
    </div>
  );
}

export default ExternalPage
