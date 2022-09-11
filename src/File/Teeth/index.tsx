import React, { useCallback } from 'react'
import type { MedicalFile } from '../../types'

import style from './index.module.scss'

const upperTeeth = [
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
]
const lowerTeeth = [
  48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
]

export default function Teeth({
  file,
  onChange,
}: {
  file: MedicalFile
  onChange: (newMedicalFile: MedicalFile) => void
}) {
  const activeTeethIds = file.teeth?.map((t) => t.id) ?? []

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        onChange({
          ...file,
          teeth: [
            ...(file.teeth ? file.teeth : []),
            {
              id: Number(e.target.value),
              thermicTest: '/',
              electricTest: '/',
              percutionTest: 'n',
              palpationTestL: 'n',
              palpationTestV: 'n',
              parodontalProbing: 'physiologique',
              mobility: 0,
            },
          ],
        })
      } else {
        onChange({
          ...file,
          teeth:
            file.teeth?.filter((t) => t.id.toString() !== e.target.value) ?? [],
        })
      }
    },
    [file, onChange],
  )

  return (
    <table className={style.teeth}>
      <tbody>
        <tr>
          {upperTeeth.map((tooth, i) => (
            <td key={i}>
              <label className="flex flex-col justify-center items-center">
                {tooth}
                <input
                  checked={activeTeethIds.includes(tooth)}
                  name={`tooth-${tooth}`}
                  value={tooth.toString()}
                  onChange={onChangeHandler}
                  type="checkbox"
                />
              </label>
            </td>
          ))}
        </tr>
        <tr>
          {lowerTeeth.map((tooth, i) => (
            <td key={i}>
              <label className="flex flex-col justify-center items-center">
                {tooth}
                <input
                  checked={activeTeethIds.includes(tooth)}
                  name={`tooth-${tooth}`}
                  value={tooth.toString()}
                  onChange={onChangeHandler}
                  type="checkbox"
                />
              </label>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}
