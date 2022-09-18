import ReactPDF, {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text as OText,
  View,
} from '@react-pdf/renderer'
import useSettings from '../Settings/use-settings'

import { MedicalFile } from '../types'

Font.register({
  family: 'Calibri',
  src: 'https://raw.githubusercontent.com/jondot/dotfiles/master/.fonts/calibri.ttf',
})

type Props = { file: MedicalFile }

const styles = StyleSheet.create({
  calibri: { fontFamily: 'Calibri' },
  page: {
    padding: '1.5cm',
    fontSize: '12pt',
    alignContent: 'stretch',
  },
  infoSection: { maxWidth: '5.5cm' },
  infos: { textAlign: 'left' },
  title: { textAlign: 'center', fontSize: '24pt' },
  date: { textAlign: 'right', fontSize: '10pt' },
  sign: { textAlign: 'right', fontSize: '10pt' },

  margin_s: { marginBottom: '0.2cm' },
  margin_m: { marginBottom: '0.4cm' },
  margin_l: { marginBottom: '0.8cm' },
  margin_xl: { marginBottom: '1cm' },
  margin_xxl: { marginBottom: '1.5cm' },
  border: {
    alignSelf: 'center',
    width: '90%',
    borderBottomWidth: '1pt',
    borderBottomColor: 'grey',
  },
  bold: { fontWeight: 'bold' },
})

function Text(props: ReactPDF.TextProps) {
  return (
    <OText
      style={[
        styles.calibri,
        ...(props.style
          ? Array.isArray(props.style)
            ? props.style
            : [props.style]
          : []),
      ]}
      hyphenationCallback={(word) => [word]}
      {...props}
    >
      {props.children}
    </OText>
  )
}

export default function Report({ file }: Props) {
  const [, settings] = useSettings()
  return (
    <Document key={Math.random()}>
      <Page size="A4" style={styles.page}>
        <View style={[styles.infoSection]}>
          <View style={[styles.infos, styles.margin_s]}>
            {/* Entete */}
            <Text>{settings?.doctorName}</Text>
            <Text>[DOCTORAT]</Text>
            <Text>[DIPLOME_1]</Text>
            <Text>[DIPLOME_2]</Text>
            <Text>[MASTER]</Text>
          </View>
          <View style={[styles.border, styles.margin_s]}></View>
          <View style={[styles.infos, styles.margin_s]}>
            <Text>[MED_CENTER]</Text>
            <Text>[ADDRESS_1]</Text>
            <Text>[ADDRESS_2]</Text>
          </View>
          <View style={[styles.border, styles.margin_s]}></View>
          <View style={[styles.infos, styles.margin_s]}>
            <Text>Tel : [TEL]</Text>
            <Text>Mail : [MAIL]</Text>
          </View>
          <View style={[styles.border, styles.margin_s]}></View>
          <View style={[styles.infos, styles.margin_xxl]}>
            <Text>RPPS : [RPPS]</Text>
          </View>
        </View>
        {/* Title */}
        <View style={[styles.title, styles.margin_xl]}>
          <Text>Compte rendu de consultation</Text>
        </View>

        {/* place + date */}
        <View style={[styles.date, styles.margin_xxl]}>
          <Text>À [WHERE], le [DATE]</Text>
        </View>

        {/* Intro */}
        <View>
          <Text style={styles.margin_s}>Cher confrère, Chère consœur,</Text>
          <Text style={styles.margin_l}>
            J'ai reçu votre [patient/patiente] [MONSIEUR/MADAME] [NOM] [PRENOM],
            [né/née] le [BIRTHDAY], pour le [TOOTH_ACTION] de [TOOTH_ID]([,/et]
            [le [TOOTH_ACTION] de] [OTHER_TEETH])
          </Text>
        </View>

        <View style={[styles.border, styles.margin_l]}></View>

        {/* Anamnèse */}
        <View style={styles.margin_l}>
          <Text style={[styles.margin_s, styles.bold]}>Anamnèse</Text>
          <Text>Antécédents médicaux : [MEDICAL_ANTECEDENTS]</Text>
          <Text>Médicaments : [MEDICATION]</Text>
          <Text style={styles.margin_s}>Allergie : [ALLERGIES]</Text>
          <Text>[DENTAL_HISTORY]</Text>
        </View>

        <View style={[styles.border, styles.margin_l]}></View>

        {/* Examen clinique */}
        <View style={styles.margin_l}>
          <Text style={styles.margin_s}>Examen clinique</Text>
          <Text>[CLINICAL EXAM]</Text>
          <Text>[INSERT TEETH TABLE]</Text>
        </View>

        <View style={[styles.border, styles.margin_l]}></View>

        {/* Examen radiologique */}
        <View style={styles.margin_l}>
          <Text style={styles.margin_s}>Examen radiologique</Text>
          {file.photo && <Image source={file.photo} />}
          <Text>[RADIO_EXAM_RA]</Text>
          <Text>(if !null)[RADIO_EXAM_CBCT]</Text>
        </View>

        <View style={[styles.border, styles.margin_l]}></View>

        {/* Diagnostic */}
        <View style={styles.margin_l}>
          <Text style={styles.margin_s}>Diagnostic</Text>
          <Text>[DIAGNOSTIC]</Text>
        </View>

        <View style={[styles.border, styles.margin_l]}></View>

        {/* Attitude thérapeutique */}
        <View style={styles.margin_xxl}>
          <Text style={styles.margin_s}>Attitude thérapeutique</Text>
          <Text>[treatment]</Text>
        </View>

        {/* Signature */}
        <View style={styles.sign}>
          <Text style={styles.margin_s}>Confraternellement,</Text>
          <Text>[DRNAME]</Text>
        </View>
      </Page>
    </Document>
  )
}
