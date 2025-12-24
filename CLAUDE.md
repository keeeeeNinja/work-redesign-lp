# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a landing page (LP) project for a work redesign consulting service. The LP is designed to convert readers from an article about "work redesign for those who work hard but don't see results" into consultation leads.

**Critical Principle**: This is NOT a "sales-heavy" LP. It's a "portfolio LP" that demonstrates design thinking, UX principles, and implementation skills while serving as a gentle conversion funnel. The tone must remain consultative and empathetic, never pushy.

## File Structure

```
.
├── index.html                  # Main landing page (single-page HTML)
├── assets/
│   ├── css/
│   │   ├── reset.css          # CSS reset
│   │   └── style.css          # Main styles (intrinsic design principles)
│   ├── js/                     # Currently empty (no JS)
│   └── img/                    # Image assets
├── LP設計案/                   # Design specifications (in Japanese)
│   ├── 01_LP構成案.md         # LP structure and concept
│   ├── 02_LPワイヤーフレーム.md # Wireframes
│   ├── 03_再設計フロー.md      # Redesign flow documentation
│   ├── 03_再設計フロー.svg     # Flow diagram
│   └── 04_CTAの置き方.md       # CTA placement strategy
├── UXスペシャリストの思想体系（秋野氏のUX哲学・原則）.md
├── Every Layout.md             # Intrinsic design reference
├── Refactoring UI.md           # UI refinement principles
├── 想定読者.md                  # Target audience personas
└── 記事：頑張っているのに成果が出ない人のための"仕事のやり方再設計".md
```

## Design Philosophy (Critical Context)

### UX Philosophy
Based on `UXスペシャリストの思想体系（秋野氏のUX哲学・原則）.md`:
- **UX is a chain of decisions**, not surface-level styling
- User understanding is **observation and structuring**, not just empathy
- Good UX must be **implemented, used, and sustained** - design without implementation has no value
- The value is in **ability to envision**, not just ability to build

### Layout Philosophy
Based on `Every Layout.md`:
- **Intrinsic Design**: Let content determine layout, not the other way around
- **Algorithmic Layout**: Use browser calculations (flexbox, grid) instead of fixed values
- **Avoid magic numbers**: Use `gap`, `min-width`, `minmax()`, `aspect-ratio` instead of arbitrary pixel values
- **Minimize media queries**: Let flexible layouts adapt naturally

### UI Refinement Philosophy
Based on `Refactoring UI.md`:
- UI quality comes from **systems, not instinct**: spacing scales, color roles, visual hierarchy
- **Strong contrast** - avoid weak grays and ambiguous boundaries
- **Limited color palette** (2-3 colors) with clear roles
- **Visual hierarchy**: Important = bold/large/dark, supplementary = small/light
- **Consistency** is the #1 factor in perceived quality

## HTML Structure (index.html)

The LP follows this semantic flow:

1. **Hero Section** (`.hero`)
   - Eyebrow text indicating this is a "continuation" of an article
   - H1 headline with empathetic messaging
   - Lead paragraphs establishing the problem
   - Note emphasizing "this is NOT a signup page"
   - CTA with explanation

2. **Summary Section** (`.summary`)
   - Reframes the problem: "lack of results ≠ lack of effort"
   - Lists structural issues (not character flaws)

3. **Flow Section** (`.flow`)
   - 8-step redesign process (Steps 0-7)
   - Structured as `<ol>` with `.step` numbers
   - Note about needing guidance

4. **Stuck Section** (`.stuck`)
   - Common obstacles (empathy zone)
   - Reassurance: "this is structural, not a weakness"

5. **Value Section** (`.value`)
   - Service value proposition
   - Grid of 3 value cards
   - Note explaining why writing + web development both matter

6. **Cases Section** (`.cases`)
   - 3 case studies (事例A, B, C)
   - Before → Redesign → After structure

7. **Fit Section** (`.fit`)
   - "Good fit" vs "Not a good fit"
   - Prevents mismatches, builds trust

8. **Consultation Section** (`.consultation`, `#consultation`)
   - Free 30-minute consultation offer
   - Google Form placeholder (TODO)
   - Final CTA with reassurance

9. **Footer**
   - Closing message reinforcing "design, not willpower"

## CSS Architecture (assets/css/style.css)

