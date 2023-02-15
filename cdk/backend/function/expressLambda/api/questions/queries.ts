import { SqlParameter, TypeHint } from '@aws-sdk/client-rds-data'
import { sqlQuery } from '../../app'

import { v4 as uuidv4 } from 'uuid'
import {
  DeleteQuestionInput,
  GetQuestionInput,
  GetQuestionsByCategoryInput,
  QuestionInput,
} from './types'

const listQuestions = async () => {
  const query = `SELECT * FROM question`

  return await sqlQuery({
    message: '🚀 ~ > All questions',
    query,
  })
}

const getQuestion = async ({ id }: GetQuestionInput) => {
  const parameters: SqlParameter[] = [
    {
      name: 'id',
      value: {
        stringValue: id,
      },
      typeHint: TypeHint.UUID,
    },
  ]

  const query = `SELECT * FROM question WHERE id = :id`

  return await sqlQuery({
    message: `🚀 ~ > Question with id: ${id}`,
    query,
    parameters,
  })
}

const getQuestionsInCategory = async ({
  categoryid,
}: GetQuestionsByCategoryInput) => {
  const parameters: SqlParameter[] = [
    {
      name: 'categoryid',
      value: {
        stringValue: categoryid,
      },
      typeHint: TypeHint.UUID,
    },
  ]

  const query = `SELECT * FROM question WHERE categoryid = :categoryid`

  return await sqlQuery({
    message: `🚀 ~ > All questions with categoryid: ${categoryid}`,
    query,
    parameters,
  })
}

const createQuestion = async ({
  text,
  topic,
  index,
  formdefinitionid,
  categoryid,
  type,
  scalestart,
  scalemiddle,
  scaleend,
  organizationid,
}: QuestionInput) => {
  const id = uuidv4()

  const parameters: SqlParameter[] = [
    {
      name: 'id',
      value: {
        stringValue: id,
      },
      typeHint: TypeHint.UUID,
    },
    {
      name: 'categoryid',
      value: {
        stringValue: categoryid,
      },
      typeHint: TypeHint.UUID,
    },
    {
      name: 'formdefinitionid',
      value: { stringValue: formdefinitionid },
      typeHint: TypeHint.UUID,
    },
    { name: 'index', value: index ? { longValue: index } : { isNull: true } },
    { name: 'organizationid', value: { stringValue: organizationid } },
    {
      name: 'scalestart',
      value: scalestart ? { stringValue: scalestart } : { isNull: true },
    },
    {
      name: 'scalemiddle',
      value: scalemiddle ? { stringValue: scalemiddle } : { isNull: true },
    },
    {
      name: 'scaleend',
      value: scaleend ? { stringValue: scaleend } : { isNull: true },
    },
    { name: 'text', value: text ? { stringValue: text } : { isNull: true } },
    { name: 'topic', value: { stringValue: topic } },
  ]

  const query = `INSERT INTO "question" (id, categoryid, formdefinitionid, index, organizationid, scalestart, scalemiddle, scaleend, text, topic, type)
    VALUES(:id, :categoryid, :formdefinitionid, :index, :organizationid, :scalestart, :scalemiddle, :scaleend, :text, :topic, '${type}')
    RETURNING *`

  return await sqlQuery({
    message: `🚀 ~ > Question with id: ${id} was successfully created`,
    query,
    parameters,
  })
}

const updateQuestion = async (
  { id }: GetQuestionInput,
  {
    text,
    topic,
    index,
    formdefinitionid,
    categoryid,
    type,
    scalestart,
    scalemiddle,
    scaleend,
    organizationid,
  }: QuestionInput
) => {
  const parameters: SqlParameter[] = [
    {
      name: 'id',
      value: {
        stringValue: id,
      },
      typeHint: TypeHint.UUID,
    },
    {
      name: 'categoryid',
      value: {
        stringValue: categoryid,
      },
      typeHint: TypeHint.UUID,
    },
    {
      name: 'formdefinitionid',
      value: { stringValue: formdefinitionid },
      typeHint: TypeHint.UUID,
    },
    { name: 'index', value: index ? { longValue: index } : { isNull: true } },
    { name: 'organizationid', value: { stringValue: organizationid } },
    {
      name: 'scalestart',
      value: scalestart ? { stringValue: scalestart } : { isNull: true },
    },
    {
      name: 'scalemiddle',
      value: scalemiddle ? { stringValue: scalemiddle } : { isNull: true },
    },
    {
      name: 'scaleend',
      value: scaleend ? { stringValue: scaleend } : { isNull: true },
    },
    { name: 'text', value: text ? { stringValue: text } : { isNull: true } },
    { name: 'topic', value: topic ? { stringValue: topic } : { isNull: true } },
  ]

  const query = `UPDATE "question"
    SET categoryid=:categoryid, formdefinitionid=:formdefinitionid, index=:index,
    organizationid=:organizationid, scalestart=:scalestart, scalemiddle=:scalemiddle, scaleend=:scaleend,
    text=:text, topic=:topic, type='${type}'
    WHERE id=:id
    RETURNING *`

  return await sqlQuery({
    message: `🚀 ~ > Question with id: ${id} was updated`,
    query,
    parameters,
  })
}

const deleteQuestion = async ({ id }: DeleteQuestionInput) => {
  const parameters: SqlParameter[] = [
    {
      name: 'id',
      value: { stringValue: id },
      typeHint: TypeHint.UUID,
    },
  ]

  const query = `DELETE FROM "question" WHERE id=:id RETURNING *`

  return await sqlQuery({
    message: `🚀 ~ > Question with id: ${id} was successfully deleted`,
    query,
    parameters,
  })
}

export default {
  listQuestions,
  getQuestion,
  getQuestionsInCategory,
  createQuestion,
  updateQuestion,
  deleteQuestion,
}