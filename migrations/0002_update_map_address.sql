-- Migration number: 0002

UPDATE sections
SET
  data = json_set(
    data,
    '$.location_url',
    'Calle 54 N° 523 entre 5 y 6, La Plata, Provincia de Buenos Aires'
  ),
  updated_at = datetime('now')
WHERE key = 'map';
