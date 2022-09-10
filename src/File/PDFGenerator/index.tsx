import { pdf, Document, View, Text, Page } from "@react-pdf/renderer"
import { save } from "@tauri-apps/api/dialog"
import { writeBinaryFile } from "@tauri-apps/api/fs"
import { useCallback } from "react"

import style from "./index.module.scss"

export default function PDFGenerator() {
  const download = useCallback(async () => {
    const path = await save({
      title: "document.pdf",
      filters: [{ name: "document.pdf", extensions: ["pdf"] }],
    })

    const doc = await pdf(
      <Document>
        <Page size="A4">
          <View>
            <Text>Section #1</Text>
          </View>
          <View>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>,
    ).toBlob()

    await writeBinaryFile(path, await doc.arrayBuffer())
  }, [])

  return (
    <div className={style.button} onClick={download}>
      Download
    </div>
  )
}
