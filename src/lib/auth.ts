import { headers as getHeaders } from 'next/headers'
import { getPayload } from '@/lib/getPayload'
import type { Student } from '@/payload-types'

export async function getCurrentStudent(): Promise<Student | null> {
  const payload = await getPayload()
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  if (user && 'collection' in user && user.collection === 'students') {
    return user as unknown as Student
  }

  return null
}
