import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getStorage, type FirebaseStorage } from 'firebase/storage'
import { firebaseConfig } from './config'

function getApp(): FirebaseApp {
  if (getApps().length) return getApps()[0]
  if (!firebaseConfig.apiKey) return initializeApp({ projectId: 'placeholder' })
  return initializeApp(firebaseConfig)
}

let _auth: Auth | null = null
let _storage: FirebaseStorage | null = null

export function getClientAuth(): Auth {
  if (!_auth) _auth = getAuth(getApp())
  return _auth
}
export function getClientStorage(): FirebaseStorage {
  if (!_storage) _storage = getStorage(getApp())
  return _storage
}
