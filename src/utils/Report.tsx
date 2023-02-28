import { Document, Image, Page, StyleSheet, View } from '@react-pdf/renderer'
import dayjs from 'dayjs'
import Teeth from '../ui/File/Teeth'

import { MedicalFile, Settings } from '../types'
import Table from './Table'
import Text from './Text'

const trad: Record<MedicalFile['teeth'][number]['treatmentType'], string> = {
  treatment: 'traitement',
  retreatment: 'retraitement',
  advice: 'avis',
  surgery: 'chirurgie',
}

export function teethToString(teeth: MedicalFile['teeth']) {
  //le action de teeth[0], (le action de teeth[1-(n-1)]]) et le action de teeth[n]
  let res = ''
  for (let i = 0; i < teeth.length; i++) {
    if (i != 0) {
      if (i == teeth.length - 1) res += ' et '
      else res += ', '
    }
    switch (teeth[i].treatmentType) {
      case 'retreatment':
      case 'treatment':
        res +=
          'le ' +
          trad[teeth[i].treatmentType] +
          ' endodontique de ' +
          teeth[i].id
        break
      case 'advice':
        res +=
          'un ' +
          trad[teeth[i].treatmentType] +
          ' endodontique sur ' +
          teeth[i].id
        break
      case 'surgery':
        res +=
          'une ' +
          trad[teeth[i].treatmentType] +
          ' endodontique sur ' +
          teeth[i].id
        break
    }
  }
  return res
}

type Props = { file: MedicalFile; settings: Settings }

const styles = StyleSheet.create({
  bold: { fontWeight: 'bold' },
  page: {
    padding: '1.5cm',
    fontSize: '12pt',
    alignContent: 'stretch',
    display: 'flex',
  },
  infos: { textAlign: 'left' },
  title: { textAlign: 'center', fontSize: '24pt' },
  date: { textAlign: 'right', fontSize: '10pt' },
  sign: { textAlign: 'right', fontSize: '10pt' },

  image_container: {
    alignContent: 'flex-start',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: '8.5cm',
    height: 'auto',
    objectFit: 'contain',
    marginBottom: '3px',
  },

  margin_s: { marginBottom: '0.2cm' },
  margin_m: { marginBottom: '0.4cm' },
  margin_l: { marginBottom: '0.8cm' },
  margin_xl: { marginBottom: '1cm' },
  margin_xxl: { marginBottom: '1.5cm' },
  border: {
    display: 'flex',
    alignSelf: 'center',
    minWidth: '90%',
    borderBottomWidth: '1pt',
    borderBottomColor: 'grey',
  },
  border_s: {
    display: 'flex',
    alignSelf: 'flex-start',
    minWidth: '5cm',
    borderBottomWidth: '1pt',
    borderBottomColor: 'grey',
  },
})

