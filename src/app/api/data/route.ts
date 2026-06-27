import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

export async function GET(request: NextRequest) {
  const collection = request.nextUrl.searchParams.get('collection')
  if (!collection) return NextResponse.json({ error: 'missing collection' }, { status: 400 })

  const data = await redis.get(collection)
  return NextResponse.json(data ?? null)
}

export async function POST(request: NextRequest) {
  const collection = request.nextUrl.searchParams.get('collection')
  if (!collection) return NextResponse.json({ error: 'missing collection' }, { status: 400 })

  const body = await request.json()
  await redis.set(collection, JSON.stringify(body))
  return NextResponse.json({ success: true })
}
