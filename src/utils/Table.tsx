import { StyleSheet, View } from '@react-pdf/renderer'
import { PropsWithChildren } from 'react'
import { MedicalFile } from '../types'
import Text from './Text'

type Props = { teeth: MedicalFile['teeth'] }

const col = StyleSheet.create({
  col: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 0.5,
  },
})
const style = StyleSheet.create({
  row: { flexDirection: 'row' },
  col1: { ...col.col, flex: 0.5 },
  col2: { ...col.col, flex: 1 },
  col3: { ...col.col, flex: 1 },
  col4: { ...col.col, flex: 1 },
  col5: { ...col.col, flex: 1 },
  col6: { ...col.col, flex: 1 },
  col7: { ...col.col, flex: 0.6 },
})

export default function Table({ teeth }: Props) {
  return (
    <View wrap={false}>
      <View style={style.row} fixed>
        <View style={style.col1}>
          <Text style={{ textAlign: 'center' }}>Dent</Text>
        </View>
        <View style={style.col2}>
          <Text style={{ textAlign: 'center' }}>Test thermique</Text>
        </View>
        <View style={style.col3}>
          <Text style={{ textAlign: 'center' }}>Test electrique</Text>
        </View>
        <View style={style.col4}>
          <Text style={{ textAlign: 'center' }}>Test percussion</Text>
        </View>
        <View style={style.col5}>
          <Text style={{ textAlign: 'center' }}>Test palpation</Text>
        </View>
        <View style={style.col6}>
          <Text style={{ textAlign: 'center' }}>Sondage parodontal</Text>
        </View>
        <View style={style.col7}>
          <Text style={{ textAlign: 'center' }}>Mobilité</Text>
        </View>
      </View>
      {teeth.map((t) => (
        <View style={style.row} key={t.id}>
          <View style={style.col1}>
            <Text>{t.id}</Text>
          </View>
          <View style={style.col2}>
            <Text>{t.thermicTest}</Text>
          </View>
          <View style={style.col3}>
            <Text>{t.electricTest}</Text>
          </View>
          <View style={style.col4}>
            <Text>{t.percutionTest}</Text>
          </View>
          <View style={style.col5}>
            <Text>V : {t.palpationTestV}</Text>
            <Text>L : {t.palpationTestL}</Text>
          </View>
          <View style={style.col6}>
            <Text>{t.parodontalProbing}</Text>
          </View>
          <View style={style.col7}>
            <Text>{t.mobility == 'NE' ? 'Non évaluable' : t.mobility}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}
