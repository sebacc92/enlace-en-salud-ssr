export interface Section {
  key: string;
  position: number;
  data: any;
}

export async function getSections(db: D1Database): Promise<Section[]> {
  const { results } = await db
    .prepare("SELECT key, position, data FROM sections ORDER BY position ASC")
    .all<{ key: string; position: number; data: string }>();

  return results.map((row) => ({
    key: row.key,
    position: row.position,
    data: JSON.parse(row.data),
  }));
}

export async function getSiteConfig(db: D1Database): Promise<any | null> {
  const row = await db
    .prepare("SELECT data FROM site_config WHERE id = 1")
    .first<{ data: string }>();

  return row ? JSON.parse(row.data) : null;
}

export async function getSection(db: D1Database, key: string): Promise<Section | null> {
  const row = await db
    .prepare("SELECT key, position, data FROM sections WHERE key = ?")
    .bind(key)
    .first<{ key: string; position: number; data: string }>();

  return row ? { key: row.key, position: row.position, data: JSON.parse(row.data) } : null;
}

export async function updateSection(db: D1Database, key: string, data: any): Promise<void> {
  await db
    .prepare("UPDATE sections SET data = ?, updated_at = datetime('now') WHERE key = ?")
    .bind(JSON.stringify(data), key)
    .run();
}

export async function updateSectionPositions(db: D1Database, orderedKeys: string[]): Promise<void> {
  const statements = orderedKeys.map((key, i) =>
    db.prepare("UPDATE sections SET position = ? WHERE key = ?").bind(i + 1, key),
  );
  await db.batch(statements);
}

export async function updateSiteConfig(db: D1Database, data: any): Promise<void> {
  await db
    .prepare(
      "INSERT INTO site_config (id, data, updated_at) VALUES (1, ?, datetime('now')) " +
        "ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at",
    )
    .bind(JSON.stringify(data))
    .run();
}
