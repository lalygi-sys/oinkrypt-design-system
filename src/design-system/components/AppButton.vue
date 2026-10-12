<template>
  <q-btn
    unelevated
    dense
    no-caps
    :round="iconOnly"
    :icon="icon"
    :icon-right="iconOnly ? undefined : iconRight"
    :disable="disabled || loading"
    :loading="loading"
    :aria-label="iconOnly ? (label ?? undefined) : undefined"
    class="ds-app-btn"
    :class="[
      `ds-app-btn--${variant}`,
      `ds-app-btn--${size}`,
      { 'ds-app-btn--icon-only': iconOnly },
      tone !== 'default' ? `ds-app-btn--tone-${tone}` : null,
    ]"
    v-bind="$attrs"
  >
    <template v-if="$slots.loading" #loading>
      <slot name="loading" />
    </template>
    <slot>
      <template v-if="!iconOnly">{{ label }}</template>
    </slot>
  </q-btn>
</template>

<script setup lang="ts">
/**
 * AppButton — the one button used everywhere a raw QBtn was reached for
 * directly (DESIGN_SYSTEM.md §6). Product code chooses `variant`/`tone`/
 * `size`; it never sees flat/unelevated/round/no-caps/dense or a raw
 * Quasar palette color — those are this component's job, mapped
 * internally onto DS tokens only.
 *
 * `variant` and `tone` are deliberately two separate, independent axes
 * (DESIGN_SYSTEM.md §6, v0.1.6 revision):
 *   - `variant` is visual hierarchy/emphasis — how loud the button is
 *     (primary: filled; secondary: bordered; ghost: transparent).
 *   - `tone` is semantic intent — what kind of action this is
 *     (default: no special meaning; destructive: undoes/removes
 *     something; warning: high-consequence/caution, not destructive).
 * Any variant can carry any tone (e.g. a low-emphasis `ghost` icon button
 * that's still destructive, or a `secondary` warning action that isn't
 * the page's primary CTA) — collapsing the two into one axis (the old
 * `variant="destructive"`) couldn't express that combination, which is
 * exactly the gap that forced a real product icon-only Stop action into
 * a heavy filled-red treatment it was never meant to have.
 *
 * `iconOnly` is a shape modifier, orthogonal to both axes (a ghost icon
 * button and a primary icon button are both valid) — it switches the
 * button to QBtn's native `round` shape and suppresses only the `label`
 * fallback text (not the default slot itself — a `<q-tooltip>` or other
 * non-visible child passed to an icon-only AppButton still renders; only
 * the *visible fallback text* is gated on `!iconOnly`, so slot content and
 * the `label` prop no longer fight over the same all-or-nothing slot).
 * `#loading` is forwarded verbatim to QBtn's own `loading` slot when a
 * consumer supplies one (e.g. a `<q-spinner-dots>` in place of the default
 * ring spinner) — otherwise QBtn's default loading indicator is used.
 */
import '../tokens/index.css'

withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
  tone?: 'default' | 'destructive' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  icon?: string
  iconRight?: string
  iconOnly?: boolean
  loading?: boolean
  disabled?: boolean
}>(), {
  variant: 'primary',
  tone: 'default',
  size: 'md',
  iconOnly: false,
  loading: false,
  disabled: false,
})

// iconOnly + label gives a visible-text-free button an accessible name for
// free (see :aria-label above) — the same `label` prop already used for
// the fallback slot content, no separate ariaLabel prop needed. A consumer
// can still pass a plain `aria-label` attr directly; $attrs forwards it.
</script>

<style scoped>
/* Sizing: control.sm/md/lg (32/36/40px, DESIGN_SYSTEM.md §2.8) — not Quasar's own `size` prop,
   which uses a different, non-matching heuristic. Label typography scales
   with size, per DESIGN_SYSTEM.md's type scale (no per-size mapping was
   specified for buttons; sm/md/lg -> Utility 01/Body 02 Medium/Body 01
   Medium is this component's own reasonable choice, not a spec value). */
.ds-app-btn {
  border: 1px solid transparent;
  transition: background-color 0.1s ease, border-color 0.1s ease, color 0.1s ease;
}
.ds-app-btn :deep(.q-btn__content) { gap: var(--ds-dimension-6); }

.ds-app-btn--sm { height: var(--ds-control-sm); padding: 0 var(--ds-dimension-10); border-radius: var(--ds-radius-4); font-family: var(--ds-font-ui); font-size: var(--ds-utility-01-size); line-height: var(--ds-utility-01-line-height); font-weight: var(--ds-utility-01-weight); }
.ds-app-btn--md { height: var(--ds-control-md); padding: 0 var(--ds-dimension-12); border-radius: var(--ds-radius-6); font-family: var(--ds-font-ui); font-size: var(--ds-body-02-medium-size); line-height: var(--ds-body-02-medium-line-height); font-weight: var(--ds-body-02-medium-weight); }
.ds-app-btn--lg { height: var(--ds-control-lg); padding: 0 var(--ds-dimension-16); border-radius: var(--ds-radius-8); font-family: var(--ds-font-ui); font-size: var(--ds-body-01-medium-size); line-height: var(--ds-body-01-medium-line-height); font-weight: var(--ds-body-01-medium-weight); }

