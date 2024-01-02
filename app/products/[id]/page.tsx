import { getProductById } from '@/app/lib/data';
import { SingleProductWrapper } from '@/app/ui/products/SingleProductWrapper';

export default async function SingleProduct(context: any) {
  const { params } = context;
  const id = params.id;

  if (!id) {
    throw new Error('Product is either deleted or does not exist.');
  }
  const product = await getProductById(id);
  return <SingleProductWrapper {...product} />;
}
