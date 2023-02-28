import { atom } from 'jotai'
import { loadable } from 'jotai/utils'
import localforage from 'localforage'

export type Settings = {
  address1: string
  address2: string
  diploma1: string
  diploma2: string
  doctorate: string
  doctorName: string
  email: string
  master: string
  medicalCenter: string
  phoneNumber: string
  rpps: string
  where: string
}

const settingsDefaultValues: Record<keyof Settings, string> = {
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

export const settingsFields: { name: keyof Settings; label: string }[] = [
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

export async function loadSettings() {
  console.log('get settings')
  const localSettings = await localforage.getItem<string>('settings')
  if (!localSettings) return undefined
  try {
    return JSON.parse(localSettings) as Settings
  } catch (e) {
    await localforage.clear()
    return undefined
  }
}

export async function persistSettings(settings: Settings) {
  await localforage.setItem(
    'settings',
    JSON.stringify({ ...settingsDefaultValues, ...settings }),
  )
}

export const settingsAtom = atom(settingsDefaultValues)
export const loadableSettingsAtom = loadable(settingsAtom)

export const settingsCompleteAtom = atom((get) => {
  const settings = get(settingsAtom)
  if (!settings) return false
  return Boolean(settings.doctorName && settings.doctorate && settings.address1)
})

export const upsertSettingAtom = atom(
  null,
  (get, set, value: Partial<Settings>) => {
    set(settingsAtom, { ...get(settingsAtom), ...value })
  },
)
