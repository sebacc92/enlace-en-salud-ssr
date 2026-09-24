-- Migration number: 0003

UPDATE sections
SET
  data = json_set(
    data,
    '$.maps_link',
    'https://maps.app.goo.gl/3oUCnce4Jg3AguGT6'
  ),
  updated_at = datetime('now')
WHERE key = 'map';

UPDATE site_config
SET
  data = json_set(
    data,
    '$.location_url',
    'https://maps.app.goo.gl/3oUCnce4Jg3AguGT6'
  ),
  updated_at = datetime('now')
WHERE id = 1;
