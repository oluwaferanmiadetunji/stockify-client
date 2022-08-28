import { useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import UploadIcon from '@mui/icons-material/Upload'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import DialogTitle from '@mui/material/DialogTitle'
import styles from './styles'
import Tooltip from '@mui/material/Tooltip'
import EditIcon from '@mui/icons-material/Edit'
import { makeUpdateProductRequest } from 'api/products'
import { useAppDispatch } from 'redux-store/hooks'
import LoadingButton from '@mui/lab/LoadingButton'
import { Form, Upload, Modal, message } from 'antd'
import { storageRef } from 'utils/firebase'
import { getBase64 } from 'utils/helpers'
import { toast } from 'react-toast'

const UpdateProductImage = ({ initialState, update }: any) => {
  const [state, setState] = useState(initialState)
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const [loading, setLoading] = useState(false)

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

  const handleChange = ({ fileList }: any) =>
    setFileList(fileList.filter((file: any) => file.status !== 'error'))

  const onRemove = async (file: any) => {
    const index = fileList.indexOf(file)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)

    setFileList(newFileList)
  }

  const onSubmit = async (event: { preventDefault: () => void }) => {
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

    const response = await makeUpdateProductRequest(
      state?.id,
      payload,
      dispatch,
    )
    setState(response)
    update(response)
    setLoading(false)
    handleClose()
  }

  return (
    <Box>
      <Tooltip title="Edit Product Image" onClick={handleClickOpen}>
        <EditIcon sx={styles.updateImageIcon} />
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'}>
        <DialogTitle>Upload Product Image</DialogTitle>
        <DialogContent>
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
        </DialogContent>

        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={onSubmit}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UpdateProductImage
