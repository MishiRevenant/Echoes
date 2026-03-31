'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { destinations } from '@/data/destinations';
import type { Destination } from '@/data/destinations';





/* ────────────────────────────────────────────────────────── */
/* Category colours                                          */
/* ────────────────────────────────────────────────────────── */
const catColour: Record<Destination['category'], string> = {
    citadel: '#c0392b',
    city: '#2c3e50',
    nature: '#27ae60',
    amazon: '#1a7a4a',
    culture: '#8b7355',
};

function makeIcon(category: Destination['category'], isActive: boolean) {
    const size = isActive ? 44 : 36;
    const colour = catColour[category];
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 44 44">
      <circle cx="22" cy="22" r="${isActive ? 18 : 15}" fill="${colour}" fill-opacity="0.18"/>
      <circle cx="22" cy="22" r="${isActive ? 11 : 9}" fill="${colour}" stroke="white" stroke-width="2"/>
      <circle cx="22" cy="22" r="${isActive ? 5 : 4}" fill="white"/>
    </svg>`;
    return L.divIcon({
        className: '',
        html: svg,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -(size / 2 + 4)],
    });
}

/* ────────────────────────────────────────────────────────── */
/* Fit map to Peru bounds on load                            */
/* ────────────────────────────────────────────────────────── */
function SetBounds() {
    const map = useMap();
    useEffect(() => {
        // Approximate bounding box for Peru
        map.fitBounds(
            [
                [-18.35, -81.33],
                [-0.05, -68.68],
            ],
            { padding: [20, 20] }
        );
    }, [map]);
    return null;
}

/* ────────────────────────────────────────────────────────── */
/* Main Map Component                                        */
/* ────────────────────────────────────────────────────────── */
interface PeruLeafletMapProps {
    activeId: string | null;
    onSelect: (id: string) => void;
}

export default function PeruLeafletMap({ activeId, onSelect }: PeruLeafletMapProps) {
    return (
        <MapContainer
            center={[-9.19, -75.0]}
            zoom={5}
            scrollWheelZoom={false}
            zoomControl={false}
            style={{ width: '100%', height: '100%', background: '#e8e3d9' }}
            className="rounded-none"
        >
            {/* Elegant light map tiles */}
            <TileLayer
                attribution='&copy; <a href="https://carto.com">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <SetBounds />

            {destinations.map((dest) => (
                <Marker
                    key={dest.id}
                    position={[dest.lat, dest.lng]}
                    icon={makeIcon(dest.category, activeId === dest.id)}
                    eventHandlers={{ click: () => onSelect(dest.id) }}
                >
                    <Popup
                        offset={[0, -10]}
                        className="belmond-popup"
                    >
                        <div style={{ fontFamily: 'Montserrat, sans-serif', minWidth: 180 }}>
                            <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8b7355', margin: '0 0 4px' }}>
                                {dest.region}
                            </p>
                            <p style={{ fontSize: 14, fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, color: '#2a2a2a', margin: '0 0 8px', lineHeight: 1.2 }}>
                                {dest.name}
                            </p>
                            <a
                                href={`/destinations/${dest.slug}`}
                                style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2a2a2a', borderBottom: '1px solid #2a2a2a', paddingBottom: 1, textDecoration: 'none' }}
                            >
                                Discover →
                            </a>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
