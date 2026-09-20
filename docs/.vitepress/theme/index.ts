// The default theme, unmodified, plus Tailwind. Every page in docs/ sets `layout: home` or
// `layout: page` explicitly (see AGENTS.md's "one rule"), which is what keeps this reading as a
// blog, not documentation, without needing a custom theme at all.
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default DefaultTheme
