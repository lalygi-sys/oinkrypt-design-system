<template>
  <q-input
    ref="qInputRef"
    :model-value="modelValue"
    outlined
    dense
    dark
    clear-icon="close"
    class="ds-field ds-app-input"
    :class="`ds-field--${size}`"
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
/**
 * AppInput — one visual treatment only (outlined + dense), per
 * DESIGN_SYSTEM.md §6. `dark` is hardcoded here, not a prop product code
 * passes — Quasar's dark-mode field logic (correct placeholder/label
 * contrast heuristics) stays on internally, then every actual color is
 * re-skinned with DS tokens below, not Quasar's own dark palette.
 *
 * `modelValue` is the one prop declared explicitly (QInputProps requires
 * it — a loosely-typed $attrs passthrough alone doesn't satisfy that
 * under this project's exactOptionalPropertyTypes), typed identically to
 * QInput's own so v-model works exactly as it would on a raw QInput.
 * Every other prop — label/placeholder/type/clearable/disable/readonly/
 * loading/rules/error/error-message, any native input attr — falls
 * through via $attrs (Vue 3's default for anything not declared here),
 * not recreated. Slots are forwarded generically for the same reason.
 *
 * `size` (sm/md/lg → control.sm/md/lg, 32/36/40px) — default `md`, the
 * only height v0.1 shipped with. Typography scales with it the same way
 * AppButton's does (sm → Utility 01, md → Body 02, lg → Body 01): each
 * tier's line-height was picked so `12px` of Quasar's own fixed native
 * padding (6px top + 6px bottom, untouched — see the size-block comment
 * below) plus that line-height fits inside the control height with an
 * even split left over, not just "smaller text happens to fit."
 *
 * `defineExpose` forwards QInput's own public method surface
 * (resetValidation/validate/focus/blur/select/getNativeElement) —
 * required for product code migrated from a raw `<q-input ref="...">`
 * that calls these imperatively (e.g. a `<q-form>`'s `@validation-error`
 * handler blurring the failed field, or clearing a stale error on
 * refocus via `resetValidation()`). Without this, a template ref on
 * `<AppInput ref="x">` would only see AppInput's own (empty) exposed
 * surface, not QInput's — silently breaking any such call. This is
 * QInput's standard method list verbatim, not anything product-specific.
 */
import '../tokens/index.css'
import { ref } from 'vue'
import type { QInput, QInputProps } from 'quasar'

withDefaults(defineProps<{
  modelValue?: QInputProps['modelValue']
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md',
})
defineEmits<{
  'update:modelValue': [value: QInputProps['modelValue']]
}>()

const qInputRef = ref<QInput>()
defineExpose({
  resetValidation: () => qInputRef.value?.resetValidation(),
  validate: (value?: unknown) => qInputRef.value?.validate(value),
  focus: () => qInputRef.value?.focus(),
  blur: () => qInputRef.value?.blur(),
  select: () => qInputRef.value?.select(),
  getNativeElement: () => qInputRef.value?.getNativeElement(),
})
</script>

<style scoped>
/* Shared field look — kept in sync with AppSelect.vue's identical block
   ("should visually match AppInput exactly where applicable"); no shared
   CSS file for two small, near-identical rule sets per this DS's "keep
   structure simple" instruction. */
.ds-field :deep(.q-field__control) {
  background: transparent;
}
.ds-field :deep(.q-field__control::before) { border-color: var(--ds-border-default); }
.ds-field:hover :deep(.q-field__control::before) { border-color: var(--ds-border-strong); }
.ds-field :deep(.q-field__native),
.ds-field :deep(.q-field__input) { color: var(--ds-content-primary); font-family: var(--ds-font-ui); }
.ds-field :deep(.q-field__native::placeholder) { color: var(--ds-content-muted); }
.ds-field :deep(.q-field__label) { color: var(--ds-content-muted); font-family: var(--ds-font-ui); }
.ds-field :deep(.q-field__prefix),
.ds-field :deep(.q-field__suffix),
.ds-field :deep(.q-field__append),
.ds-field :deep(.q-field__prepend) { color: var(--ds-content-muted); }

/* Clear ("x") icon — Quasar's own default is a 24px filled "cancel" glyph
   (a circle with the X baked in); swapped to the plain "close" glyph via
   the `clear-icon` prop above (no circular backdrop of its own) and sized
   down to icon.16 here — the marginal container around it keeps its
   normal ~28-32px clickable area, only the glyph itself shrinks. Hover
   nudges toward content.secondary for "may slightly increase contrast"
   without a background wash (this is a plain icon, not a button). */
.ds-field :deep(.q-field__focusable-action) { font-size: var(--ds-icon-16); color: var(--ds-content-muted); }
.ds-field:hover :deep(.q-field__focusable-action) { color: var(--ds-content-secondary); }

