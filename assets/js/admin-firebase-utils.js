// admin-firebase-utils.js
async function uploadStagedFilesToFirebase(){
  if(!window.__fbStorage){ alert('Firebase not configured. Fill firebaseConfig in /assets/js/firebase.js'); return; }
  const files = JSON.parse(localStorage.getItem('admin_files')||'[]');
  if(!files.length){ alert('No staged files'); return; }
  for(const f of files){
    // convert base64 back to blob
    const binary = Uint8Array.from(atob(f.content), c=>c.charCodeAt(0));
    const blob = new Blob([binary]);
    const path = 'resources/' + Date.now() + '_' + f.name;
    const url = await firebaseUploadFile(path, blob, pct => console.log('upload', pct));
    // save metadata to Firestore
    await firebaseSaveResource({name: f.name, size: f.size, url, path});
  }
  alert('Uploaded ' + files.length + ' files to Firebase Storage and saved metadata.');
  localStorage.removeItem('admin_files');
  location.reload();
}
