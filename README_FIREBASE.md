Firebase integration (free tier) — setup instructions
1. Create a Firebase project at https://console.firebase.google.com/
2. In Project Settings -> Your apps -> Add web app. Copy the config object.
3. Enable Authentication -> Email/Password provider.
4. Enable Firestore (start in test mode for now) and Storage bucket.
5. In this repo, open `/assets/js/firebase.js` and replace the `window.firebaseConfig` placeholders with your config values.
6. Optional: Create an admin user manually in Firebase Auth (Authentication -> Users) with email/password.
7. To upload resources from Admin: Stage files in Admin -> Resources, then use "Upload to Firebase" to push files to Storage and save metadata to Firestore.
8. Contact form will save to Firestore if configured; otherwise it uses Formspree fallback.
9. Deploy: push repo to GitHub. GitHub Pages serves the frontend; Firebase handles auth, DB, and storage client-side.
Notes:
- Firebase free tier is sufficient for personal projects. Monitor usage in Firebase Console to avoid overages.
- For production, tighten Firestore security rules and restrict who can write to resources/messages collections.
Build timestamp: 2025-08-16T07:11:20.676266
