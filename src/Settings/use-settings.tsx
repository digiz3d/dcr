import localforage from 'localforage'
import { useCallback, useEffect, useState } from 'react'

import type { Settings } from '../types'

const settingsFields: { name: keyof Settings; label: string }[] = [
  { name: 'doctorName', label: 'Nom du Docteur' },
  { name: 'doctorate', label: 'Doctorat' },
  { name: 'diploma1', label: 'Diplôme 1' },
  { name: 'diploma2', label: 'Diplôme 2' },
  { name: 'master', label: 'Master' },
  { name: 'medicalCenter', label: 'Centre médical' },
  { name: 'address1', label: 'Adresse 1' },
  { name: 'address2', label: 'Adresse 2' },
  { name: 'phoneNumber', label: 'Téléphone' },
  { name: 'email', label: 'Adresse email' },
  { name: 'rpps', label: 'RPPS' },
  { name: 'where', label: 'Où' },
  { name: 'when', label: 'Quand' },
]

export default function useSettings() {
  const [settings, setSettings] = useState<Partial<Settings> | undefined>(
    undefined,
  )

  useEffect(() => {
    async function initSettings() {
      const localSettings = await localforage.getItem<string>('settings')
      if (!localSettings) return undefined
      try {
        return JSON.parse(localSettings)
      } catch (e) {
        await localforage.clear()
        return undefined
      }
    }

    initSettings().then(setSettings)
  }, [])

  const upsertSetting = useCallback(async (newValues: Partial<Settings>) => {
    return setSettings((prev) => {
      const newSettings = { ...prev, ...newValues }
      localforage.setItem('settings', JSON.stringify(newSettings))
      return newSettings
    })
  }, [])

  const settingsComplete = Boolean(
    settings?.doctorName && settings.doctorate && settings.address1,
  )

  return [settingsComplete, settings, upsertSetting, settingsFields] as [
    settingsComplete: boolean,
    settings: typeof settings,
    upsertSetting: typeof setSettings,
    settingsFields: typeof settingsFields,
  ]
}
