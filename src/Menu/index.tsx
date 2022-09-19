import { save, open } from '@tauri-apps/api/dialog'
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs'

import { ReactComponent as Cog } from '../../public/cog.svg'
import type { MedicalFile } from '../types'

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
      <div className="flex flex-1 bg-green-400 rounded-3xl">
        <button
          className="flex-1 p-2"
          onClick={async () => {
            const path = await save({
              title: 'Enregistrer les dossiers des patients',
              defaultPath: `./${new Date().toISOString().split('T')[0]}.json`,
              filters: [{ name: 'json files', extensions: ['json'] }],
            })

            await writeTextFile(path, JSON.stringify(medicalFiles, null, 2))
          }}
        >
          Save
        </button>
      </div>
      <div className="flex flex-1 bg-yellow-400 rounded-3xl">
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

            const files = JSON.parse(await readTextFile(path)).map((x) => ({
              ...x,
              birthDate: x.birthDate ? new Date(x.birthDate) : x,
            }))

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
