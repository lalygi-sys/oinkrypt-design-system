<template>
  <q-select
    :model-value="modelValue"
    outlined
    dense
    dark
    clear-icon="close"
    dropdown-icon="keyboard_arrow_down"
    popup-content-class="ds-app-select__popup"
    :menu-offset="menuOffset"
    class="ds-field ds-app-select"
    :class="`ds-field--${size}`"
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template v-for="slotName in passthroughSlotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>

    <!-- Default option row: label + a small trailing check icon when
         selected — no full-row fill. `<slot name="option">`'s fallback
         content is what renders unless a consumer explicitly overrides
         #option themselves (see the class doc comment below). -->
    <template #option="scope">
      <slot name="option" v-bind="scope">
        <q-item v-bind="scope.itemProps" class="ds-app-select__option">
          <q-item-section>
            <q-item-label v-if="scope.html"><span v-html="scope.label" /></q-item-label>
            <q-item-label v-else>{{ scope.label }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="scope.selected" side class="ds-app-select__option-check">
            <q-icon name="check" size="var(--ds-icon-16)" />
          </q-item-section>
        </q-item>
      </slot>
    </template>

    <!-- Optional action row (§ "AppSelect" glow/action-row refinement
         round). Maps onto QSelect's own native `after-options` slot, but
         renders as a real `<q-item>` — same row height, padding, and
         typography as an actual option row (it shares the popup's generic
         `.q-item` styling, including hover) — not a bordered/padded
         "footer bar." AppSelect owns the row's structure/interaction
         (clickable, closes the popup, hover treatment, icon color); the
         parent owns only its content (icon + label) and what happens on
         `@action-click`. It is never part of QSelect's own options/
         keyboard-nav model (same limitation the old #footer slot had) and
         never receives selected-option treatment, since it was never in
         the `options` array to begin with. Absent entirely when the
         parent doesn't use it. -->
    <template v-if="$slots.action" #after-options>
      <q-item
        clickable
        v-ripple
        v-close-popup
        class="ds-app-select__action"
        @click="$emit('action-click', $event)"
      >
        <q-item-section>
          <q-item-label class="ds-app-select__action-content">
            <slot name="action" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
/**
 * AppSelect — one visual variant only: outlined + dense, matching
 * AppInput exactly (DESIGN_SYSTEM.md §6). `borderless` is deliberately
 * NOT exposed here — the app's one prior borderless QSelect usage was
 * migration debt (§7 of the spec), not a second supported variant.
 *
 * `modelValue` is declared explicitly for the same reason as AppInput.vue
 * (QSelectProps requires it; a loose $attrs passthrough alone doesn't
 * satisfy that under exactOptionalPropertyTypes) — typed as `any`,
 * matching QSelect's own declaration exactly (it has to accept a single
 * value, an array for `multiple`, or a whole option object depending on
 * how the consumer configures the field). Every other prop — options/
 * option-value/option-label/emit-value/map-options/multiple/clearable/
 * disable/loading — falls through via $attrs; most slots are forwarded
 * generically. `option` and `action` are handled explicitly instead (see
 * the template) so this component can supply its own default option
 * rendering (the check-icon treatment) and its own action-row mapping
 * without colliding with the generic passthrough.
 *
 * `size` (sm/md/lg → control.sm/md/lg, 32/36/40px, default `md`) — same
 * scale and typography mapping as AppInput.vue, applied to the same two
 * selectors (`.q-field__control` height AND `.q-field__native` min-height)
 * that component's own comment below explains needing both for, because
 * of QSelect's `q-field--auto-height` class. Deliberately NOT applied when
 * `label` is set: the existing `.q-field--labeled` override further down
 * stays a flat, unconditional ~40px regardless of size, on purpose — see
 * that rule's own comment. A labeled `size="lg"` (36px) select is NOT a
 * disguised fix for that; it still renders at the same ~40px labeled
 * selects always have.
 *
 * `#action` + `@action-click` (v0.1.8, renamed from the earlier `#footer`
 * slot): an optional row appended after the real options, for a
 * product-owned action like "Add schedule". AppSelect owns the row's
 * chrome (clickable QItem, popup-close-on-click, hover treatment, icon
 * color) so it always reads as a plain list item, never as an embedded
 * button — the parent only supplies inner content (label, optional
 * leading icon) via the slot and reacts to the click via the event,
 * rather than owning a whole interactive control itself.
 */
import '../tokens/index.css'
import { computed, useSlots } from 'vue'
import type { QSelectProps } from 'quasar'

withDefaults(defineProps<{
  modelValue?: QSelectProps['modelValue']
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md',
})
defineEmits<{
  'update:modelValue': [value: QSelectProps['modelValue']]
  'action-click': [event: Event]
}>()

const slots = useSlots()
// Every slot the parent passes through as-is, except the two this
// component gives its own explicit template for (see above).
const passthroughSlotNames = computed(() => Object.keys(slots).filter((name) => name !== 'option' && name !== 'action'))

// [horizontal, vertical] px, per QSelect's own `menu-offset` prop (passed
// straight through to QMenu's `offset`). Vertical matches --ds-dimension-4
// (4px) — duplicated as a literal because menu-offset takes plain numbers,
// not a CSS custom property. Horizontal stays 0 so the popup remains
// horizontally aligned with the field.
const menuOffset: [number, number] = [0, 4]
</script>

<style scoped>
/* Identical to AppInput.vue's field block on purpose — see that file's
   comment. Kept as a separate copy rather than a shared CSS file per this
   DS's "keep structure simple" instruction; the two must stay in sync by
   hand if either changes. */
/* QSelect (single, non-use-input) renders with Quasar's own
   `q-field--auto-height` class, which QInput never gets — that class sets
   `.q-field__control { height: auto }` plus a SEPARATE
   `.q-field--auto-height.q-field--dense .q-field__control,
   .q-field--auto-height.q-field--dense .q-field__native { min-height: 40px }`
   floor. Overriding `height` alone (as AppInput.vue does) leaves that
   min-height floor intact, so the control still renders at 40px — both
   `.q-field__control` and `.q-field__native` need their own min-height
   override here too, matching Quasar's own selector pair exactly. Each
   size block below sets both for this reason. */
/* AppSelect + `label` prop: control.md/sm/lg is NOT applied here — reverted to
   Quasar's own natural auto-height sizing (~40px) for this one specific
   combination. Verified in the browser (getBoundingClientRect + a direct
   visual check, not just computed styles) that forcing 32px on a labeled
   select genuinely breaks it: Quasar's `q-field--auto-height` geometry
   for `dense.labeled` is internally tuned around its own 40px default —
   `.q-field__control-container`'s `padding-top: 14px` and
   `.q-field__native`'s `min-height: 24px` both assume that height budget.
   Overriding just those two (to fit content back inside 32px) still left
   the floated label visually cut by the outlined border's top edge — a
   third, independent piece of Quasar-internal geometry (the outlined
   border/notch positioning) would need reverse-engineering too. That's
   fighting Quasar internals, not one clean override — per this round's
   explicit instruction, DS decision needed before forcing this; see
   DESIGN_SYSTEM.md §2.8 for the open item. Unlabeled AppSelect (every
   real usage so far) is unaffected and renders at a true 32px. */
.ds-field.q-field--labeled :deep(.q-field__control) {
  height: auto;
  min-height: 40px;
}

.ds-field :deep(.q-field__control) {
  background: transparent;
}
.ds-field :deep(.q-field__control::before) { border-color: var(--ds-border-default); }
.ds-field:hover :deep(.q-field__control::before) { border-color: var(--ds-border-strong); }
.ds-field :deep(.q-field__native),
.ds-field :deep(.q-field__input) { color: var(--ds-content-primary); font-family: var(--ds-font-ui); }
.ds-field :deep(.q-field__label) { color: var(--ds-content-muted); font-family: var(--ds-font-ui); }
.ds-field :deep(.q-field__prefix),
.ds-field :deep(.q-field__suffix),
.ds-field :deep(.q-field__append),
.ds-field :deep(.q-field__prepend) { color: var(--ds-content-muted); }

/* Clear ("x") and dropdown-chevron icons — Quasar's own defaults are a
   24px filled "cancel" glyph (circular backdrop baked into the glyph
   itself) and a solid filled "arrow_drop_down" triangle; swapped via the
   clear-icon/dropdown-icon props above to plain "close" and the thinner
   "keyboard_arrow_down" chevron, then sized down to icon.16 here — the
   marginal container's own ~28-32px clickable area is untouched, only the
   glyphs shrink. Hover nudges toward content.secondary, no background
   wash (these are plain icons, not buttons). */
.ds-field :deep(.q-field__focusable-action),
.ds-field :deep(.q-select__dropdown-icon) { font-size: var(--ds-icon-16); color: var(--ds-content-muted); }
.ds-field:hover :deep(.q-field__focusable-action),
.ds-field:hover :deep(.q-select__dropdown-icon) { color: var(--ds-content-secondary); }

/* Size — height + radius + typography, one block per control.sm/md/lg
   step (32/36/40px as of v0.2.0, DESIGN_SYSTEM.md §2.8); see AppInput.vue's identical-shaped block for the
   line-height/padding derivation. `.q-field--labeled` above still wins
   here regardless of which size class is set (2 classes on that selector
   outrank 1 on these), so a labeled select at any size keeps its existing
   ~40px behavior unchanged — this size prop deliberately never touches
   that case. */
.ds-field--sm :deep(.q-field__control),
.ds-field--sm :deep(.q-field__marginal) { height: var(--ds-control-sm); }
.ds-field--sm :deep(.q-field__control),
.ds-field--sm :deep(.q-field__native) { min-height: var(--ds-control-sm); }
.ds-field--sm :deep(.q-field__control) { border-radius: var(--ds-radius-4); }
.ds-field--sm :deep(.q-field__native),
.ds-field--sm :deep(.q-field__input) { font-size: var(--ds-utility-01-size); line-height: var(--ds-utility-01-line-height); }

.ds-field--md :deep(.q-field__control),
.ds-field--md :deep(.q-field__marginal) { height: var(--ds-control-md); }
.ds-field--md :deep(.q-field__control),
.ds-field--md :deep(.q-field__native) { min-height: var(--ds-control-md); }
.ds-field--md :deep(.q-field__control) { border-radius: var(--ds-radius-6); }
.ds-field--md :deep(.q-field__native),
.ds-field--md :deep(.q-field__input) { font-size: var(--ds-body-02-size); line-height: var(--ds-body-02-line-height); }

.ds-field--lg :deep(.q-field__control),
.ds-field--lg :deep(.q-field__marginal) { height: var(--ds-control-lg); }
.ds-field--lg :deep(.q-field__control),
.ds-field--lg :deep(.q-field__native) { min-height: var(--ds-control-lg); }
.ds-field--lg :deep(.q-field__control) { border-radius: var(--ds-radius-8); }
.ds-field--lg :deep(.q-field__native),
.ds-field--lg :deep(.q-field__input) { font-size: var(--ds-body-01-size); line-height: var(--ds-body-01-line-height); }

/* Focus/open — a crisp solid ring, not a soft translucent halo. Quasar
   sets `q-field--focused` for both real keyboard/click focus AND while
   the popup is open, so this covers "focus" and "open" as one state, per
   this round's brief. Deliberately opaque (not `border.focus`'s 24%-alpha
   blue used elsewhere) and thinner (1px, not 3px) — a translucent 3px
   ring read as a glow/aura against the dark canvas; a solid 1px addition
   on top of the already-blue border reads as "a slightly bolder crisp
   border" instead, while still being a clearly visible, accessible focus
   indicator. Scoped to AppSelect only — AppInput's own focus ring is
   unchanged. */
.ds-field.q-field--focused :deep(.q-field__control::before) { border-color: var(--ds-blue-500); }
.ds-field.q-field--focused :deep(.q-field__control) { box-shadow: 0 0 0 1px var(--ds-blue-500); }

.ds-field.q-field--error :deep(.q-field__control::before) { border-color: var(--ds-status-critical-solid-bg); }
.ds-field.q-field--error :deep(.q-field__control) { box-shadow: 0 0 0 3px var(--ds-status-critical-subtle-bg); }
.ds-field.q-field--error :deep(.q-field__bottom) { color: var(--ds-status-critical-solid-bg); font-family: var(--ds-font-ui); }

.ds-field.q-field--disabled { opacity: 1; }
.ds-field.q-field--disabled :deep(.q-field__control::before) { border-color: var(--ds-border-subtle); }
.ds-field.q-field--disabled :deep(.q-field__native) { color: var(--ds-content-disabled); }
</style>

<style>
/* NOT scoped, deliberately: QSelect's options popup teleports to <body>
   via QMenu, outside this component's own DOM subtree, so a normal
   `scoped` rule can't reach it. `popup-content-class` (above) gives the
   popup a class unique to AppSelect instead of a global QMenu override —
   this only styles AppSelect's own dropdown, no other QMenu in the app
   (the project-card kebab menu, the user-avatar menu, etc.) is touched. */
.ds-app-select__popup {
  background: var(--ds-surface-elevated);
  border: 1px solid var(--ds-border-default);
  border-radius: var(--ds-radius-6);
  color: var(--ds-content-primary);
  font-family: var(--ds-font-ui);
  /* Quasar's own dark-mode QMenu elevation (`.q-menu--dark`) is a
     WHITE-tinted multi-layer box-shadow — a soft light "aura" bleeding
     outward from a dark popup on a dark page, exactly the glow this round
     removes. The border + surface-color contrast above is enough
     separation from the page on its own; explicitly zeroed rather than
     left to inherit. */
  box-shadow: none;
}
.ds-app-select__popup .q-item {
  color: var(--ds-content-primary);
  font-size: var(--ds-body-02-size);
}

/* Selected — no full-row fill. Quasar's own QItem gives `.q-item--active`
   a `color: var(--q-primary)` by default (its built-in selected-row
   treatment); neutralized here so a selected label never recolors on its
   own — the check icon (rendered in #option above) is the only selected
   indicator, so selection never relies on color alone. */
.ds-app-select__popup .q-item--active {
  color: var(--ds-content-primary);
}
.ds-app-select__option-check {
  /* !important: outranks Quasar's own built-in
     `.q-item--dark .q-item__section--side:not(.q-item__section--avatar)`
     rule (3 class-level selectors) — same precedent as AppButton's
     `.disabled` overrides. */
  color: var(--ds-action-primary) !important;
  min-width: 0;
  padding-left: var(--ds-dimension-8);
}

/* Hover / keyboard-active — a neutral surface step, not the brand-blue
   `interaction.hover`/`.selected-subtle` washes used elsewhere: those read
   as too strong for a menu where every row can take this state. Applies
   identically whether or not the row is also selected — the check icon
   already carries "selected", so hover doesn't need to say it again. */
.ds-app-select__popup .q-item:hover,
.ds-app-select__popup .q-item.q-manual-focusable--focused {
  background: var(--ds-surface-container);
}

/* Optional action row — see the component's #action template. Deliberately
   NOT given its own border/background/padding treatment the way the old
   footer bar was: it's meant to read as one more row in the list, so it
   inherits the exact same `.q-item` sizing, padding, and typography as a
   real option row (the rules above already apply to it generically, since
   it's a real `<q-item>`), including the shared hover treatment. The only
   two things it needs of its own: a background (so it fully occludes
   scrolled-past options while sticky, not because it should visually
   read as a separate surface) and the sticky positioning itself, so it
   stays reachable at the bottom of a long, scrolling option list. */
.ds-app-select__action {
  position: sticky;
  bottom: 0;
  background: var(--ds-surface-elevated);
}
.ds-app-select__action-content {
  display: flex;
  align-items: center;
  gap: var(--ds-dimension-8);
}
.ds-app-select__action-content .q-icon {
  color: var(--ds-action-primary);
}
</style>
