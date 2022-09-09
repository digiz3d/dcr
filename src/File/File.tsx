import { Document, Page, PDFViewer, Text, View } from '@react-pdf/renderer'

import { MedicalFile } from '../types'

import './File.css'
import Teeth from './Teeth/Teeth'
import TeethTests from './TeethTests/TeethTests'

export default function File({
  file,
  onChange,
}: {
  file: MedicalFile
  onChange: (newMedicalFile: MedicalFile) => void
}) {
  return (
    <div className="file-form">
      <fieldset>
        <legend>Genre</legend>
        <div>
          <input
            type="radio"
            id="homme"
            name="drone"
            value="m"
            checked={file.gender === 'm'}
            onChange={(e) => onChange({ ...file, gender: 'm' })}
          />
          <label htmlFor="homme">Homme</label>
        </div>

        <div>
          <input
            type="radio"
            id="femme"
            name="drone"
            value="f"
            checked={file.gender === 'f'}
            onChange={(e) => onChange({ ...file, gender: 'f' })}
          />
          <label htmlFor="femme">Femme</label>
        </div>
      </fieldset>

      <label>
        Prénom
        <input
          type="text"
          value={file.patientFirstName}
          onChange={(e) =>
            onChange({ ...file, patientFirstName: e.target.value })
          }
        />
      </label>

      <label>
        Nom
        <input
          type="text"
          value={file.patientLastName}
          onChange={(e) =>
            onChange({ ...file, patientLastName: e.target.value })
          }
        />
      </label>

      <label>
        Date de naissance
        <input
          type="date"
          value={new Date().toISOString().split('T')[0]}
          onChange={(e) =>
            onChange({ ...file, birthDate: new Date(e.target.value) })
          }
        />
      </label>

      <Teeth file={file} onChange={onChange} />

      <hr />

      <label>
        Antécédents médicaux
        <textarea
          onChange={(e) =>
            onChange({ ...file, anteriorMedical: e.target.value })
          }
        >
          {file.anteriorMedical}
        </textarea>
      </label>

      <label>
        Medicaments
        <textarea
          onChange={(e) => onChange({ ...file, medications: e.target.value })}
        >
          {file.medications}
        </textarea>
      </label>

      <label>
        Allergies
        <textarea
          onChange={(e) => onChange({ ...file, allergies: e.target.value })}
        >
          {file.allergies}
        </textarea>
      </label>

      <label>
        Historique dentaire
        <textarea
          onChange={(e) => onChange({ ...file, anamnesis: e.target.value })}
        >
          {file.anamnesis}
        </textarea>
      </label>

      <hr />

      <label>
        Examen clinique
        <textarea
          onChange={(e) => onChange({ ...file, clinicalExam: e.target.value })}
        >
          {file.clinicalExam}
        </textarea>
      </label>

      <TeethTests file={file} onChange={onChange} />

      <hr />

      <label>
        Examen radiographique RA
        <textarea
          onChange={(e) => onChange({ ...file, radioExamRA: e.target.value })}
        >
          {file.radioExamRA}
        </textarea>
      </label>

      <label>
        Examen radiographique CBCT
        <textarea
          onChange={(e) => onChange({ ...file, radioExamCBCT: e.target.value })}
        >
          {file.radioExamCBCT}
        </textarea>
      </label>

      <hr />

      <label>
        Diagnostic
        <textarea
          onChange={(e) => onChange({ ...file, diagnostic: e.target.value })}
        >
          {file.diagnostic}
        </textarea>
      </label>

      <hr />

      <label>
        Traitement envisagé
        <textarea
          onChange={(e) => onChange({ ...file, treatment: e.target.value })}
        >
          {file.treatment}
        </textarea>
      </label>
      <PDFViewer showToolbar>
        <Document>
          <Page size="A4">
            <View>
              <Text>ok</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  )
}
