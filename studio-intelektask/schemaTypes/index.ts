import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { courseType } from './course'

export const schemaTypes: SchemaTypeDefinition[] = [
  courseType,
  postType,
]
