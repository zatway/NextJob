import { createTamagui } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'
import { fontInter } from '@tamagui/font-inter'
import { createAnimations } from '@tamagui/animations-react-native'

const animations = createAnimations({
    bouncy: {
        type: 'spring',
        damping: 10,
        mass: 0.9,
        stiffness: 100,
    },
    lazy: {
        type: 'spring',
        damping: 20,
        stiffness: 125,
    },
})

export default createTamagui({
    defaultFont: fontInter,
    animations,

    shouldAddPxToRem: true,

    themes,
    tokens,

    shorthands,

    media: {
        xs: { maxWidth: 660 },
        sm: { maxWidth: 800 },
        md: { maxWidth: 1020 },
        lg: { maxWidth: 1280 },
        xl: { maxWidth: 1440 },
        xxl: { maxWidth: 1680 },
    },
})
