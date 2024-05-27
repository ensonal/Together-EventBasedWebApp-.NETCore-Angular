import { Card, Typography } from "@mui/material";

export function EventMapViewCard() {
  const lat = 40.73061; // Enlem
  const lon = -73.935242; // Boylam
  const zoom = 12; // Yakınlaştırma seviyesi
  const width = 600; // Harita genişliği
  const height = 300; // Harita yüksekliği

  // OpenStreetMap URL'si oluşturma
  const mapUrl = `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&z=${zoom}&size=${width},${height}&l=map`;

  return (
    <Card
      sx={{ boxShadow: 0, flex: 1.5 }}
      className="rounded-4 p-3"
      style={{ height: 280, overflow: "hidden" }}
    >
      <Typography variant="h6" className="mb-1">
        Location
      </Typography>
        <img src={mapUrl} alt="map" className="w-100 rounded-3" />
    </Card>
  );
}
