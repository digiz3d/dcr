import { MedicalFile } from '../types'
import { teethToString } from './Report'

import { writeText, readText } from '@tauri-apps/api/clipboard'

export async function ClipboardDesmosOutput(file: MedicalFile) {
  let res: string = ''
  res += file.gender == 'm' ? 'Patient adressé' : 'Patiente adressée'
  res +=
    ' par le Dr ' +
    file.dentistName +
    ' (' +
    file.dentistCity +
    ') pour ' +
    teethToString(file.teeth) +
    '\n'

  res += '\n'

  res += 'Anamnèse :\n'
  res += 'Antécédents médicaux : ' + file.anteriorMedical + '\n'
  res += 'Médicaments : ' + file.medications + '\n'
  res += 'Allergies : ' + file.allergies + '\n'

  res += '\n'

  res += 'Examen clinique\n' + file.clinicalExam + '\n\n'

  file.teeth.map((x) => {
    res += x.id + ' - '
    if (x.thermicTest != '/' || x.electricTest != '/') {
      res +=
        'Tests de sensibilité pulpaire :\n' +
        (x.thermicTest == '/'
          ? ''
          : 'Test thermique : ' + x.thermicTest + '\n') +
        (x.electricTest == '/'
          ? ''
          : 'Test électrique : ' + x.electricTest + '\n')
    }

    res += 'Test de percussion : ' + x.percutionTest + '\n'
    res += 'Test palpation vestibulaire : ' + x.palpationTestV + '\n'
    res += 'Test palpation lingual : ' + x.palpationTestL + '\n'
    res += 'Sondage parodontal : ' + x.parodontalProbing + '\n'
    res +=
      'Mobilité : ' +
      (x.mobility == 'NE' ? 'Non évaluable' : x.mobility) +
      '\n\n'
  })

  res += '\n'
  res += 'Examen radiographique rétro-alvéolaire :\n' + file.radioExamRA + '\n'
  res += '\n'
  res += 'Examen radiographique CBCT :\n' + file.radioExamCBCT + '\n'
  res += '\n'
  res += 'Diagnostic :\n' + file.diagnostic + '\n'
  res += '\n'
  res += 'Attitude thérapeutique :\n' + file.treatment

  res += '\n\n'
  res += file.comment

  await writeText(res)
}
