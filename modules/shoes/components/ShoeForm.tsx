"use client";
import { useActionState } from 'react';

import Form from 'next/form';

import { useActionResultHandler } from '@/hooks/useActionResultHandler';
import { createShoe } from '@/modules/shoes/actions/createShoe';
import { editShoe } from '@/modules/shoes/actions/editShoe';
import {
  CURRENCIES,
  SEASONS,
  Shoe,
  SHOE_CATEGORIES,
  SHOE_COLORS,
  SHOE_USAGES,
  TERRAINS,
} from '@/modules/shoes/types';
import { ActionResult } from '@/types/action';

import { ShoeAttributeSelect } from './ShoeAttributeSelect';

const initialState: ActionResult = {
  success: false,
  error: "",
};

interface ShoeFormProps {
  shoe?: Shoe;
}

export default function ShoeForm({ shoe }: ShoeFormProps) {
  const actionToUse = shoe ? editShoe.bind(null, shoe.id) : createShoe;
  const isEditMode = !!shoe;

  const [state, formAction, isPending] = useActionState(
    actionToUse,
    initialState,
  );

  useActionResultHandler(state, {
    successRedirect: "/dashboard/shoe",
  });

  return (
    <Form
      action={formAction}
      className="space-y-6 max-w-xl flex flex-col"
    >
      <h1 className="text-xl font-semibold">
        {isEditMode ? "Schuh bearbeiten" : "Neuen Schuh anlegen"}
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            defaultValue={shoe?.name}
            placeholder="Name des Schuhs"
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Beschreibung
          </label>
          <textarea
            name="description"
            defaultValue={shoe?.description}
            placeholder="Beschreibung"
            className="w-full border rounded p-2 min-h-25"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Marke</label>
            <input
              name="brand"
              defaultValue={shoe?.brand}
              placeholder="Marke"
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Preis</label>
            <input
              name="price"
              type="number"
              step="0.01"
              defaultValue={shoe?.price}
              placeholder="Preis"
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Währung
            </label>
            <ShoeAttributeSelect
              name="currency"
              label="Währung"
              options={CURRENCIES}
              defaultValue={shoe?.currency}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Kategorie
            </label>
            <ShoeAttributeSelect
              name="category"
              label="Kategorie"
              options={SHOE_CATEGORIES}
              defaultValue={
                Array.isArray(shoe?.category)
                  ? shoe?.category[0]
                  : typeof shoe?.category === "string"
                    ? shoe?.category
                    : undefined
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Größen (getrennt durch Komma)
          </label>
          <input
            name="sizes"
            defaultValue={shoe?.sizes?.join(", ")}
            placeholder="z. B. 40, 41, 42"
            className="w-full border rounded p-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            defaultChecked={shoe?.isActive}
            className="h-4 w-4"
          />
          <label
            htmlFor="isActive"
            className="text-sm font-medium"
          >
            Produkt ist aktiv
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="waterproof"
            id="waterproof"
            defaultChecked={shoe?.waterproof}
            className="h-4 w-4"
          />
          <label
            htmlFor="waterproof"
            className="text-sm font-medium"
          >
            Wasserfest
          </label>
        </div>

        {/* Arrays: Usage, Season, Terrain */}
        <fieldset className="border p-4 rounded bg-gray-50">
          <legend className="font-semibold px-2">Verwendung</legend>
          <div className="flex flex-wrap gap-4 mt-2">
            {SHOE_USAGES.map((usage) => (
              <label
                key={usage}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="usage"
                  value={usage}
                  defaultChecked={shoe?.usage?.includes(usage)}
                  className="rounded"
                />
                <span className="text-sm">{usage}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="border p-4 rounded bg-gray-50">
          <legend className="font-semibold px-2">Jahreszeit</legend>
          <div className="flex flex-wrap gap-4 mt-2">
            {SEASONS.map((season) => (
              <label
                key={season}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="season"
                  value={season}
                  defaultChecked={shoe?.season?.includes(season)}
                  className="rounded"
                />
                <span className="text-sm">{season}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="border p-4 rounded bg-gray-50">
          <legend className="font-semibold px-2">Terrain</legend>
          <div className="flex flex-wrap gap-4 mt-2">
            {TERRAINS.map((terrain) => (
              <label
                key={terrain}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="terrain"
                  value={terrain}
                  defaultChecked={shoe?.terrain?.includes(terrain)}
                  className="rounded"
                />
                <span className="text-sm">{terrain}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="border p-4 rounded bg-gray-50">
          <legend className="font-semibold px-2">Farben</legend>
          <div className="flex flex-wrap gap-4 mt-2">
            {SHOE_COLORS.map((color) => (
              <label
                key={color}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="colors"
                  value={color}
                  defaultChecked={shoe?.colors?.includes(color)}
                  className="rounded"
                />
                <span className="text-sm">{color}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 disabled:opacity-50 transition-colors font-medium"
      >
        {isPending
          ? "Verarbeite..."
          : isEditMode
            ? "Änderungen speichern"
            : "Schuh erstellen"}
      </button>
    </Form>
  );
}
