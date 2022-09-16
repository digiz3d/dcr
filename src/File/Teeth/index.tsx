import React, { useCallback } from 'react'
import type { MedicalFile } from '../../types'

import style from './index.module.scss'

const upperTeeth = [
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
]
const lowerTeeth = [
  48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
]

const retreatmentOrder = [...upperTeeth, ...lowerTeeth.slice().reverse()]

export default function Teeth({
  file,
  onChange,
}: {
  file: MedicalFile
  onChange: (newMedicalFile: Partial<MedicalFile>) => void
}) {
  const activeTeethIds = file.teeth?.map((t) => t.id) ?? []

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        onChange({
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
              isRetreatment: false,
            },
          ],
        })
      } else {
        onChange({
          teeth:
            file.teeth?.filter((t) => t.id.toString() !== e.target.value) ?? [],
        })
      }
    },
    [file, onChange],
  )

  const onChangeTreatmentType = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        teeth: file.teeth.map((t) => ({
          ...t,
          isRetreatment:
            t.id.toString() === e.target.value
              ? e.target.checked
              : t.isRetreatment,
        })),
      })
    },
    [file, onChange],
  )

  return (
    <div>
      <table className={style.teeth}>
        <tbody>
          <tr>
            {upperTeeth.map((toothId, i) => (
              <td key={i}>
                <label className="flex flex-col justify-center items-center">
                  {toothId}
                  <input
                    checked={activeTeethIds.includes(toothId)}
                    name={`tooth-${toothId}`}
                    value={toothId.toString()}
                    onChange={onChangeHandler}
                    type="checkbox"
                  />
                </label>
              </td>
            ))}
          </tr>
          <tr>
            {lowerTeeth.map((toothId, i) => (
              <td key={i}>
                <label className="flex flex-col justify-center items-center">
                  {toothId}
                  <input
                    checked={activeTeethIds.includes(toothId)}
                    name={`tooth-${toothId}`}
                    value={toothId.toString()}
                    onChange={onChangeHandler}
                    type="checkbox"
                  />
                </label>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <p>Retraitements</p>
      {!!file.teeth.length && (
        <table className={style.teeth}>
          <tbody>
            <tr>
              {file.teeth
                .sort((a, b) =>
                  retreatmentOrder.indexOf(a.id) >
                  retreatmentOrder.indexOf(b.id)
                    ? 1
                    : -1,
                )
                .map((tooth, i) => (
                  <td key={i}>
                    <label className="flex flex-col justify-center items-center">
                      {tooth.id}
                      <input
                        checked={tooth.isRetreatment}
                        name={`tooth-${tooth.id}`}
                        onChange={onChangeTreatmentType}
                        value={tooth.id}
                        type="checkbox"
                      />
                    </label>
                  </td>
                ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}
