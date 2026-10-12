import react from '@vitejs/plugin-react'
import { createContactHandler } from './api/contact.js'
import { defineConfig, loadEnv } from 'vite'

function contactApiPlugin(environment) {
  const handler = createContactHandler(environment)

  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', (request, response, next) => {
        if (request.url?.split('?')[0] !== '/') return next()

        const sendJson = (status, body) => {
          response.statusCode = status
          response.setHeader('Content-Type', 'application/json; charset=utf-8')
          response.end(JSON.stringify(body))
        }

        const apiResponse = {
          status(status) {
            response.statusCode = status
            return this
          },
          json(body) {
            response.setHeader('Content-Type', 'application/json; charset=utf-8')
            response.end(JSON.stringify(body))
            return this
          },
          setHeader(name, value) {
            response.setHeader(name, value)
          },
        }

        if (request.method !== 'POST') {
          handler(request, apiResponse).catch(next)
          return
        }

        const processRequest = async () => {
          const chunks = []
          let bodySize = 0
          for await (const chunk of request) {
            bodySize += chunk.length
            if (bodySize > 16_384) {
              sendJson(413, { error: 'Your message is too long. Please shorten it and try again.' })
              return
            }
            chunks.push(chunk)
          }

          try {
            request.body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
          } catch {
            sendJson(400, { error: 'Please submit the form again with valid details.' })
            return
          }

          await handler(request, apiResponse)
        }

        processRequest().catch((error) => {
          server.config.logger.error('Contact API request failed.', { error })
          if (!response.headersSent) {
            sendJson(500, { error: 'We could not send your message right now. Please try again.' })
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), contactApiPlugin(loadEnv(mode, process.cwd(), ''))],
}))
