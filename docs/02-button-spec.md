# Button — Component Specification

> Lumin Design System · Component `Button` · Tier: Components
> Chất lượng tham chiếu: Align UI Button

---

## 1. Purpose
Button kích hoạt một hành động ngay lập tức trong giao diện — gửi form, mở modal, xác nhận, điều hướng hành động chính. Là component tương tác nền tảng, xuất hiện ở mọi luồng.

## 2. When to use
- Kích hoạt hành động: **Lưu**, **Nộp bài**, **Tạo lớp**, **Xuất báo cáo**.
- Đưa ra lựa chọn chính/phụ trong một ngữ cảnh.
- Submit form, mở dialog, xác nhận thao tác.

## 3. When not to use
| Tình huống | Dùng thay thế |
|---|---|
| Điều hướng giữa các trang (URL) | `Link` / `Menu Item` |
| Bật/tắt trạng thái nhị phân | `Switch` |
| Chọn 1 trong nhiều phương án song song | `Segmented Control` / `Radio` |
| Hành động chỉ có icon trong toolbar | `Icon Button` |
| Nhiều hành động trong danh sách thả xuống | `Menu` / `Dropdown` |

## 4. Anatomy

```
┌──────────────────────────────────────────────┐
│  [⟳]   [◅ icon]   Label text   [icon ▻]       │
│   │       │           │            │           │
│   │       │           │            └ Trailing Icon (optional)
│   │       │           └ Label (bắt buộc, trừ icon-only)
│   │       └ Leading Icon (optional)
│   └ Loading Spinner (thay thế leading icon khi loading)
│                                                │
│  └────────────── Container ──────────────────┘ │
└──────────────────────────────────────────────┘
```

| Phần | Bắt buộc | Mô tả |
|---|---|---|
| **Container** | ✓ | Vùng bao, định nghĩa bg, border, radius, padding, height, focus ring |
| **Label** | ✓* | Văn bản hành động (động từ). *Không bắt buộc với Icon Button |
| **Leading Icon** | – | Icon trước label, củng cố ý nghĩa |
| **Trailing Icon** | – | Icon sau label (chevron, external, arrow) |
| **Loading Spinner** | – | Hiện khi `isLoading`, thay vị trí leading icon, label mờ/giữ width |

## 5. Variants

| Variant | Cấp độ nhấn | Bg | Text | Border | Dùng cho |
|---|---|---|---|---|---|
| **Primary** | Cao nhất | `Action.Primary` (Blue.700) | White | – | Hành động chính, 1 cái/khung nhìn |
| **Secondary** | Trung bình | `Blue.50` | `Blue.700` | `Blue.200` | Hành động phụ song hành Primary |
| **Tertiary** | Trung bình–thấp | transparent | `Blue.700` | `Blue.700` (outline) | Outline, ít chiếm thị giác |
| **Ghost** | Thấp | transparent | `Gray.700` | – | Trong toolbar, table row, dày đặc |
| **Destructive** | Cảnh báo | `Error.600` | White | – | Xóa, hủy không hồi phục |

> **Quy tắc altitude:** Mỗi khung nhìn (hoặc mỗi nhóm hành động) chỉ có **một** Primary. Destructive luôn kèm xác nhận nếu hành động không hồi phục.

## 6. Sizes

| Size | Height | Padding-X | Font | Icon | Gap | Radius | Dùng cho |
|---|---|---|---|---|---|---|---|
| **XS** | 28px | 10px | 12px/500 | 14px | 4px | 6px | Bảng dày đặc, inline, tag action |
| **SM** | 32px | 12px | 13px/500 | 16px | 6px | 6px | Toolbar, filter bar, form compact |
| **MD** | 36px | 14px | 14px/600 | 16px | 6px | 8px | **Mặc định** — phần lớn trường hợp |
| **LG** | 40px | 16px | 14px/600 | 18px | 8px | 8px | Form chính, CTA trang |
| **XL** | 44px | 18px | 16px/600 | 20px | 8px | 10px | Hero, landing, mobile primary |

> Trên **mobile**, primary button tối thiểu size **LG (40px)**; full-width CTA dùng **XL (44px)** để đạt target chạm WCAG 2.2.

## 7. States

| State | Mô tả thị giác | Token |
|---|---|---|
| **Default** | Trạng thái nghỉ | `Button.{variant}.Bg` |
| **Hover** | Bg đậm hơn 1 bậc, con trỏ pointer | `Button.{variant}.Bg-hover` |
| **Active** (pressed) | Bg đậm thêm, scale 0.98, đổ bóng giảm | `Button.{variant}.Bg-active` |
| **Focus** (visible) | Giữ bg default + focus ring 3px | `--focus-ring` (Blue.200) |
| **Disabled** | Bg Gray.100, text Gray.400, không pointer, `aria-disabled` | `Button.Disabled.*` |
| **Loading** | Spinner thay leading icon, giữ nguyên width, `aria-busy`, không click được | spinner + label mờ 70% |

