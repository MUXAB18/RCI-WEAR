import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const prismaClientSingleton = () => {
  try {
    // We use the transaction pooling connection string for the runtime client
    const connectionString = process.env.DATABASE_URL
    
    if (!connectionString) {
      console.error('❌ DATABASE_URL is not defined in environment variables')
      throw new Error('DATABASE_URL is required')
    }
    
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    
    return new PrismaClient({ 
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
    })
  } catch (error) {
    console.error('❌ Failed to initialize Prisma Client:', error)
    throw error
  }
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
