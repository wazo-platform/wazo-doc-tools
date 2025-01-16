import React from 'react';

import Vendors from './components/Vendors';
import './provisioning.css';

type Props = {
  route: {
    customData?: {
      plugins: Record<string, any>;
      images: Record<string, any>;
    };
  };
};

const ExternalPage = ({ route }: Props) => {
  const { plugins, images } = route?.customData || {};

  return (
    <div className="provisioning-vendors provisioning-vendors-external wazo-inc">
      <Vendors plugins={plugins} images={images} />
    </div>
  );
};

export default ExternalPage;
