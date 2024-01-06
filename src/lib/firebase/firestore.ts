import {
    collection,
    onSnapshot,
    query,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    orderBy,
    Timestamp,
    runTransaction,
    where,
    addDoc,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import { generateKeywords } from "@/lib/strings";

export async function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged((user) => {
            unsubscribe();
            console.log("currentUser", user);
            if (user) {
                getUser(user.uid).then(resolve, reject);
            } else {
                resolve(null);
            }
        });
    });
    console.log({ auth });
    const user = auth.currentUser;
    console.log("currentUser", user);
    if (user?.uid) {
        console.log("fetching user doc");
        const userDoc = await getUser(user.uid);
        return userDoc;
    }
    return null;
}

export async function getUser(uid: string) {
    const userDoc = (await getDoc(doc(db, "users", uid))).data();
    return userDoc;
}

export type CreateUser = {
    id: string;
    fullName: string;
    username: string;
    email: string;
    imageUrl: string;
};

export async function verifyUsername(username: string) {
    const querySnapshot = await getDocs(
        query(collection(db, "users"), where("username", "==", username))
    );
    if (!querySnapshot.empty) {
        throw new Error("Username already exists");
    }
}

export async function createUser({
    fullName,
    email,
    id,
    username,
    imageUrl,
}: CreateUser) {
    await verifyUsername(username);
    const keywordsForLookup = Array.from(
        new Set([...generateKeywords(fullName), ...generateKeywords(username)])
    );
    const userData = {
        id,
        fullName,
        username,
        email,
        followerCount: 0,
        followingCount: 0,
        bio: "",
        profilePicRef: "",
        profileLink: "",
        keywordsForLookup,
    };
    return addDoc(collection(db, "users"), userData);
}
