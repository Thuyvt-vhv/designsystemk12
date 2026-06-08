# Frontend Implementation Guidelines

> Lumin Design System · Hướng dẫn triển khai code
> Stack đề xuất: React + TypeScript + Tailwind CSS (token-driven)

---

## 1. Kiến trúc triển khai

```
Design Tokens (JSON)
   │  Style Dictionary / Tokens Studio
   ├──────────────► CSS Variables (styles/tokens.css)
   ├──────────────► Tailwind config (theme extend)
   ├──────────────► TS types (token autocomplete)
   └──────────────► Figma Variables (sync 2 chiều)
```

**Nguyên tắc vàng:** Component code **không bao giờ** hardcode màu/spacing. Luôn tham chiếu CSS variable hoặc Tailwind token đã map từ design token.

```css
/* ✗ SAI */         /* ✓ ĐÚNG */
color: #005CB6;     color: var(--action-primary);
padding: 14px;      padding: var(--sp-3-5);
```

---

## 2. Tailwind config (map từ token)

```js
// tailwind.config.js
const tokens = require('./tokens/primitive.json')

module.exports = {
  theme: {
    extend: {
      colors: {
        brand:   { DEFAULT: '#005CB6', 50:'#E4F0FB', /* …blue scale */ },
        accent:  { DEFAULT: '#F16022', /* …orange scale */ },
        gray:    { /* 25→950 */ },
        success: {…}, warning: {…}, error: {…}, info: {…},
      },
      borderRadius: { sm:'4px', md:'8px', lg:'12px', xl:'16px' },
      boxShadow: {
        xs:'0 1px 2px rgba(16,24,40,.05)',
        sm:'0 1px 3px rgba(16,24,40,.10),0 1px 2px rgba(16,24,40,.06)',
        md:'0 4px 8px -2px rgba(16,24,40,.10),0 2px 4px -2px rgba(16,24,40,.06)',
      },
      fontFamily: { sans:['Inter','sans-serif'], mono:['Fira Code','monospace'] },
      spacing: { /* 4px scale */ },
    }
  }
}
```

---

## 3. Anatomy component — ví dụ Button

```tsx
// Button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const button = cva(
  // base — luôn áp dụng
  'inline-flex items-center justify-center gap-1.5 font-semibold rounded-md ' +
  'transition-colors duration-100 ease-out outline-none ' +
  'focus-visible:ring-[3px] focus-visible:ring-brand-200 ' +
  'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:     'bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900 shadow-xs',
        secondary:   'bg-brand-50 text-brand-700 border border-brand-200 hover:bg-brand-100',
        tertiary:    'bg-transparent text-brand-700 border border-brand-700 hover:bg-brand-50',
        ghost:       'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900',
        destructive: 'bg-error-600 text-white hover:bg-error-700 shadow-xs',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs',
        sm: 'h-8 px-3 text-[13px]',
        md: 'h-9 px-3.5 text-sm',
        lg: 'h-10 px-4 text-sm',
        xl: 'h-11 px-4.5 text-base',
      },
      isFullWidth: { true: 'w-full' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  isLoading?: boolean
}

export function Button({
  variant, size, isFullWidth, isLoading,
  leadingIcon, trailingIcon, children, className, disabled, ...props
}: ButtonProps) {
  return (
    <button
      className={cn(button({ variant, size, isFullWidth }), className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading
        ? <Spinner className="size-4 animate-spin" />
        : leadingIcon}
      {children}
      {!isLoading && trailingIcon}
    </button>
  )
}
```

---

## 4. Quy tắc state (CSS)

| State | Cách triển khai |
|---|---|
| Hover | `:hover` — chỉ trên thiết bị có con trỏ: `@media (hover:hover)` |
| Active | `:active` — thêm `scale-[.98]` cho phản hồi xúc giác |
| Focus | `:focus-visible` — **không** `:focus` (tránh ring khi click chuột) |
| Disabled | thuộc tính `disabled` + `aria-disabled` + `cursor-not-allowed` |
| Loading | `aria-busy="true"`, khóa pointer-events, giữ width |

---

## 5. Accessibility checklist (mỗi component)

- [ ] Phần tử ngữ nghĩa đúng (`<button>`, `<nav>`, `<table>`…)
- [ ] Keyboard đầy đủ: Tab, Enter/Space, Arrow, Esc theo pattern
- [ ] `:focus-visible` ring tương phản ≥ 3:1
- [ ] ARIA role/label/state đúng (`aria-expanded`, `aria-selected`, `aria-busy`…)
- [ ] Contrast text ≥ 4.5:1, icon/UI ≥ 3:1
- [ ] Target chạm ≥ 44px mobile
- [ ] Hoạt động với screen reader (NVDA/VoiceOver)
- [ ] Tôn trọng `prefers-reduced-motion`
- [ ] Hỗ trợ zoom 200% không vỡ layout

---

## 6. Responsive strategy

```css
/* Breakpoints (mobile-first) */
sm:  640px    /* điện thoại lớn */
md:  768px    /* tablet dọc */
lg:  1024px   /* tablet ngang / laptop nhỏ */
xl:  1280px   /* desktop */
2xl: 1536px   /* màn lớn */
```

**Pattern thích ứng (không chỉ co giãn):**
| Component | Mobile | Desktop |
|---|---|---|
| Sidebar | Drawer overlay | Cố định 260px |
| Table | Card list / horizontal scroll | Full table |
| Tabs | Scrollable / Select | Inline |
| Modal | Full-screen / bottom sheet | Center 600px |
| Button group | Stack dọc, full-width | Inline phải |

---

## 7. Dark mode

```tsx
// Toggle: thêm data-theme="dark" lên <html>
document.documentElement.setAttribute('data-theme', 'dark')
```
Tất cả semantic token tự đổi qua `[data-theme="dark"]` trong `tokens.css`. Component không cần biết — chỉ dùng `var(--surface-default)`, `var(--text-primary)`…

---

## 8. Performance

- **Virtual scrolling** cho bảng > 100 dòng (react-virtual / TanStack Virtual).
- **Code splitting** theo route/template.
- **Icon** dùng SVG sprite hoặc tree-shakeable (lucide-react), không icon font.
- **CSS** ưu tiên custom properties + Tailwind JIT (purge unused).
- Lazy-load component nặng (Rich Text Editor, Chart, Date Picker).

---

## 9. Token sync workflow

```
1. Sửa token trong Figma Variables / tokens/*.json
2. Chạy Style Dictionary build:
   → styles/tokens.css
   → tailwind.theme.js
   → tokens.d.ts (types)
3. Commit + version bump (semver)
4. CI publish npm package @k12/lumin-tokens
5. Product teams update dependency → nhận token mới
```

---

## 10. Testing

| Loại | Công cụ |
|---|---|
| Visual regression | Chromatic / Playwright screenshots |
| A11y automated | axe-core / jest-axe |
| Interaction | Testing Library + user-event |
| Token contract | Snapshot test token JSON |
| Cross-browser | Playwright (Chrome/Safari/Firefox/Edge) |

---

## 11. Distribution

```
@k12/lumin-tokens     → design tokens (JSON/CSS/JS)
@k12/lumin-react      → React component library
@k12/lumin-icons      → icon set
@k12/lumin-docs       → Storybook documentation site
```

Mỗi package versioned độc lập (semver), changelog tự động, published lên private npm registry của K12Online.
