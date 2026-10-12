<template>
  <q-badge class="ds-severity-badge" :class="`ds-severity-badge--${validSeverity}`">
    {{ visibleLabel }}
  </q-badge>
</template>

<script setup lang="ts">
/**
 * SeverityBadge — the single source of truth for severity -> status
 * token, replacing all four copies of sevColor() found in the audit
 * (DetailDrawer.vue, SecretsPanel.vue, ProjectsPanel.vue, ScanView.vue).
 * Every one of those returned a Quasar named color with a silent
 * `|| 'blue-grey-6'` fallback for anything unrecognized — an unknown
 * severity string quietly became a plain grey chip. This component does
 * not repeat that: an unrecognized value is a loud dev-console error, not
 * a silent fallback (see severityToken() below).
 *
 * `success` is intentionally not part of the severity union — a finding
 * never has "success" as its severity (that's a scan/status concept, not
 * a severity one), and no real SeverityBadge call site needs it, so it
 * isn't added just because status.success exists as a token.
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import '../tokens/index.css'

const props = defineProps<{
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info'
  label?: string
}>()

const { t } = useI18n()
const KNOWN_SEVERITIES = ['critical', 'high', 'medium', 'low', 'info'] as const

// TypeScript's union already blocks an unknown value at compile time for
// typed callers — this is the runtime backstop for a dynamically-computed
// string (e.g. `finding.severity` straight from an API response) that
// doesn't actually match one of the five. Falls back to `info` so a bad
// value still renders *something* legible rather than breaking the page,
// but the fallback is never silent.
const validSeverity = (() => {
  if (KNOWN_SEVERITIES.includes(props.severity)) return props.severity
  console.error(`SeverityBadge: unknown severity "${props.severity}" — falling back to "info". Expected one of: ${KNOWN_SEVERITIES.join(', ')}.`)
  return 'info' as const
})()

const visibleLabel = computed(() => props.label ?? t(`severity.${validSeverity}`))
</script>

<style scoped>
/* One presentation only — the subtle/tinted treatment (soft background +
   solid-colored text), matching the app's existing inline finding-badge
   convention throughout this session's work. A solid-fill variant isn't
   exposed: no real call site needs it yet, so it isn't built speculatively. */
.ds-severity-badge {
  border-radius: var(--ds-radius-4);
  padding: var(--ds-dimension-4) var(--ds-dimension-10);
  font-family: var(--ds-font-ui);
  font-size: var(--ds-utility-01-size);
  line-height: var(--ds-utility-01-line-height);
  font-weight: var(--ds-utility-01-weight);
}
.ds-severity-badge--critical { background: var(--ds-status-critical-subtle-bg); color: var(--ds-status-critical-subtle-fg); }
.ds-severity-badge--high { background: var(--ds-status-high-subtle-bg); color: var(--ds-status-high-subtle-fg); }
.ds-severity-badge--medium { background: var(--ds-status-medium-subtle-bg); color: var(--ds-status-medium-subtle-fg); }
.ds-severity-badge--low { background: var(--ds-status-low-subtle-bg); color: var(--ds-status-low-subtle-fg); }
.ds-severity-badge--info { background: var(--ds-status-info-subtle-bg); color: var(--ds-status-info-subtle-fg); }
</style>
