import { open } from '@tauri-apps/api/dialog'

import type { MedicalFile } from '../../types'
import { picturePathToJpegBlobPath } from '../../utils/photo'

function DefaultPreviewDiv() {
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
        {file.photoOptimized?.[0] ? (
          <img className="m-1 inline-block h-60" src={file.photoOptimized[0]} />
        ) : (
          DefaultPreviewDiv()
        )}
        {file.photoOptimized?.[1] ? (
          <img className="m-1 inline-block h-60" src={file.photoOptimized[1]} />
        ) : (
          DefaultPreviewDiv()
        )}
        {file.photoOptimized?.[2] ? (
          <img className="m-1 inline-block h-60" src={file.photoOptimized[2]} />
        ) : (
          DefaultPreviewDiv()
        )}
      </div>
      <div className="flex flex-row justify-around p-2 w-80">
        <div className=" flex flex-1 bg-green-400 rounded-full hover:bg-green-500">
          <button
            className="flex-1 p-2"
            onClick={async () => {
              const imagePath = await open({ multiple: true })
              if (!imagePath) return
              const imagePaths = Array.isArray(imagePath)
                ? imagePath
                : [imagePath]

              const jpegBlobPaths = await picturePathToJpegBlobPath(imagePaths)

              onChange({
                photo: [...(file.photo ?? []), ...imagePaths],
                photoOptimized: [
                  ...(file.photoOptimized ?? []),
                  ...jpegBlobPaths,
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
              onChange({ photo: undefined, photoOptimized: undefined })
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
