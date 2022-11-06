export default async function ({category, item}: {category?: string; item?: string}) {
  if (!category) throw new TypeError('Discount category is not defined');
  if (!item) throw new TypeError('Item id is not defined');
  return undefined;
}
