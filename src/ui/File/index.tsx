import { PDFViewer } from '@react-pdf/renderer'
import { useEffect, useState } from 'react'
import type { MedicalFile } from '../../types'
import { ClipboardDesmosOutput } from '../../utils/desmosReport'
import Report from '../../utils/Report'
import Photo from './Photo'

import Teeth from './Teeth'
import { TeethComments, TeethTests } from './TeethTables'
import {  useAtomValue } from 'jotai'
import { settingsAtom } from '../../state/settings'

export default function File({
  file,
  onChange,
}: {
  file: MedicalFile
  onChange: (file: Partial<MedicalFile>) => void
}) {
  const settings = useAtomValue(settingsAtom)
  const [x, setX] = useState(0)

  useEffect(() => {
    setX(Math.random())
  }, [settings])

  return (
    <div
      className="flex flex-col gap-4 p-2 bg-white h-max m-2 ml-0 w-full rounded-md"
      key={x.toFixed(5)}
    >
      <div style={{ fontWeight: 'bold' }}>DOSSIER MEDICAL</div>

      <label>
        Date dossier médical
        <input
          className="block p-1 border border-gray-500"
          type="date"
          defaultValue={file.fileDate.toISOString().split('T')[0]}
          onChange={(e) => {
            const validDate = new Date(e.target.value)
            if (isNaN(validDate.getTime())) return
            onChange({ fileDate: validDate })
          }}
        />
      </label>

      <div style={{ fontWeight: 'bold' }}>DENTISTE ADRESSANT</div>

      <label>
        Nom dentiste adressant
        <input
          className="block p-1 border border-gray-500"
          type="text"
          value={file.dentistName}
          onChange={(e) => onChange({ dentistName: e.target.value })}
        />
      </label>

      <label>
        Ville dentiste adressant
        <input
          className="block p-1 border border-gray-500"
          type="text"
          value={file.dentistCity}
          onChange={(e) => onChange({ dentistCity: e.target.value })}
        />
      </label>

      <label>
        Courrier d'adressage ?
        <div>
          <input
            className="cursor-pointer"
            type="radio"
            id="true"
            name="isLetter"
            value="true"
            checked={file.hasAddressingDate === 'true'}
            onChange={(e) => onChange({ hasAddressingDate: 'true' })}
          />
          <label className="pl-2 cursor-pointer" htmlFor="true">
            Oui
          </label>
        </div>
        <div>
          <input
            className="cursor-pointer"
            type="radio"
            id="false"
            name="isLetter"
            value="false"
            checked={file.hasAddressingDate === 'false'}
            onChange={(e) => onChange({ hasAddressingDate: 'false' })}
          />
          <label className="pl-2 cursor-pointer" htmlFor="false">
            Non
          </label>
        </div>
      </label>

      <label>
        Date courrier adressage
        <input
          className="block p-1 border border-gray-500"
          type="date"
          disabled={file.hasAddressingDate === 'false'}
          defaultValue={file.addressingDate.toISOString().split('T')[0]}
          onChange={(e) => {
            const validDate = new Date(e.target.value)
            if (isNaN(validDate.getTime())) return
            onChange({ addressingDate: validDate })
          }}
        />
      </label>

      <fieldset className="border p-2">
        <legend>Genre dentiste adressant</legend>
        <div>
          <input
            className="cursor-pointer"
            type="radio"
            id="dhomme"
            name="dagenre"
            value="m"
            checked={file.dentistGender === 'm'}
            onChange={(e) => onChange({ dentistGender: 'm' })}
          />
          <label className="pl-2 cursor-pointer" htmlFor="dhomme">
            Homme
          </label>
        </div>

        <div>
          <input
            className="cursor-pointer"
            type="radio"
            id="dfemme"
            name="dagenre"
            value="f"
            checked={file.dentistGender === 'f'}
            onChange={(e) => onChange({ dentistGender: 'f' })}
          />
          <label className="pl-2 cursor-pointer" htmlFor="dfemme">
            Femme
          </label>
        </div>
      </fieldset>

      <hr />

      <div style={{ fontWeight: 'bold' }}>PATIENT</div>

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
          className="block p-1 border border-gray-500 w-60"
          type="text"
          value={file.patientFirstName}
          onChange={(e) => onChange({ patientFirstName: e.target.value })}
        />
      </label>

      <label>
        Nom
        <input
          className="block p-1 border border-gray-500 w-60"
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

      <label>
        Symptomatologie dentaire antérieure
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full"
          onChange={(e) => onChange({ symtpoAnte: e.target.value })}
          value={file.symtpoAnte}
        />
      </label>

      <hr />

      <label>
        Examen clinique
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full h-40"
          onChange={(e) => onChange({ clinicalExam: e.target.value })}
          value={file.clinicalExam}
        />
      </label>

      <TeethComments file={file} onChange={onChange} />
      <TeethTests file={file} onChange={onChange} />

      <hr />

      <div style={{ fontWeight: 'bold' }}>Radiographies</div>
      <Photo file={file} onChange={onChange} />

      <label>
        Examen radiographique RA
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full h-40"
          onChange={(e) => onChange({ radioExamRA: e.target.value })}
          value={file.radioExamRA}
        />
      </label>

      <label>
        Examen radiographique CBCT
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full h-40"
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
          className="block p-1 border border-gray-500 resize-y w-full h-40"
          onChange={(e) => onChange({ treatment: e.target.value })}
          value={file.treatment}
        />
      </label>

      <hr />

      <label>
        Commentaire desmos
        <textarea
          className="block p-1 border border-gray-500 resize-y w-full h-40"
          onChange={(e) => onChange({ comment: e.target.value })}
          value={file.comment}
        />
      </label>

      <div
        className="font-bold p-5 self-center rounded-3xl cursor-pointer bg-indigo-200 text-indigo-900"
        onClick={async () => {
          if (!settings) return alert('nooo')
          const { generatePdf } = await import('../../utils/generatePdf')
          await generatePdf(file, settings)
        }}
      >
        Sauvegarder PDF
      </div>

      <div
        className="font-bold p-5 self-center rounded-3xl cursor-pointer bg-indigo-200 text-indigo-900"
        onClick={async () => {
          if (!settings) return alert('nooo')
          ClipboardDesmosOutput(file)
        }}
      >
        Copy file to clipboard
      </div>

      {process.env.NODE_ENV !== 'production' && settings && (
        <PDFViewer className="h-[1000px]">
          <Report file={file} />
        </PDFViewer>
      )}
    </div>
  )
}
