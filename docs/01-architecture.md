# K12 LUMIN Design System — Architecture

> **Lumin** — *Learning Unified Modular Interface Notation*
> Nền tảng thiết kế cho hệ sinh thái giáo dục K12Online.
> Phiên bản 1.0 · Cập nhật 2026-06-08

---

## 1. Tổng quan

Lumin là design system enterprise-grade, lấy cảm hứng từ Align UI, Untitled UI, Atlassian Design System và IBM Carbon, nhưng được thiết kế riêng cho bối cảnh giáo dục Việt Nam với hàng triệu người dùng trải dài 6 nhóm vai trò:

| Cấp quản lý | Vai trò sử dụng |
|---|---|
| Quản lý nhà nước | Bộ GD&ĐT · Sở GD&ĐT · Phòng GD&ĐT |
| Quản lý trường | Hiệu trưởng · Cán bộ quản lý |
| Tác nghiệp | Giáo viên |
| Người học | Học sinh · (Phụ huynh) |

---

## 2. Design Principles

### 2.1 Enterprise-first
Thiết kế ưu tiên cho luồng công việc dày đặc dữ liệu (data-heavy): bảng biểu lớn, báo cáo, dashboard quản lý. Mật độ thông tin cao nhưng vẫn rõ ràng. Mọi component phải hoạt động tốt ở quy mô hàng nghìn dòng dữ liệu.

> **Quy tắc:** Default density là *comfortable*; cung cấp chế độ *compact* cho power-user (giáo vụ, quản trị).

### 2.2 Accessibility — WCAG 2.2 AA
- Tương phản văn bản ≥ 4.5:1 (text thường), ≥ 3:1 (text lớn ≥ 18px/24px bold).
- Mọi thành phần tương tác có focus ring rõ ràng (3px, `--focus-ring`).
- Target chạm tối thiểu 44×44px trên mobile (WCAG 2.2 — 2.5.8 Target Size).
- Hỗ trợ đầy đủ keyboard navigation, ARIA roles, screen reader.
- Không truyền tải thông tin chỉ bằng màu sắc (luôn kèm icon/text).

### 2.3 Mobile Responsive
Mobile-first với 4 breakpoint. Mọi pattern phải có hành vi xác định trên Mobile / Tablet / Desktop. Component thích ứng — không chỉ co giãn mà thay đổi cấu trúc (vd: Sidebar → Drawer, Table → Card list).

### 2.4 AI-ready
- Cung cấp các slot cho AI: ô gợi ý (AI suggestion), trạng thái streaming, citation, confidence indicator.
- Component `AI Assistant Panel`, `Smart Input` (autocomplete có AI), `Generated Content` badge.
- Token riêng cho AI surface (`--surface-ai`) để phân biệt nội dung do AI tạo.

### 2.5 Data-heavy Interface
Tối ưu cho bảng điểm, danh sách học sinh, thống kê: sticky header/column, virtual scroll, bulk action, inline edit, export. Number formatting theo chuẩn Việt Nam (dấu phẩy thập phân tùy cấu hình).

### 2.6 Consistency
Mọi quyết định thiết kế đến từ token. Không có "magic number". Một hành động giống nhau trông và hoạt động giống nhau ở mọi nơi.

### 2.7 Scalability
Kiến trúc 3 tầng token (Primitive → Semantic → Component) cho phép tạo theme (light/dark, theo Sở/Trường) mà không sửa component. Hỗ trợ white-label cho từng địa phương.

---

## 3. Component Architecture — 5 tầng

```
┌─────────────────────────────────────────────┐
│  FOUNDATION                                   │
│  Color · Typography · Spacing · Radius        │
│  Elevation · Grid · Icon · Motion             │
└───────────────────┬─────────────────────────┘
                    ↓  (định nghĩa bằng Design Tokens)
┌─────────────────────────────────────────────┐
│  PRIMITIVES                                   │
│  Box · Stack · Text · Icon · Surface · Divider│
│  (không có business logic, chỉ layout/style)  │
└───────────────────┬─────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  COMPONENTS                                   │
│  Button · Input · Select · Table · Modal …    │
│  (đơn vị tái sử dụng độc lập, có states)      │
└───────────────────┬─────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  PATTERNS                                     │
│  Form · Data Table View · Filter Bar          │
│  Empty+Loading+Error states · Wizard          │
│  (kết hợp nhiều component giải 1 bài toán UX) │
└───────────────────┬─────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  TEMPLATES                                     │
│  Dashboard · Gradebook · Exam · Report        │
│  (bố cục trang hoàn chỉnh theo vai trò)       │
└─────────────────────────────────────────────┘
```

