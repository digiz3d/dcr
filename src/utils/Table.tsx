import { Text, View } from '@react-pdf/renderer'
import { MedicalFile } from '../types'

type Props = { teeth: MedicalFile['teeth'] }

export default function Table({ teeth }: Props) {
  return (
    <View>
      <View>
        <View>
          <Text>Dent</Text>
        </View>
        <View>
          <Text>Test thermique</Text>
        </View>
        <View>
          <Text>Test electrique</Text>
        </View>
        <View>
          <Text>Test percussion</Text>
        </View>
        <View>
          <Text>Test palpation</Text>
        </View>
        <View>
          <Text>Sondage parodontal</Text>
        </View>
        <View>
          <Text>Mobilité</Text>
        </View>
      </View>
      {teeth.map((t) => (
        <View>
          <View>
            <Text>{t.id}</Text>
          </View>
          <View>
            <Text>{t.thermicTest}</Text>
          </View>
          <View>
            <Text>{t.electricTest}</Text>
          </View>
          <View>
            <Text>{t.percutionTest}</Text>
          </View>
          <View>
            <Text>
              {t.palpationTestV}
              {t.palpationTestL}
            </Text>
          </View>
          <View>
            <Text>{t.parodontalProbing}</Text>
          </View>
          <View>
            <Text>{t.mobility}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}
