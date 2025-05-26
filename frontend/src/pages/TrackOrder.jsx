import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icon issue (optional but recommended)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const TrackOrder = () => {
  const { id } = useParams();

  // Dummy coordinates — update to your real tracking data if needed
  const location = {
    lat: 24.8607, // Karachi
    lng: 67.0011,
  };

  // Dummy order data — replace with real data based on the order ID
  const orderDetails = {
    id,
    status: 'Shipped',
    deliveryDate: '28 JUL 2025',
    trackingNumber: 'ABC123456789',
    shippingAddress: {
      address: '123 Main Street, Karachi',
      phone: '+923000000000',
    },
    items: [
      {
        name: 'Product 1',
        quantity: 2,
        size: 'M',
      },
      {
        name: 'Product 2',
        quantity: 1,
        size: 'L',
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tracking Order #{orderDetails.id}</h2>

      {/* Map */}
      <div className="w-full h-[500px] rounded-md overflow-hidden shadow-md border mb-6">
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.lat, location.lng]}>
            <Popup>
              Your order is currently here! <br />
              Estimated Delivery: <strong>{orderDetails.deliveryDate}</strong>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Order Details Below Map */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Order Status</h3>
          <p>{orderDetails.status}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Delivery Date</h3>
          <p>{orderDetails.deliveryDate}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Tracking Number</h3>
          <p>{orderDetails.trackingNumber}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Shipping Address</h3>
          <p>{orderDetails.shippingAddress.address}</p>
          <p>{orderDetails.shippingAddress.phone}</p>
        </div>

        <div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
