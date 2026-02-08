"use client";
import {
  useActionState,
  useEffect,
} from 'react';

import { ActionResult } from 'next/dist/shared/lib/app-router-types';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { createShoe } from '@/modules/shoes/actions/createShoe';
import {
  SEASONS,
  SHOE_CATEGORIES,
  SHOE_USAGES,
  TERRAINS,
} from '@/modules/shoes/types';

export default function ShoeForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createShoe, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      setTimeout(() => router.push("/dashboard/shoes"), 1500);
    }

    if (state?.success === false) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <Form
      action={formAction}
      className="space-y-6 max-w-xl flex flex-col"
    >
      <h1 className="text-xl font-semibold">Neuen Schuh anlegen</h1>

      <input
        name="name"
        placeholder="Name"
        className="border"
        required
      />
      <textarea
        name="description"
        placeholder="Beschreibung"
        className="border"
        required
      />
      <input
        name="brand"
        placeholder="Marke"
        className="border"
        required
      />
      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Preis"
        className="border"
        required
      />
      <input
        name="sizes"
        placeholder="Größen (z. B. 40,41,42)"
        className="border"
      />

      <select
        name="category"
        className="block"
        required
      >
        {SHOE_CATEGORIES.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>

      <fieldset className="flex flex-col">
        <legend>Verwendung</legend>
        {SHOE_USAGES.map((usage) => (
          <label
            key={usage}
            className=" w-max"
          >
            <input
              type="checkbox"
              name="usage"
              value={usage}
              className="mr-2"
            />
            {usage}
          </label>
        ))}
      </fieldset>

      <fieldset className="flex flex-col">
        <legend>Saison</legend>
        {SEASONS.map((season) => (
          <label
            key={season}
            className=" w-max"
          >
            <input
              type="checkbox"
              name="season"
              value={season}
              className="mr-2"
            />
            {season}
          </label>
        ))}
      </fieldset>

      <fieldset className="flex flex-col">
        <legend>Terrain</legend>
        {TERRAINS.map((terrain) => (
          <label
            key={terrain}
            className=" w-max"
          >
            <input
              type="checkbox"
              name="terrain"
              value={terrain}
              className="mr-2 "
            />
            {terrain}
          </label>
        ))}
      </fieldset>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="waterproof"
        />
        Wasserdicht
      </label>

      <button type="submit">
        {isPending ? "Wird gespeichert..." : "Speichern"}
      </button>
    </Form>
  );
}
