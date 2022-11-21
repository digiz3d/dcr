import { open } from '@tauri-apps/api/dialog'
import { readBinaryFile } from '@tauri-apps/api/fs'

import type { MedicalFile } from '../../types'

function defaultPreviewDiv() {
  return (
    <div className="border-dotted border-black inline-block border-2 m-1 w-60 h-60 rounded-lg"></div>
  )
}

export default function Photo({
  file,
  onChange,
}: {
  file: MedicalFile
  onChange: (newMedicalFile: Partial<MedicalFile>) => void
}) {
  return (
    <div className="flex flex-col justify-center">
      <div>
        {file.photo ? (
          file.photo[0] ? (
            <img className="m-1 inline h-60" src={file.photo[0]} />
          ) : (
            defaultPreviewDiv()
          )
        ) : (
          defaultPreviewDiv()
        )}
        {file.photo ? (
          file.photo[1] ? (
            <img className="m-1 inline h-60" src={file.photo[1]} />
          ) : (
            defaultPreviewDiv()
          )
        ) : (
          defaultPreviewDiv()
        )}
        {file.photo ? (
          file.photo[2] ? (
            <img className="m-1 inline h-60" src={file.photo[2]} />
          ) : (
            defaultPreviewDiv()
          )
        ) : (
          defaultPreviewDiv()
        )}
      </div>
      <div className="flex flex-row justify-around p-2 w-80">
        <div className=" flex flex-1 bg-green-400 rounded-full hover:bg-green-500">
          <button
            className="flex-1 p-2"
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
          </button>
        </div>
        <div className="flex flex-1 bg-red-400 rounded-full hover:bg-red-500">
          <button
            className="flex-1 p-2"
            onClick={(e) => {
              onChange({ photo: undefined })
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
