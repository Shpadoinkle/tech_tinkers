/* istanbul ignore file */
import {ApolloServer} from 'apollo-server-koa'
import 'reflect-metadata'
import setupConnection from './connection'
import getSchema from './schema'
import {Context} from './types/context'

const cors = require('@koa/cors')
var jwt = require('jsonwebtoken')
import Koa = require('koa')
import Router = require('koa-router')

// import ExpoNotifications from './lib/ExpoNotifications'
// import { Helpers } from './utils/helpers'

// Sentry
// tslint:disable-next-line: no-var-requires
require('dotenv').config()

const {PORT = 4000} = process.env

let apolloServer: ApolloServer

const app = new Koa()
app.use(
  cors({
    credentials: true,
    origin: '*',
  })
)
app.proxy = true

const router = new Router()
app.use(router.routes())

const isProd = process.env.NODE_ENV === 'production'
const isStaging = process.env.NODE_ENV === 'staging'

let isSetup = false
const bootstrap = async () => {
  if (isSetup) {
    return
  }

  await setupConnection()

  const schema = await getSchema()

  // Create GraphQL server
  apolloServer = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    context: async ({ctx, connection}) => {
      // console.log("ctx", ctx);
      // console.log("connection", connection);

      if (connection) {
        console.log('websocket context?', connection.context)
        return connection.context
      }

      if (!ctx.request.header.authorization) {
        return {}
      }

      let token = ctx.request.header.authorization.replace('Bearer:', '').trim()

      try {
        let {user} = await jwt.verify(token, process.env.JWT_SECRET)
        const ctx: Context = {user}
        return ctx
      } catch (err) {
        console.log(err)
        return {}
      }

      // if (connection) {
      //   //console.log("websocket context?", connection.context);
      //   return connection.context;
      // }
      //
      // const { auth = {} } = ctx.state;
      // const { user, disguise, sudo } = auth;
      // return {
      //   user: user && user.isAdmin ? disguise || user : user,
      //   auth: { user, disguise, sudo },
      //   request: ctx.request
      // };
    },
    uploads: false,
    engine: {
      reportSchema: false,
      graphVariant: process.env.NODE_ENV,
    },
  })

  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: '*',
    },
  })

  isSetup = true
}

export const startHttpServer = async () => {
  await bootstrap()

  app.listen({port: PORT}, () => {
    console.log(`🚀 Server port on ${PORT}`)
    console.log(`🚀 Server ready at ${apolloServer.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ${apolloServer.subscriptionsPath}`)
  })
}