export default function Report({ file, settings }: Props) {
  console.log(file.teeth)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.infos, styles.margin_s]}>
          {/* Entete */}
          <Text style={styles.bold}>{settings.doctorName}</Text>
          <Text>{settings.doctorate}</Text>
          <Text>{settings.diploma1}</Text>
          <Text>{settings.diploma2}</Text>
          <Text>{settings.master}</Text>
        </View>
        <View style={[styles.border_s, styles.margin_s]}></View>
        <View style={[styles.infos, styles.margin_s]}>
          <Text style={styles.bold}>{settings.medicalCenter}</Text>
          <Text>{settings.address1}</Text>
          <Text>{settings.address2}</Text>
        </View>
        <View style={[styles.border_s, styles.margin_s]}></View>
        <View
          style={[
            styles.infos,
            {
              display: 'flex',
              flexDirection: 'row',
            },
          ]}
        >
          <Text style={styles.bold}>Tel : </Text>
          <Text>{settings.phoneNumber}</Text>
        </View>
        <View
          style={[
            styles.infos,
            styles.margin_s,
            {
              display: 'flex',
              flexDirection: 'row',
            },
          ]}
        >
          <Text style={styles.bold}>Mail : </Text>
          <Text>{settings.email}</Text>
        </View>
        <View style={[styles.border_s, styles.margin_s]}></View>
        <View
          style={[
            styles.infos,
            styles.margin_xxl,
            {
              display: 'flex',
              flexDirection: 'row',
            },
          ]}
        >
          <Text style={styles.bold}>RPPS : </Text>
          <Text>{settings.rpps}</Text>
        </View>

        {/* Title */}
        <View style={[styles.title, styles.margin_xl, styles.bold]}>
          <Text>Compte rendu de consultation</Text>
        </View>

        {/* place + date */}
        <View style={[styles.date, styles.margin_xxl]}>
          <Text>
            À {settings.where}, le{' '}
            {dayjs(file.fileDate).format('dddd D MMMM YYYY')}
          </Text>
        </View>

        {/* Intro */}
        <View wrap={false}>
          <Text style={styles.margin_s}>{`${
            file.dentistGender == 'm' ? 'Cher confrère,' : 'Chère consœur,'
          }`}</Text>
          <Text style={styles.margin_l}>
            {`Je vous remercie de m'avoir adressé votre ${
              file.gender == 'm' ? 'patient, Monsieur' : 'patiente, Madame'
            } ${file.patientLastName} ${file.patientFirstName}, ${
              file.gender == 'm' ? 'né' : 'née'
            } le ${file.birthDate.toLocaleDateString()}, pour ${teethToString(
              file.teeth,
            )}.`}
          </Text>
        </View>

        <View style={[styles.border, styles.margin_l]}></View>

        {/* Anamnèse */}
        <View style={styles.margin_l} wrap={false}>
          <Text style={[styles.margin_s, styles.bold]}>Anamnèse</Text>
          <Text>Antécédents médicaux : {file.anteriorMedical}</Text>
          <Text>Médicaments : {file.medications}</Text>
          <Text style={styles.margin_s}>Allergie : {file.allergies}</Text>
          <Text>Historique dentaire : {file.anamnesis}</Text>
          <Text style={styles.margin_s}>
            Symptomatologie : {file.symtpoAnte}
          </Text>
        </View>

        <View style={[styles.border, styles.margin_l]}></View>

        {/* Examen clinique */}
        <View style={styles.margin_l}>
          <Text style={[styles.margin_s, styles.bold]}>Examen clinique</Text>
          <Text style={[styles.margin_s]}>{file.clinicalExam}</Text>

          <Text style={[styles.margin_s]}>
            {file.teeth
              .filter((x) => {
                return x.restoration != '' || x.underMicroscope != ''
              })
              .map((x) => {
                let res = ''
                if (file.teeth.length > 1) res += `- ${x.id} - \n`
                if (x.restoration != '')
                  res += `Restauration : ${x.restoration}\n`
                if (x.underMicroscope != '')
                  res += `Sous microscope : ${x.underMicroscope}\n`
                return res
              })}
          </Text>

          <Table teeth={file.teeth}></Table>
        </View>

        <View style={[styles.border, styles.margin_l]}></View>

        {/* Examen radiologique */}
        <Text style={[styles.margin_s, styles.bold]}>Examen radiologique</Text>
        <View style={styles.margin_l}>
          <View style={[styles.margin_m, styles.image_container]}>
            {file.photoOptimized &&
              file.photoOptimized.map((src) => (
                <Image key={src} style={styles.image} source={src} />
              ))}
          </View>
          {file.radioExamRA && (
            <Text style={[styles.margin_s]}>
              Examen radiographique rétro-alvéolaire :
            </Text>
          )}
          {file.radioExamRA && (
            <Text style={styles.margin_l}>{file.radioExamRA}</Text>
          )}
          {file.radioExamCBCT && (
            <Text style={[styles.margin_s]}>Examen radiographique CBCT :</Text>
          )}
          {file.radioExamCBCT && (
            <Text style={styles.margin_s}>{file.radioExamCBCT}</Text>
          )}
        </View>

        <View style={[styles.border, styles.margin_l]}></View>

        {/* Diagnostic */}
        <View style={styles.margin_l} wrap={false}>
          <Text style={[styles.margin_s, styles.bold]}>Diagnostic</Text>
          <Text>{file.diagnostic}</Text>
        </View>

        <View style={[styles.border, styles.margin_l]}></View>

        {/* Attitude thérapeutique */}
        <View style={{ display: 'flex' }} wrap={false}>
          <View style={styles.margin_xxl}>
            <Text style={[styles.margin_s, styles.bold]}>
              Attitude thérapeutique
            </Text>
            <Text>{file.treatment}</Text>
          </View>

          {/* Signature */}
          <View style={styles.sign}>
            <Text style={styles.margin_s}>Confraternellement,</Text>
            <Text>{settings.doctorName}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
