import { useCallback, useState } from 'react'

import File from './File/File'
import { MedicalFile } from './types'

import './App.css'

function App() {
  const [medicalFiles, setMedicalFiles] = useState<MedicalFile[]>([])
  const [currentMedicalFileIndex, setCurrentMedicalFileIndex] = useState(0)

  const onChange = useCallback(
    (newFile: MedicalFile) => {
      setMedicalFiles((c) =>
        c.map((item, i) => (i === currentMedicalFileIndex ? newFile : item))
      )
    },
    [currentMedicalFileIndex]
  )

  return (
    <div className="main">
      <div className="medical-files-list">
        {medicalFiles.map((f, i) => (
          <button key={i} onClick={() => setCurrentMedicalFileIndex(i)}>
            {i} - {f.patientFirstName} {f.patientLastName}
          </button>
        ))}
        <button
          className="plus"
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
      <div className="current-medial-view">
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
