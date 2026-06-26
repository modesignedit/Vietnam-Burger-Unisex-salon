import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { firebaseConfig } from './config'

function createApp() {
  if (getApps().length) return getApps()[0]
  if (!firebaseConfig.apiKey) return initializeApp({ projectId: 'placeholder' })
  return initializeApp(firebaseConfig)
}

let _auth: ReturnType<typeof getAuth> | null = null
let _db: ReturnType<typeof getFirestore> | null = null
let _storage: ReturnType<typeof getStorage> | null = null

export function getAuthInstance() {
  if (!_auth) _auth = getAuth(createApp())
  return _auth
}

export function getDb() {
  if (!_db) _db = getFirestore(createApp())
  return _db
}

export function getStorageInstance() {
  if (!_storage) _storage = getStorage(createApp())
  return _storage
}