.ds-app-btn--icon-only.ds-app-btn--sm { width: var(--ds-control-sm); padding: 0; }
.ds-app-btn--icon-only.ds-app-btn--md { width: var(--ds-control-md); padding: 0; }
.ds-app-btn--icon-only.ds-app-btn--lg { width: var(--ds-control-lg); padding: 0; }

/* ============================================================
   variant — hierarchy/emphasis, tone=default (no semantic color).
   No Quasar `color`/`text-color` prop anywhere here: those only resolve
   Quasar's own compiled palette classes, they can't reference a --ds-
   custom property, so background/text/border are set directly instead.
   ============================================================ */
.ds-app-btn--primary { background: var(--ds-action-primary); color: var(--ds-content-inverse); }
.ds-app-btn--primary:hover:not(.disabled) { background: var(--ds-action-primary-hover); }
.ds-app-btn--primary:active:not(.disabled) { background: var(--ds-action-primary-pressed); }

.ds-app-btn--secondary { background: transparent; border-color: var(--ds-border-default); color: var(--ds-content-primary); }
.ds-app-btn--secondary:hover:not(.disabled) { background: var(--ds-interaction-hover); }
.ds-app-btn--secondary:active:not(.disabled) { background: var(--ds-interaction-selected-subtle); }

.ds-app-btn--ghost { background: transparent; color: var(--ds-content-primary); }
.ds-app-btn--ghost:hover:not(.disabled) { background: var(--ds-interaction-hover); }
.ds-app-btn--ghost:active:not(.disabled) { background: var(--ds-interaction-selected-subtle); }

/* ============================================================
   tone=destructive — crossed with all three variants. Compound
   selectors (two classes) so these outrank the plain variant rules
   above regardless of source order.
   ============================================================ */
.ds-app-btn--primary.ds-app-btn--tone-destructive { background: var(--ds-action-destructive); color: var(--ds-content-inverse); }
.ds-app-btn--primary.ds-app-btn--tone-destructive:hover:not(.disabled) { background: var(--ds-action-destructive-hover); }
.ds-app-btn--primary.ds-app-btn--tone-destructive:active:not(.disabled) { background: var(--ds-action-destructive-pressed); }

.ds-app-btn--secondary.ds-app-btn--tone-destructive { border-color: var(--ds-action-destructive); color: var(--ds-action-destructive); }
.ds-app-btn--secondary.ds-app-btn--tone-destructive:hover:not(.disabled) { background: var(--ds-status-critical-subtle-bg); }
.ds-app-btn--secondary.ds-app-btn--tone-destructive:active:not(.disabled) { background: var(--ds-status-critical-subtle-bg); }

.ds-app-btn--ghost.ds-app-btn--tone-destructive { color: var(--ds-action-destructive); }
.ds-app-btn--ghost.ds-app-btn--tone-destructive:hover:not(.disabled) { background: var(--ds-status-critical-subtle-bg); }
.ds-app-btn--ghost.ds-app-btn--tone-destructive:active:not(.disabled) { background: var(--ds-status-critical-subtle-bg); }

/* ============================================================
   tone=warning — crossed with all three variants. Same structure as
   destructive above, built on the action.warning family (§3.2).
   ============================================================ */
.ds-app-btn--primary.ds-app-btn--tone-warning { background: var(--ds-action-warning); color: var(--ds-content-inverse); }
.ds-app-btn--primary.ds-app-btn--tone-warning:hover:not(.disabled) { background: var(--ds-action-warning-hover); }
.ds-app-btn--primary.ds-app-btn--tone-warning:active:not(.disabled) { background: var(--ds-action-warning-pressed); }

.ds-app-btn--secondary.ds-app-btn--tone-warning { border-color: var(--ds-action-warning); color: var(--ds-action-warning); }
.ds-app-btn--secondary.ds-app-btn--tone-warning:hover:not(.disabled) { background: var(--ds-status-high-subtle-bg); }
.ds-app-btn--secondary.ds-app-btn--tone-warning:active:not(.disabled) { background: var(--ds-status-high-subtle-bg); }

.ds-app-btn--ghost.ds-app-btn--tone-warning { color: var(--ds-action-warning); }
.ds-app-btn--ghost.ds-app-btn--tone-warning:hover:not(.disabled) { background: var(--ds-status-high-subtle-bg); }
.ds-app-btn--ghost.ds-app-btn--tone-warning:active:not(.disabled) { background: var(--ds-status-high-subtle-bg); }

/* Disabled — Quasar adds .disabled to the root; content.disabled/opacity,
   never a separate hardcoded value, and no variant/tone color background
   at all so disabled reads the same regardless of variant or tone. */
.ds-app-btn.disabled {
  opacity: 1;
  background: var(--ds-surface-container) !important;
  color: var(--ds-content-disabled) !important;
  border-color: var(--ds-border-subtle) !important;
}

/* Keyboard focus only (native :focus-visible — never shows on a mouse
   click), same ring mechanism as border.focus/interaction.focus
   elsewhere in the DS — unconditional on variant/tone, matching how
   AppInput/AppSelect's own focus ring stays the same blue regardless of
   the field's error state. */
.ds-app-btn:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--ds-border-focus); }
</style>
