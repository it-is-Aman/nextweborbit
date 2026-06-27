/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

// Check if we are in development mode
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 9008

// Initialize Next.js app WITHOUT hostname & port (Edge runtime / NextAuth friendly)
const app = next({ dev })
const handle = app.getRequestHandler()

// Prepare app and start server
app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            // Parse URL with query parameters
            const parsedUrl = parse(req.url, true)
            // Process all requests via Next.js handler
            await handle(req, res, parsedUrl)
        } catch (err) {
            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
            res.end('internal server error')
        }
    })
    .once('error', (err) => {
        console.error('Server failed:', err)
        process.exit(1)
    })
    .listen(port, () => {
        console.log(`> Next.js server running on port ${port}`)
        console.log(`> Make sure your NEXTAUTH_URL matches your production URL`)
    })
})
