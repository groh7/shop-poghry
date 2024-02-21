import { useShopContext} from "@/providers/ShopContext";
import { useState } from "react";
import dbConnect from "@/utils/dbConnect";
import { ProductType } from "@/models/product";

function Product({ product }: any) {
  const { cart, setCart } = useShopContext();
  const [editedProduct, setEditedProduct] = useState<ProductType | null>(null);

  const handleProductEdit = () => {
    if (editedProduct && editedProduct.id === product.id) {
      // If the product is already being edited, save the changes
      setEditedProduct(null);
    } else {
      // Otherwise, start editing the product
      setEditedProduct({ ...product });
    }
  };

  const saveChanges = async () => {
    if (editedProduct && editedProduct.id === product.id) {
      //console.log('Saving changes...')
      try {
        //console.log('Making PUT request...')
        const response = await fetch(`http://localhost:3000/api/products`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedProduct)
        })
        //console.log('Received response...')
        if (response.ok) {
          //console.log('Updating cart...')
          const updatedProduct = await response.json()
          setCart((prevCart: any) =>
            prevCart.map((item: any) => (item.id === updatedProduct.id ? updatedProduct : item))
          )
          //console.log('Cart updated.')
          setEditedProduct(null)
        } else {
          console.error('Failed to update product:', response.statusText)
        }
      } catch (error) {
        console.error('Error updating product:', error)
      }
    }
    setEditedProduct(null)
    //pokazuje się error 500, ale po restarcie strony i tak działa. nie pytam.
    location.reload()
  }

  const deleteProduct = async () => {
    if (editedProduct && editedProduct.id === product.id) {
      try {
        const response = await fetch(`http://localhost:3000/api/products`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedProduct)
        })
        if (!response.ok) {
          console.error('Failed to delete product:', response.statusText)
        }
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
    setEditedProduct(null)
    location.reload()
  };




  return (
    <div className="w-1/4 p-4">
      <div className="product flex flex-col border p-4 mb-4">
        <h2 className="text-xl font-bold mb-2 text-center">{editedProduct ? editedProduct.name : product.name}</h2>
        <p className="text-gray-600 mb-2 text-center">{editedProduct ? editedProduct.description : product.description}</p>
        <p className="text-gray-800 font-bold mb-3 text-center">{editedProduct ? editedProduct.price : product.price} pln</p>
        {editedProduct ? (
          <>
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
              className="border p-1 mb-2"
            />
            <textarea
              value={editedProduct.description}
              onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
              className="border p-1 mb-2"
            />
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({ ...editedProduct, price: Number(e.target.value) })}
              className="border p-1 mb-2"
            />
            <button onClick={saveChanges} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none">
              Save Changes
            </button>
            <button onClick={deleteProduct} className="bg-red-500 mt-2 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none">
              Delete Product
            </button>
          </>
        ) : (
          <button onClick={handleProductEdit} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none">
            Edit Product
          </button>
        )}
        
      </div>
    </div>
  );
}

export default Product;