import { readBinaryFile } from '@tauri-apps/api/fs'
import { compress, EImageType } from 'image-conversion'

export async function picturePathToJpegBlobPath(imagePaths: string[]) {
  const jpegs = await Promise.all(
    imagePaths.map(async (path) => {
      const imageBlob = await readBinaryFile(path)
      return compress(new Blob([imageBlob.buffer]), {
        type: EImageType.JPEG,
        quality: 100,
      })
    }),
  )

  const optimizedPaths = jpegs.map((jpeg) => URL.createObjectURL(jpeg))
  return optimizedPaths
}
