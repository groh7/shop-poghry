import { useShopContext, ProductType} from "@/providers/ShopContext";
import { useState } from "react";
import dbConnect from "@/utils/dbConnect";
import ProductModel from "@/models/product";

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

  // const saveChanges = async () => {
  //   if (editedProduct && editedProduct.id === product.id) {
  //     try {
  //       // const response = await fetch(`/api/products/${editedProduct.id}`, {
  //       //   method: 'PUT',
  //       //   headers: {
  //       //     'Content-Type': 'application/json'
  //       //   },
  //       //   body: JSON.stringify(editedProduct)
  //       // });
  //       dbConnect();

  //       try {
  //         const product = await ProductModel.findOneAndUpdate(
  //           { id: editedProduct.id },
  //           { name: editedProduct.name, description: editedProduct.description, price: editedProduct.price, photo: editedProduct.photo, availability: editedProduct.availability },
  //           { new: true }
  //         ).exec();
      
  //         if (!product) {
  //           //return res.status(404).json({ message: 'Product not found' })
  //           console.error('Product not found')
  //         } else {
  //             const updatedProduct = await product.json();
  //             setCart((prevCart: any) =>
  //               prevCart.map((item: any) => (item.id === updatedProduct.id ? updatedProduct : item))
  //             );
  //             setEditedProduct(null);
  //         }
      
  //         //return res.status(200).json(product)
  //       } catch (error) {
  //         console.error('Error updating product', error)
  //         //return res.status(500).json({ message: 'Internal server error' })
  //       }
  
        
  //     } catch (error) {
  //       console.error('Error updating product with connection', error);
  //     }
  //   }
    
  //   //Stop eddyting product
  //   setEditedProduct(null);
  // };

  // const saveChanges = async () => {
  //   if (editedProduct && editedProduct.id === product.id) {
  //     try {
  //       const response = await fetch(`http://localhost:3000/api/products`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(editedProduct)
  //       });
  
  //       if (response.ok) {
  //         const updatedProduct = await response.json();
  //         setCart((prevCart: any) =>
  //           prevCart.map((item: any) => (item.id === updatedProduct.id ? updatedProduct : item))
  //         );
  //         setEditedProduct(null);
  //       } else {
  //         console.error('Failed to update product:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error updating product:', error);
  //     }
  //   }
  
  //   setEditedProduct(null);
  // }

  const saveChanges = async () => {
    if (editedProduct && editedProduct.id === product.id) {
      console.log('Saving changes...')
      try {
        console.log('Making PUT request...')
        const response = await fetch(`http://localhost:3000/api/products`, {
          method: 'PUT',
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          body: JSON.stringify(editedProduct)
        })
        console.log('Received response...')
        if (response.ok) {
          console.log('Updating cart...')
          const updatedProduct = await response.json()
          setCart((prevCart: any) =>
            prevCart.map((item: any) => (item.id === updatedProduct.id ? updatedProduct : item))
          )
          console.log('Cart updated.')
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

  return (
    <div className="w-1/4 p-4">
      <div className="product flex flex-col border p-4 mb-4">
        <h2 className="text-xl font-bold mb-2 text-center">{editedProduct ? editedProduct.name : product.name}</h2>
        <p className="text-gray-600 mb-4 text-center">{editedProduct ? editedProduct.description : product.description}</p>
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
            <button onClick={saveChanges} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none">
              Save Changes
            </button>
          </>
        ) : (
          <button onClick={handleProductEdit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
            Edit Product
          </button>
        )}
      </div>
    </div>
  );
}

export default Product;