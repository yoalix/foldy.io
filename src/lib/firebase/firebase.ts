import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export type { User as FirebaseUser } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJegoCMzfkavRGat9w8Ny0Y5SOPVIHHQM",
  authDomain: "foldy2-84c28.firebaseapp.com",
  projectId: "foldy2-84c28",
  storageBucket: "foldy2-84c28.appspot.com",
  messagingSenderId: "353229488302",
  appId: "1:353229488302:web:4770d47413dfb8458dad3f",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export async function getAuthenticatedAppForUser(session?: string) {
  if (typeof window !== "undefined") {
    // client
    console.log("client: ", firebaseApp);

    return { app: firebaseApp, user: auth.currentUser?.toJSON() };
  }

  const { initializeApp: initializeAdminApp, getApps: getAdminApps } =
    await import("firebase-admin/app");

  const { getAuth: getAdminAuth } = await import("firebase-admin/auth");

  const { credential } = await import("firebase-admin");

  const ADMIN_APP_NAME = "firebase-frameworks";
  const adminApp =
    getAdminApps().find((it) => it.name === ADMIN_APP_NAME) ||
    initializeAdminApp(
      {
        credential: credential.applicationDefault(),
      },
      ADMIN_APP_NAME
    );

  const adminAuth = getAdminAuth(adminApp);
  const noSessionReturn = { app: null, currentUser: null };

  if (!session) {
    // if no session cookie was passed, try to get from next/headers for app router
    session = await getAppRouterSession();

    if (!session) return noSessionReturn;
  }

  const decodedIdToken = await adminAuth.verifySessionCookie(session);

  const app = initializeAuthenticatedApp(decodedIdToken.uid);
  const authApp = getAuth(app);

  // handle revoked tokens
  const isRevoked = !(await adminAuth
    .verifySessionCookie(session, true)
    .catch((e) => console.error(e.message)));
  if (isRevoked) return noSessionReturn;

  // authenticate with custom token
  if (authApp.currentUser?.uid !== decodedIdToken.uid) {
    // TODO(jamesdaniels) get custom claims
    const customToken = await adminAuth
      .createCustomToken(decodedIdToken.uid)
      .catch((e) => console.error(e.message));

    if (!customToken) return noSessionReturn;

    await signInWithCustomToken(authApp, customToken);
  }
  console.log("server: ", app);
  return { app, currentUser: authApp.currentUser };
}
async function getAppRouterSession() {
  // dynamically import to prevent import errors in pages router
  const { cookies } = await import("next/headers");

  try {
    return cookies().get("__session")?.value;
  } catch (error) {
    // cookies() throws when called from pages router
    return undefined;
  }
}

function initializeAuthenticatedApp(uid: string) {
  const random = Math.random().toString(36).split(".")[1];
  const appName = `authenticated-context:${uid}:${random}`;

  const app = initializeApp(firebaseConfig, appName);

  return app;
}
