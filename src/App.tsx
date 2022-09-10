import clsx from 'clsx'
import { useCallback, useState } from 'react'

import File from './File/File'
import type { MedicalFile } from './types'

function App() {
  const [medicalFiles, setMedicalFiles] = useState<MedicalFile[]>([])
  const [currentMedicalFileIndex, setCurrentMedicalFileIndex] = useState(0)

  const onChange = useCallback(
    (newFile: MedicalFile) => {
      setMedicalFiles((c) =>
        c.map((item, i) => (i === currentMedicalFileIndex ? newFile : item)),
      )
    },
    [currentMedicalFileIndex],
  )

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="w-64 p-2">
        <div className="flex flex-col gap-2 sticky top-2">
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
            className="p-2 text-center rounded-md bg-white hover:bg-indigo-100"
            onClick={() => {
              setMedicalFiles((c) => [
                ...c,
                { patientFirstName: '', patientLastName: '', teeth: [] },
              ])
              setCurrentMedicalFileIndex(medicalFiles.length)
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-1 overflow-scroll">
        {medicalFiles[currentMedicalFileIndex] && (
          <File
            file={medicalFiles[currentMedicalFileIndex]}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  )
}

export default App
