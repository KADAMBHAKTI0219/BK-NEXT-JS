
import ProductDetails from '@/component/product/ProductDetails'
import { getProductById } from '@/lib/productApi';

const page = async ({params}) => {
    const {id} = await params
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
    const response = getProductById(id)
    const products = await response
    console.log("Product Details:", products)

  return (
    <div>
      <ProductDetails product={products}/>
    </div>
  )
}

export default page
