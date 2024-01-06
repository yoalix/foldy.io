import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  sendEmailVerification,
  NextOrObserver,
} from "firebase/auth";

import { FirebaseUser, auth } from "@/lib/firebase/firebase";
import { createUser, verifyUsername } from "./firestore";

export function onAuthStateChanged(cb: NextOrObserver<FirebaseUser>) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log("Error signing in with Google", error);
  }
}
export async function signInWithApple() {
  //   const provider = new AppleAuthProvider();
}
export async function signInWithFacebook() {}
export async function signInWithEmailAndPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const result = await _signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.log("Error signing in with email and password", error);
  }
}

export async function signUpWithEmailAndPassword({
  email,
  password,
  fullName,
  username,
}: {
  email: string;
  password: string;
  fullName: string;
  username: string;
}) {
  await verifyUsername(username);
  const result = await createUserWithEmailAndPassword(auth, email, password);
  if (result.user) {
    await sendEmailVerification(result.user);
    const user = await createUser({
      id: result.user.uid,
      fullName: fullName,
      email: result.user.email || "",
      username,
      imageUrl: "",
    });
    console.log("successfully created user");
    return user;
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.log("Error signing out with Google", error);
  }
}
