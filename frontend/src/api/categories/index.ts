import { apiDELETE, apiGET, apiPOST } from '../client'
import { Category, CategoryList } from './types'

export const getAllCategories = async () => apiGET<CategoryList>('/categories')

export const getCategoryById = async (categoryId: string) =>
  apiGET<CategoryList>('/categories/:categoryId', {
    queryStringParameters: { categoryId },
  })

type CategoryInput = Omit<Category, 'id'>
export const createCategory = async (categoryInfo: CategoryInput) =>
  apiPOST<CategoryList>('/categories', {
    body: categoryInfo,
  })

export const deleteCategory = async (categoryId: string) =>
  apiDELETE<CategoryList>('/categories/:categoryId', {
    body: { categoryId },
  })
