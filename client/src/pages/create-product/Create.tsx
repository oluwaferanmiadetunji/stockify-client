import { useState, Fragment } from 'react'
import Layout from 'components/layout'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import styles from './styles'
import { initialState } from './constants'
import AddProductDetailsForm from './AddProductForm'
import UploadImage from './UploadImage'

const CreateProduct = () => {
  const [step, setStep] = useState(0)

  const [state, setState] = useState(initialState)

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const onNext = () => {
    setStep(1)
  }

  return (
    <Layout>
      <Box sx={styles.container}>
        <Box sx={styles.stepper}>
          {step === 0 && (
            <Fragment>
              <AddProductDetailsForm
                state={state}
                handleChange={handleChange}
              />

              <Stack direction="row" spacing={2} sx={styles.buttons}>
                <Button variant="contained" onClick={onNext}>
                  Next
                </Button>
              </Stack>
            </Fragment>
          )}

          {step === 1 && (
            <UploadImage state={state} setState={setState} setStep={setStep} />
          )}
        </Box>
      </Box>
    </Layout>
  )
}

export default CreateProduct
