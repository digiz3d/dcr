import { Document, Image, Page, Text, View } from '@react-pdf/renderer'
import { MedicalFile } from '../types'

type Props = { file: MedicalFile }

export default function Report({ file }: Props) {
  return (
    <Document>
      <Page size="A4">
        <View>
          {/* Entete */}
          <Text>[DRNAME]</Text>
          <Text>[DOCTORAT]</Text>
          <Text>[DIPLOME_1]</Text>
          <Text>[DIPLOME_2]</Text>
          <Text>[MASTER]</Text>
        </View>
        <View>
          <Text>[MED_CENTER]</Text>
          <Text>[ADDRESS_1]</Text>
          <Text>[ADDRESS_2]</Text>
        </View>
        <View>
          <Text>Tel : [TEL]</Text>
          <Text>Mail : [MAIL]</Text>
        </View>
        <View>
          <Text>RPPS : [RPPS]</Text>
        </View>

        {/* Title */}
        <View>
          <Text>Compte rendu de consultation</Text>
        </View>

        {/* place + date */}
        <View>
          <Text>À [WHERE] le [DATE]</Text>
        </View>
        
        {/* Intro */}
        <View>
          <Text>Cher confrère, Chère consœur</Text>
          <Text>J'ai reçu votre [patient/patiente] [MONSIEUR/MADAME] [NOM] [PRENOM], [né/née] le [BIRTHDAY], pour le [re]traitement endodontique de [TOOTH_ID]([,/et] [le [re]traitement de] [OTHER_TEETH])</Text>
        </View>

        {/* Anamnèse */}
        <View>
          <Text>Anamnèse</Text>
          <Text>Antécédents médicaux : [MEDICAL_ANTECEDENTS]</Text>
          <Text>Médicaments : [MEDICATION]</Text>
          <Text>Allergie : [ALLERGIES]</Text>
          <Text>[DENTAL_HISTORY]</Text>
        </View>
        
        {/* Examen clinique */}
        <View>
          <Text>Examen clinique</Text>
          <Text>[CLINICAL EXAM]</Text>
          <Text>[INSERT TEETH TABLE]</Text>
        </View>

        {/* Examen radiologique */}
        <View>
          <Text>Examen radiologique</Text>
          {file.photo && <Image source={file.photo} />}
          <Text>[RADIO_EXAM_RA]</Text>
          <Text>(if !null)[RADIO_EXAM_CBCT]</Text>
        </View>

        {/* Diagnostic */}
        <View>
          <Text>Diagnostic</Text>
          <Text>[DIAGNOSTIC]</Text>
        </View>
        
        {/* Attitude thérapeutique */}
        <View>
          <Text>Attitude thérapeutique</Text>
          <Text>[treatment]</Text>
        </View>
      </Page>
    </Document>
  )
}
