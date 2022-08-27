import { useState } from 'react'
import { Form, Upload, Modal, message } from 'antd'
import { storageRef } from 'utils/firebase'
import { getBase64 } from 'utils/helpers'
import styles from './styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import UploadIcon from '@mui/icons-material/Upload'
import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useAppDispatch } from 'redux-store/hooks'
import { makeAddNewProductRequest } from 'api/products'
import { initialState } from './constants'
import { toast } from 'react-toast'

const FileUpload = ({ state, setState, setStep }: any) => {
  const [fileList, setFileList] = useState<any>([])

  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState(false)

  const { Dragger } = Upload

  const handleCancel = () => setPreviewVisible(false)

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    )
  }

  const beforeUpload = (file: any) => {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      message.error(`${file.name} is not a valid image type`, 2)
      return null
    }
    return false
  }
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const callback = () => {
    setState(initialState)
    setStep(0)
  }

  const handleChange = ({ fileList }: any) =>
    setFileList(fileList.filter((file: any) => file.status !== 'error'))

  const onRemove = async (file: any) => {
    const index = fileList.indexOf(file)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)

    setFileList(newFileList)
  }

  const onBack = () => {
    setStep(0)
  }

  const onSubmit = async (event: any): Promise<any> => {
    event.preventDefault()
    let image = ''

    setLoading(true)
    try {
      await Promise.all(
        fileList.map(async (file: any) => {
          const fileName = `uploads/images/${Date.now()}-${file.name}`
          const fileRef = storageRef.child(fileName)

          try {
            const designFile = await fileRef.put(file.originFileObj)
            image = await designFile.ref.getDownloadURL()

            toast.success('Image uploaded successfully')
          } catch (e) {
            toast.error('Error uploading product image.')
            return
          }
        }),
      )

      setFileList([])
    } catch (err) {
      toast.error(`Error uploading image.`)
      return
    }

    const payload = {
      ...state,
      image,
    }

    await makeAddNewProductRequest(payload, dispatch, callback)
    setLoading(false)
  }

  return (
    <Box>
      <Typography sx={styles.uploadText}>Upload Images</Typography>

      <Form>
        <Box>
          <Dragger
            listType="picture-card"
            fileList={fileList}
            //@ts-ignore
            beforeUpload={beforeUpload}
            onPreview={handlePreview}
            onChange={handleChange}
            onRemove={onRemove}
            multiple={false}
            maxCount={1}
          >
            <UploadIcon />

            <Typography>Click here to upload</Typography>
          </Dragger>
        </Box>
      </Form>

      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>

      <Stack direction="row" spacing={2} sx={styles.buttons}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>

        <LoadingButton loading={loading} variant="contained" onClick={onSubmit}>
          Submit
        </LoadingButton>
      </Stack>
    </Box>
  )
}

export default FileUpload
