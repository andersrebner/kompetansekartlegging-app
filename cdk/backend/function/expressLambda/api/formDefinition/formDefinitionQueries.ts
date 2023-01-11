import {
  SqlParameter,
  TypeHint,
  UpdateResultFilterSensitiveLog,
} from '@aws-sdk/client-rds-data'
import { v4 as uuidv4 } from 'uuid'
import { sqlQuery } from '../../app'
import { createTimestampNow } from '../utils'

const listFormDefinitions = async () => {
  const LIST_QUERY = `SELECT * FROM formDefinition`
  const records = await sqlQuery(LIST_QUERY)

  return {
    message: `🚀 ~ > All Form Definitions:`,
    data: records,
  }
}

interface CreateFormDefinitionInput {
  name: string
  organizationID: string
}

const createFormDefinition = async ({
  name,
  organizationID,
}: CreateFormDefinitionInput) => {
  const params: SqlParameter[] = [
    {
      name: 'id',
      value: {
        stringValue: uuidv4(),
      },
      typeHint: TypeHint.UUID,
    },
    {
      name: 'label',
      value: {
        stringValue: name,
      },
    },
    {
      name: 'organizationID',
      value: {
        stringValue: organizationID,
      },
    },
    {
      name: 'createdAt',
      value: {
        stringValue: createTimestampNow(),
      },
      typeHint: TypeHint.TIMESTAMP,
    },
  ]

  const CREATE_QUERY = `INSERT INTO formDefinition (id, label, createdAt, organizationID) 
        VALUES (:id, :label, :createdAt, :organizationID) 
        RETURNING *`
  const records = await sqlQuery(CREATE_QUERY, params)

  return { message: `🚀 ~ > Form Definition '${name}' created.`, data: records }
}

interface DeleteFormDefinitionInput {
  id: string
}

const deleteFormDefinition = async ({ id }: DeleteFormDefinitionInput) => {
  const params: SqlParameter[] = [
    {
      name: 'id',
      value: {
        stringValue: id,
      },
      typeHint: TypeHint.UUID,
    },
  ]

  const DELETE_QUERY = `DELETE FROM formDefinition WHERE id = :id RETURNING *`
  const records = await sqlQuery(DELETE_QUERY, params)

  return {
    message: `🚀 ~ > Form Definition with id '${id}' deleted.`,
    data: records,
  }
}

interface UpdateFormDefinitionInput {
  label?: string
  organizationId?: string
  createdAt?: string
  updatedAt?: string
}

const updateFormDefinition = async (
  id: string,
  values: UpdateFormDefinitionInput
) => {
  let columnString = ''
  const lastEntryIndex = Object.keys(values).length - 1

  const params: SqlParameter[] = [
    {
      name: 'id',
      value: {
        stringValue: id,
      },
      typeHint: TypeHint.UUID,
    },
  ]

  const typeHints: Record<string, TypeHint> = {
    createdAt: TypeHint.TIMESTAMP,
    updatedAt: TypeHint.TIMESTAMP,
  }

  if (!values.createdAt) {
    values.createdAt = createTimestampNow()
  }

  Object.entries(values).forEach(([field, value], i) => {
    // Generate columnString of query
    columnString += `${field}=:${field}`
    if (i !== lastEntryIndex) {
      columnString += ', '
    }

    // Populate params list
    const param: SqlParameter = {
      name: field,
      value: {
        stringValue: value,
      },
    }

    if (field in typeHints) {
      param.typeHint = typeHints[field]
    }

    params.push(param)
  })

  // ! This is not safe due to user input in query string.
  const UPDATE_QUERY = `UPDATE formDefinition SET ${columnString} WHERE id=:id RETURNING *`
  const records = await sqlQuery(UPDATE_QUERY, params)

  return {
    message: `🚀 ~ > formDefinition with id '${id}' is now updated.`,
    data: records,
  }
}

export default {
  createFormDefinition,
  deleteFormDefinition,
  listFormDefinitions,
  updateFormDefinition,
}
