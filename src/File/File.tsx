import { PDFViewer } from '@react-pdf/renderer'
import useSettings from '../Settings/use-settings'
import type { MedicalFile } from '../types'
import Report from '../utils/Report'
import Photo from './Photo'

import Teeth from './Teeth'
import TeethTests from './TeethTests'

export default function File({
  file,
  onChange,
}: {
  file: MedicalFile
  onChange: (file: Partial<MedicalFile>) => void
}) {
  const [, settings] = useSettings()
  return (
    <div className="flex flex-col gap-4 p-2 bg-white m-2 ml-0 w-full rounded-md">
      <label>
        Dentiste
        <input
          className="block p-1 border border-gray-500"
          type="text"
          value={file.dentistName}
          onChange={(e) => onChange({ dentistName: e.target.value })}
        />
      </label>

      <label>
        Ville dentiste
        <input
          className="block p-1 border border-gray-500"
          type="text"
          value={file.dentistCity}
          onChange={(e) => onChange({ dentistCity: e.target.value })}
        />
      </label>

      <fieldset className="border p-2">
        <legend>Genre</legend>
        <div>
          <input
            className="cursor-pointer"
            type="radio"
            id="homme"
            name="drone"
            value="m"
            checked={file.gender === 'm'}
            onChange={(e) => onChange({ gender: 'm' })}
          />
          <label className="pl-2 cursor-pointer" htmlFor="homme">
            Homme
          </label>
        </div>

        <div>
          <input
            className="cursor-pointer"
            type="radio"
            id="femme"
            name="drone"
            value="f"
            checked={file.gender === 'f'}
            onChange={(e) => onChange({ gender: 'f' })}
          />
          <label className="pl-2 cursor-pointer" htmlFor="femme">
            Femme
          </label>
        </div>
      </fieldset>

      <label>
        Prénom
        <input
          className="block p-1 border border-gray-500"
          type="text"
          value={file.patientFirstName}
          onChange={(e) => onChange({ patientFirstName: e.target.value })}
        />
      </label>

      <label>
        Nom
        <input
          className="block p-1 border border-gray-500"
          type="text"
          value={file.patientLastName}
          onChange={(e) => onChange({ patientLastName: e.target.value })}
        />
      </label>

      <label>
        Date de naissance
        <input
          className="block p-1 border border-gray-500"
          type="date"
          defaultValue={file.birthDate.toISOString().split('T')[0]}
          onChange={(e) => {
            const validDate = new Date(e.target.value)
            if (isNaN(validDate.getTime())) return
            onChange({ birthDate: validDate })
          }}
        />
      </label>

      <Teeth file={file} onChange={onChange} />

      <hr />

      <label>
        Antécédents médicaux
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ anteriorMedical: e.target.value })}
          value={file.anteriorMedical}
        />
      </label>

      <label>
        Medicaments
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ medications: e.target.value })}
          value={file.medications}
        />
      </label>

      <label>
        Allergies
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ allergies: e.target.value })}
          value={file.allergies}
        />
      </label>

      <label>
        Historique dentaire
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ anamnesis: e.target.value })}
          value={file.anamnesis}
        />
      </label>

      <hr />

      <label>
        Examen clinique
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ clinicalExam: e.target.value })}
          value={file.clinicalExam}
        />
      </label>

      <TeethTests file={file} onChange={onChange} />

      <hr />

      <Photo file={file} onChange={onChange} />

      <label>
        Examen radiographique RA
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ radioExamRA: e.target.value })}
          value={file.radioExamRA}
        />
      </label>

      <label>
        Examen radiographique CBCT
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ radioExamCBCT: e.target.value })}
          value={file.radioExamCBCT}
        />
      </label>

      <hr />

      <label>
        Diagnostic
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ diagnostic: e.target.value })}
          value={file.diagnostic}
        />
      </label>

      <hr />

      <label>
        Traitement envisagé
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ treatment: e.target.value })}
          value={file.treatment}
        />
      </label>
      <div
        className="inline-block font-bold p-5 self-center rounded-3xl cursor-pointer bg-indigo-200 text-indigo-900"
        onClick={async () => {
          if (!settings) return alert('nooo')
          const { generatePdf } = await import('../utils/generatePdf')
          await generatePdf(file, settings)
        }}
      >
        Sauvegarder PDF
      </div>
      {process.env.NODE_ENV !== 'production' && settings && (
        <PDFViewer className="h-[1000px]">
          <Report file={file} settings={settings} />
        </PDFViewer>
      )}
    </div>
  )
}
