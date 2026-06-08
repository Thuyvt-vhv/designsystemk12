# Figma Structure & Naming Convention

> Lumin Design System · Cấu trúc file Figma và quy ước đặt tên
> Tham chiếu cấu trúc: Untitled UI, Align UI, Final UI

---

## 1. Tổ chức File Figma

Lumin được chia thành **nhiều file liên kết qua Library** để dễ quản lý ở quy mô lớn (mỗi thành phần lớn = 1 page như yêu cầu).

```
📚 LUMIN — Library Hub (published library)
│
├─ 📄 00 · Cover & Changelog
├─ 📄 00 · Getting Started / Guidelines
│
├─ ══════ FOUNDATIONS ══════
├─ 📄 01 · Color System
├─ 📄 02 · Typography
├─ 📄 03 · Spacing & Layout
├─ 📄 04 · Radius & Elevation
├─ 📄 05 · Grid & Breakpoints
├─ 📄 06 · Iconography
├─ 📄 07 · Motion
│
├─ ══════ TOKENS ══════
├─ 📄 08 · Variables — Primitive
├─ 📄 09 · Variables — Semantic
├─ 📄 10 · Variables — Component
│
├─ ══════ COMPONENTS — INPUTS ══════
├─ 📄 11 · Button
├─ 📄 12 · Icon Button
├─ 📄 13 · Input & Textarea
├─ 📄 14 · Select & Combobox
├─ 📄 15 · Checkbox · Radio · Switch
├─ 📄 16 · Date Picker
├─ 📄 17 · File Upload
│
├─ ══════ COMPONENTS — NAVIGATION ══════
├─ 📄 18 · Sidebar
├─ 📄 19 · Topbar
├─ 📄 20 · Breadcrumb
├─ 📄 21 · Tabs
├─ 📄 22 · Menu & Dropdown
├─ 📄 23 · Pagination
│
├─ ══════ COMPONENTS — DATA DISPLAY ══════
├─ 📄 24 · Table
├─ 📄 25 · Card
├─ 📄 26 · List
├─ 📄 27 · Timeline
├─ 📄 28 · Badge & Tag
├─ 📄 29 · Tooltip
│
├─ ══════ COMPONENTS — FEEDBACK ══════
├─ 📄 30 · Toast
├─ 📄 31 · Alert
├─ 📄 32 · Modal & Dialog
├─ 📄 33 · Empty State
├─ 📄 34 · Skeleton
├─ 📄 35 · Progress
│
├─ ══════ LEARNING COMPONENTS ══════
├─ 📄 36 · Course Card
├─ 📄 37 · Learning Path
├─ 📄 38 · Lesson Viewer
├─ 📄 39 · Quiz Component
├─ 📄 40 · Assignment Component
├─ 📄 41 · Certificate Component
│
├─ ══════ PATTERNS ══════
├─ 📄 42 · Form Patterns
├─ 📄 43 · Data Table Patterns
├─ 📄 44 · Filter & Search
├─ 📄 45 · Page States (Empty/Loading/Error)
│
└─ ══════ TEMPLATES ══════
   📄 46 · Dashboard (Bộ/Sở/Phòng/Hiệu trưởng/GV/HS)
   📄 47 · Gradebook
   📄 48 · Exam (Làm bài / Kết quả)
   📄 49 · Report & Analytics
   📄 50 · Mobile Screens
```

---

## 2. Cấu trúc mỗi Component Page

Mỗi page component tổ chức nhất quán theo các section (frame) sau:

```
📄 11 · Button
│
├─ 🟦 Cover           — Tên + mô tả 1 dòng + status (Stable/Beta)
├─ 🟦 Anatomy         — Sơ đồ giải phẫu có chú thích
├─ 🟦 Variants        — Ma trận tất cả variant × size
├─ 🟦 States          — Default/Hover/Active/Focus/Disabled/Loading
├─ 🟦 Specs           — Bảng đo: height, padding, font, gap (redline)
├─ 🟦 Usage ✓/✗       — Do & Don't side-by-side
├─ 🟦 Tokens          — Bảng token mapping
├─ 🟦 Accessibility   — Keyboard map, ARIA, contrast checklist
├─ 🟦 Responsive      — Desktop / Tablet / Mobile
└─ 🟦 Playground      — Component set để duplicate & test
```

---

## 3. Naming Convention trong Figma

### 3.1 Component & Variant
Dùng **Component Properties** với các thuộc tính chuẩn:

```
Component: Button

Properties:
  Variant   = Primary | Secondary | Tertiary | Ghost | Destructive
  Size      = XS | SM | MD | LG | XL
  State     = Default | Hover | Active | Focus | Disabled | Loading
  Icon      = None | Leading | Trailing | Both | Only
  
Instance name tự sinh:
  Button / Variant=Primary, Size=MD, State=Hover, Icon=Leading
```

### 3.2 Layers
```
✓ ĐÚNG                          ✗ SAI
Button                          Rectangle 247
├─ Container                    ├─ Group 12
├─ Leading Icon                 ├─ vector
├─ Label                        ├─ Frame 88
└─ Trailing Icon                └─ text
```

> Quy tắc: đặt tên layer theo **vai trò** (Container, Label, Icon) — KHÔNG để tên tự sinh.

### 3.3 Variables (Figma) — đặt tên theo nhóm
```
Collection: Primitive
  color/blue/700          #005CB6
  spacing/4               16
  radius/md               8

Collection: Semantic   (mode: Light / Dark)
  surface/default        → {color/white}
  text/secondary         → {color/gray/700}
  action/primary         → {color/blue/700}

Collection: Component
  button/primary/bg       → {action/primary}
```

### 3.4 Styles (text & effect)
```
Text styles:    heading/lg · body/md · label/sm
Effect styles:  shadow/xs · shadow/sm · shadow/md · focus/ring
Color (nếu dùng): legacy — ưu tiên Variables
```

---

## 4. Modes (Theme switching)

| Collection | Modes |
|---|---|
| Semantic | **Light** · **Dark** |
| Brand (tùy chọn) | **K12 Default** · **Sở A** · **Trường B** (white-label) |
| Density | **Comfortable** · **Compact** |

Đổi theme = đổi Mode trên frame, không cần detach hay sửa component.

---

## 5. Component Status Labels

| Badge | Ý nghĩa |
|---|---|
| 🟢 Stable | Đã duyệt, dùng production |
| 🟡 Beta | Đang thử nghiệm, có thể đổi |
| 🔵 New | Mới thêm gần đây |
| 🔴 Deprecated | Sắp loại bỏ, có thay thế |

---

## 6. Quy ước Figma ↔ Code

| Figma | Code (CSS var) | Code (token JSON) |
|---|---|---|
| `color/blue/700` | `--c-blue-700` | `Color.Blue.700` |
| `action/primary` | `--action-primary` | `Action.Primary` |
| `surface/default` | `--surface-default` | `Surface.Default` |
| `button/primary/bg` | `--btn-primary-bg` | `Button.Primary.Bg` |

> Một nguồn sự thật: token JSON. Figma Variables và CSS đều generate/sync từ đó (qua Tokens Studio plugin hoặc Style Dictionary).
