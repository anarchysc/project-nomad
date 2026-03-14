import { Head } from '@inertiajs/react'
import SettingsLayout from '~/layouts/SettingsLayout'
import StyledSectionHeader from '~/components/StyledSectionHeader'
import { useTheme, ThemeName } from '~/context/ThemeContext'
import { IconCheck } from '@tabler/icons-react'

interface ThemeOption {
  id: ThemeName
  name: string
  description: string
  colors: string[] // 5 preview swatch colors
}

const THEMES: ThemeOption[] = [
  {
    id: 'desert',
    name: 'Desert',
    description: 'Warm sand and olive tones — the original',
    colors: ['#f7eedc', '#424420', '#a84a12', '#8b7355', '#6d7042'],
  },
  {
    id: 'sci-fi',
    name: 'Sci-Fi',
    description: 'Cool steel blue with holographic cyan accents',
    colors: ['#1a2332', '#00b4d8', '#0077b6', '#48cae4', '#0097a7'],
  },
  {
    id: 'kawaii',
    name: 'Kawaii',
    description: 'Soft pastels — pink, lavender, and mint',
    colors: ['#fff0f5', '#e875a8', '#ce93d8', '#81c784', '#f8bbd0'],
  },
  {
    id: 'space',
    name: 'Space',
    description: 'Deep void with purple nebula and starfield',
    colors: ['#0b0d17', '#7c4dff', '#d500f9', '#536dfe', '#ff5252'],
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Dark charcoal, neon magenta, electric cyan',
    colors: ['#121212', '#ff2a6d', '#ffdd00', '#00e5ff', '#c2185b'],
  },
]

export default function AppearancePage() {
  const { theme, setTheme } = useTheme()

  return (
    <SettingsLayout>
      <Head title="Appearance" />
      <div className="flex-1 xl:ml-72 p-6 md:p-10">
        <StyledSectionHeader
          title="Appearance"
          description="Choose a theme for your Command Center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {THEMES.map((t) => {
            const isActive = theme === t.id
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`
                  relative text-left rounded-xl p-5 transition-all duration-200
                  border-2 cursor-pointer
                  ${isActive
                    ? 'border-desert-orange shadow-lg scale-[1.02]'
                    : 'border-desert-stone-lighter hover:border-desert-stone-light hover:shadow-md'
                  }
                `}
                style={{ backgroundColor: t.colors[0] }}
              >
                {isActive && (
                  <div className="absolute top-3 right-3 bg-desert-orange rounded-full p-1">
                    <IconCheck size={16} className="text-white" />
                  </div>
                )}

                {/* Color swatches */}
                <div className="flex gap-2 mb-4">
                  {t.colors.slice(1).map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: t.colors[1] }}
                >
                  {t.name}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: t.colors[4] }}
                >
                  {t.description}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </SettingsLayout>
  )
}
