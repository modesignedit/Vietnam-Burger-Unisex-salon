import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const apps = getApps()

function initAdmin() {
  const projectId = process.env.FIREBASE_PROJECT_ID
  if (!projectId) {
    return initializeApp({ projectId: 'placeholder' })
  }
  return initializeApp({
    credential: cert({
      projectId,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  })
}

const app = apps.length ? apps[0] : initAdmin()

export const adminAuth = getAuth(app)
export const adminDb = getFirestore(app)
