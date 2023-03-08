import express from 'express'
import Catalog from './queries'
import {
  DeleteCatalogInput,
  CatalogInput,
  GetCatalogInput,
  UpdateCatalogInput,
} from './types'

const router = express.Router()

// Get all form definitions
router.get('/', async (req, res, next) => {
  try {
    const listResponse = await Catalog.listCatalogs()

    res.status(200).json(listResponse)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

// Create
router.post<unknown, unknown, CatalogInput>('/', async (req, res, next) => {
  try {
    const createResponse = await Catalog.createCatalog(req.body)

    res.status(200).json(createResponse)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

// Delete
router.delete<unknown, unknown, DeleteCatalogInput>(
  '/',
  async (req, res, next) => {
    try {
      const deleteResponse = await Catalog.deleteCatalog(req.body)

      res.status(200).json(deleteResponse)
    } catch (err) {
      console.error(err)
      next(err)
    }
  }
)

// Update
router.patch<unknown, unknown, UpdateCatalogInput, GetCatalogInput>(
  '/:id',
  async (req, res, next) => {
    try {
      const updateResponse = await Catalog.updateCatalog(req.query, req.body)

      res.status(200).json(updateResponse)
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
)

export { router as catalogRouter }
