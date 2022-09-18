export type Tooth = {
  /**
   * 11-18
   * 21-28
   * 31-38
   * 41-48
   */
  id: number
  treatmentType: 'treatment' | 'retreatment' | 'advice' | 'surgery'
  thermicTest: '/' | 'positive' | 'negative'
  electricTest: '/' | 'negative' | number // if positive, 1-80
  percutionTest: 'negative' | 'sensitive' | 'positive'
  palpationTestV: 'negative' | 'sensitive' | 'positive'
  palpationTestL: 'negative' | 'sensitive' | 'positive'
  parodontalProbing: string
  /**
   * 0-4
   */
  mobility: 0 | 1 | 2 | 3 | 4 | 'NE'
}

export type MedicalFile = {
  patientFirstName: string
  patientLastName: string
  dentistName: string
  dentistCity: string
  anteriorMedical: string
  medications: string
  allergies: string
  gender: string // 'Homme' | 'Femme'
  birthDate: Date
  teeth: Tooth[]
  anamnesis: string
  clinicalExam: string
  photo?: string
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
