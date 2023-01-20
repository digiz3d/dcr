import React, { useCallback } from 'react'
import type { MedicalFile } from '../../types'

import style from './index.module.scss'

const upperTeeth = [
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
]
const lowerTeeth = [
  48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
]

const retreatmentOrder = [
  ...upperTeeth.slice(),
  ...lowerTeeth.slice().reverse(),
]

type TreatmentType = MedicalFile['teeth'][number]['treatmentType']

function Select<T extends string = string>({
  currentValue,
  defaultValue,
  onChange,
  options,
  labels,
}: {
  currentValue?: T
  defaultValue: T
  onChange: (newValue: T) => void
  options: T[]
  labels: string[]
}) {
  return (
    <select
      defaultValue={defaultValue}
      value={currentValue}
      onChange={(e) => onChange(e.target.value as T)}
    >
      {options.map((o, i) => (
        <option key={i} value={o}>
          {labels[i]}
        </option>
      ))}
    </select>
  )
}

// traitement, retraitement, avis, chirurgie

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
              percutionTest: 'Négatif',
              palpationTestL: 'Négatif',
              palpationTestV: 'Négatif',
              parodontalProbing: 'physiologique',
              mobility: 1,
              treatmentType: 'retreatment',
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
        <ol className="flex flex-col items-start gap-2">
          {file.teeth
            .sort((a, b) =>
              retreatmentOrder.indexOf(a.id) > retreatmentOrder.indexOf(b.id)
                ? 1
                : -1,
            )
            .map((tooth, i) => (
              <li key={i}>
                <label className="flex flex-row justify-center items-center">
                  <span className="w-8">{tooth.id}</span>
                  <Select<TreatmentType>
                    options={['retreatment', 'treatment', 'advice', 'surgery']}
                    labels={['Retraitement', 'Traitement', 'Avis', 'Chirurgie']}
                    defaultValue="retreatment"
                    onChange={(newValue) => {
                      onChange({
                        teeth: file.teeth.map((t, j) => ({
                          ...t,
                          treatmentType: i === j ? newValue : t.treatmentType,
                        })),
                      })
                    }}
                  />
                </label>
              </li>
            ))}
        </ol>
      )}
    </div>
  )
}