このサイトは **Refactoring UI** の原則に基づいて設計されています：
- **強いコントラスト**: 曖昧な薄いグレーを排除し、読みやすさを確保
- **体系的な余白**: 8pxスケール（8, 16, 24, 32, 40, 48, 64, 80, 96）で統一
- **明確な視覚的階層**: フォントサイズの差を大きくし、重要度を一目で理解可能に
- **影と余白で区別**: 境界線を最小限にし、影（box-shadow）で立体感を表現
- **一貫性のある色使い**: 役割が明確なカラーシステム

### CSS Custom Properties

#### 色彩設計（誠実さ・安定感・変化への希望）
```css
--bg: #f7f9fc                    /* 背景: 清潔感のあるライトグレー */
--ink: #1a2332                   /* メインテキスト: 濃い青灰色（高コントラスト） */
--ink-light: #3d4d63             /* サブテキスト: やや薄い青灰色 */
--muted: #5a6b82                 /* 補助テキスト: 読みやすい中間グレー */

--accent: #2563eb                /* アクセント: 信頼感のある青 */
--accent-deep: #1e40af           /* アクセント濃: ホバー時などに使用 */
--accent-warm: #f59e0b           /* 温かみのあるアクセント: 注意喚起用 */

--surface: #ffffff               /* カード背景: 純白 */
--surface-2: #ebf2fa             /* セクション背景: 淡い青 */
--surface-dark: #0f1a2e          /* ダーク背景: 相談セクション用 */
```

#### 余白システム（8pxスケール）
```css
--space-1: 8px
--space-2: 16px
--space-3: 24px
--space-4: 32px
--space-5: 40px
--space-6: 48px
--space-8: 64px
--space-10: 80px
--space-12: 96px
```

### タイポグラフィ階層

**視覚的優先順位を明確化:**
- **H1**: `clamp(2.5rem, 5vw, 4rem)` - ヒーローセクションの主見出し
- **Section Title**: `clamp(1.875rem, 3vw, 2.5rem)` - 各セクションの見出し
- **H3 (カード内)**: `1.25rem` - カード見出し
- **本文**: `17px` (1.063rem相当) - 読みやすい大きめサイズ
- **補足テキスト**: `0.938rem` - サブ情報

**重要な原則:**
- サイズ差を大きくして階層を明確に
- line-height は本文 1.7-1.8、見出し 1.15-1.3
- letter-spacing で可読性を調整（見出しは -0.02em〜-0.01em）

### 影（Box Shadow）の使い方

境界線の代わりに影で立体感と区別を表現:
- **カード**: `0 4px 12px 0 rgba(0, 0, 0, 0.08)` - 適度な浮き上がり
- **カードホバー**: `0 8px 20px 0 rgba(0, 0, 0, 0.12)` - より強調
- **CTAボタン**: `0 4px 14px 0 rgba(37, 99, 235, 0.4)` - アクセントカラーで存在感
- **フローステップ**: `0 2px 8px rgba(37, 99, 235, 0.3)` - 番号バッジに深み

### レイアウトパターン
- **Container**: `min(1120px, 90vw)` - intrinsic width
- **Section padding**: `var(--space-10)` (80px) - 統一された垂直リズム
- Uses CSS Grid and Flexbox for intrinsic layouts
- Minimal media queries (following Every Layout principles)

### 主要コンポーネント

#### ボタン（`.button`）
- **デフォルト**: 青背景、白文字、強い影で存在感
- **ゴーストボタン**: 透明背景、青枠、ホバーで塗りつぶし
- **サイズ**: padding `24px 48px`、font-size `1.063rem`
- **ホバー効果**: 濃い青に変化 + わずかに上に移動

#### カード（`.value-card`, `.case-card`, `.fit-card`）
- 白背景、影で浮かせる
- padding `40px`（広めでゆとりのある印象）
- ホバーで上に移動 + 影が濃くなる

#### フローリスト（`.flow-list`）
- 左側に番号バッジ（`.step`）
- 白背景カード、影で区別
- ホバーでインタラクティブ感を演出

## Target Audience (想定読者.md)

Three main personas:
- **Persona A (32, female, office admin)**: Diligent but evaluation doesn't match effort
- **Persona B (39, male, B2B sales)**: High activity but results plateaued
- **Persona C (45, female, coordinator)**: Supports others but own results unclear

**Common LF8 motivations**:
- LF8-No.8: Want social recognition
- LF8-No.3: Avoid fear/pain/danger (evaluation drops)
- LF8-No.6: Don't want to fall behind

**Key insight**: They're NOT lazy - they're structurally stuck. The LP must validate effort while offering structural solutions.

## Tone and Messaging Guidelines

