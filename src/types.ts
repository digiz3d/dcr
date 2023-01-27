export type Tooth = {
  /**
   * 11-18
   * 21-28
   * 31-38
   * 41-48
   */
  id: number
  treatmentType: 'treatment' | 'retreatment' | 'advice' | 'surgery'
  thermicTest: '/' | 'Positif' | 'Négatif'
  electricTest: '/' | 'Négatif' | number // if positif, 1-80
  percutionTest: 'Négatif' | 'Sensible' | 'Positif'
  palpationTestV: 'Négatif' | 'Sensible' | 'Positif'
  palpationTestL: 'Négatif' | 'Sensible' | 'Positif'
  parodontalProbing: string
  /**
   * 0-4
   */
  mobility: 0 | 1 | 2 | 3 | 4 | 'NE'
}

export type MedicalFile = {
  dentistName: string
  dentistCity: string
  addressingDate: Date
  dentistGender: string // 'Homme' | 'Femme'
  patientFirstName: string
  patientLastName: string
  anteriorMedical: string
  symtpoAnte: string
  medications: string
  allergies: string
  gender: string // 'Homme' | 'Femme'
  birthDate: Date
  teeth: Tooth[]
  anamnesis: string
  clinicalExam: string
  photo: string[]
  photoOptimized?: string[]
  radioExamRA: string
  radioExamCBCT: string
  diagnostic: string
  treatment: string
}

export type Settings = {
  doctorName: string
  doctorate: string
  diploma1: string
  diploma2: string
  master: string
  medicalCenter: string
  address1: string
  address2: string
  phoneNumber: string
  email: string
  rpps: string
  where: string
  when: string
}
