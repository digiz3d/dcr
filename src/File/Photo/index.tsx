import { open } from '@tauri-apps/api/dialog'
import { readBinaryFile } from '@tauri-apps/api/fs'
import { compress, EImageType } from 'image-conversion'

import type { MedicalFile } from '../../types'

function defaultPreviewDiv() {
  return (
    <div className="border-dotted border-black inline-block m-1 border-2 h-60 w-60 rounded-lg"></div>
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
      <div className="flex flex-row">
        {file.photo?.[0] ? (
          <img className="m-1 inline-block h-60" src={file.photo[0]} />
        ) : (
          defaultPreviewDiv()
        )}
        {file.photo?.[1] ? (
          <img className="m-1 inline-block h-60" src={file.photo[1]} />
        ) : (
          defaultPreviewDiv()
        )}
        {file.photo?.[2] ? (
          <img className="m-1 inline-block h-60" src={file.photo[2]} />
        ) : (
          defaultPreviewDiv()
        )}
      </div>
      <div className="flex flex-row justify-around p-2 w-80">
        <div className=" flex flex-1 bg-green-400 rounded-full hover:bg-green-500">
          <button
            className="flex-1 p-2"
            onClick={async () => {
              const imagePath = await open({ multiple: true })
              if (!imagePath) return
              if (Array.isArray(imagePath)) {
                const jpegs = await Promise.all(
                  imagePath.map(async (path) => {
                    const imageBlob = await readBinaryFile(path)
                    return compress(new Blob([imageBlob.buffer]), {
                      type: EImageType.JPEG,
                      quality: 100,
                    })
                  }),
                )
                onChange({
                  photo: [
                    ...(file.photo ? file.photo : []),
                    ...jpegs.map((jpeg) => URL.createObjectURL(jpeg)),
                  ],
                })
                return
              }
              const imageBlob = await readBinaryFile(imagePath)
              const jpegBlob = await compress(new Blob([imageBlob.buffer]), {
                type: EImageType.JPEG,
                quality: 100,
              })
              onChange({
                photo: [
                  ...(file.photo ? file.photo : []),
                  URL.createObjectURL(jpegBlob),
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