### DO:
- Use empathetic, consultative tone
- Emphasize structure over character/willpower
- Reassure: "This is a design problem, not a you problem"
- Keep CTAs gentle: "整理する" (organize), "相談する" (consult), NOT "申し込む" (sign up)
- Acknowledge constraints (time, money, organizational limits)

### DON'T:
- Use aggressive sales language
- Promise overnight miracles ("〇日で変わる")
- Use motivational/spiritual tone
- Over-praise or validate excessively
- Add new CTAs or sales pressure

## UI/UX Design Tools

### ui-ux-pro-max Skill

This project has access to the **ui-ux-pro-max** skill - a searchable database of UI/UX design intelligence. Use this skill when making design decisions to ensure choices are informed by established patterns and best practices.

**What's included:**
- 50 UI styles (glassmorphism, minimalism, brutalism, etc.)
- 21 color palettes (organized by industry/product type)
- 50 font pairings (Google Fonts ready)
- 20 chart types (for dashboards/analytics)
- 8 stack-specific guidelines (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, HTML+Tailwind)
- Product type recommendations (SaaS, e-commerce, portfolio, etc.)
- Landing page structures and CTA strategies
- UX best practices and anti-patterns

**Location:** `.claude/skills/ui-ux-pro-max/`

#### When to Use This Skill

Use the ui-ux-pro-max skill when:
- Making color palette decisions
- Selecting font pairings or typography systems
- Choosing UI styles for new sections
- Designing new components (buttons, cards, forms, etc.)
- Reviewing existing UI for quality improvements
- Planning page structure or layout changes
- Ensuring accessibility and UX best practices

**Note:** This skill complements (does not replace) the existing design philosophy. Use it to **validate and refine** decisions made using Refactoring UI and Every Layout principles.

#### Basic Usage

Search the knowledge base using Python:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain>
```

**Available search domains:**
- `product` - Product type recommendations (SaaS, e-commerce, portfolio, etc.)
- `style` - UI style details (colors, effects, frameworks)
- `typography` - Font pairings with Google Fonts imports
- `color` - Color palettes by product/industry type
- `landing` - Page structure and CTA strategies
- `chart` - Chart types and library recommendations
- `ux` - Best practices and anti-patterns
- `prompt` - AI prompts and CSS keywords for specific styles

**Stack-specific guidelines:**
```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack html-tailwind
```

Available stacks: `html-tailwind` (default), `react`, `nextjs`, `vue`, `svelte`, `swiftui`, `react-native`, `flutter`

#### Recommended Search Workflow

When working on design tasks, follow this search order:

1. **Product context** - Understand industry standards
   ```bash
   python3 .claude/skills/ui-ux-pro-max/scripts/search.py "consulting service professional" --domain product
   ```

2. **Style direction** - Get detailed style guidelines
   ```bash
   python3 .claude/skills/ui-ux-pro-max/scripts/search.py "minimalism professional" --domain style
   ```

3. **Typography** - Find appropriate font pairings
   ```bash
   python3 .claude/skills/ui-ux-pro-max/scripts/search.py "professional trustworthy" --domain typography
   ```

4. **Color palette** - Get industry-appropriate colors
   ```bash
   python3 .claude/skills/ui-ux-pro-max/scripts/search.py "consulting service" --domain color
   ```

5. **UX validation** - Check best practices
   ```bash
   python3 .claude/skills/ui-ux-pro-max/scripts/search.py "animation" --domain ux
   python3 .claude/skills/ui-ux-pro-max/scripts/search.py "accessibility" --domain ux
   ```

6. **Stack guidelines** - Implementation-specific advice (if needed)
   ```bash
   python3 .claude/skills/ui-ux-pro-max/scripts/search.py "responsive layout" --stack html-tailwind
   ```

#### Integration with Existing Design Philosophy

**Relationship to current principles:**

| Current Principle | ui-ux-pro-max Role |
|-------------------|-------------------|
| **Refactoring UI** | Validates color choices, spacing systems, visual hierarchy |
| **Every Layout** | Provides component patterns that work with intrinsic design |
| **UX Philosophy** | Supplements with research-backed UX patterns and anti-patterns |

**Decision hierarchy:**
1. **Project constraints first** - Respect existing CSS variables, spacing scale, color palette
2. **Search ui-ux-pro-max** - Get industry context and pattern recommendations
3. **Apply principles** - Implement using Refactoring UI + Every Layout guidelines
4. **Validate** - Check against UX best practices in the skill database

#### Example: Adding a New Section

If asked to add a testimonial section:

```bash
# 1. Search landing page patterns
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "testimonial social-proof" --domain landing

