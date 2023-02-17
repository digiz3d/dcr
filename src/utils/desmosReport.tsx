import { MedicalFile } from '../types'
import { teethToString } from './Report'

import { writeText, readText } from '@tauri-apps/api/clipboard'
import dayjs from 'dayjs'

export async function ClipboardDesmosOutput(file: MedicalFile) {
  let res: string = ''
  res += file.gender == 'm' ? 'Patient adressé' : 'Patiente adressée'
  res +=
    ' par le Dr ' +
    file.dentistName +
    ' (' +
    file.dentistCity +
    ') pour ' +
    teethToString(file.teeth)

  res +=
    ' ' +
    (file.hasAddressingDate == 'true'
      ? `(Courrier datant du ${dayjs(file.fileDate).format('DD/MM/YYYY')})`
      : "(Pas de courrier d'adressage)")

  res += '\n\n'

  res += 'Anamnèse :\n'
  res += 'Antécédents médicaux : ' + file.anteriorMedical + '\n'
  res += 'Médicaments : ' + file.medications + '\n'
  res += 'Allergies : ' + file.allergies + '\n'

  res += '\n'

  res += 'Examen clinique :\n' + file.clinicalExam + '\n\n'

  res += file.teeth
    .filter((x) => {
      return x.restoration != '' || x.underMicroscope != ''
    })
    .map((x) => {
      let res = ''
      if (file.teeth.length > 1) res += `- ${x.id} - \n`
      if (x.restoration != '') res += `Restauration : ${x.restoration}\n`
      if (x.underMicroscope != '')
        res += `Sous microscope : ${x.underMicroscope}\n`
      return res
    })

  res += '\n'

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
  if (file.radioExamRA != '') {
    res +=
      'Examen radiographique rétro-alvéolaire :\n' + file.radioExamRA + '\n'
    res += '\n'
  }
  if (file.radioExamCBCT != '') {
    res += 'Examen radiographique CBCT :\n' + file.radioExamCBCT + '\n'
    res += '\n'
  }
  if (file.diagnostic != '') {
    res += 'Diagnostic :\n' + file.diagnostic + '\n'
    res += '\n'
  }
  if (file.treatment != '') {
    res += 'Attitude thérapeutique :\n' + file.treatment + '\n'
    res += '\n'
  }
  res += file.comment

  await writeText(res)
}