**Nguyên tắc phụ thuộc:** Tầng dưới không bao giờ phụ thuộc tầng trên. Component không biết nó nằm trong Pattern/Template nào.

---

## 4. Design Token Architecture — 3 tầng

```
PRIMITIVE  →  SEMANTIC  →  COMPONENT
(raw value)   (intent)      (component-specific)

#005CB6   →   Action.Primary   →   Button.Primary.Bg
```

### Tầng 1 — Primitive Tokens
Giá trị thô, không mang ý nghĩa ngữ cảnh. Là bảng màu/scale đầy đủ.
`Color.Blue.700` = `#005CB6` · `Spacing.4` = `16px` · `Radius.md` = `8px`

### Tầng 2 — Semantic Tokens
Gán ý nghĩa/ý định. Component **chỉ** được dùng tầng này (và tầng 3).
`Surface.Default` · `Text.Secondary` · `Border.Subtle` · `Action.Primary` · `Focus.Ring`

### Tầng 3 — Component Tokens
Token riêng cho từng component, tham chiếu semantic.
`Button.Primary.Bg` → `Action.Primary` → `Color.Blue.700`

> **Lợi ích:** Đổi `Action.Primary` từ Blue.700 → Blue.800 chỉ sửa 1 dòng, toàn bộ button/link/focus cập nhật theo. Tạo dark mode = override tầng Semantic, giữ nguyên Component.

Xem chi tiết:
- [`tokens/primitive.json`](../tokens/primitive.json)
- [`tokens/semantic.json`](../tokens/semantic.json)
- [`tokens/component.json`](../tokens/component.json)

---

## 5. Visual Foundation

### 5.1 Color System
| Vai trò | Token | Giá trị |
|---|---|---|
| Brand Primary | `Color.Blue.700` | `#005CB6` |
| Brand Secondary | `Color.Orange.500` | `#F16022` |
| Neutral scale | `Color.Gray.25→950` | 12 bậc |
| Success | `Color.Success.500` | `#12B76A` |
| Warning | `Color.Warning.500` | `#F79009` |
| Error | `Color.Error.500` | `#F04438` |
| Info | `Color.Info.500` | `#2E90FA` |

Mỗi màu có 12 bậc (25, 50, 100–900, 950) để đảm bảo đủ độ tương phản WCAG ở mọi ngữ cảnh.

### 5.2 Typography System
- **Typeface:** Inter (hỗ trợ tiếng Việt đầy đủ, nhiều weight).
- **Type scale:** xs 12 · sm 14 · md 16 · lg 18 · xl 20 · 2xl 24 · 3xl 30 · 4xl 36 · 5xl 48 · 6xl 60.
- **Roles:** Display, Heading (xs→2xl), Body (xs→lg), Label (xs→lg).
- Line-height tăng dần theo độ dài đọc; heading chặt (1.2–1.3), body thoáng (1.5).

### 5.3 Spacing System
Base **4px**. Scale: 0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128px.
Quy tắc: padding trong component dùng 8/12/16; khoảng cách giữa component dùng 16/24; giữa section dùng 32/48/64.

### 5.4 Radius System
none 0 · xs 2 · sm 4 · md 8 (component) · lg 12 (card) · xl 16 (modal) · 2xl 20 · full (pill/avatar).

### 5.5 Elevation System — 6 cấp
| Cấp | Token | Dùng cho |
|---|---|---|
| 0 | flat | nền, hàng bảng |
| 1 | `Shadow.xs` | button, input |
| 2 | `Shadow.sm` | card, dropdown |
| 3 | `Shadow.md` | card hover, popover |
| 4 | `Shadow.lg` | modal, drawer |
| 5 | `Shadow.xl` | toast, overlay nổi |

### 5.6 Grid System
- **Desktop (≥1280):** 12 cột, gutter 24px, container max 1200/1440.
- **Tablet (768–1279):** 8 cột, gutter 20px.
- **Mobile (<768):** 4 cột, gutter 16px, margin 16px.