# 2. Search UX best practices
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "testimonial" --domain ux

# 3. Search relevant styles (if considering a specific style)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "card layout" --domain style

# 4. Implement using existing CSS architecture
# - Use --space-* variables for spacing
# - Use existing color palette (--ink, --accent, etc.)
# - Follow card component patterns (.value-card as reference)
# - Ensure accessibility (alt text, contrast ratios)
```

#### Quality Checkpoints

Before implementing design decisions, verify:
- [ ] Searched relevant domains (product, style, ux minimum)
- [ ] Recommendations align with existing design philosophy
- [ ] New choices use existing CSS custom properties (no new colors/spacing values)
- [ ] UX anti-patterns have been checked and avoided
- [ ] Implementation respects intrinsic design principles (no magic numbers)

## Development Commands

This is a static HTML project with no build process.

### Preview
```bash
# Option 1: Python simple server
python3 -m http.server 8000

# Option 2: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then open `http://localhost:8000` in your browser.

### Validation
```bash
# HTML validation (requires html5validator)
html5validator --root . --ignore-re 'assets'

# CSS validation (online)
# https://jigsaw.w3.org/css-validator/
```

## Common Modifications

### Updating the Google Form CTA
When the Google Form URL is finalized, update:
```html
<!-- In index.html around line 251 -->
<a class="button ghost" href="https://docs.google.com/forms/d/e/FORM_ID/viewform" target="_blank" rel="noreferrer">
  無料相談フォームを開く
</a>
```

### Adding New Sections
Follow the existing semantic structure:
```html
<section class="new-section">
  <div class="container">
    <h2 class="section-title">Section Title</h2>
    <p class="section-lead">Lead paragraph</p>
    <!-- Content -->
  </div>
</section>
```

Maintain vertical rhythm with `padding: 72px 0` on `<section>`.

### Modifying Styles

**重要な原則（Refactoring UI）:**
1. **余白は8pxスケールから選ぶ**: `--space-1`〜`--space-12` を使用
2. **色は既存パレットから選ぶ**: 新しい色を追加しない
3. **コントラストを維持する**: 薄すぎるグレーは使わない
4. **境界線より影を使う**: `box-shadow` で立体感と区別を表現
5. **タイポグラフィ階層を守る**: サイズ差を大きく、階層を明確に
6. **一貫性を最優先**: 同じ要素には同じスタイルを適用

**スタイル変更時のチェックリスト:**
- [ ] 余白は`--space-*`変数を使用している
- [ ] 色は`:root`で定義されたカラーパレットから選んでいる
- [ ] 影は既存のパターンに沿っている（カード: 0.08, ホバー: 0.12）
- [ ] フォントサイズは既存の階層に合っている
- [ ] レスポンシブ対応が必要な場合、`clamp()`や`min()`を使用
- [ ] 境界線を追加していない（やむを得ない場合のみ使用）

## Content References

- **LP設計案/01_LP構成案.md**: The canonical LP strategy and messaging concept
- **LP設計案/04_CTAの置き方.md**: CTA placement philosophy and tactics
- **想定読者.md**: Detailed personas and LF8 motivational analysis
- **記事：頑張っているのに成果が出ない人のための"仕事のやり方再設計".md**: The original article this LP extends

## Quality Checklist

Before finalizing changes:

### デザイン品質（Refactoring UI基準）
- [ ] **コントラスト**: テキストが読みやすい（薄すぎるグレーを使っていない）
- [ ] **視覚的階層**: 重要な要素が一目で分かる（サイズ・太さ・色で明確に区別）
- [ ] **余白**: 8pxスケールを守っている（`--space-*` 変数を使用）
- [ ] **影**: 境界線の代わりに影で区別している
- [ ] **色の一貫性**: 役割が明確（accent=行動、ink=テキスト、muted=補助）
- [ ] **タイポグラフィ**: フォントサイズの階層が明確（H1 > Section Title > H3 > 本文）

### UX・トーン
- [ ] Tone remains empathetic and non-pushy
- [ ] CTAs are gentle, not aggressive ("整理する"、"相談する" など)
- [ ] Layout works on mobile (test at 375px width)
- [ ] ホバー効果が適切に動作する

### 技術的品質
- [ ] No new colors introduced (既存パレットから選択)
- [ ] Markdown documentation remains aligned if HTML changes
- [ ] Japanese text uses appropriate fonts (sans for UI, serif for emphasis)
- [ ] メディアクエリは最小限（intrinsic design の原則）
