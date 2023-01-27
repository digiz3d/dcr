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
]

export default function useSettings() {
  const [settings, setSettings] = useState<Settings | undefined>(undefined)

  useEffect(() => {
    async function initSettings() {
      console.log('initsettings')
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

  const upsertSetting = useCallback(async (newValues: Settings) => {
    return setSettings((prev) => {
      const previousValues: Settings =
        typeof prev === 'undefined'
          ? {
              address1: '',
              address2: '',
              diploma1: '',
              diploma2: '',
              doctorate: '',
              doctorName: '',
              email: '',
              master: '',
              medicalCenter: '',
              phoneNumber: '',
              rpps: '',
              where: '',
            }
          : prev
      const newSettings = { ...previousValues, ...newValues }
      localforage.setItem('settings', JSON.stringify(newSettings))
      return newSettings
    })
  }, [])

  const settingsComplete = Boolean(
    settings?.doctorName && settings.doctorate && settings.address1,
  )

  return { settingsComplete, settings, upsertSetting, settingsFields } as {
    settingsComplete: boolean
    settings: typeof settings
    upsertSetting: (settings: Partial<Settings>) => void
    settingsFields: typeof settingsFields
  }
}
