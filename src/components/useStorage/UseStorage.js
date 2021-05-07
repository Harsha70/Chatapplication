// import {useState, useEffect} from 'react'
// import { useAuthState } from 'react-firebase-hooks/auth'
import {projectStorage, firestore} from "../../firebase/firebase"
import firebase from '../../firebase/firebase'

const UseStorage = (file, auth, roomId) => {
    // const [progress, setprogress] = useState(0)
    // const [error, seterror] = useState(null)
    // const [url, seturl] = useState(null)
    
    // const [user] = useAuthState(auth);
    // console.log(user)

    let progress=''
    let error=''
    let url = ''

    // useEffect(() => {
        // References
        const storageRefs = projectStorage.ref(file.name)
        // console.log("storageRefs", storageRefs)
        // const collectionRef = firestore.collection('images');
        const collectionRef = roomId !== "" ? firestore.collection(`/rooms/${roomId}/messages/`) 
        : firestore.collection(`/rooms/EHJjafIsOKJPG0yfYYEh/messages/`);

        storageRefs.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            console.log(percentage)
            // setprogress(percentage);
        }, (err) => {
            // seterror(err);
          }, async () => {
            const url = await storageRefs.getDownloadURL();

            const { uid, photoURL } = auth.currentUser;

            await collectionRef.add({
                text: '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL,
                url});
            // seturl(url);
          })
    // }, [file, roomId])

    return { progress, url, error };
}

export default UseStorage
