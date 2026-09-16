import { NextResponse } from 'next/server'
import { getPayload } from '@/lib/getPayload'
import { seedDatabase } from '@/seed/seed'

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 })
  }

  const payload = await getPayload()
  await seedDatabase(payload)

  return NextResponse.json({ ok: true })
}
