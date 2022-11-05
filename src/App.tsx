import clsx from 'clsx'
import { useCallback, useState } from 'react'

import File from './File/File'
import NoFile from './NoFile/NoFile'
import type { MedicalFile } from './types'
import Settings from './Settings'
import useSettings from './Settings/use-settings'
import Menu from './Menu'

function App() {
  const [isSettingsComplete] = useSettings()
  const [isSettingsOpen, setIsSettingsOpen] = useState(!isSettingsComplete)
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
      {isSettingsOpen && <Settings onClose={() => setIsSettingsOpen(false)} />}
      <div className="w-64 h-screen flex flex-col">
        <div className="flex flex-1 flex-col gap-2 h-screen overflow-y-auto p-2">
          <h1 className="text-lg">Dossiers des patients</h1>
          {medicalFiles.map((f, i) => (
            <button
              className={clsx(
                'p-2 text-left rounded-md bg-white hover:bg-indigo-100',
                i === currentMedicalFileIndex &&
                  'bg-indigo-200 hover:bg-indigo-200',
              )}
              key={i}
              onClick={() => setCurrentMedicalFileIndex(i)}
            >
              {i} - {f.patientFirstName} {f.patientLastName}
            </button>
          ))}
          <button
            className="p-2 text-center rounded-md bg-red hover:bg-indigo-100"
            onClick={() => {
              setMedicalFiles((c) => [
                ...c,
                {
                  allergies: 'aucune',
                  anamnesis: '',
                  anteriorMedical: 'aucun',
                  birthDate: new Date(),
                  clinicalExam: '',
                  dentistCity: '',
                  dentistName: '',
                  dentistGender: '',
                  diagnostic: '',
                  gender: '',
                  medications: 'aucun',
                  patientFirstName: '',
                  patientLastName: '',
                  radioExamCBCT: '',
                  radioExamRA: '',
                  teeth: [],
                  treatment: '',
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
