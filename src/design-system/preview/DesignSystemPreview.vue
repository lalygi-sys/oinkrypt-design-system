<template>
  <div class="ds-preview">
    <header class="ds-preview__header">
      <h1 class="ds-heading-01">Oinkrypt Design System — v0.1 foundations</h1>
      <p class="ds-body-02 ds-preview__muted">
        Token reference for visual review only — TEMPORARY route (<code class="ds-font-mono">/design-system</code>),
        remove before production. Not wired into any product screen; nothing here is a production component yet
        (AppButton/AppInput/AppSelect/FilterChip/SeverityBadge are not implemented in this step — see DESIGN_SYSTEM.md §6).
      </p>
    </header>

    <!-- ================= BRAND ================= -->
    <section class="ds-preview__section">
      <h2 class="ds-heading-02">Brand</h2>
      <p class="ds-body-02 ds-preview__muted">Blue is reserved for primary actions and interactive emphasis only — never a status color.</p>

      <h3 class="ds-heading-03">Primary — solid states</h3>
      <div class="ds-swatch-row">
        <div v-for="b in brandSolid" :key="b.name" class="ds-swatch">
          <div class="ds-swatch__color" :style="{ background: b.value }" />
          <div class="ds-swatch__label ds-utility-02 ds-font-mono">{{ b.name }}</div>
        </div>
      </div>

      <h3 class="ds-heading-03">Interaction / focus washes — shown over surface.elevated</h3>
      <div class="ds-swatch-row">
        <div v-for="b in brandWash" :key="b.name" class="ds-interaction-demo">
          <div class="ds-interaction-demo__wash" :style="{ background: b.value }" />
          <span class="ds-utility-02 ds-font-mono">{{ b.name }}</span>
        </div>
      </div>
    </section>

    <!-- ================= SURFACES ================= -->
    <section class="ds-preview__section">
      <h2 class="ds-heading-02">Surfaces</h2>
      <p class="ds-body-02 ds-preview__muted">Nested exactly like real UI would stack them — page → panel → container → most-elevated element. Judge whether each step reads as a deliberate, subtle lift, not a jump.</p>
      <div class="ds-surface-nest ds-surface-nest--base">
        <span class="ds-utility-02 ds-font-mono ds-surface-nest__tag">surface.base</span>
        <div class="ds-surface-nest ds-surface-nest--subtle">
          <span class="ds-utility-02 ds-font-mono ds-surface-nest__tag">surface.subtle</span>
          <div class="ds-surface-nest ds-surface-nest--container">
            <span class="ds-utility-02 ds-font-mono ds-surface-nest__tag">surface.container</span>
            <div class="ds-surface-nest ds-surface-nest--elevated">
              <span class="ds-utility-02 ds-font-mono ds-surface-nest__tag">surface.elevated</span>
              <span class="ds-body-02 ds-preview__muted">example.com — scan #4</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= CONTENT ================= -->
    <section class="ds-preview__section">
      <h2 class="ds-heading-02">Content</h2>
      <p class="ds-body-02 ds-preview__muted">On surface.base and surface.elevated, so legibility can be checked against both.</p>
      <div class="ds-content-grid">
        <div v-for="surf in ['base', 'elevated']" :key="surf" class="ds-content-grid__col" :style="{ background: surf === 'base' ? 'var(--ds-surface-base)' : 'var(--ds-surface-elevated)' }">
          <span class="ds-utility-02 ds-font-mono ds-preview__muted">on surface.{{ surf }}</span>
          <div v-for="c in contentSwatches" :key="c.name" class="ds-content-demo__row">
            <span class="ds-body-02" :style="{ color: c.value }">{{ c.sample }}</span>
            <span class="ds-utility-02 ds-font-mono ds-preview__muted">{{ c.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= BORDERS ================= -->
    <section class="ds-preview__section">
      <h2 class="ds-heading-02">Borders</h2>
      <div class="ds-swatch-row">
        <div v-for="b in borderSwatches" :key="b.name" class="ds-border-demo" :style="{ borderColor: b.value }">
          <span class="ds-utility-02 ds-font-mono">{{ b.name }}</span>
        </div>
      </div>
    </section>

    <!-- ================= STATUS ================= -->
    <section class="ds-preview__section">
      <h2 class="ds-heading-02">Status</h2>

      <h3 class="ds-heading-03">Solid + subtle, all six — sentence case, both bg and fg shown</h3>
      <div class="ds-swatch-row">
        <div v-for="s in statusPairs" :key="s.name" class="ds-status-demo">
          <div class="ds-status-demo__solid ds-utility-01" :style="{ background: s.solidBg, color: s.solidFg }">{{ s.label }}</div>
          <div class="ds-status-demo__subtle ds-utility-01" :style="{ background: s.subtleBg, color: s.subtleFg }">{{ s.label }}</div>
          <span class="ds-utility-02 ds-font-mono ds-preview__muted">status.{{ s.name }}</span>
        </div>
      </div>

      <h3 class="ds-heading-03">Realistic example — a finding row</h3>
      <div class="ds-finding-demo">
        <span class="ds-mock-badge ds-utility-01" :style="{ background: findingCritical.subtleBg, color: findingCritical.subtleFg }">Critical</span>
        <span class="ds-body-02">12 vulnerabilities</span>
        <span class="ds-utility-01 ds-font-mono ds-preview__muted">CVE-2026-1234</span>
        <span class="ds-mock-badge ds-utility-01" :style="{ background: findingSuccess.subtleBg, color: findingSuccess.subtleFg }">Scan completed</span>
      </div>
    </section>

    <!-- ================= TYPOGRAPHY ================= -->
    <section class="ds-preview__section">
      <h2 class="ds-heading-02">Typography</h2>
      <div class="ds-type-sample">
        <span class="ds-utility-02 ds-font-mono ds-preview__muted">Heading 01 — 28/36/600</span>
        <div class="ds-heading-01">Security posture overview</div>
      </div>
      <div class="ds-type-sample">
        <span class="ds-utility-02 ds-font-mono ds-preview__muted">Heading 02 — 20/28/600</span>
        <div class="ds-heading-02">example.com — scan results</div>
      </div>
      <div class="ds-type-sample">
        <span class="ds-utility-02 ds-font-mono ds-preview__muted">Heading 03 — 16/24/600</span>
        <div class="ds-heading-03">Critical findings</div>
      </div>
      <div class="ds-type-sample">
        <span class="ds-utility-02 ds-font-mono ds-preview__muted">Body 01 — 14/20/400</span>
        <div class="ds-body-01">Scan completed for example.com. 12 vulnerabilities were found across 4 severity tiers.</div>
      </div>
      <div class="ds-type-sample">
        <span class="ds-utility-02 ds-font-mono ds-preview__muted">Body 01 Medium — 14/20/500</span>
        <div class="ds-body-01-medium">12 vulnerabilities found</div>
      </div>
      <div class="ds-type-sample">
        <span class="ds-utility-02 ds-font-mono ds-preview__muted">Body 02 — 13/18/400</span>
        <div class="ds-body-02">Confirmed via Baseline → Control → Attack → Repeat verification, not a single-shot guess.</div>
      </div>
      <div class="ds-type-sample">
        <span class="ds-utility-02 ds-font-mono ds-preview__muted">Body 02 Medium — 13/18/500</span>
        <div class="ds-body-02-medium">CVE-2026-1234</div>
      </div>
      <div class="ds-type-sample">
        <span class="ds-utility-02 ds-font-mono ds-preview__muted">Utility 01 — 12/16/500</span>
        <div class="ds-utility-01">example.com</div>
      </div>
      <div class="ds-type-sample">
        <span class="ds-utility-02 ds-font-mono ds-preview__muted">Utility 02 — 11/14/500</span>
        <div class="ds-utility-02">2 minutes ago</div>
      </div>
      <div class="ds-type-sample">
        <span class="ds-utility-02 ds-font-mono ds-preview__muted">Utility 01 + mono modifier — technical data</span>
        <div class="ds-utility-01 ds-font-mono">CVE-2026-1234 · 203.0.113.42:443</div>
      </div>
    </section>

    <!-- ================= SPACING ================= -->
    <section class="ds-preview__section">
      <h2 class="ds-heading-02">Spacing — 2px-base dimension scale</h2>
      <div class="ds-dim-list">
        <div v-for="d in dimensionSwatches" :key="d.name" class="ds-dim-row">
          <span class="ds-utility-02 ds-font-mono ds-dim-row__label">{{ d.name }}</span>
          <div class="ds-dim-row__bar" :style="{ width: d.value }" />
          <span class="ds-utility-02 ds-font-mono ds-preview__muted">{{ d.px }}</span>
        </div>
      </div>
    </section>

    <!-- ================= RADIUS ================= -->
    <section class="ds-preview__section">
      <h2 class="ds-heading-02">Radius</h2>
      <p class="ds-body-02 ds-preview__muted">Primitive tokens describe geometry only — components choose the primitive that fits their own size/role, shown in the mapping table below.</p>
      <div class="ds-swatch-row">
        <div v-for="r in radiusSwatches" :key="r.name" class="ds-radius-demo" :style="{ borderRadius: r.value }">
          <span class="ds-utility-02 ds-font-mono">{{ r.name }}</span>
        </div>
      </div>

      <h3 class="ds-heading-03">Component mapping</h3>
      <div class="ds-radius-map">
        <div v-for="m in radiusMap" :key="m.component" class="ds-radius-map__row">
          <span class="ds-utility-02 ds-font-mono ds-radius-map__component">{{ m.component }}</span>
          <span class="ds-utility-02 ds-preview__muted">{{ m.mapping }}</span>
        </div>
      </div>
    </section>

    <!-- ================= DENSITY (control heights + icon sizes) ================= -->
    <section class="ds-preview__section">
      <h2 class="ds-heading-02">Density</h2>

      <h3 class="ds-heading-03">Control heights</h3>
      <div class="ds-controls-row ds-controls-row--align-end">
        <div v-for="c in controlHeights" :key="c.name" class="ds-control-height-demo">
          <div class="ds-control-height-demo__bar" :style="{ height: c.value }">
            <span class="ds-utility-02 ds-font-mono">{{ c.px }}</span>
          </div>
          <span class="ds-utility-02 ds-font-mono ds-preview__muted">control.{{ c.name }}</span>
        </div>
      </div>

      <h3 class="ds-heading-03">Icon sizes — 14px is the finalized permanent step, not a migration target</h3>
      <div class="ds-controls-row ds-controls-row--align-end">
        <div v-for="i in iconSizes" :key="i.name" class="ds-icon-demo">
          <div class="ds-icon-demo__dot" :class="{ 'ds-icon-demo__dot--highlight': i.name === '14' }" :style="{ width: i.value, height: i.value }" />
          <span class="ds-utility-02 ds-font-mono ds-preview__muted">{{ i.px }}</span>
        </div>
      </div>
    </section>

    <!-- ================= PRODUCTION COMPONENTS ================= -->
    <section class="ds-preview__section">
      <h2 class="ds-heading-02">Production components</h2>
      <p class="ds-body-02 ds-preview__muted">
        The real AppButton/AppInput/AppSelect/FilterChip/SeverityBadge — this is now the visual QA surface for them,
        not a mock. Not migrated into any product screen yet.
      </p>

      <h3 class="ds-heading-03">AppButton — variant × size (tone.default)</h3>
      <div v-for="size in (['sm', 'md', 'lg'] as const)" :key="size" class="ds-controls-row">
        <span class="ds-utility-02 ds-font-mono ds-preview__muted ds-controls-row__tag">{{ size }}</span>
        <AppButton variant="primary" :size="size">Scan</AppButton>
        <AppButton variant="secondary" :size="size">Cancel</AppButton>
        <AppButton variant="ghost" :size="size">Skip</AppButton>
      </div>

      <h3 class="ds-heading-03">AppButton — variant × tone</h3>
      <p class="ds-body-02 ds-preview__muted">
        <code class="ds-font-mono">variant</code> is visual hierarchy (how loud); <code class="ds-font-mono">tone</code> is semantic
        intent (what kind of action). Reading down a column, the variant stays fixed while tone changes color — reading across a
        row, the tone stays fixed while variant changes weight. The two never depend on each other.
      </p>
      <div class="ds-tone-matrix">
        <div class="ds-tone-matrix__row">
          <span class="ds-utility-02 ds-font-mono ds-preview__muted ds-tone-matrix__label">tone.default</span>
          <AppButton variant="primary">Scan</AppButton>
          <AppButton variant="secondary">Cancel</AppButton>
          <AppButton variant="ghost">Skip</AppButton>
        </div>
        <div class="ds-tone-matrix__row">
          <span class="ds-utility-02 ds-font-mono ds-preview__muted ds-tone-matrix__label">tone.destructive</span>
          <AppButton variant="primary" tone="destructive">Delete project</AppButton>
          <AppButton variant="secondary" tone="destructive">Delete project</AppButton>
          <AppButton variant="ghost" tone="destructive">Stop</AppButton>
        </div>
        <div class="ds-tone-matrix__row">
          <span class="ds-utility-02 ds-font-mono ds-preview__muted ds-tone-matrix__label">tone.warning</span>
          <AppButton variant="primary" tone="warning">Run verification</AppButton>
          <AppButton variant="secondary" tone="warning">Run verification</AppButton>
          <AppButton variant="ghost" tone="warning">Run verification</AppButton>
        </div>
      </div>

      <div class="ds-controls-row">
        <AppButton variant="primary" icon="radar">Start scan</AppButton>
        <AppButton variant="secondary" icon-right="arrow_forward">Next</AppButton>
        <AppButton variant="ghost" icon="more_horiz" icon-only label="More actions" />
        <AppButton variant="ghost" tone="destructive" icon="stop" icon-only label="Stop" />
        <AppButton variant="primary" loading>Scanning</AppButton>
        <AppButton variant="primary" disabled>Scan</AppButton>
        <AppButton variant="primary" tone="destructive" disabled>Delete project</AppButton>
      </div>

      <h3 class="ds-heading-03">AppInput — size × control height, beside matching AppButton</h3>
      <p class="ds-body-02 ds-preview__muted">
        Each row's AppInput and its adjacent same-size AppButton should render at an identical height —
        <code class="ds-font-mono">control.sm/md/lg</code> (32/36/40px) for both, not just AppButton's own sizing.
      </p>
      <div v-for="size in (['sm', 'md', 'lg'] as const)" :key="`input-size-${size}`" class="ds-controls-row">
        <span class="ds-utility-02 ds-font-mono ds-preview__muted ds-controls-row__tag">{{ size }}</span>
        <AppInput :size="size" model-value="example.com" style="width:180px" />
        <AppButton variant="primary" :size="size">Scan</AppButton>
        <span class="ds-utility-02 ds-font-mono ds-preview__muted">{{ controlPx[size] }} / {{ controlPx[size] }}</span>
      </div>

      <h3 class="ds-heading-03">AppInput — size × placeholder/value vertical centering</h3>
      <div v-for="size in (['sm', 'md', 'lg'] as const)" :key="`input-center-${size}`" class="ds-controls-row">
        <span class="ds-utility-02 ds-font-mono ds-preview__muted ds-controls-row__tag">{{ size }}</span>
        <AppInput :size="size" placeholder="https://example.com" style="width:220px" />
        <AppInput :size="size" model-value="https://example.com" style="width:220px" />
      </div>
      <div class="ds-controls-row">
        <span class="ds-utility-02 ds-preview__muted ds-controls-row__tag" />
        <span class="ds-utility-02 ds-preview__muted ds-input-caption">placeholder</span>
        <span class="ds-utility-02 ds-preview__muted ds-input-caption">typed value</span>
      </div>

      <h3 class="ds-heading-03">AppInput — control.md, {{ controlMdPx }}px</h3>
      <div class="ds-controls-row">
        <AppInput v-model="inputDefault" placeholder="https://example.com" style="width:220px" />
        <AppInput v-model="inputFilled" style="width:220px" />
        <AppInput v-model="inputFocus" autofocus style="width:220px" />
        <AppInput
          v-model="inputError"
          error
          error-message="Enter a valid URL"
          style="width:220px"
        />
        <AppInput model-value="example.com" disable style="width:220px" />
        <AppInput model-value="example.com" readonly style="width:220px" />
      </div>
      <div class="ds-controls-row">
        <span class="ds-utility-02 ds-preview__muted ds-input-caption">default</span>
        <span class="ds-utility-02 ds-preview__muted ds-input-caption">filled</span>
        <span class="ds-utility-02 ds-preview__muted ds-input-caption">focus (autofocused on load)</span>
        <span class="ds-utility-02 ds-preview__muted ds-input-caption">error</span>
        <span class="ds-utility-02 ds-preview__muted ds-input-caption">disabled</span>
        <span class="ds-utility-02 ds-preview__muted ds-input-caption">readonly</span>
      </div>
      <div class="ds-controls-row">
        <AppInput v-model="inputWithIcon" placeholder="https://example.com" style="width:220px">
          <template #prepend><q-icon name="travel_explore" size="16px" /></template>
        </AppInput>
        <AppInput v-model="inputClearable" clearable style="width:220px" />
      </div>
      <div class="ds-controls-row">
        <span class="ds-utility-02 ds-preview__muted ds-input-caption">prepend icon</span>
        <span class="ds-utility-02 ds-preview__muted ds-input-caption">clearable</span>
      </div>

      <h3 class="ds-heading-03">AppSelect — size × control height, beside matching AppButton (unlabeled only)</h3>
      <p class="ds-body-02 ds-preview__muted">
        Unlabeled AppSelect supports the same three sizes cleanly — same mechanism as AppInput, applied to both
        <code class="ds-font-mono">.q-field__control</code> and <code class="ds-font-mono">.q-field__native</code> per
        QSelect's own auto-height quirk (see the component's own comment). A <em>labeled</em> AppSelect is
        <strong style="color:var(--ds-content-primary)">not</strong> part of this — it keeps its existing ~40px
        behavior regardless of size, shown separately further below.
      </p>
      <div v-for="size in (['sm', 'md', 'lg'] as const)" :key="`select-size-${size}`" class="ds-controls-row">
        <span class="ds-utility-02 ds-font-mono ds-preview__muted ds-controls-row__tag">{{ size }}</span>
        <AppSelect
          :size="size"
          v-model="selectSizeDemo"
          :options="scheduleOptions"
          option-value="value"
          option-label="label"
          emit-value
          map-options
          style="width:180px"
        />
        <AppButton variant="primary" :size="size">Scan</AppButton>
        <span class="ds-utility-02 ds-font-mono ds-preview__muted">{{ controlPx[size] }} / {{ controlPx[size] }}</span>
      </div>

      <h3 class="ds-heading-03">AppSelect — control.md, {{ controlMdPx }}px</h3>
      <div class="ds-controls-row">
        <AppSelect
          v-model="selectDefault"
          :options="scheduleOptions"
          option-value="value"
          option-label="label"
          emit-value
          map-options
          style="width:180px"
        />
        <AppSelect
          v-model="selectSelected"
          :options="scheduleOptions"
          option-value="value"
          option-label="label"
          emit-value
          map-options
          style="width:180px"
        />
        <AppSelect model-value="6" :options="scheduleOptions" option-value="value" option-label="label" emit-value map-options disable style="width:180px" />
        <AppSelect model-value="6" :options="scheduleOptions" option-value="value" option-label="label" emit-value map-options loading style="width:180px" />
      </div>
      <div class="ds-controls-row">
        <span class="ds-utility-02 ds-preview__muted" style="width:180px">default (click to open)</span>
        <span class="ds-utility-02 ds-preview__muted" style="width:180px">selected</span>
        <span class="ds-utility-02 ds-preview__muted" style="width:180px">disabled</span>
        <span class="ds-utility-02 ds-preview__muted" style="width:180px">loading</span>
      </div>

      <h3 class="ds-heading-03">AppSelect — optional action row (click to open)</h3>
      <p class="ds-body-02 ds-preview__muted">
        "Add schedule" reads as one more row in the list, not a button in a separate footer area — same row height,
        padding, and typography as the real options above it, with only its leading icon tinted to mark it as an
        action. <code class="ds-font-mono">#action</code>/<code class="ds-font-mono">@action-click</code> are
        preview-only wiring — AppSelect owns none of the label, icon, or click behavior itself.
      </p>
      <div class="ds-controls-row">
        <AppSelect
          v-model="selectWithAction"
          :options="scheduleOptions"
          option-value="value"
          option-label="label"
          emit-value
          map-options
          style="width:180px"
          @action-click="onAddScheduleClick"
        >
          <template #action>
            <q-icon name="add" size="16px" />
            Add schedule
          </template>
        </AppSelect>
        <span class="ds-utility-02 ds-preview__muted">{{ addScheduleClickCount }} click(s) on "Add schedule"</span>
      </div>

      <h3 class="ds-heading-03">AppInput / AppSelect — vertical text alignment</h3>
      <p class="ds-body-02 ds-preview__muted">
        Placeholder, typed value, and a selected option, side by side — the visible text in all three should read as
        vertically centered inside the control, not sitting high. Quasar's own base field styling hardcodes a 28px
        line-height (sized for its own ~40px default control); left unset, that pushed text upward inside our
        shorter {{ controlMdPx }}px control. Fixed by setting Body 02's own line-height token explicitly, instead of
        leaving Quasar's mismatched default in place — a real geometry fix, not a nudge.
      </p>
      <div class="ds-controls-row">
        <AppInput v-model="inputDefault" placeholder="https://example.com" style="width:220px" />
        <AppInput v-model="inputFilled" style="width:220px" />
        <AppSelect
          v-model="selectSelected"
          :options="scheduleOptions"
          option-value="value"
          option-label="label"
          emit-value
          map-options
          style="width:220px"
        />
      </div>
      <div class="ds-controls-row">
        <span class="ds-utility-02 ds-preview__muted ds-input-caption">placeholder, {{ controlMdPx }}px</span>
        <span class="ds-utility-02 ds-preview__muted ds-input-caption">typed value, {{ controlMdPx }}px</span>
        <span class="ds-utility-02 ds-preview__muted ds-input-caption">selected value, {{ controlMdPx }}px</span>
      </div>

      <h3 class="ds-heading-03">AppInput / AppSelect — geometry comparison, labeled (real product shape)</h3>
      <p class="ds-body-02 ds-preview__muted">
        Both with a floating label — the shape most real usages actually take (<code class="ds-font-mono">LoginPage</code>'s
        email/password fields, <code class="ds-font-mono">ProjectsPanel</code>'s schedule select), not just the
        placeholder-only examples above. <strong style="color:var(--ds-content-primary)">Heights intentionally differ here</strong> —
        see the caption below.
      </p>
      <div class="ds-controls-row">
        <AppInput v-model="labeledInputDemo" label="Email" style="width:220px" />
        <AppSelect
          v-model="labeledSelectDemo"
          :options="scheduleOptions"
          option-value="value"
          option-label="label"
          emit-value
          map-options
          label="Recurring scan"
          style="width:220px"
        />
      </div>
      <div class="ds-controls-row">
        <span class="ds-utility-02 ds-font-mono ds-preview__muted ds-input-caption">AppInput: {{ controlMdPx }}px, unaffected by label</span>
        <span class="ds-utility-02 ds-font-mono ds-preview__muted" style="width:220px">
          AppSelect: 40px when labeled (open DS decision — see DESIGN_SYSTEM.md §2.8)
        </span>
      </div>

      <h3 class="ds-heading-03">FilterChip — click any chip, this is real interaction state</h3>
      <div class="ds-controls-row">
        <FilterChip :active="neutralActive" @click="neutralActive = !neutralActive">Last 24h</FilterChip>
        <span class="ds-utility-02 ds-preview__muted">neutral, no status — click to toggle</span>
      </div>
      <div class="ds-controls-row">
        <FilterChip
          v-for="s in (['critical', 'high', 'medium', 'low', 'info'] as const)"
          :key="s"
          :status="s"
          :active="activeSeverityChip === s"
          @click="activeSeverityChip = s"
        >{{ severityChipLabel(s) }}</FilterChip>
      </div>

      <h3 class="ds-heading-03">SeverityBadge — all five, label derived from severity</h3>
      <div class="ds-controls-row">
        <SeverityBadge severity="critical" />
        <SeverityBadge severity="high" />
        <SeverityBadge severity="medium" />
        <SeverityBadge severity="low" />
        <SeverityBadge severity="info" />
      </div>
      <div class="ds-controls-row">
        <span class="ds-body-02">CVE-2026-1234</span>
        <SeverityBadge severity="critical" />
        <span class="ds-body-02 ds-preview__muted">— explicit label override:</span>
        <SeverityBadge severity="high" label="Needs retest" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Loads the DS tokens only for this preview — no global import anywhere
// else in the app, so nothing outside this component is affected by
// mounting it (DESIGN_SYSTEM.md-implementation: coexist with hru.css,
// no broad migration).
import '../tokens/index.css'
import { ref } from 'vue'
import { AppButton, AppInput, AppSelect, FilterChip, SeverityBadge } from '../components'

const brandSolid = [
  { name: 'action.primary-hover', value: 'var(--ds-action-primary-hover)' },
  { name: 'action.primary (anchor)', value: 'var(--ds-action-primary)' },
  { name: 'action.primary-pressed', value: 'var(--ds-action-primary-pressed)' },
]

const brandWash = [
  { name: 'interaction.hover', value: 'var(--ds-interaction-hover)' },
  { name: 'interaction.selected-subtle', value: 'var(--ds-interaction-selected-subtle)' },
  { name: 'interaction.selected', value: 'var(--ds-interaction-selected)' },
  { name: 'interaction.focus / border.focus', value: 'var(--ds-interaction-focus)' },
]

const contentSwatches = [
  { name: 'content.primary', value: 'var(--ds-content-primary)', sample: 'Critical vulnerability found' },
  { name: 'content.secondary', value: 'var(--ds-content-secondary)', sample: 'Scan completed for example.com' },
  { name: 'content.muted', value: 'var(--ds-content-muted)', sample: '2 minutes ago' },
  { name: 'content.disabled', value: 'var(--ds-content-disabled)', sample: 'Retest unavailable' },
]

const borderSwatches = [
  { name: 'border.subtle', value: 'var(--ds-border-subtle)' },
  { name: 'border.default', value: 'var(--ds-border-default)' },
  { name: 'border.strong', value: 'var(--ds-border-strong)' },
  { name: 'border.focus', value: 'var(--ds-border-focus)' },
]

const statusPairs = [
  { name: 'critical', label: 'Critical', solidBg: 'var(--ds-status-critical-solid-bg)', solidFg: 'var(--ds-status-critical-solid-fg)', subtleBg: 'var(--ds-status-critical-subtle-bg)', subtleFg: 'var(--ds-status-critical-subtle-fg)' },
  { name: 'high', label: 'High', solidBg: 'var(--ds-status-high-solid-bg)', solidFg: 'var(--ds-status-high-solid-fg)', subtleBg: 'var(--ds-status-high-subtle-bg)', subtleFg: 'var(--ds-status-high-subtle-fg)' },
  { name: 'medium', label: 'Medium', solidBg: 'var(--ds-status-medium-solid-bg)', solidFg: 'var(--ds-status-medium-solid-fg)', subtleBg: 'var(--ds-status-medium-subtle-bg)', subtleFg: 'var(--ds-status-medium-subtle-fg)' },
  { name: 'low', label: 'Low', solidBg: 'var(--ds-status-low-solid-bg)', solidFg: 'var(--ds-status-low-solid-fg)', subtleBg: 'var(--ds-status-low-subtle-bg)', subtleFg: 'var(--ds-status-low-subtle-fg)' },
  { name: 'info', label: 'Info', solidBg: 'var(--ds-status-info-solid-bg)', solidFg: 'var(--ds-status-info-solid-fg)', subtleBg: 'var(--ds-status-info-subtle-bg)', subtleFg: 'var(--ds-status-info-subtle-fg)' },
  { name: 'success', label: 'Scan completed', solidBg: 'var(--ds-status-success-solid-bg)', solidFg: 'var(--ds-status-success-solid-fg)', subtleBg: 'var(--ds-status-success-subtle-bg)', subtleFg: 'var(--ds-status-success-subtle-fg)' },
]

// Named (not indexed) so the finding-row demo below doesn't trip
// noUncheckedIndexedAccess on a plain array lookup.
const findingCritical = { subtleBg: 'var(--ds-status-critical-subtle-bg)', subtleFg: 'var(--ds-status-critical-subtle-fg)' }
const findingSuccess = { subtleBg: 'var(--ds-status-success-subtle-bg)', subtleFg: 'var(--ds-status-success-subtle-fg)' }

const dimensionSwatches = [
  { name: '0', px: '0px', value: 'var(--ds-dimension-0)' },
  { name: '2', px: '2px', value: 'var(--ds-dimension-2)' },
  { name: '4', px: '4px', value: 'var(--ds-dimension-4)' },
  { name: '6', px: '6px', value: 'var(--ds-dimension-6)' },
  { name: '8', px: '8px', value: 'var(--ds-dimension-8)' },
  { name: '10', px: '10px', value: 'var(--ds-dimension-10)' },
  { name: '12', px: '12px', value: 'var(--ds-dimension-12)' },
  { name: '16', px: '16px', value: 'var(--ds-dimension-16)' },
  { name: '20', px: '20px', value: 'var(--ds-dimension-20)' },
  { name: '24', px: '24px', value: 'var(--ds-dimension-24)' },
  { name: '32', px: '32px', value: 'var(--ds-dimension-32)' },
  { name: '40', px: '40px', value: 'var(--ds-dimension-40)' },
  { name: '48', px: '48px', value: 'var(--ds-dimension-48)' },
  { name: '64', px: '64px', value: 'var(--ds-dimension-64)' },
]

const radiusSwatches = [
  { name: '0', value: 'var(--ds-radius-0)' },
  { name: '2', value: 'var(--ds-radius-2)' },
  { name: '4', value: 'var(--ds-radius-4)' },
  { name: '6', value: 'var(--ds-radius-6)' },
  { name: '8', value: 'var(--ds-radius-8)' },
  { name: '10', value: 'var(--ds-radius-10)' },
  { name: '12', value: 'var(--ds-radius-12)' },
  { name: '16', value: 'var(--ds-radius-16)' },
  { name: '20', value: 'var(--ds-radius-20)' },
  { name: '24', value: 'var(--ds-radius-24)' },
  { name: 'full', value: 'var(--ds-radius-full)' },
]

const radiusMap = [
  { component: 'AppButton', mapping: 'sm → radius-4 · md → radius-6 · lg → radius-8' },
  { component: 'AppInput', mapping: 'sm → radius-4 · md → radius-6 · lg → radius-8' },
  { component: 'AppSelect', mapping: 'sm → radius-4 · md → radius-6 · lg → radius-8 (height stays ~40px when labeled, regardless of size — radius still scales)' },
  { component: 'FilterChip', mapping: 'radius-6' },
  { component: 'SeverityBadge', mapping: 'radius-4' },
]

// -- Production component demos --
// AppInput/AppSelect's shared field CSS forces both height AND min-height
// to this token (see each component's own comment on why min-height alone
// isn't enough for AppSelect specifically) — 36px is therefore guaranteed
// by construction, not just measured once and hoped to hold.
const controlMdPx = 36
// Guaranteed-by-construction, same reasoning as controlMdPx above, one
// entry per size prop value — not just measured once and hoped to hold.
const controlPx: Record<'sm' | 'md' | 'lg', number> = { sm: 32, md: 36, lg: 40 }
const inputDefault = ref('')
const inputFilled = ref('example.com')
const inputFocus = ref('example.com')
const inputError = ref('not a url')
const inputWithIcon = ref('')
const inputClearable = ref('example.com')
const labeledInputDemo = ref('')

const scheduleOptions = [
  { value: '0', label: 'Off' },
  { value: '6', label: 'Every 6 hours' },
  { value: '24', label: 'Daily' },
  { value: '168', label: 'Weekly' },
]
const selectDefault = ref<string | null>(null)
const selectSizeDemo = ref('6')
const selectSelected = ref('6')
const selectWithAction = ref('6')
const labeledSelectDemo = ref('6')
const addScheduleClickCount = ref(0)
function onAddScheduleClick() {
  addScheduleClickCount.value++
}

const neutralActive = ref(true)
const activeSeverityChip = ref<'critical' | 'high' | 'medium' | 'low' | 'info'>('critical')
const severityChipLabels: Record<typeof activeSeverityChip.value, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  info: 'Info',
}
function severityChipLabel(s: typeof activeSeverityChip.value) {
  return severityChipLabels[s]
}

const controlHeights = [
  { name: 'sm', px: '32px', value: 'var(--ds-control-sm)' },
  { name: 'md', px: '36px', value: 'var(--ds-control-md)' },
  { name: 'lg', px: '40px', value: 'var(--ds-control-lg)' },
]

const iconSizes = [
  { name: '12', px: '12px', value: 'var(--ds-icon-12)' },
  { name: '14', px: '14px', value: 'var(--ds-icon-14)' },
  { name: '16', px: '16px', value: 'var(--ds-icon-16)' },
  { name: '20', px: '20px', value: 'var(--ds-icon-20)' },
  { name: '24', px: '24px', value: 'var(--ds-icon-24)' },
  { name: '32', px: '32px', value: 'var(--ds-icon-32)' },
  { name: '40', px: '40px', value: 'var(--ds-icon-40)' },
  { name: '48', px: '48px', value: 'var(--ds-icon-48)' },
  { name: '64', px: '64px', value: 'var(--ds-icon-64)' },
]
</script>

<style scoped>
.ds-preview {
  background: var(--ds-surface-base);
  color: var(--ds-content-primary);
  font-family: var(--ds-font-ui);
  padding: var(--ds-dimension-32);
  min-height: 100vh;
}
.ds-preview code { font-family: var(--ds-font-mono); }
.ds-preview__header { margin-bottom: var(--ds-dimension-32); }
.ds-preview__muted { color: var(--ds-content-muted); }
.ds-preview__section {
  margin-bottom: var(--ds-dimension-48);
  padding-bottom: var(--ds-dimension-32);
  border-bottom: 1px solid var(--ds-border-subtle);
}
.ds-preview__section h2 { margin-bottom: var(--ds-dimension-20); }
.ds-preview__section h3 { margin: var(--ds-dimension-24) 0 var(--ds-dimension-12); color: var(--ds-content-secondary); }

/* -- generic swatches -- */
.ds-swatch-row { display: flex; flex-wrap: wrap; gap: var(--ds-dimension-16); }
.ds-swatch { display: flex; flex-direction: column; align-items: center; gap: var(--ds-dimension-6); width: 84px; }
.ds-swatch__color {
  width: 64px; height: 64px;
  border-radius: var(--ds-radius-6);
  border: 1px solid var(--ds-border-subtle);
}
.ds-swatch__label { text-align: center; color: var(--ds-content-muted); word-break: break-all; }

/* -- interaction / brand washes -- */
.ds-interaction-demo { display: flex; flex-direction: column; align-items: center; gap: var(--ds-dimension-6); width: 140px; }
.ds-interaction-demo__wash { width: 100%; height: 64px; border-radius: var(--ds-radius-6); background-color: var(--ds-surface-elevated); position: relative; }
.ds-interaction-demo__wash::after { content: ''; position: absolute; inset: 0; border-radius: inherit; background: inherit; }

/* -- surfaces, nested -- */
.ds-surface-nest {
  position: relative;
  border-radius: var(--ds-radius-6);
  padding: var(--ds-dimension-32) var(--ds-dimension-24) var(--ds-dimension-24);
}
.ds-surface-nest--base { background: var(--ds-surface-base); border: 1px solid var(--ds-border-subtle); }
.ds-surface-nest--subtle { background: var(--ds-surface-subtle); }
.ds-surface-nest--container { background: var(--ds-surface-container); }
.ds-surface-nest--elevated { background: var(--ds-surface-elevated); display: flex; align-items: center; gap: var(--ds-dimension-12); padding-top: var(--ds-dimension-20); padding-bottom: var(--ds-dimension-16); }
.ds-surface-nest__tag {
  position: absolute; top: var(--ds-dimension-8); left: var(--ds-dimension-12);
  color: var(--ds-content-muted);
}
.ds-surface-nest--elevated .ds-surface-nest__tag { position: static; margin-right: auto; }

/* -- content -- */
.ds-content-grid { display: flex; gap: var(--ds-dimension-16); flex-wrap: wrap; }
.ds-content-grid__col {
  flex: 1; min-width: 260px;
  padding: var(--ds-dimension-16);
  border-radius: var(--ds-radius-6);
  border: 1px solid var(--ds-border-subtle);
  display: flex; flex-direction: column; gap: var(--ds-dimension-10);
}
.ds-content-demo__row { display: flex; align-items: baseline; justify-content: space-between; gap: var(--ds-dimension-16); }

/* -- border demo -- */
.ds-border-demo {
  width: 140px; height: 56px;
  border-width: 1px; border-style: solid;
  border-radius: var(--ds-radius-6);
  display: flex; align-items: center; justify-content: center;
  background: var(--ds-surface-container);
  color: var(--ds-content-muted);
}

/* -- status demo -- */
.ds-status-demo { display: flex; flex-direction: column; align-items: center; gap: var(--ds-dimension-4); width: 120px; }
.ds-status-demo__solid, .ds-status-demo__subtle {
  width: 100%; padding: var(--ds-dimension-6) var(--ds-dimension-10);
  border-radius: var(--ds-radius-6);
  text-align: center;
}
.ds-finding-demo {
  display: flex; align-items: center; gap: var(--ds-dimension-12);
  padding: var(--ds-dimension-12) var(--ds-dimension-16);
  background: var(--ds-surface-container);
  border: 1px solid var(--ds-border-subtle);
  border-radius: var(--ds-radius-6);
}

/* -- typography -- */
.ds-type-sample { margin-bottom: var(--ds-dimension-16); }
.ds-type-sample > span { display: block; margin-bottom: var(--ds-dimension-4); }

/* -- spacing -- */
.ds-dim-list { display: flex; flex-direction: column; gap: var(--ds-dimension-8); }
.ds-dim-row { display: flex; align-items: center; gap: var(--ds-dimension-12); }
.ds-dim-row__label { width: 24px; color: var(--ds-content-muted); }
.ds-dim-row__bar { height: 12px; background: var(--ds-action-primary); border-radius: var(--ds-radius-6); min-width: 1px; }

/* -- radius -- */
.ds-radius-demo {
  width: 96px; height: 64px;
  border: 1px solid var(--ds-border-default);
  background: var(--ds-surface-container);
  display: flex; align-items: center; justify-content: center;
  color: var(--ds-content-muted);
}
.ds-radius-map { display: flex; flex-direction: column; gap: var(--ds-dimension-8); }
.ds-radius-map__row { display: flex; align-items: baseline; gap: var(--ds-dimension-16); }
.ds-radius-map__component { width: 140px; color: var(--ds-content-secondary); }

/* -- density: control heights + icon sizes -- */
.ds-controls-row--align-end { align-items: flex-end; }
.ds-control-height-demo { display: flex; flex-direction: column; align-items: center; gap: var(--ds-dimension-8); }
.ds-control-height-demo__bar {
  width: 120px;
  background: var(--ds-surface-container);
  border: 1px solid var(--ds-border-default);
  border-radius: var(--ds-radius-6);
  display: flex; align-items: center; justify-content: center;
  color: var(--ds-content-secondary);
}
.ds-icon-demo { display: flex; flex-direction: column; align-items: center; gap: var(--ds-dimension-6); }
.ds-icon-demo__dot { background: var(--ds-content-secondary); border-radius: var(--ds-radius-6); }
.ds-icon-demo__dot--highlight { background: var(--ds-action-primary); }

/* -- production-component demo rows --
   align-items: flex-start (not center) — an erroring AppInput's wrapper
   grows taller than its siblings (error message below, in normal flow);
   centering the row would visually lift its control above the others'
   top edge even though the control itself never moves or resizes. */
.ds-controls-row { display: flex; align-items: flex-start; gap: var(--ds-dimension-12); margin-bottom: var(--ds-dimension-16); flex-wrap: wrap; }
.ds-controls-row__tag { width: 24px; }
.ds-input-caption { width: 220px; }

/* -- AppButton variant x tone matrix -- */
.ds-tone-matrix { display: flex; flex-direction: column; gap: var(--ds-dimension-12); margin-bottom: var(--ds-dimension-16); }
.ds-tone-matrix__row { display: flex; align-items: center; gap: var(--ds-dimension-12); flex-wrap: wrap; }
.ds-tone-matrix__label { width: 108px; flex-shrink: 0; }

/* .ds-mock-badge is still used by the Status section's "realistic finding
   row" demo (a plain <span>, not a component) — kept, everything else
   that used to mock a button/input/select was replaced by the real
   AppButton/AppInput/AppSelect above and removed. */
.ds-mock-badge {
  padding: var(--ds-dimension-4) var(--ds-dimension-10);
  border-radius: var(--ds-radius-4);
}
</style>
