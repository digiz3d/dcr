import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import useSettings from './use-settings'

export default function Settings({
  onClose,
}: PropsWithChildren<{ onClose: () => void }>) {
  const [complete, settings, upsertSetting, fields] = useSettings()

  return ReactDOM.createPortal(
    <div className="h-screen w-screen backdrop-blur bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-8 w-2/4 h-3/4 rounded-lg shadow-xl overflow-y-scroll">
        <div>
          <h1 className="text-xl mb-4">Paramètres</h1>
          <div className="flex flex-col gap-2">
            {fields.map((field) => (
              <label key={field.name}>
                {field.label}
                <input
                  className="w-64 p-1 block p-1 border border-gray-500"
                  type="text"
                  value={settings?.[field.name] || ''}
                  onChange={(e) =>
                    upsertSetting({ [field.name]: e.target.value })
                  }
                />
              </label>
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
    </div>,
    document.getElementById('modal')!,
  )
}
