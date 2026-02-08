"use client";
import {
  JSX,
  useActionState,
  useEffect,
} from 'react';

import Form from 'next/form';
import {
  notFound,
  useRouter,
} from 'next/navigation';
import { toast } from 'sonner';

import { permissions } from '@/modules/auth/permissions';
import { ActionResult } from '@/types/action';

import { editShoe } from '../actions/editShoe';
import {
  CURRENCIES,
  SEASONS,
  Shoe,
  SHOE_CATEGORIES,
  SHOE_SIZES,
  SHOE_USAGES,
  TERRAINS,
} from '../types';
import { ShoeAttributeSelect } from './ShoeAttributeSelect';
import { ShoeButton } from './ShoeButton';

export function EditShoeForm({ shoe }: { shoe: Shoe }): JSX.Element {
  if (!shoe) return notFound();

  const router = useRouter();
  const editWithId = editShoe.bind(null, shoe.id);

  const [state, action, isPending] = useActionState<
    ActionResult | null,
    FormData
  >(editWithId, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Schuh aktualisiert");
      setTimeout(() => router.push("/dashboard/shoe"), 1500);
    }

    if (state?.success === false) {
      toast.error(state.error);
      // Handle auth errors
      if (state.code === 401) {
        setTimeout(() => router.push("/login"), 1500);
      }
    }
  }, [state, router]);

  return (
    <Form action={action}>
      <label htmlFor="name">Name:</label>
      <input
        name="name"
        defaultValue={shoe.name}
      />
      <label htmlFor="description">Description:</label>
      <textarea
        name="description"
        defaultValue={shoe.description}
      />

      <label htmlFor="price">Price:</label>
      <input
        name="price"
        type="number"
        defaultValue={shoe.price}
      />

      <label htmlFor="brand">Brand:</label>
      <input
        name="brand"
        defaultValue={shoe.brand}
      />
      <ShoeAttributeSelect
        name="currency"
        label="Currency"
        options={CURRENCIES}
        defaultValue={shoe.currency}
      />
      <ShoeAttributeSelect
        name="sizes"
        label="Sizes"
        options={SHOE_SIZES}
        defaultValue={shoe.sizes.join(", ")}
      />
      <label htmlFor="sizes">Sizes (comma separated):</label>
      <input
        name="sizes"
        defaultValue={shoe.sizes.join(", ")}
      />

      <label htmlFor="isActive">Is Active:</label>
      <input
        name="isActive"
        type="checkbox"
        defaultChecked={shoe.isActive}
      />

      <ShoeAttributeSelect
        name="category"
        label="Kategorie"
        options={SHOE_CATEGORIES}
        defaultValue={shoe.category}
      />

      <ShoeAttributeSelect
        name="usage"
        label="Usage"
        options={SHOE_USAGES}
        defaultValue={shoe.usage}
      />

      <ShoeAttributeSelect
        name="terrain"
        label="Terrain"
        options={TERRAINS}
        defaultValue={shoe.terrain}
      />

      <ShoeAttributeSelect
        name="season"
        label="Season"
        options={SEASONS}
        defaultValue={shoe.season}
      />

      <label htmlFor="waterproof">Waterproof:</label>
      <input
        name="waterproof"
        type="checkbox"
        defaultChecked={shoe.waterproof}
      />

      <ShoeButton
        disabled={isPending}
        title="Update"
        permissions={[permissions.product.edit]}
      />

      {state?.success === false && <p>{state.error}</p>}
    </Form>
  );
}
