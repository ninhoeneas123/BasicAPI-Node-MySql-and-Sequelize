import { Router } from 'express'
import authMiddleware from '../middlewares/auth-middleware'
import CourseController from './categories-controller'

const categoriesRoutes = Router()


categoriesRoutes.get('/categories/find/:id', CourseController.findCategory)
categoriesRoutes.get('/categories/findAll', CourseController.findCategory)
categoriesRoutes.post('/categories/register', authMiddleware, CourseController.registerCategory)
categoriesRoutes.put('/categories/update:id', authMiddleware, CourseController.updateCategory)
categoriesRoutes.delete('/categories/delete/:id', authMiddleware, CourseController.deleteCategory)

export default categoriesRoutes
