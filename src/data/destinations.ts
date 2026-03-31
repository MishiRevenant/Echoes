/* Shared destinations data — plain TS, no React, safe for both server and client */

export interface Destination {
    id: string;
    name: string;
    region: string;
    lat: number;
    lng: number;
    tagline: string;
    image: string;
    slug: string;
    category: 'citadel' | 'city' | 'nature' | 'amazon' | 'culture';
}

export const destinations: Destination[] = [
    {
        id: 'cusco',
        name: 'Cusco',
        region: 'Cusco Region',
        lat: -13.5319,
        lng: -71.9675,
        tagline: 'Navel of the Inca Empire',
        image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&w=600',
        slug: 'cusco',
        category: 'culture',
    },
    {
        id: 'machu-picchu',
        name: 'Machu Picchu',
        region: 'Cusco Region',
        lat: -13.1631,
        lng: -72.545,
        tagline: 'Lost City of the Incas',
        image: 'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&w=600',
        slug: 'machu-picchu',
        category: 'citadel',
    },
    {
        id: 'lima',
        name: 'Lima',
        region: 'Lima',
        lat: -12.0464,
        lng: -77.0428,
        tagline: 'City of Kings & Culinary Capital',
        image: 'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&w=600',
        slug: 'lima',
        category: 'city',
    },
    {
        id: 'arequipa',
        name: 'Arequipa',
        region: 'Arequipa Region',
        lat: -16.4090,
        lng: -71.5375,
        tagline: 'The White City of the Andes',
        image: 'https://images.pexels.com/photos/4137786/pexels-photo-4137786.jpeg?auto=compress&w=600',
        slug: 'arequipa',
        category: 'city',
    },
    {
        id: 'puno',
        name: 'Puno & Lake Titicaca',
        region: 'Puno Region',
        lat: -15.8402,
        lng: -70.0219,
        tagline: 'Floating Islands of the Andes',
        image: 'https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg?auto=compress&w=600',
        slug: 'puno-titicaca',
        category: 'nature',
    },
    {
        id: 'iquitos',
        name: 'Iquitos & Amazon',
        region: 'Loreto Region',
        lat: -3.7491,
        lng: -73.2538,
        tagline: 'Gateway to the Amazon Rainforest',
        image: 'https://images.pexels.com/photos/3389029/pexels-photo-3389029.jpeg?auto=compress&w=600',
        slug: 'amazon-iquitos',
        category: 'amazon',
    },
    {
        id: 'colca',
        name: 'Colca Canyon',
        region: 'Arequipa Region',
        lat: -15.6456,
        lng: -71.8689,
        tagline: 'Home of the Andean Condor',
        image: 'https://images.pexels.com/photos/4388270/pexels-photo-4388270.jpeg?auto=compress&w=600',
        slug: 'colca-canyon',
        category: 'nature',
    },
    {
        id: 'nazca',
        name: 'Nazca Lines',
        region: 'Ica Region',
        lat: -14.7392,
        lng: -75.1301,
        tagline: 'Mysterious Ancient Geoglyphs',
        image: 'https://images.pexels.com/photos/5858240/pexels-photo-5858240.jpeg?auto=compress&w=600',
        slug: 'nazca-lines',
        category: 'culture',
    },
    {
        id: 'trujillo',
        name: 'Trujillo & Chan Chan',
        region: 'La Libertad Region',
        lat: -8.1116,
        lng: -79.0288,
        tagline: 'Capital of the Moche Culture',
        image: 'https://images.pexels.com/photos/4388196/pexels-photo-4388196.jpeg?auto=compress&w=600',
        slug: 'trujillo',
        category: 'culture',
    },
    {
        id: 'huaraz',
        name: 'Huaraz & Cordillera Blanca',
        region: 'Ancash Region',
        lat: -9.5296,
        lng: -77.5277,
        tagline: 'Alps of the Americas',
        image: 'https://images.pexels.com/photos/2356053/pexels-photo-2356053.jpeg?auto=compress&w=600',
        slug: 'huaraz',
        category: 'nature',
    },
];
