import { FC } from 'react'
import Document from './Document'
import Page from './Page'
import View from './View'
import Text from './Text'
import { CompanyDetails } from 'utils/constants'
import { Font } from '@react-pdf/renderer'

Font.register({
  family: 'Nunito',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf' },
    {
      src:
        'https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf',
      fontWeight: 600,
    },
  ],
})

interface Props {
  data?: any
  pdfMode?: boolean
}

const InvoicePage: FC<Props> = ({ data, pdfMode }) => {
  return (
    <Document pdfMode={pdfMode}>
      <Page className="invoice-wrapper" pdfMode={pdfMode}>
        <View className="flex_spacing w-100" pdfMode={pdfMode}>
          <View className="w-40" pdfMode={pdfMode}>
            <Text
              pdfMode={pdfMode}
              className="fs-20 bold"
            >{`From: ${CompanyDetails.name}`}</Text>
            <Text
              pdfMode={pdfMode}
              className="fs-14"
            >{`Phone: ${CompanyDetails.phone}`}</Text>
            <Text
              pdfMode={pdfMode}
              className="fs-14"
            >{`Email: ${CompanyDetails.email}`}</Text>
            <Text
              pdfMode={pdfMode}
              className="fs-14"
            >{`Address: ${CompanyDetails.address}`}</Text>
            <Text
              pdfMode={pdfMode}
              className="fs-14"
            >{`Twitter: ${CompanyDetails.twitter}`}</Text>
            <Text
              pdfMode={pdfMode}
              className="fs-14"
            >{`Instagram: ${CompanyDetails.instagram}`}</Text>
          </View>

          <View className="w-60 right" pdfMode={pdfMode}>
            <Text pdfMode={pdfMode} className="fs-16 bold">
              #DNS215227834Z
            </Text>

            <Text pdfMode={pdfMode} className="fs-16 bold">
              Labore aut deleniti
            </Text>
            <Text pdfMode={pdfMode} className="fs-16 bold">
              Jan 22, 2022
            </Text>
            <Text pdfMode={pdfMode} className="fs-16 bold">
              Oct 23, 2022
            </Text>
          </View>
        </View>

        <View className="w-100 mt-10" pdfMode={pdfMode}>
          <Text
            pdfMode={pdfMode}
            className="fs-20 bold"
          >{`To: Ali Vasquez`}</Text>
          <Text
            pdfMode={pdfMode}
            className="fs-14"
          >{`Phone: +1 (241) 586-2132`}</Text>
          <Text
            pdfMode={pdfMode}
            className="fs-14"
          >{`Email: hysywaso@mailinator.com`}</Text>
        </View>

        <View className="mt-30 bg-dark flex" pdfMode={pdfMode}>
          <View className="w-48 p-4-8" pdfMode={pdfMode}>
            <Text pdfMode={pdfMode} className="fs-16 bold white">
              Items
            </Text>
          </View>

          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <Text pdfMode={pdfMode} className="fs-16 bold white">
              Qty
            </Text>
          </View>

          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <Text pdfMode={pdfMode} className="fs-16 bold white">
              Price
            </Text>
          </View>

          <View className="w-18 p-4-8" pdfMode={pdfMode}>
            <Text pdfMode={pdfMode} className="fs-16 bold white">
              Total
            </Text>
          </View>
        </View>

        {['', '', ''].map((_, i) => {
          return (
            <View key={i} className="row flex" pdfMode={pdfMode}>
              <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
                <Text pdfMode={pdfMode} className="fs-14 dark">
                  iPhone 12
                </Text>
              </View>

              <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                <Text pdfMode={pdfMode} className="fs-14 dark">
                  1
                </Text>
              </View>

              <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                <Text pdfMode={pdfMode} className="fs-14 dark">
                  120
                </Text>
              </View>
              <View className="w-18 p-4-8 pb-10" pdfMode={pdfMode}>
                <Text pdfMode={pdfMode} className="dark">
                  1200
                </Text>
              </View>
            </View>
          )
        })}

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-50 mt-20" pdfMode={pdfMode}>
            <View className="flex bg-gray p-5" pdfMode={pdfMode}>
              <View className="w-50 p-5" pdfMode={pdfMode}>
                <Text pdfMode={pdfMode} className="dark bold fs-20">
                  Total
                </Text>
              </View>
              <View className="w-50 p-5 flex" pdfMode={pdfMode}>
                <Text pdfMode={pdfMode} className="dark bold fs-20">
                  12000
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-20" pdfMode={pdfMode}>
          <Text pdfMode={pdfMode} className="fs-14 bold">
            Notes:
          </Text>
          <Text pdfMode={pdfMode} className="fs-14 w-100">
            Dolore tenetur aut sDolore tenetur aut sDolore tenetur aut sDolore
            tenetur aut sDolore tenetur aut sDolore tenetur aut sDolore tenetur
            aut sDolore tenetur aut sDolore tenetur aut sDolore tenetur aut
            sDolore tenetur aut sDolore tenetur aut
          </Text>
        </View>
      </Page>
    </Document>
  )
}

export default InvoicePage
