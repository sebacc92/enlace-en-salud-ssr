import { component$, useStore } from "@builder.io/qwik";
import { Form, type ActionStore } from "@builder.io/qwik-city";
import type { FieldDef, SectionSchema } from "~/lib/section-schemas";
import { getPath } from "~/lib/object-path";

interface FieldProps {
  field: FieldDef;
  namePrefix: string;
  data: any;
}

const Field = component$<FieldProps>(({ field, namePrefix, data }) => {
  const name = namePrefix ? `${namePrefix}.${field.name}` : field.name;
  const value = getPath(data, field.name);

  if (field.type === "textarea") {
    return (
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">{field.label}</label>
        <textarea name={name} rows={4} class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2">
          {value ?? ""}
        </textarea>
      </div>
    );
  }

  if (field.type === "image") {
    return (
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">{field.label}</label>
        {value && (
          <img
            src={value}
            width={96}
            height={96}
            class="h-24 w-auto mb-2 rounded-lg object-contain bg-slate-100 dark:bg-slate-800"
          />
        )}
        <input type="file" name={name} accept="image/*" class="block w-full text-sm" />
        <p class="text-xs text-muted-foreground mt-1">Dejar vacío para mantener la imagen actual.</p>
      </div>
    );
  }

  if (field.type === "array") {
    return <ArrayField field={field} namePrefix={namePrefix} value={value ?? []} />;
  }

  return (
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">{field.label}</label>
      <input
        type="text"
        name={name}
        value={value ?? ""}
        class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2"
      />
    </div>
  );
});

interface ArrayFieldProps {
  field: Extract<FieldDef, { type: "array" }>;
  namePrefix: string;
  value: any[];
}

const ArrayField = component$<ArrayFieldProps>(({ field, namePrefix, value }) => {
  const rows = useStore<{ items: Array<{ _key: string; data: any }> }>({
    items: value.map((item, i) => ({ _key: `row-${i}-${Math.random().toString(36).slice(2)}`, data: item })),
  });

  const baseName = namePrefix ? `${namePrefix}.${field.name}` : field.name;

  return (
    <div class="mb-6">
      <label class="block text-sm font-medium mb-2">{field.label}</label>
      <div class="space-y-3">
        {rows.items.map((row, i) => (
          <div key={row._key} class="border border-slate-300 dark:border-slate-700 rounded-lg p-3 relative">
            <button
              type="button"
              onClick$={() => {
                rows.items.splice(i, 1);
              }}
              class="absolute top-2 right-2 text-red-500 text-xs font-medium"
            >
              Quitar
            </button>
            {field.fields.map((sub) => (
              <Field key={sub.name} field={sub} namePrefix={`${baseName}.${i}`} data={row.data} />
            ))}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick$={() => {
          rows.items.push({ _key: `new-${Date.now()}-${Math.random().toString(36).slice(2)}`, data: {} });
        }}
        class="mt-3 text-sm text-primary font-semibold"
      >
        + Agregar {field.itemLabel.toLowerCase()}
      </button>
    </div>
  );
});

interface SectionFormProps {
  schema: SectionSchema;
  data: any;
  action: ActionStore<any, any>;
}

export const SectionForm = component$<SectionFormProps>(({ schema, data, action }) => {
  return (
    <Form action={action} enctype="multipart/form-data" class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6">
      {action.value?.message && <p class="text-red-500 text-sm mb-4">{action.value.message}</p>}
      {action.value?.success && <p class="text-green-600 text-sm mb-4">Guardado.</p>}

      {schema.fields.map((field) => (
        <Field key={field.name} field={field} namePrefix="" data={data} />
      ))}

      <button
        type="submit"
        class="rounded-lg bg-primary text-white px-5 py-2 font-semibold hover:opacity-90 transition-opacity"
      >
        Guardar
      </button>
    </Form>
  );
});
