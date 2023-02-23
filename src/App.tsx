import clsx from 'clsx'
import { useCallback, useState } from 'react'

import File from './File/File'
import NoFile from './NoFile/NoFile'
import type { MedicalFile } from './types'
import Settings from './Settings'
import useSettings from './Settings/use-settings'
import Menu from './Menu'

function App() {
  const {
    settings,
    settingsComplete,
    settingsFields,
    upsertSetting,
    persistSettings,
  } = useSettings()
  const [isSettingsOpen, setIsSettingsOpen] = useState(!settingsComplete)
  const [medicalFiles, setMedicalFiles] = useState<MedicalFile[]>([])
  const [currentMedicalFileIndex, setCurrentMedicalFileIndex] = useState(0)

  const onChange = useCallback(
    (newFileProperties: Partial<MedicalFile>) => {
      setMedicalFiles((c) =>
        c.map((item, i) =>
          i === currentMedicalFileIndex
            ? { ...item, ...newFileProperties }
            : item,
        ),
      )
    },
    [currentMedicalFileIndex],
  )

  return (
    <div className="flex bg-gray-100 h-screen overflow">
      {isSettingsOpen && (
        <Settings
          settings={settings}
          settingsComplete={settingsComplete}
          settingsFields={settingsFields}
          upsertSetting={upsertSetting}
          onClose={() => {
            persistSettings()
            setIsSettingsOpen(false)
          }}
        />
      )}
      <div className="w-64 h-screen flex flex-col">
        <div className="flex flex-1 flex-col gap-2 h-screen overflow-y-auto p-2">
          <h1 className="text-lg">Dossiers des patients</h1>
          {medicalFiles.map((f, i) => (
            <div
              className={clsx(
                'p-2 text-left rounded-md bg-white hover:bg-indigo-100 cursor-pointer flex flex-row justify-between group items-center',
                i === currentMedicalFileIndex &&
                  'bg-indigo-200 hover:bg-indigo-200',
              )}
              key={i}
              onClick={() => setCurrentMedicalFileIndex(i)}
            >
              <div>
                {i} - {f.patientFirstName} {f.patientLastName}
              </div>
              <div
                className="group-hover:visible invisible opacity-50 hover:opacity-100 p-1 bg-blue-400 rounded-full"
                onClick={async () => {
                  const confirmed = await confirm(
                    `Voulez-vous supprimer le fichier de ${f.patientFirstName} ${f.patientLastName} ?`,
                  )
                  if (confirmed) {
                    const copiedArray = medicalFiles.slice()
                    copiedArray.splice(i, 1)
                    setMedicalFiles(copiedArray)
                  }
                }}
              >
                🗑️
              </div>
            </div>
          ))}
          <button
            className="p-2 text-center rounded-md bg-red hover:bg-indigo-100"
            onClick={() => {
              setMedicalFiles((c) => [
                ...c,
                {
                  fileDate: new Date(),
                  allergies: 'aucune',
                  anamnesis: 'Date couronne / traitement endodontique',
                  symtpoAnte:
                    "Douleurs, tuméfaction, prise d'antalgiques/antibiotiques, découverte fortuite",
                  anteriorMedical: 'aucun',
                  birthDate: new Date(),
                  clinicalExam: 'Pas de douleurs / Douleurs depuis + EVA',
                  dentistCity: '',
                  dentistName: '',
                  dentistGender: '',
                  hasAddressingDate: 'true',
                  addressingDate: new Date(),
                  diagnostic: '',
                  gender: '',
                  medications: 'aucun',
                  patientFirstName: '',
                  patientLastName: '',
                  radioExamCBCT:
                    "Absence de visibilité d'une lumière canalaire\n" +
                    'Présence d’un canal MV2\n' +
                    'Trajet apical commun dans la racine\n' +
                    'Lésion radioclaire périapicale d’origine endodontique\n' +
                    'Diamètre de la lésion :\n' +
                    'Épaississement membrane sinusienne',
                  radioExamRA:
                    'Lésion carieuse secondaire\n' +
                    "Présence d'un ancrage radiculaire dans la racine\n" +
                    'Traitement endodontique ne respectant pas les critères de qualité radiographique en termes de longueur, conicité et densité.\n' +
                    "Lésion radioclaire périapicale d'origine endodontique\n" +
                    "Pas d'épaississement ligamentaire et visibilité de la lamina dura",
                  teeth: [],
                  photo: [],
                  photoOptimized: [],
                  treatment:
                    'Dépose de la couronne et de l’ancrage radiculaire /Dépose des matériaux d’obturation coronaire\n' +
                    'Réévaluation de la conservation de la dent\n' +
                    'Retraitement endodontique / Traitement endodontique\n' +
                    'Réalisation d’une obturation coronaire étanche par le chirurgien-dentiste traitant\n' +
                    'Dent non conservable -> avulsion à réaliser et remplacement par un implant idéalement\n' +
                    'Suivi clinique et radiographique annuel. Si apparition d’une symptomatologie ou augmentation du volume de la lésion d’origine endodontique -> indication de retraitement endodontique.',
                  comment: '',
                },
              ])
              setCurrentMedicalFileIndex(medicalFiles.length)
            }}
          >
            +
          </button>
        </div>
        <Menu
          openSettings={() => setIsSettingsOpen(true)}
          medicalFiles={medicalFiles}
          setMedicalFiles={setMedicalFiles}
        />
      </div>
      <div className="flex flex-1 h-screen overflow-y-auto">
        {medicalFiles[currentMedicalFileIndex] ? (
          <File
            settings={settings}
            key={currentMedicalFileIndex}
            file={medicalFiles[currentMedicalFileIndex]}
            onChange={onChange}
          />
        ) : (
          <NoFile />
        )}
      </div>
    </div>
  )
}

export default App
