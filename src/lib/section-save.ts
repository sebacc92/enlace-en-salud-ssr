import type { FieldDef, SectionSchema } from "~/lib/section-schemas";
import { getPath, setPath } from "~/lib/object-path";
import { isUploadedFile, putMedia } from "~/lib/media";

/**
 * Merges submitted form fields (already nested by Qwik City's form-data
 * parser, e.g. `service_cards.0.title`) onto the current stored data for a
 * section or the site config. Every schema has at most one image field, so
 * a newly uploaded file always overwrites the same `<mediaKey>.<ext>` object
 * instead of piling up orphaned uploads.
 */
export async function applyFormToData(
  schema: SectionSchema,
  currentData: any,
  formData: any,
  bucket: R2Bucket,
  mediaKey: string,
): Promise<any> {
  const result = structuredClone(currentData ?? {});
  await applyFields(schema.fields, formData, result, bucket, mediaKey);
  return result;
}

async function applyFields(fields: FieldDef[], form: any, target: any, bucket: R2Bucket, mediaKey: string) {
  for (const field of fields) {
    if (field.type === "array") {
      const rows: any[] = Array.isArray(form?.[field.name]) ? form[field.name] : [];
      const currentArray: any[] = getPath(target, field.name) ?? [];
      const newArray: any[] = [];
      for (let i = 0; i < rows.length; i++) {
        const rowTarget = structuredClone(currentArray[i] ?? {});
        await applyFields(field.fields, rows[i], rowTarget, bucket, mediaKey);
        newArray.push(rowTarget);
      }
      setPath(target, field.name, newArray);
      continue;
    }

    if (field.type === "image") {
      const file = getPath(form, field.name);
      if (isUploadedFile(file)) {
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const url = await putMedia(bucket, `${mediaKey}.${ext}`, file);
        setPath(target, field.name, url);
      }
      continue;
    }

    const value = getPath(form, field.name);
    if (value !== undefined) {
      setPath(target, field.name, String(value ?? ""));
    }
  }
}
