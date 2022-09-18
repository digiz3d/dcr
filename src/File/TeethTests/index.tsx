import type { MedicalFile, Tooth } from '../../types'

import style from './index.module.scss'

export default function TeethTests({
  file,
  onChange,
}: {
  file: MedicalFile
  onChange: (newMedicalFile: Partial<MedicalFile>) => void
}) {
  function onChangeTooth<
    X extends MedicalFile['teeth'][number],
    F extends keyof X,
    T extends X[F],
  >(teethId: number, field: F, newValue: T) {
    console.log('updating', teethId, field, newValue)
    onChange({
      teeth: file.teeth?.map((t) =>
        t.id === teethId ? { ...t, [field]: newValue } : t,
      ),
    })
  }

  return (
    <table className={style.container}>
      <thead>
        <tr>
          <th>Dent</th>
          <th>Test thermique</th>
          <th>Test electrique</th>
          <th>Test percussion</th>
          <th>Test palpation</th>
          <th>Sondage parodontal</th>
          <th>Mobilité</th>
        </tr>
      </thead>
      <tbody>
        {file.teeth?.map((t) => (
          <tr key={t.id}>
            <td>{t.id}</td>
            <td>
              <div className={style.radioList}>
                <div className={style.item}>
                  <input
                    className="mr-2"
                    type="radio"
                    id={`thermic-test-slash-${t.id}`}
                    checked={t.thermicTest === '/'}
                    onChange={(e) => onChangeTooth(t.id, 'thermicTest', '/')}
                  />
                  <label htmlFor={`thermic-test-slash-${t.id}`}>/</label>
                </div>
                <div className={style.item}>
                  <input
                    className="mr-2"
                    type="radio"
                    id={`thermic-test-n-${t.id}`}
                    checked={t.thermicTest === 'negative'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'thermicTest', 'negative')
                    }
                  />
                  <label htmlFor={`thermic-test-n-${t.id}`}>Neg</label>
                </div>
                <div className={style.item}>
                  <input
                    className="mr-2"
                    type="radio"
                    id={`thermic-test-p-${t.id}`}
                    checked={t.thermicTest === 'positive'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'thermicTest', 'positive')
                    }
                  />
                  <label htmlFor={`thermic-test-p-${t.id}`}>Pos</label>
                </div>
              </div>
            </td>
            <td>
              <div className={style.radioList}>
                <div className={style.item}>
                  <input
                    className="mr-2"
                    type="radio"
                    id={`eletric-test-slash-${t.id}`}
                    checked={t.electricTest === '/'}
                    onChange={(e) => onChangeTooth(t.id, 'electricTest', '/')}
                  />
                  <label htmlFor={`eletric-test-slash-${t.id}`}>/</label>
                </div>
                <div className={style.item}>
                  <input
                    className="mr-2"
                    type="radio"
                    id={`eletric-test-n-${t.id}`}
                    checked={t.electricTest === 'negative'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'electricTest', 'negative')
                    }
                  />
                  <label htmlFor={`eletric-test-n-${t.id}`}>Neg</label>
                </div>
                <div className={style.item}>
                  <input
                    className="mr-2"
                    type="radio"
                    checked={
                      t.electricTest !== '/' && t.electricTest !== 'negative'
                    }
                    onChange={(e) => onChangeTooth(t.id, 'electricTest', 0)}
                  />
                  <input
                    className="inline border border-gray-500 px-2 w-14"
                    disabled={
                      t.electricTest === '/' || t.electricTest === 'negative'
                    }
                    min={0}
                    max={80}
                    type="number"
                    onChange={(e) =>
                      onChangeTooth(
                        t.id,
                        'electricTest',
                        Number(e.target.value),
                      )
                    }
                  />
                </div>
              </div>
            </td>
            <td>
              <div className={style.radioList}>
                <div className={style.item}>
                  <input
                    className="mr-2"
                    type="radio"
                    id={`percution-test-n-${t.id}`}
                    checked={t.percutionTest === 'negative'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'percutionTest', 'negative')
                    }
                  />
                  <label htmlFor={`percution-test-n-${t.id}`}>Negatif</label>
                </div>
                <div className={style.item}>
                  <input
                    className="mr-2"
                    type="radio"
                    id={`percution-test-s-${t.id}`}
                    checked={t.percutionTest === 'sensitive'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'percutionTest', 'sensitive')
                    }
                  />
                  <label htmlFor={`percution-test-s-${t.id}`}>Sensible</label>
                </div>
                <div className={style.item}>
                  <input
                    className="mr-2"
                    type="radio"
                    id={`percution-test-p-${t.id}`}
                    checked={t.percutionTest === 'positive'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'percutionTest', 'positive')
                    }
                  />
                  <label htmlFor={`percution-test-p-${t.id}`}>Positif</label>
                </div>
              </div>
            </td>
            <td>
              <div className="grid gap-2 m-2 grid-cols-[repeat(4,15px)] justify-center">
                <div></div>
                <div>N</div>
                <div>S</div>
                <div>P</div>
                <div>V</div>
                <div>
                  <input
                    type="radio"
                    value="negative"
                    checked={t.palpationTestV === 'negative'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'palpationTestV', 'negative')
                    }
                  />
                </div>
                <div>
                  <input
                    type="radio"
                    value="sensitive"
                    checked={t.palpationTestV === 'sensitive'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'palpationTestV', 'sensitive')
                    }
                  />
                </div>
                <div>
                  <input
                    type="radio"
                    value="positive"
                    checked={t.palpationTestV === 'positive'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'palpationTestV', 'positive')
                    }
                  />
                </div>
                <div>L</div>
                <div>
                  <input
                    type="radio"
                    checked={t.palpationTestL === 'negative'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'palpationTestL', 'negative')
                    }
                  />
                </div>
                <div>
                  <input
                    type="radio"
                    checked={t.palpationTestL === 'sensitive'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'palpationTestL', 'sensitive')
                    }
                  />
                </div>
                <div>
                  <input
                    type="radio"
                    checked={t.palpationTestL === 'positive'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'palpationTestL', 'positive')
                    }
                  />
                </div>
              </div>
            </td>
            <td>
              <input
                className="inline border border-gray-500 p-2"
                type="text"
                value={t.parodontalProbing}
                onChange={(e) =>
                  onChangeTooth(t.id, 'parodontalProbing', e.target.value)
                }
              />
            </td>
            <td>
              <div className="flex justify-center">
                {[0, 1, 2, 3, 4, 'NE'].map((x) => (
                  <div
                    key={x}
                    className="flex flex-col-reverse cursor-pointer m-1"
                  >
                    <input
                      type="radio"
                      id={`mobility-${x}-${t.id}`}
                      value={x}
                      checked={t.mobility === x}
                      onChange={(e) => {
                        onChangeTooth(
                          t.id,
                          'mobility',
                          e.target.value === 'NE'
                            ? 'NE'
                            : (Number(e.target.value) as 0 | 1 | 2 | 3 | 4),
                        )
                      }}
                    />
                    <label htmlFor={`mobility-${x}-${t.id}`}>{x}</label>
                  </div>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
