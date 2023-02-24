import dayjs from 'dayjs'
import 'dayjs/locale/fr'
dayjs.locale('fr')

import clsx from 'clsx'
import { PropsWithChildren } from 'react'

import useSettings from './use-settings'
import Modal from '../Modal'

export default function Settings({
  onClose,
  settingsComplete,
  settings,
  upsertSetting,
  settingsFields,
}: PropsWithChildren<{
  onClose: () => void
  settingsComplete: ReturnType<typeof useSettings>['settingsComplete']
  settings: ReturnType<typeof useSettings>['settings']
  upsertSetting: ReturnType<typeof useSettings>['upsertSetting']
  settingsFields: ReturnType<typeof useSettings>['settingsFields']
}>) {
  const complete = settingsComplete
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
                        upsertSetting({ [field.name]: e.target.value })
                      }
                      onBlur={(e) =>
                        upsertSetting({ [field.name]: e.target.value.trim() })
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
              onClick={() => onClose()}
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
