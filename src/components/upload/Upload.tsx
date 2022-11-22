import { useState, useRef, useCallback } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CircularProgressWithLabel from './Label'
import firebase from 'utils/firebase'
import { useDropzone } from 'react-dropzone'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import XMLHttpRequest from 'xhr2'

const storageRef = firebase.storage().ref()

const UploadArea = ({
  setImageURL,
}: {
  setImageURL: (value: string) => void
}) => {
  const [isUploadActive, setIsUploadActive] = useState(false)
  const [uploadProgressPercent, setUploadProgressPercent] = useState(0)
  const [file, setFile] = useState<any>(null)

  const [image, setImage] = useState('')

  const xhr = useRef(new XMLHttpRequest())

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      const uploadFile = async (file: any) => {
        const progressHandler = (event: any) => {
          setUploadProgressPercent(
            Math.floor((event.loaded / event.total) * 100),
          )
        }

        const completeHandler = () => {
          setUploadProgressPercent(100)
        }

        const errorHandler = () => {
          setIsUploadActive(false)
          setUploadProgressPercent(100)
          setUploadProgressPercent(0)
        }

        const abortHandler = () => {
          setIsUploadActive(false)
          setUploadProgressPercent(0)
        }

        xhr.current.upload.addEventListener('progress', progressHandler)

        xhr.current.addEventListener('error', errorHandler)
        xhr.current.addEventListener('abort', abortHandler)

        setUploadProgressPercent(1)

        //https://firebasestorage.googleapis.com/v0/b/symmetrical-chainsaw.appspot.com/o/uploads%2Fimages%2F1669109182636-image.png?alt=media
        const fileName = `uploads/images/${Date.now()}-${file.name}`
        const fileRef = storageRef.child(fileName)
        try {
          const designFile = await fileRef.put(file.originFileObj)
          const res = await designFile.ref.getDownloadURL()
          setImage(res)

          setImageURL(res)
        } catch (e) {
          return
        }

        if (image != '') {
          completeHandler()
        } else {
          errorHandler()
        }
      }

      if (acceptedFiles.length) {
        setFile(acceptedFiles[0])
        setIsUploadActive(true)
        await uploadFile(acceptedFiles[0])
      }
    },
    [image, setImageURL],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxFiles: 1,
  })

  const wrapperProps = {
    sx: {
      borderWidth: isDragActive ? '2px' : '1px',
      borderStyle: 'dashed',
      borderColor: isDragActive ? 'primary.700' : 'gray.600',
      borderRadius: '8px',
      cursor: isUploadActive ? 'auto' : 'pointer',
      position: 'relative',
      minHeight: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: 5,
    },
  }

  return (
    <Box>
      <Box {...(isUploadActive ? wrapperProps : getRootProps(wrapperProps))}>
        <Box // Drag active overlay
          sx={{
            display: isDragActive ? 'block' : 'none',
            position: 'absolute',
            borderRadius: 'inherit',
            backgroundColor: 'primary.700',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: '30%',
          }}
        />
        <input {...getInputProps()} />

        {isUploadActive ? (
          <Box // Upload progress info
            sx={{
              textAlign: 'center',
            }}
          >
            <CircularProgressWithLabel value={uploadProgressPercent} />
            <Typography
              sx={{
                color: '#000',
                fontWeight: 600,
                fontSize: '18px',
                mt: 2,
                lineHeight: '1em',
              }}
            >
              {uploadProgressPercent < 100
                ? `Uploading "${file.name}"...`
                : `"${file.name}" uploaded.`}
            </Typography>
            {uploadProgressPercent < 100 && (
              <Button
                sx={{
                  fontSize: '12px',
                  backgroundColor: 'gray.100',
                  mt: 5,
                  px: 3,
                }}
                onClick={() => xhr.current.abort()}
              >
                Cancel
              </Button>
            )}
          </Box>
        ) : (
          <Box // Upload Instruction
            sx={{
              '& svg': {
                color: 'white',
              },
              textAlign: 'center',
            }}
          >
            <FileUploadIcon />
            <Typography
              sx={{
                color: '#fff',
                fontWeight: 600,
                fontSize: '12px',
                mt: 2,
              }}
            >
              Drag in a file or click here to browse.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default UploadArea
