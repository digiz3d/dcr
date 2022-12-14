import { pdf } from '@react-pdf/renderer'
import { save } from '@tauri-apps/api/dialog'
import { writeBinaryFile } from '@tauri-apps/api/fs'

import Report from './Report'

import { MedicalFile, Settings } from '../types'

export async function generatePdf(file: MedicalFile, settings: Settings) {
  const path = await save({
    title: 'Enregistrer le document',
    defaultPath: './document.pdf',
    filters: [{ name: 'document.pdf', extensions: ['pdf'] }],
  })

  const doc = await pdf(Report({ file, settings })).toBlob()

  await writeBinaryFile(path, await doc.arrayBuffer())
}
