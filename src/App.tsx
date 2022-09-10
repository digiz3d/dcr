import { useCallback, useState } from "react"

import File from "./File/File"
import type { MedicalFile } from "./types"

import style from "./App.module.scss"

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
    <div className={style.main}>
      <div className={style.list}>
        {medicalFiles.map((f, i) => (
          <button key={i} onClick={() => setCurrentMedicalFileIndex(i)}>
            {i} - {f.patientFirstName} {f.patientLastName}
          </button>
        ))}
        <button
          className={style.plus}
          onClick={() => {
            setMedicalFiles((c) => [
              ...c,
              { patientFirstName: "", patientLastName: "", teeth: [] },
            ])
            setCurrentMedicalFileIndex(medicalFiles.length)
          }}
        >
          +
        </button>
      </div>
      <div className={style.current}>
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
