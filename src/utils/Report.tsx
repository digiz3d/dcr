import { Document, Image, Page, Text, View } from '@react-pdf/renderer'
import { MedicalFile } from '../types'

type Props = { file: MedicalFile }

export default function renderPdf({ file }: Props) {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text>Section #1</Text>
        </View>
        <View>
          <Text>Section #2</Text>
        </View>
        {file.photo && <Image source={file.photo} />}
      </Page>
    </Document>
  )
}
