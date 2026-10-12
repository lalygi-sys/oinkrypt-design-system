<template>
  <q-chip
    dense
    clickable
    :disable="disabled"
    class="ds-filter-chip"
    :class="[
      status ? `ds-filter-chip--status-${status}` : 'ds-filter-chip--neutral',
      { 'ds-filter-chip--active': active },
    ]"
    v-bind="$attrs"
  >
    <slot />
  </q-chip>
</template>

<script setup lang="ts">
/**
 * FilterChip — one reusable toggle chip (DESIGN_SYSTEM.md §6), not an
 * options-array component. The parent owns the list of filters, the
 * filtering logic, and which value is selected; this component only
 * renders one chip's presentation + interaction state and reports clicks
 * via the native click listener ($attrs forwards @click, same as any
 * other prop/listener not declared here).
 *
 * No `status` -> interaction.selected (brand-neutral "this is the active
 * toggle" wash), matching e.g. a date-range or log-level filter.
 * `status` given -> that severity's solid/subtle status tokens, matching
 * a severity filter chip. Inactive is always the same neutral outline
 * regardless of status — only the active state carries color, mirroring
 * the app's existing severity-filter chip behavior (audit finding, now
 * formalized as the rule instead of three separate hand-written ternaries).
 */
import '../tokens/index.css'

withDefaults(defineProps<{
  active?: boolean
  // `| undefined` explicit (not just `?`) — exactOptionalPropertyTypes
  // distinguishes "prop omitted" from "prop bound to an expression that
  // evaluates to undefined" (e.g. a severity filter's "All" option
  // computing `severity || undefined`); callers need to be able to pass
  // the latter, matching this component's own "no status -> neutral"
  // doc comment above.
  status?: 'critical' | 'high' | 'medium' | 'low' | 'info' | 'success' | undefined
  disabled?: boolean
}>(), {
  active: false,
  disabled: false,
})
</script>

<style scoped>
/* "square" language, per the brief — radius-6, not Quasar's own `square`
   prop (a hard 0px) and not the pill shape either. */
.ds-filter-chip {
  border-radius: var(--ds-radius-6);
  margin: 0;
  font-family: var(--ds-font-ui);
  font-size: var(--ds-utility-01-size);
  line-height: var(--ds-utility-01-line-height);
  font-weight: var(--ds-utility-01-weight);
  height: var(--ds-control-sm);
  padding: 0 var(--ds-dimension-10);
  border: 1px solid var(--ds-border-default);
  background: transparent;
  color: var(--ds-content-secondary);
}
.ds-filter-chip:hover { background: var(--ds-interaction-hover); }
.ds-filter-chip:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--ds-border-focus); }
.ds-filter-chip.disabled { opacity: 0.4; }

/* Active, no status -> brand interaction wash, not a status color. */
.ds-filter-chip--neutral.ds-filter-chip--active {
  background: var(--ds-interaction-selected);
  border-color: transparent;
  color: var(--ds-content-primary);
}

/* Active, with status -> that status's own solid/subtle pair. Inactive
   stays the shared neutral rule above regardless of which status prop
   was passed — color only appears once selected. */
.ds-filter-chip--status-critical.ds-filter-chip--active { background: var(--ds-status-critical-subtle-bg); border-color: transparent; color: var(--ds-status-critical-subtle-fg); }
.ds-filter-chip--status-high.ds-filter-chip--active { background: var(--ds-status-high-subtle-bg); border-color: transparent; color: var(--ds-status-high-subtle-fg); }
.ds-filter-chip--status-medium.ds-filter-chip--active { background: var(--ds-status-medium-subtle-bg); border-color: transparent; color: var(--ds-status-medium-subtle-fg); }
.ds-filter-chip--status-low.ds-filter-chip--active { background: var(--ds-status-low-subtle-bg); border-color: transparent; color: var(--ds-status-low-subtle-fg); }
.ds-filter-chip--status-info.ds-filter-chip--active { background: var(--ds-status-info-subtle-bg); border-color: transparent; color: var(--ds-status-info-subtle-fg); }
.ds-filter-chip--status-success.ds-filter-chip--active { background: var(--ds-status-success-subtle-bg); border-color: transparent; color: var(--ds-status-success-subtle-fg); }
</style>
