import {hash} from 'bcrypt'
import {Column, ColumnOptions} from 'typeorm'
import * as uuid from 'uuid'
const request = require('request')

export type Lazy<T extends object> = Promise<T> | T

export function RelationColumn(options?: ColumnOptions) {
  return Column({nullable: true, ...options})
}

export function randomHash() {
  return `${uuid()}-${uuid()}`
}

export async function hashPassword(password) {
  return await hash(password, 10)
}
