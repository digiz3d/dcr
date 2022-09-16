import { pdf, Document, View, Text, Page, Image } from '@react-pdf/renderer'
import { save } from '@tauri-apps/api/dialog'
import { writeBinaryFile } from '@tauri-apps/api/fs'
import { MedicalFile } from '../types'
import renderPdf from './Report'

export async function generatePdf(file: MedicalFile) {
  const path = await save({
    title: 'Enregistrer le document',
    defaultPath: './document.pdf',
    filters: [{ name: 'document.pdf', extensions: ['pdf'] }],
  })

  const doc = await pdf(renderPdf({ file })).toBlob()

  await writeBinaryFile(path, await doc.arrayBuffer())
}
