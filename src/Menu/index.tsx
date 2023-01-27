import { save, open } from '@tauri-apps/api/dialog'
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs'

import { ReactComponent as Cog } from './cog.svg'
import type { MedicalFile } from '../types'
import { picturePathToJpegBlobPath } from '../utils/photo'

type Props = {
  medicalFiles: MedicalFile[]
  openSettings: () => void
  setMedicalFiles: React.Dispatch<React.SetStateAction<MedicalFile[]>>
}

export default function Menu({
  medicalFiles,
  openSettings,
  setMedicalFiles,
}: Props) {
  return (
    <div className="flex flex-row justify-around border-t p-2 bg-white gap-1">
      <div className="flex flex-1 bg-green-400 rounded-3xl hover:bg-green-500">
        <button
          className="flex-1 p-2"
          onClick={async () => {
            const path = await save({
              title: 'Enregistrer les dossiers des patients',
              defaultPath:
                'Dossier médical ' +
                `./${new Date().toISOString().split('T')[0]}.json`,
              filters: [{ name: 'json files', extensions: ['json'] }],
            })

            await writeTextFile(path, JSON.stringify(medicalFiles, null, 2))
          }}
        >
          Save
        </button>
      </div>
      <div className="flex flex-1 bg-yellow-400 rounded-3xl hover:bg-yellow-500">
        <button
          className="flex-1 p-2"
          onClick={async () => {
            const path = await open({
              title: 'Charger les dossiers des patients',
              defaultPath: `./${new Date().toISOString().split('T')[0]}.json`,
              filters: [{ name: 'json files', extensions: ['json'] }],
              multiple: false,
              directory: false,
              recursive: false,
            })

            if (!path || Array.isArray(path)) return

            const json = await readTextFile(path)
            const objects = JSON.parse(json)

            const files: MedicalFile[] = await Promise.all(
              objects.map(
                async (jsonMedicalFile: any): Promise<MedicalFile> => {
                  const photoOptimized = await picturePathToJpegBlobPath(
                    jsonMedicalFile.photo ?? [],
                  )
                  return {
                    ...jsonMedicalFile,
                    birthDate: new Date(jsonMedicalFile.birthDate),
                    addressingDate: new Date(jsonMedicalFile.addressingDate),
                    photo: jsonMedicalFile.photo ?? [],
                    photoOptimized,
                  }
                },
              ),
            )

            setMedicalFiles(files)
          }}
        >
          Load
        </button>
      </div>
      <div className="flex flex-[0.4] rounded-3xl">
        <button
          className="flex flex-1 items-center justify-center"
          onClick={openSettings}
        >
          <Cog
            height={26}
            width={26}
            fill="#555"
            className="transition-all hover:rotate-45"
          />
        </button>
      </div>
    </div>
  )
}
