import { Router } from 'express'
import purchaseController from './products-controller'
import authMiddleware from '../middlewares/auth-middleware'
import adminMiddleware from '../middlewares/admin-middleware'


const productRouter = Router()

productRouter.get('/products/find/id',authMiddleware, adminMiddleware, purchaseController.findOneProduct)
productRouter.get('/products/find',authMiddleware, adminMiddleware, purchaseController.findAllProduct)
productRouter.post('/products/create',authMiddleware, purchaseController.registerProduct)
productRouter.put('/categories/update:id', authMiddleware, purchaseController.updateProduct)
productRouter.delete('/categories/delete/:id', authMiddleware, purchaseController.deleteProduct)



export default productRouter