import { pdf } from '@react-pdf/renderer'
import { save } from '@tauri-apps/api/dialog'
import { writeBinaryFile } from '@tauri-apps/api/fs'

import ReportPdf from './Report'

import { MedicalFile } from '../types'
import { Settings } from '../state/settings'

export async function generatePdf(file: MedicalFile, settings: Settings) {
  const fileName =
    'Compte_Rendu_Consultation_' +
    file.patientFirstName +
    '_' +
    file.patientLastName

  const path = await save({
    title: 'Enregistrer le document',
    defaultPath: './' + fileName + '.pdf',
    filters: [{ name: fileName + '.pdf', extensions: ['pdf'] }],
  })

  const doc = await pdf(ReportPdf({ file, settings })).toBlob()

  await writeBinaryFile(path, await doc.arrayBuffer())
}
