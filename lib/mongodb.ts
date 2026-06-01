import mongoose, { type ConnectOptions } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env or .env.local')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

function getConnectOptions(): ConnectOptions {
  const opts: ConnectOptions = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 15000,
  }

  if (process.env.NODE_ENV !== 'production') {
    // Prefer IPv4 locally — Atlas often whitelists IPv4 while the OS tries IPv6 first
    opts.family = 4
  }

  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.MONGODB_TLS_SKIP_VERIFY === 'true'
  ) {
    opts.tlsAllowInvalidCertificates = true
  }

  return opts
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, getConnectOptions()).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect

