/* istanbul ignore file */
import {Container} from 'typedi'
import * as TypeORM from 'typeorm'
import Entities from './Entities'
// Subscribers
// Register all enum types
// import './graphql/types/_RegisterEnums'

const isProd = process.env.NODE_ENV === 'production'
const isStaging = process.env.NODE_ENV === 'staging'
const isTest = process.env.NODE_ENV === 'test'

let conn: TypeORM.Connection

export default async function setupConnection(drop: boolean = true) {
  console.log('📞 Setting up PGSQL connection 📞')

  if (!conn) {
    TypeORM.useContainer(Container)
    conn = await TypeORM.createConnection({
      type: 'postgres',
      database: isTest
        ? process.env.TEST_DATABASE_NAME
        : process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      port: 5432,
      host: process.env.DATABASE_HOST,
      extra: {
        max: 15,
      },
      entities: Entities,
      migrationsTableName: 'migrations',
      synchronize: true,
      dropSchema: false,
      cache: isProd,
      logging: 'all',
    })
  }

  return conn
}
