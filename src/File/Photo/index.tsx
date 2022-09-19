import { open } from '@tauri-apps/api/dialog'
import { readBinaryFile } from '@tauri-apps/api/fs'

import type { MedicalFile } from '../../types'

export default function Photo({
  file,
  onChange,
}: {
  file: MedicalFile
  onChange: (newMedicalFile: Partial<MedicalFile>) => void
}) {
  return (
    <div className="flex flex-col">
      <div>
        <div>
          {file.photo && (
            <img className="max-w-md max-h-64" src={file.photo[0]} />
          )}
          {file.photo && (
            <img className="max-w-md max-h-64" src={file.photo[1]} />
          )}
          {file.photo && (
            <img className="max-w-md max-h-64" src={file.photo[2]} />
          )}
        </div>
        <div
          onClick={(e) => {
            onChange({ photo: undefined })
          }}
        >
          Remove
        </div>
      </div>
      <div
        onClick={async () => {
          const imagePath = await open()
          if (!imagePath) return
          if (Array.isArray(imagePath)) return
          const imageBlob = await readBinaryFile(imagePath)
          onChange({
            photo: [
              ...(file.photo ? file.photo : []),
              URL.createObjectURL(
                new Blob([imageBlob.buffer], { type: 'image/png' }),
              ),
            ],
          })
        }}
      >
        Add
      </div>
    </div>
  )
}
