import type { MedicalFile } from '../types'
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
  return (
    <div className="flex flex-col gap-4 p-2 bg-white m-2 ml-0 w-full rounded-md">
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
          value={file.birthDate.toISOString().split('T')[0]}
          onChange={(e) => onChange({ birthDate: new Date(e.target.value) })}
        />
      </label>

      <Teeth file={file} onChange={onChange} />

      <hr />

      <label>
        Antécédents médicaux
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ anteriorMedical: e.target.value })}
        >
          {file.anteriorMedical}
        </textarea>
      </label>

      <label>
        Medicaments
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ medications: e.target.value })}
        >
          {file.medications}
        </textarea>
      </label>

      <label>
        Allergies
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ allergies: e.target.value })}
        >
          {file.allergies}
        </textarea>
      </label>

      <label>
        Historique dentaire
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ anamnesis: e.target.value })}
        >
          {file.anamnesis}
        </textarea>
      </label>

      <hr />

      <label>
        Examen clinique
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ clinicalExam: e.target.value })}
        >
          {file.clinicalExam}
        </textarea>
      </label>

      <TeethTests file={file} onChange={onChange} />

      <hr />

      <Photo file={file} onChange={onChange} />

      <label>
        Examen radiographique RA
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ radioExamRA: e.target.value })}
        >
          {file.radioExamRA}
        </textarea>
      </label>

      <label>
        Examen radiographique CBCT
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ radioExamCBCT: e.target.value })}
        >
          {file.radioExamCBCT}
        </textarea>
      </label>

      <hr />

      <label>
        Diagnostic
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ diagnostic: e.target.value })}
        >
          {file.diagnostic}
        </textarea>
      </label>

      <hr />

      <label>
        Traitement envisagé
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ treatment: e.target.value })}
        >
          {file.treatment}
        </textarea>
      </label>
      <div
        className="inline-block font-bold p-5 self-center rounded-3xl cursor-pointer bg-indigo-200 text-indigo-900"
        onClick={async () => {
          const { generatePdf } = await import('../utils/generatePdf')
          await generatePdf(file)
        }}
      >
        Sauvegarder PDF
      </div>
    </div>
  )
}
