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
  teeth: {
    /**
     * 11-18
     * 21-28
     * 31-38
     * 41-48
     */
    id: number
    treatmentType: 'treatment' | 'retreatment' | 'advice' | 'surgery'
    thermicTest: string // "/" | "positif" | "negatif";
    /**
     * if positive, 1-80
     */
    electricTest: string // "/" | "negatif" | number;
    percutionTest: string // "sensible" | "positif" | "negatif";
    palpationTestV: string // "positif" | "negatif";
    palpationTestL: string // "positif" | "negatif";
    parodontalProbing: 'physiologique' | string
    /**
     * 0-4
     */
    mobility: number
  }[]
  anamnesis: string
  clinicalExam: string
  photo?: string
  radioExamRA: string
  radioExamCBCT: string
  diagnostic: string
  treatment: string
}
