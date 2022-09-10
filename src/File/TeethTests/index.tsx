import type { MedicalFile } from '../../types'

import style from './index.module.scss'

export default function TeethTests({
  file,
  onChange,
}: {
  file: MedicalFile
  onChange: (newMedicalFile: MedicalFile) => void
}) {
  function onChangeTooth<
    X extends MedicalFile['teeth'][number],
    F extends keyof X,
    T extends X[F],
  >(teethId: number, field: F, newValue: T) {
    console.log('updating', teethId, field, newValue)
    onChange({
      ...file,
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
                    type="radio"
                    id={`thermic-test-slash-${t.id}`}
                    value="/"
                    checked={t.thermicTest === '/'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'thermicTest', e.target.value)
                    }
                  />
                  <label htmlFor={`thermic-test-slash-${t.id}`}>/</label>
                </div>
                <div className={style.item}>
                  <input
                    type="radio"
                    id={`thermic-test-n-${t.id}`}
                    value="n"
                    checked={t.thermicTest === 'n'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'thermicTest', e.target.value)
                    }
                  />
                  <label htmlFor={`thermic-test-n-${t.id}`}>Neg</label>
                </div>
                <div className={style.item}>
                  <input
                    type="radio"
                    id={`thermic-test-p-${t.id}`}
                    value="p"
                    checked={t.thermicTest === 'p'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'thermicTest', e.target.value)
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
                    type="radio"
                    id={`eletric-test-slash-${t.id}`}
                    value="/"
                    checked={t.electricTest === '/'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'electricTest', e.target.value)
                    }
                  />
                  <label htmlFor={`eletric-test-slash-${t.id}`}>/</label>
                </div>{' '}
                <div className={style.item}>
                  <input
                    type="radio"
                    id={`eletric-test-n-${t.id}`}
                    value="n"
                    checked={t.electricTest === 'n'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'electricTest', e.target.value)
                    }
                  />
                  <label htmlFor={`eletric-test-n-${t.id}`}>Neg</label>
                </div>
                <div className={style.item}>
                  <input
                    type="radio"
                    defaultValue={''}
                    checked={t.electricTest !== '/' && t.electricTest !== 'n'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'electricTest', e.target.value)
                    }
                  />
                  <input
                    className="inline border border-gray-500 p-2"
                    disabled={t.electricTest === '/' || t.electricTest === 'n'}
                    type="text"
                    onChange={(e) =>
                      onChangeTooth(t.id, 'electricTest', e.target.value)
                    }
                  />
                </div>
              </div>
            </td>
            <td>
              <div className={style.radioList}>
                <div className={style.item}>
                  <input
                    type="radio"
                    id={`percution-test-n-${t.id}`}
                    value="n"
                    checked={t.percutionTest === 'n'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'percutionTest', e.target.value)
                    }
                  />
                  <label htmlFor={`percution-test-n-${t.id}`}>Negatif</label>
                </div>{' '}
                <div className={style.item}>
                  <input
                    type="radio"
                    id={`percution-test-s-${t.id}`}
                    value="s"
                    checked={t.percutionTest === 's'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'percutionTest', e.target.value)
                    }
                  />
                  <label htmlFor={`percution-test-s-${t.id}`}>Sensible</label>
                </div>
                <div className={style.item}>
                  <input
                    type="radio"
                    id={`percution-test-p-${t.id}`}
                    value="p"
                    checked={t.percutionTest === 'p'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'percutionTest', e.target.value)
                    }
                  />
                  <label htmlFor={`percution-test-p-${t.id}`}>Positif</label>
                </div>
              </div>
            </td>
            <td>
              <div className="grid gap-2 m-2 grid-cols-[repeat(4,15px)]">
                <div></div>
                <div>N</div>
                <div>S</div>
                <div>P</div>
                <div>V</div>
                <div>
                  <input
                    type="radio"
                    value="n"
                    checked={t.palpationTestV === 'n'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'palpationTestV', e.target.value)
                    }
                  />
                </div>
                <div>
                  <input
                    type="radio"
                    value="s"
                    checked={t.palpationTestV === 's'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'palpationTestV', e.target.value)
                    }
                  />
                </div>
                <div>
                  <input
                    type="radio"
                    value="p"
                    checked={t.palpationTestV === 'p'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'palpationTestV', e.target.value)
                    }
                  />
                </div>
                <div>L</div>
                <div>
                  <input
                    type="radio"
                    value="n"
                    checked={t.palpationTestL === 'n'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'palpationTestL', e.target.value)
                    }
                  />
                </div>
                <div>
                  <input
                    type="radio"
                    value="s"
                    checked={t.palpationTestL === 's'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'palpationTestL', e.target.value)
                    }
                  />
                </div>
                <div>
                  <input
                    type="radio"
                    value="p"
                    checked={t.palpationTestL === 'p'}
                    onChange={(e) =>
                      onChangeTooth(t.id, 'palpationTestL', e.target.value)
                    }
                  />
                </div>
              </div>
            </td>
            <td>
              <input
                className="inline border border-gray-500 p-2"
                type="text"
                defaultValue={'Physiologique'}
                onChange={(e) =>
                  onChangeTooth(t.id, 'parodontalProbing', e.target.value)
                }
              />
            </td>
            <td>
              <div className="flex">
                {[0, 1, 2, 3, 4].map((x) => (
                  <div
                    key={x}
                    className="flex flex-col-reverse cursor-pointer m-1"
                  >
                    <input
                      type="radio"
                      id={`mobility-${x}-${t.id}`}
                      value={x}
                      checked={t.mobility === x}
                      onChange={(e) =>
                        onChangeTooth(t.id, 'mobility', Number(e.target.value))
                      }
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
