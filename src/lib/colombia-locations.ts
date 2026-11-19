// DIVIPOLA, DANE / Datos Abiertos Colombia, snapshot retrieved 2026-11-18:
// https://www.datos.gov.co/Mapas-Nacionales/DIVIPOLA-C-digos-municipios/gdxc-w37w
import locations from '@/data/colombia-locations.json';

export const colombiaLocations = locations;

export function isColombianLocation(department: string, city: string): boolean {
  return colombiaLocations.some((entry) => entry.name === department && entry.cities.includes(city));
}
