/** True when a `<input type="file">` field was actually filled in the submitted form. */
export function isUploadedFile(value: unknown): value is File {
  return typeof File !== "undefined" && value instanceof File && value.size > 0;
}

/** Uploads a file to the media bucket under `key`, preserving its content type. */
export async function putMedia(bucket: R2Bucket, key: string, file: File): Promise<string> {
  await bucket.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type || "application/octet-stream" },
  });
  return `/media/${key}`;
}
