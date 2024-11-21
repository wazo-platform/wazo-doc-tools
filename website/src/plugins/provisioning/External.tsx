import React from 'react';

import Vendors from './components/Vendors';
import './provisioning.css';

const Page = ({ route }) => {
  const { plugins, images } = route?.customData || {};

  return (
    <div className="provisioning-vendors wazo-inc">
      <Vendors plugins={plugins} images={images} />
    </div>
  );
}

export default Page
