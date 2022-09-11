import { pdf, Document, View, Text, Page } from '@react-pdf/renderer'
import { save } from '@tauri-apps/api/dialog'
import { writeBinaryFile } from '@tauri-apps/api/fs'

export async function generatePdf() {
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
      </Page>
    </Document>,
  ).toBlob()

  await writeBinaryFile(path, await doc.arrayBuffer())
}