### Hành vi state
- **Focus-visible:** chỉ hiện ring khi điều hướng bằng bàn phím (`:focus-visible`), không hiện khi click chuột.
- **Loading:** giữ nguyên kích thước nút (đo width trước khi vào loading) để tránh layout shift.
- **Disabled vs Loading:** Disabled = không cho phép; Loading = đang xử lý (vẫn "bận"). Không dùng disabled thay cho loading.

## 8. Accessibility (WCAG 2.2 AA)

| Tiêu chí | Yêu cầu |
|---|---|
| Role | Phần tử `<button>` gốc; nếu dùng thẻ khác phải `role="button"` |
| Keyboard | `Tab` focus · `Enter`/`Space` kích hoạt |
| Focus ring | Luôn nhìn thấy, tương phản ≥ 3:1 với nền (2.4.11/2.4.13) |
| Contrast | Text/bg ≥ 4.5:1; Primary Blue.700 + White = 8.6:1 ✓ |
| Target size | ≥ 24×24px (2.5.8); mobile ≥ 44×44px |
| Loading | `aria-busy="true"`, thông báo cho screen reader |
| Disabled | `aria-disabled="true"` (ưu tiên hơn thuộc tính `disabled` nếu cần vẫn focus được để giải thích) |
| Icon-only | **Bắt buộc** `aria-label` mô tả hành động |
| Label | Động từ rõ ràng; tránh "Click here", "OK" mơ hồ |

## 9. Interaction Rules
- Một click = một hành động. Chống double-submit bằng cách chuyển sang Loading ngay khi click.
- Không vô hiệu hóa Primary của form chỉ vì chưa hợp lệ — cho click rồi hiện lỗi inline (trừ khi lý do disabled là hiển nhiên).
- Destructive luôn có bước xác nhận nếu không undo được.
- Thứ tự nút trong cụm: **Primary bên phải** (web/desktop VN convention), Secondary/Cancel bên trái. Nhất quán toàn hệ thống.
- Khoảng cách giữa 2 nút trong cụm: `Spacing.3` (12px).

## 10. Responsive Behaviour

| Thiết bị | Hành vi |
|---|---|
| **Desktop** | Inline theo nội dung; cụm nút căn phải trong footer modal/form |
| **Tablet** | Giữ inline; tăng touch padding nếu cần |
| **Mobile** | Primary CTA thường **full-width** (XL); cụm nút xếp dọc, Primary trên cùng; sticky bottom bar cho hành động chính của trang |

## 11. Design Tokens Mapping

```
Button.Primary
├─ bg            → Action.Primary          → Color.Blue.700
├─ bg-hover      → Action.Primary.Hover    → Color.Blue.800
├─ bg-active     → Action.Primary.Active   → Color.Blue.900
├─ text          → Text.Inverse            → Color.White
├─ shadow        → Shadow.xs
├─ radius (MD)   → Radius.component        → Radius.md (8px)
└─ focus ring    → Focus.Ring              → Color.Blue.200

Button.Secondary
├─ bg            → Action.Primary.Subtle   → Color.Blue.50
├─ bg-hover      → Action.Primary.Subtle.Hover → Color.Blue.100
├─ text          → Action.Primary          → Color.Blue.700
└─ border        → Color.Blue.200

Button.Ghost
├─ bg            → transparent
├─ bg-hover      → Action.Secondary.Subtle → Color.Gray.100
├─ text          → Text.Secondary          → Color.Gray.700
└─ text-hover    → Text.Primary            → Color.Gray.900

Button.Destructive
├─ bg            → Action.Destructive       → Color.Error.600
├─ bg-hover      → Action.Destructive.Hover → Color.Error.700
└─ text          → Text.Inverse             → Color.White

Button.Disabled (mọi variant)
├─ bg            → Color.Gray.100
├─ text          → Color.Gray.400
└─ border        → Color.Gray.200
```

## 12. UX Best Practices

**Nên ✓**
- Dùng động từ hành động: "Lưu thay đổi", "Tạo đề thi", "Nộp bài".
- Một Primary mỗi khung nhìn để dẫn mắt người dùng.
- Loading state cho mọi hành động bất đồng bộ (gọi API).
- Icon củng cố nghĩa (Leading), không trang trí thừa.

**Không nên ✗**
- Nhiều Primary cạnh nhau (gây phân vân ưu tiên).
- Label mơ hồ: "OK", "Submit", "Click here".
- Disabled không lý do mà không có giải thích.
- Destructive làm Primary của cả trang khi chưa xác nhận.
- Dùng Button cho điều hướng thuần (dùng Link).

---

### Phụ lục — React API đề xuất

```tsx
<Button
  variant="primary | secondary | tertiary | ghost | destructive"
  size="xs | sm | md | lg | xl"
  leadingIcon={<Icon />}
  trailingIcon={<Icon />}
  isLoading={false}
  isDisabled={false}
  isFullWidth={false}
  onClick={handler}
  aria-label="…"   // bắt buộc nếu icon-only
>
  Nhãn hành động
</Button>
```
