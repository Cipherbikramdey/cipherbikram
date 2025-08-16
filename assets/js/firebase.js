// Firebase client setup (fill with your Firebase project config)
/* Steps:
 1. Go to Firebase Console -> Project Settings -> Add web app -> copy config object
 2. Replace the placeholders below (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId)
 3. Enable Authentication (Email/Password), Firestore and Storage in Firebase console.
*/

window.firebaseConfig = {
  apiKey: "AIzaSyBAjTFq0DpQbXZX9841oGccpNOIgNpzaIg",
  authDomain: "cipherbikramdey.firebaseapp.com",
  projectId: "cipherbikramdey",
  storageBucket: "cipherbikramdey.firebasestorage.app",
  messagingSenderId: "981013714495",
  appId: "1:981013714495:web:8e15572006bddd31568a8a",
  measurementId: "G-2FXKKNEX53"
};

// load firebase SDKs dynamically when needed
function loadFirebaseSDKs() {
  if (window.firebase && window.firebase.apps && window.firebase.apps.length) return Promise.resolve(window.firebase);
  return new Promise((resolve, reject) => {
    const s1 = document.createElement('script');
    s1.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
    s1.onload = () => {
      const s2 = document.createElement('script');
      s2.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js';
      s2.onload = () => {
        const s3 = document.createElement('script');
        s3.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js';
        s3.onload = () => {
          const s4 = document.createElement('script');
          s4.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js';
          s4.onload = () => resolve(window.firebase);
          s4.onerror = reject;
          document.head.appendChild(s4);
        };
        s3.onerror = reject;
        document.head.appendChild(s3);
      };
      s2.onerror = reject;
      document.head.appendChild(s2);
    };
    s1.onerror = reject;
    document.head.appendChild(s1);
  });
}

async function initFirebaseIfConfigured(){
  if(!window.firebaseConfig || window.firebaseConfig.apiKey.startsWith('REPLACE')) return null;
  await loadFirebaseSDKs();
  window.firebase.initializeApp(window.firebaseConfig);
  window.__fbAuth = window.firebase.auth();
  window.__fbDB = window.firebase.firestore();
  window.__fbStorage = window.firebase.storage();
  return {auth: window.__fbAuth, db: window.__fbDB, storage: window.__fbStorage};
}

// helper: create user with email+password
async function firebaseSignUp(email, password, displayName){
  await initFirebaseIfConfigured();
  const userCred = await window.__fbAuth.createUserWithEmailAndPassword(email, password);
  if(displayName) await userCred.user.updateProfile({displayName});
  return userCred.user;
}

// helper: sign in
async function firebaseSignIn(email, password){
  await initFirebaseIfConfigured();
  return window.__fbAuth.signInWithEmailAndPassword(email, password);
}

// helper: sign out
async function firebaseSignOut(){
  if(window.__fbAuth) return window.__fbAuth.signOut();
}

// upload file to storage, returns download URL
async function firebaseUploadFile(path, file, onProgress){
  await initFirebaseIfConfigured();
  const ref = window.__fbStorage.ref().child(path);
  const uploadTask = ref.put(file);
  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', (snap) => {
      if(onProgress) onProgress((snap.bytesTransferred/snap.totalBytes)*100);
    }, reject, async () => {
      const url = await uploadTask.snapshot.ref.getDownloadURL();
      resolve(url);
    });
  });
}

// save contact message to Firestore
async function firebaseSaveMessage(obj){
  await initFirebaseIfConfigured();
  const docRef = await window.__fbDB.collection('messages').add(Object.assign({created: window.firebase.firestore.FieldValue.serverTimestamp()}, obj));
  return docRef.id;
}

// save resource metadata
async function firebaseSaveResource(meta){
  await initFirebaseIfConfigured();
  const docRef = await window.__fbDB.collection('resources').add(Object.assign({created: window.firebase.firestore.FieldValue.serverTimestamp()}, meta));
  return docRef.id;
}
