import { PropsWithChildren } from 'react'
import { useSetAtom, useAtomValue } from 'jotai'
import dayjs from 'dayjs'
import clsx from 'clsx'
import 'dayjs/locale/fr'
dayjs.locale('fr')


import Modal from '../Modal'
import {
  persistSettings,
  settingsAtom,
  settingsCompleteAtom,
  settingsFields,
  upsertSettingAtom,
} from '../../state/settings'

export default function SettingsModal({
  onClose,
}: PropsWithChildren<{
  onClose: () => void
}>) {
  const settings = useAtomValue(settingsAtom)
  const upsertSettings = useSetAtom(upsertSettingAtom)
  const complete = useAtomValue(settingsCompleteAtom)
  const fields = settingsFields
  return (
    <Modal>
      <div className="h-screen w-screen backdrop-blur bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-8 w-2/4 h-3/4 rounded-lg shadow-xl overflow-y-auto">
          <div>
            <h1 className="text-xl mb-4">Paramètres</h1>
            <div className="flex flex-col gap-2">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className="flex flex-row items-center align-middle"
                >
                  <label>
                    {field.label}
                    <input
                      className="w-64 p-1 block p-1 border border-gray-500"
                      type="text"
                      value={settings?.[field.name] || ''}
                      onChange={(e) =>
                        upsertSettings({ [field.name]: e.target.value })
                      }
                      onBlur={(e) =>
                        upsertSettings({ [field.name]: e.target.value.trim() })
                      }
                    />
                  </label>
                </div>
              ))}
            </div>
            <button
              className={clsx(
                'my-4 mr-4 p-2 text-left rounded-md cursor-pointer disabled:cursor-not-allowed',
                'border bg-indigo-100 hover:bg-indigo-200',
              )}
              disabled={!complete}
              onClick={() => {
                ;(async () => {
                  await persistSettings(settings)
                  onClose()
                })()
              }}
            >
              Fermer
            </button>
            {!complete && <span>Des paramètres sont manquants</span>}
          </div>
        </div>
      </div>
    </Modal>
  )
}
