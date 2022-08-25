import { toast } from 'react-toast'

import { storage } from 'utils/firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { generateImageTag } from 'utils/helpers'

export const saveFileRequest = async (file: any) => {
  let imageURL = ''

  try {
    const storageRef = ref(storage, generateImageTag())
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      () => {},
      (err) => {
        toast.error('Error uploading file!')
        return null
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          toast.success('File uploaded successfully')
          // imageURL = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${url}?alt=media`
          imageURL = url
        })
      },
    )

    return imageURL
  } catch (err) {
    //@ts-ignore
    toast.error('Error uploading file: ', err)
  }
}
