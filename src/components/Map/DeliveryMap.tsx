
import React from 'react';
import { MapPin } from 'lucide-react';

const DeliveryMap = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 mt-4">
      <div className="flex items-center mb-2">
        <MapPin className="h-5 w-5 text-burgundy-700 mr-2" />
        <h3 className="text-sm font-medium">Mapa de entrega</h3>
      </div>
      <div className="bg-gray-200 rounded h-48 flex items-center justify-center">
        <p className="text-gray-500 text-sm">
          Integración con Google Maps próximamente
        </p>
      </div>
    </div>
  );
};

export default DeliveryMap;
