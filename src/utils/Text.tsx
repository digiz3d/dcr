import ReactPDF, { Font, Text as OText, StyleSheet } from '@react-pdf/renderer'

Font.register({
  family: 'Calibri',
  fonts: [
    {
      src: 'https://raw.githubusercontent.com/developwithpassion/devtools/master/shared/extra_fonts/ms_fonts/Calibri.ttf',
    },
    {
      src: 'https://raw.githubusercontent.com/developwithpassion/devtools/master/shared/extra_fonts/ms_fonts/Calibri%20Bold.ttf',
      fontWeight: 'bold',
    },
  ],
})

const styles = StyleSheet.create({
  calibri: { fontFamily: 'Calibri' },
})

export default function Text(props: ReactPDF.TextProps) {
  return (
    <OText
      {...props}
      style={[
        styles.calibri,
        ...(props.style
          ? Array.isArray(props.style)
            ? props.style
            : [props.style]
          : []),
      ]}
      hyphenationCallback={(word) => [word]}
    />
  )
}
