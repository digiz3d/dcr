export type MedicalFile = {
  patientFirstName?: string
  patientLastName?: string
  anteriorMedical?: string
  medications?: string
  allergies?: string
  gender?: 'Homme' | 'Femme'
  birthDate?: Date
  teeth: {
    /**
     * 11-18
     * 21-28
     * 31-38
     * 41-48
     */
    id: number
    thermicTest: string // "/" | "positif" | "negatif";
    /**
     * if positive, 1-80
     */
    electricTest: string // "/" | "negatif" | number;
    percutionTest?: string // "sensible" | "positif" | "negatif";
    palpationTestV?: string // "positif" | "negatif";
    palpationTestL?: string // "positif" | "negatif";
    parodontalProbing?: string // "physiologique" | string;
    /**
     * 0-4
     */
    mobility?: number
  }[]
  anamnesis?: string
  clinicalExam?: string
  photo?: string
  radioExamRA?: string
  radioExamCBCT?: string
  diagnostic?: string
  treatment?: string
}