Breakpoints: `xs 0 · sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.

### 5.7 Iconography
- Bộ icon stroke-based, đồng nhất 1.5px stroke (đề xuất: Lucide / Phosphor).
- Sizes: 16 · 20 · 24 · 32 · 48. Optical alignment trên grid 24.
- Màu thừa hưởng từ `Icon.*` semantic token.

### 5.8 Motion System
| Token | Thời lượng | Dùng cho |
|---|---|---|
| `Duration.fast` | 100ms | hover, color change |
| `Duration.normal` | 200ms | dropdown, tooltip, tab |
| `Duration.slow` | 300ms | modal, drawer, page |
| `Easing.out` | ease-out | phần tử đi vào |
| `Easing.in-out` | ease-in-out | di chuyển 2 chiều |
| `Easing.spring` | spring | nhấn mạnh, micro-interaction |

Luôn tôn trọng `prefers-reduced-motion`.

---

## 6. Naming Convention

### 6.1 Design Tokens
`category.concept.variant.state` — **dot notation, PascalCase concept**
```
Color.Blue.700
Surface.Default
Text.Secondary
Action.Primary.Hover
Button.Destructive.Bg
```

### 6.2 Figma
```
Page:       01 · Foundations  /  08 · Button
Frame:      [Component] Button
Component:  Button
Variant:    Variant=Primary, Size=MD, State=Hover, Icon=Leading
Style:      color/action/primary, text/heading/lg, effect/shadow/sm
```

### 6.3 Code (CSS / React)
| Loại | Quy ước | Ví dụ |
|---|---|---|
| CSS variable | `--{category}-{concept}` kebab | `--action-primary` |
| CSS class | BEM-lite | `.btn`, `.btn--primary`, `.btn__icon` |
| React component | PascalCase | `<Button variant="primary" size="md" />` |
| Prop | camelCase | `leadingIcon`, `isLoading` |
| Boolean prop | `is/has/should` | `isDisabled`, `hasError` |

---

## 7. Tài liệu mỗi component (chuẩn 12 mục)

Mỗi component **bắt buộc** tài liệu hóa theo 12 mục:

1. **Purpose** — mục đích tồn tại
2. **When to use** — khi nào dùng
3. **When not to use** — khi nào KHÔNG dùng (+ component thay thế)
4. **Anatomy** — sơ đồ giải phẫu các phần
5. **Variants** — các biến thể
6. **Sizes** — các kích thước
7. **States** — default, hover, active, focus, disabled, loading, error…
8. **Accessibility** — ARIA, keyboard, contrast, target size
9. **Interaction Rules** — quy tắc tương tác
10. **Responsive Behaviour** — hành vi Mobile/Tablet/Desktop
11. **Design Tokens Mapping** — token nào dùng ở đâu
12. **UX Best Practices** — nên / không nên

---

## 8. Governance — Quản trị design system

| Vai trò | Trách nhiệm |
|---|---|
| **DS Core Team** | Sở hữu token, foundation, component lõi. Duyệt thay đổi breaking. |
| **Contributors** | Đề xuất component mới qua RFC + Figma proposal. |
| **Consumers (product teams)** | Dùng component, báo lỗi, đề xuất. |

**Quy trình thêm component mới:**
```
RFC đề xuất → Review nhu cầu → Design trong Figma → Audit a11y →
Token mapping → Build code → Document 12 mục → Release (semver) → Changelog
```

**Versioning:** Semantic Versioning. `MAJOR` = breaking token/API; `MINOR` = thêm component/variant; `PATCH` = sửa lỗi.

---

## 9. Cấu trúc thư mục dự án

```
K12 design system/
├── tokens/
│   ├── primitive.json       # tầng 1
│   ├── semantic.json        # tầng 2
│   └── component.json       # tầng 3
├── styles/
│   └── tokens.css           # tokens → CSS custom properties
├── docs/
│   ├── 01-architecture.md   # tài liệu này
│   ├── 02-button-spec.md    # spec Button chi tiết
│   ├── 03-figma-structure.md
│   └── 04-frontend-implementation.md
├── component-inventory.md   # danh mục đầy đủ component
└── index.html               # documentation site (localhost)
```
