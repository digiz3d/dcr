import { pdf, Document, View, Text, Page, Image } from '@react-pdf/renderer'
import { save } from '@tauri-apps/api/dialog'
import { writeBinaryFile } from '@tauri-apps/api/fs'
import { MedicalFile } from '../types'

export async function generatePdf(file: MedicalFile) {
  const path = await save({
    title: 'Enregistrer le document',
    defaultPath: './document.pdf',
    filters: [{ name: 'document.pdf', extensions: ['pdf'] }],
  })

  const doc = await pdf(
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
    </Document>,
  ).toBlob()

  await writeBinaryFile(path, await doc.arrayBuffer())
}