/* Size — height + radius + typography, one block per control.sm/md/lg
   step (32/36/40px as of v0.2.0, DESIGN_SYSTEM.md §2.8 — was 28/32/36).
   Quasar's own dense-field CSS (node_modules/quasar/dist/quasar.css)
   hardcodes several label/text measurements assuming ITS OWN 40px dense
   control height — `.q-field--dense .q-field__label` is `top: 10px`
   (centers a ~17.5px-tall label in a 40px box, not our own sizes);
   `.q-field--labeled.q-field--dense .q-field__native` is
   `padding-top: 14px; padding-bottom: 2px`; the floated state is
   `transform: translateY(-30%) scale(0.75)`, -30% of the label's own
   (unscaled) height — a fixed ~5.25px lift regardless of control height.
   None of that renegotiates when we override `.q-field__control`'s own
   height below, so md needs the same per-tier label/padding correction
   this block has carried since it first shipped — only re-measured here
   for the new 36px height, not a new kind of fix. Only md is fixed:
   sm/lg have no labeled AppInput anywhere in the product today to
   verify a fix against (grep the tree — every real :label usage is
   size="md", the unspecified default), so tuning them now would be
   unverified guessing. */
.ds-field--sm :deep(.q-field__control),
.ds-field--sm :deep(.q-field__marginal) { height: var(--ds-control-sm); }
.ds-field--sm :deep(.q-field__control) { border-radius: var(--ds-radius-4); }
.ds-field--sm :deep(.q-field__native),
.ds-field--sm :deep(.q-field__input) { font-size: var(--ds-utility-01-size); line-height: var(--ds-utility-01-line-height); }

.ds-field--md :deep(.q-field__control),
.ds-field--md :deep(.q-field__marginal) { height: var(--ds-control-md); }
.ds-field--md :deep(.q-field__control) { border-radius: var(--ds-radius-6); }
/* Re-centers the resting label on the prepend icon (both at this tier's
   real vertical center, y:18 of 36px — verified live via
   getBoundingClientRect on both, not just the token math). This also
   drags the floated position down with it (Quasar's translateY is
   relative to the label's own box, so shifting the pre-transform `top`
   shifts the floated result by the same amount) — the padding below,
   scoped to `.q-field--labeled` only (see below), is sized to clear
   wherever that lands. */
.ds-field--md :deep(.q-field__label) { top: 9px; }
/* Real centering for the common case — an md field with no :label at
   all (every auth-header key/value row, most placeholder-only inputs
   app-wide): Quasar's own stock native padding (6px top + 6px bottom,
   untouched) plus this line-height fits the 36px box with 6px of slack,
   split evenly by the browser's normal centering. This used to be
   overridden unconditionally by the labeled-only rule below, which
   pushed every *unlabeled* md field's text down into the box's bottom
   half (padding-top 18 vs padding-bottom 2 is only correct once a
   floated label actually needs clearing) — found live on
   ScanConfigPanel's Cookie/Authorization rows, fixed by scoping that
   rule to where it's actually needed. */
.ds-field--md :deep(.q-field__native),
.ds-field--md :deep(.q-field__input) {
  font-size: var(--ds-body-02-size);
  line-height: var(--ds-body-02-line-height);
}
/* Labeled state only: the floated label needs explicit clearance the
   stock 6px top padding doesn't give it. 18px top padding clears the
   floated label's bottom edge with a ~1px margin; line-height drops to
   16px (still ≥ this tier's 13px font-size) so 18 + 16 + 2 fits this
   tier's own 36px control exactly. Both are local, deliberately-off-
   token values for that reason, not an oversight — and deliberately
   don't leak onto the unlabeled case above, which already centers
   correctly on its own. */
.ds-field--md.q-field--labeled :deep(.q-field__native),
.ds-field--md.q-field--labeled :deep(.q-field__input) {
  padding-top: 18px;
  padding-bottom: 2px;
  line-height: 16px;
}

.ds-field--lg :deep(.q-field__control),
.ds-field--lg :deep(.q-field__marginal) { height: var(--ds-control-lg); }
.ds-field--lg :deep(.q-field__control) { border-radius: var(--ds-radius-8); }
.ds-field--lg :deep(.q-field__native),
.ds-field--lg :deep(.q-field__input) { font-size: var(--ds-body-01-size); line-height: var(--ds-body-01-line-height); }

/* Focus — border.focus's alpha ring, border-color at the anchor for a
   crisp edge, same mechanism as AppButton's focus-visible ring. */
.ds-field.q-field--focused :deep(.q-field__control::before) { border-color: var(--ds-blue-500); }
.ds-field.q-field--focused :deep(.q-field__control) { box-shadow: 0 0 0 3px var(--ds-border-focus); }

/* Error — status.critical throughout, not just the message text, so the
   field itself (not only the caption below it) signals the problem. */
.ds-field.q-field--error :deep(.q-field__control::before) { border-color: var(--ds-status-critical-solid-bg); }
.ds-field.q-field--error :deep(.q-field__control) { box-shadow: 0 0 0 3px var(--ds-status-critical-subtle-bg); }
.ds-field.q-field--error :deep(.q-field__bottom) { color: var(--ds-status-critical-solid-bg); font-family: var(--ds-font-ui); }

/* Disabled / readonly — content.disabled and border.subtle; distinct from
   each other (readonly is still "real" data, just not editable, so it
   keeps content.primary's normal legibility and only dims the border). */
.ds-field.q-field--disabled { opacity: 1; }
.ds-field.q-field--disabled :deep(.q-field__control::before) { border-color: var(--ds-border-subtle); }
.ds-field.q-field--disabled :deep(.q-field__native) { color: var(--ds-content-disabled); }
.ds-field.q-field--readonly :deep(.q-field__control::before) { border-color: var(--ds-border-subtle); }
</style>
