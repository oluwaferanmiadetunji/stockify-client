import { FC } from 'react'
import Document from './Document'
import Page from './Page'
import View from './View'
import Text from './Text'
import dayjs from 'dayjs'
import { renderPrice } from 'utils/helpers'
import { useSession } from 'next-auth/react'

interface Props {
  data?: any
  pdfMode?: boolean
}

const InvoicePage: FC<Props> = ({ data, pdfMode }) => {
  const { data: session } = useSession()
  const user: any = session?.user

  const CompanyDetails = user?.company

  const getTotalPrice = (items: any[]) => {
    let sum = 0

    for (let i = 0; i < items.length; i++) {
      sum += items[i].qty * items[i].sellPrice
    }

    return renderPrice(sum)
  }

  return (
    <Document pdfMode={pdfMode}>
      <Page className="invoice-wrapper" pdfMode={pdfMode}>
        <View className="flex_spacing w-100" pdfMode={pdfMode}>
          <View className="w-40" pdfMode={pdfMode}>
            <Text
              pdfMode={pdfMode}
              className="fs-20 bold"
            >{`From: ${CompanyDetails?.name}`}</Text>
            <Text
              pdfMode={pdfMode}
              className="fs-14"
            >{`Phone: ${CompanyDetails?.phone}`}</Text>
            <Text
              pdfMode={pdfMode}
              className="fs-14"
            >{`Email: ${CompanyDetails?.email}`}</Text>
            <Text
              pdfMode={pdfMode}
              className="fs-14"
            >{`Address: ${CompanyDetails?.address}`}</Text>
            {CompanyDetails?.twitter && (
              <Text
                pdfMode={pdfMode}
                className="fs-14"
              >{`Twitter: ${CompanyDetails?.twitter}`}</Text>
            )}
            {CompanyDetails?.instagram && (
              <Text
                pdfMode={pdfMode}
                className="fs-14"
              >{`Instagram: ${CompanyDetails?.instagram}`}</Text>
            )}
          </View>

          <View className="w-60 right" pdfMode={pdfMode}>
            <Text pdfMode={pdfMode} className="fs-16 bold">
              Invoice Number: {data?.id}
            </Text>

            <Text pdfMode={pdfMode} className="fs-16 bold">
              Subject: {data?.subject}
            </Text>
            <Text pdfMode={pdfMode} className="fs-16 bold">
              Issued Date: {dayjs(data?.issuedDate).format('MMM D, YYYY HH:mm')}
            </Text>
            <Text pdfMode={pdfMode} className="fs-16 bold">
              Due Date: {dayjs(data?.dueDate).format('MMM D, YYYY HH:mm')}
            </Text>
          </View>
        </View>

        <View className="w-100 mt-10" pdfMode={pdfMode}>
          <Text
            pdfMode={pdfMode}
            className="fs-20 bold"
          >{`To: ${data?.customer?.name}`}</Text>
          <Text
            pdfMode={pdfMode}
            className="fs-14"
          >{`Phone: ${data?.customer?.phone}`}</Text>
          <Text
            pdfMode={pdfMode}
            className="fs-14"
          >{`Email: ${data?.customer?.email}`}</Text>
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

        {data?.items?.map((item: any, i: number) => {
          return (
            <View key={i} className="row flex" pdfMode={pdfMode}>
              <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
                <Text pdfMode={pdfMode} className="fs-14 dark">
                  {item?.name}
                </Text>
              </View>

              <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                <Text pdfMode={pdfMode} className="fs-14 dark">
                  {item?.qty}
                </Text>
              </View>

              <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                <Text pdfMode={pdfMode} className="fs-14 dark">
                  {renderPrice(item?.sellPrice)}
                </Text>
              </View>
              <View className="w-18 p-4-8 pb-10" pdfMode={pdfMode}>
                <Text pdfMode={pdfMode} className="dark">
                  {renderPrice(item?.qty * item?.sellPrice)}
                </Text>
              </View>
            </View>
          )
        })}

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-50 mt-20" pdfMode={pdfMode}>
            <View className="flex bg-gray p-2" pdfMode={pdfMode}>
              <View className="w-50 p-2" pdfMode={pdfMode}>
                <Text pdfMode={pdfMode} className="dark bold fs-20">
                  Total
                </Text>
              </View>

              <View className="w-50 p-2 flex" pdfMode={pdfMode}>
                <Text pdfMode={pdfMode} className="dark bold fs-20">
                  {getTotalPrice(data?.items || [])}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {data?.notes && (
          <View className="mt-20" pdfMode={pdfMode}>
            <Text pdfMode={pdfMode} className="fs-14 bold">
              Notes:
            </Text>
            <Text pdfMode={pdfMode} className="fs-14 w-100">
              {data?.notes}
            </Text>
          </View>
        )}
      </Page>
    </Document>
  )
}

export default InvoicePage
