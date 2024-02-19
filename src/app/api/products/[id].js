import dbConnect from '../../../utils/dbConnect'
import Product from '../../../models/product'

export default async function handler(req, res) {
  const { id } = req.query
  await dbConnect()

  console.log("handler used");

  if (req.method === 'PUT') {
    const { name, description, price, photo, availability } = req.body

    try {
      const product = await Product.findOneAndUpdate(
        { id },
        { name, description, price, photo, availability },
        { new: true }
      )

      if (!product) {
        return res.status(404).json({ message: 'Product not found' })
      }

      return res.status(200).json(product)
    } catch (error) {
      console.error('Error updating product:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}