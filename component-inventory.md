# K12Online Design System — Component Inventory

> Phiên bản: 1.0 | Cập nhật: 2026-06-08
> Tổ chức theo Atomic Design: Atoms → Molecules → Organisms → Education-specific → Templates

---

## 1. ATOMS — Thành phần cơ bản

### 1.1 Button
| Variant | States | Mô tả |
|---|---|---|
| Primary | default, hover, active, disabled, loading | Hành động chính (Lưu, Nộp bài, Xác nhận) |
| Secondary | default, hover, active, disabled | Hành động phụ (Hủy, Quay lại) |
| Outline | default, hover, active, disabled | Ít nhấn mạnh hơn Secondary |
| Ghost | default, hover, active, disabled | Nền trong suốt, dùng trên nền màu |
| Danger | default, hover, active, disabled, loading | Xóa, hủy đăng ký |
| Link | default, hover, visited, disabled | Inline action |
| Icon-only | default, hover, active, disabled | Toolbar, compact spaces |

**Sizes:** xs · sm · md (default) · lg · xl
**Icon positions:** left icon · right icon · icon-only

---

### 1.2 Input
| Type | States | Mô tả |
|---|---|---|
| Text | default, focus, filled, error, disabled, readonly | Nhập liệu văn bản |
| Password | default, focus, show/hide toggle, error | Mật khẩu |
| Number | default, focus, error, with stepper | Số lượng, điểm số |
| Search | default, focus, with clear button | Tìm kiếm |
| Textarea | default, focus, error, disabled, auto-resize | Nhận xét, mô tả |

**Phần tử đi kèm:** Label · Helper text · Error message · Character count · Prefix icon · Suffix icon

---

### 1.3 Select / Dropdown
| Type | States | Mô tả |
|---|---|---|
| Single select | default, open, selected, error, disabled | Chọn lớp, môn học, kỳ thi |
| Multi-select | default, open, selected (tags), error | Chọn nhiều môn, nhiều lớp |
| Searchable | default, open, searching, no-result | Tìm trong danh sách dài |
| Grouped | - | Nhóm theo Khối (Lớp 1-5, Lớp 6-9, v.v.) |

---

### 1.4 Checkbox
| Variant | States | Mô tả |
|---|---|---|
| Default | unchecked, checked, indeterminate, disabled | Chọn nhiều mục |
| With label | unchecked, checked, error | Form options |
| Card checkbox | unchecked, checked | Chọn câu trả lời trong quiz |

---

### 1.5 Radio Button
| Variant | States | Mô tả |
|---|---|---|
| Default | unchecked, checked, disabled | Chọn một đáp án |
| Radio card | unchecked, checked, disabled | Câu hỏi trắc nghiệm (giao diện lớn hơn) |
| Radio group | vertical, horizontal | Nhóm các lựa chọn |

---

### 1.6 Toggle / Switch
| Variant | States | Mô tả |
|---|---|---|
| Default | on, off, disabled | Bật/tắt tính năng |
| With label | left label, right label | Cài đặt hệ thống |

**Sizes:** sm · md · lg

---

### 1.7 Badge / Tag
| Type | Màu | Mô tả |
|---|---|---|
| Status badge | success (xanh), warning (vàng), error (đỏ), info (xanh dương), neutral (xám) | Trạng thái nộp bài, điểm danh |
| Count badge | primary | Số thông báo chưa đọc |
| Grade badge | A/B/C/D/F với màu tương ứng | Xếp loại học lực |
| Tag (removable) | primary, secondary, neutral | Filter tags, môn học tags |
| Tag (static) | category colors | Nhãn danh mục |

---

### 1.8 Avatar
| Type | Sizes | Mô tả |
|---|---|---|
| Image avatar | xs(24) · sm(32) · md(40) · lg(48) · xl(64) · 2xl(96) | Ảnh đại diện người dùng |
| Initials avatar | same sizes | Khi không có ảnh (lấy 2 chữ cái đầu) |
| Icon avatar | same sizes | Icon placeholder |
| Avatar group | stacked | Danh sách học sinh trong lớp |
| Avatar with status | online/offline/away dot | Trạng thái hoạt động |

---

### 1.9 Icon
- Dùng bộ icon nhất quán (đề xuất: Phosphor Icons hoặc Lucide)
- Sizes: 16 · 20 · 24 · 32 · 48
- Stroke weight: Regular · Bold
- Màu: inherit từ text color, có thể override

---

### 1.10 Typography
| Style | Size | Weight | Dùng cho |
|---|---|---|---|
| Display XL | 48px | 700 | Trang chủ hero, landing |
| Display L | 40px | 700 | Tiêu đề lớn |
| H1 | 32px | 700 | Tiêu đề trang |
| H2 | 24px | 600 | Tiêu đề section |
| H3 | 20px | 600 | Tiêu đề card, modal |
| H4 | 16px | 600 | Tiêu đề sub-section |
| Body L | 16px | 400 | Nội dung chính |
| Body M | 14px | 400 | Nội dung phụ (default) |
| Body S | 12px | 400 | Caption, helper text |
| Label | 14px | 500 | Form labels |
| Code | 14px | 400 (monospace) | Code snippets trong bài |

---

### 1.11 Các Atom khác
| Component | Mô tả |
|---|---|
| Divider | Ngang / dọc, với hoặc không có label |
| Spinner | Loading indicator — sm/md/lg |
| Skeleton | Placeholder loading cho card, table, text |
| Progress bar | Tiến trình hoàn thành bài học, thi |
| Dot indicator | Online/offline status |
| Kbd | Phím tắt hiển thị |

---

## 2. MOLECULES — Thành phần kết hợp

### 2.1 Form Field
Kết hợp: Label + Input/Select/... + Helper text + Error message
- **Required indicator** (dấu *)
- **Tooltip trợ giúp** bên cạnh label
- Layout: vertical (default) · horizontal

---

### 2.2 Search Bar
- Input + search icon + clear button
- Variant: **inline** (trong table header) · **hero** (trang tìm kiếm toàn phần)
- Với dropdown gợi ý (autocomplete)

---

### 2.3 Breadcrumb
- Tối đa hiển thị: collapse với "..." khi quá dài
- Dùng cho: điều hướng phân cấp Trường > Lớp > Bài học > Câu hỏi
- Separator: / hoặc >

---

### 2.4 Pagination
| Variant | Mô tả |
|---|---|
| Numbered | 1 2 3 ... 10 với prev/next |
| Simple | Prev / Next với "Trang X / Y" |
| Mini | Chỉ Prev / Next (dùng trong card) |

Có select "Số dòng mỗi trang": 10 / 25 / 50 / 100

---

### 2.5 Date & Time Picker
| Type | Mô tả |
|---|---|
| Date picker | Chọn ngày (lịch popup) |
| Time picker | Chọn giờ (dropdown hoặc scroll) |
| Date range | Từ ngày — Đến ngày (cho báo cáo, lọc) |
| Date-time | Kết hợp ngày + giờ (hẹn giờ thi, deadline) |

---

### 2.6 File Upload
| Variant | Mô tả |
|---|---|
| Button upload | Click để chọn file |
| Drag & drop zone | Drop file vào vùng upload |
| Upload with preview | Xem trước ảnh/tài liệu sau khi chọn |

**File states:** idle · uploading (progress) · success · error
**Hỗ trợ:** single file · multiple files · định nghĩa allowed types & max size

---

### 2.7 Alert / Inline Banner
| Type | Icon | Màu |
|---|---|---|
| Info | ℹ️ | Xanh dương nhạt |
| Success | ✅ | Xanh lá nhạt |
| Warning | ⚠️ | Vàng nhạt |
| Error | ❌ | Đỏ nhạt |

Variants: **dismissible** (có nút X) · **persistent** (không thể đóng) · **with action button**

---

### 2.8 Tooltip
- Trigger: hover / focus / click
- Positions: top · bottom · left · right (với auto-flip)
- Sizes: sm (text ngắn) · md (có thể có title + mô tả)

---

### 2.9 Popover
- Phong phú hơn tooltip: có thể chứa form nhỏ, link list
- Dùng cho: bộ lọc nhanh, chỉnh sửa inline, hướng dẫn

---

### 2.10 Dropdown Menu
- Trigger: button / icon-button
- Items: default · với icon · với badge · divider · disabled
- Variant: **context menu** (click chuột phải) · **action menu** (button ...)

---

### 2.11 Tab Bar
| Variant | Mô tả |
|---|---|
| Default tabs | Ngang, underline active |
| Card tabs | Background filled khi active |
| Vertical tabs | Sidebar navigation |
| Scrollable tabs | Khi quá nhiều tabs (overflow scroll) |

Hỗ trợ: icon + label · badge count · disabled tab

---

### 2.12 Accordion / Collapse
- Single open (chỉ 1 panel mở) · Multiple open
- Dùng cho: FAQ, danh sách bài tập theo chương, cây thư mục

---

### 2.13 Rating / Stars
- 1-5 sao, half-star support
- Readonly (hiển thị) · Interactive (đánh giá)
- Dùng cho: đánh giá bài học, tài liệu

---

### 2.14 Stepper (Step indicator)
- Linear (phải làm tuần tự) · Non-linear
- Orientations: horizontal · vertical
- Dùng cho: luồng tạo đề thi nhiều bước, onboarding

---

## 3. ORGANISMS — Thành phần phức tạp

### 3.1 Navigation Header
**Desktop:**
- Logo (trái) · Main nav (giữa) · Actions: Search · Notification bell (badge) · User avatar menu (phải)
- Sticky khi scroll

**Mobile:**
- Logo · Hamburger menu · Notification

---

### 3.2 Sidebar Navigation
| Variant | Mô tả |
|---|---|
| Expanded | Icon + Label, width ~240px |
| Collapsed | Icon only, width ~60px |
| Mobile drawer | Overlay từ trái, full-height |

**Nav item states:** default · hover · active · disabled · with badge
**Hỗ trợ:** nested menu (tối đa 2 cấp) · section label · divider

---

### 3.3 Data Table
**Tính năng bắt buộc:**
- Sort by column (asc/desc)
- Column resize
- Row selection (checkbox)
- Pagination tích hợp
- Empty state
- Loading skeleton

**Optional features:**
- Column show/hide
- Row expand (nested data)
- Inline edit
- Sticky header
- Sticky columns (freeze)
- Bulk actions bar (khi chọn nhiều row)
- Export (Excel, PDF)

---

### 3.4 Modal / Dialog
| Size | Width | Dùng cho |
|---|---|---|
| xs | 360px | Confirm delete đơn giản |
| sm | 480px | Form nhỏ |
| md | 600px | Form trung bình (default) |
| lg | 800px | Form phức tạp, xem trước |
| xl | 1024px | Preview tài liệu, đề thi |
| Full-screen | 100% | Chỉnh sửa nội dung dài |

**Variants:** Standard · Confirm (có 2 nút action rõ ràng) · Alert (1 nút, không đóng ngoài click)

---

### 3.5 Toast / Notification
- Positions: top-right (default) · top-center · bottom-right · bottom-center
- Types: success · error · warning · info
- Auto-dismiss với countdown · Persistent với dismiss button
- Stack khi nhiều toast cùng lúc (tối đa 5)

---

### 3.6 Card (Generic)
| Variant | Mô tả |
|---|---|
| Default | Header + body + footer |
| Hoverable | Có hover effect (lift/shadow) |
| Clickable | Toàn bộ card là link |
| Selectable | Với checkbox, dùng trong grid select |
| Horizontal | Image trái + content phải |

---

### 3.7 Empty State
Dùng khi không có dữ liệu:
- Illustration + Tiêu đề + Mô tả + CTA button
- Variants: No data · No search results · No permission · First time use (onboarding)

---

### 3.8 Filter Bar
- Kết hợp Search + multiple Select filters + Date range + Reset button
- Collapsed (chỉ show active filters) · Expanded
- Hiển thị active filter tags có thể xóa từng cái

---

### 3.9 Upload Media
- Xem trước ảnh dạng grid sau khi upload
- Reorder bằng drag & drop
- Xóa từng ảnh
- Progress từng file

---

### 3.10 Rich Text Editor
- Toolbar: Bold · Italic · Underline · Strikethrough · | · Heading · | · List · | · Link · Image · | · Undo/Redo
- Dùng cho: soạn câu hỏi, nhận xét, thông báo, bài tập
- Math formula support (dùng cho môn Toán, Lý, Hóa)
- Code block support

---

## 4. EDUCATION-SPECIFIC COMPONENTS

### 4.1 Course Card
```
[Thumbnail ảnh]
[Badge: Đang học / Chưa học / Hoàn thành]
Tên khóa học / Môn học
Giáo viên: [Avatar] Nguyễn Văn A
[Progress bar] 65% hoàn thành
[Icon] 12 bài học · [Icon] 3 bài kiểm tra
```
Variants: Grid card · List card · Featured (hero size)

---

### 4.2 Question Card (Câu hỏi)
| Loại câu hỏi | Component |
|---|---|
| Trắc nghiệm 1 đáp án | Radio card group (A/B/C/D) |
| Trắc nghiệm nhiều đáp án | Checkbox card group |
| Đúng / Sai | Toggle group 2 lựa chọn |
| Điền vào chỗ trống | Inline input trong đoạn văn |
| Ghép đôi | Drag & drop matching |
| Tự luận | Textarea với rich text |
| Câu hỏi có hình | Question + Image + Answer options |
| Câu hỏi âm thanh | Audio player + Answer options |

**States của câu hỏi:**
- Chưa trả lời (unanswered)
- Đã trả lời (answered)
- Đánh dấu xem lại (flagged)
- Đúng (correct) — sau khi nộp
- Sai (incorrect) — sau khi nộp
- Đúng một phần (partial) — sau khi nộp

---

### 4.3 Exam Interface Components
- **Question navigator**: Grid số câu (1-50+), màu thể hiện trạng thái (chưa làm/đã làm/đánh dấu)
- **Exam timer**: Countdown đồng hồ, đổi màu khi gần hết giờ (<5 phút: cam, <1 phút: đỏ)
- **Exam header**: Tên đề · Timer · Số câu đã làm/tổng · Nộp bài button
- **Question flag button**: Đánh dấu câu hỏi để xem lại
- **Submit confirmation modal**: Tóm tắt: X câu đã làm, Y câu chưa làm, Z câu đánh dấu

---

### 4.4 Score Display
```
Điểm số:   8.5 / 10
           [Vòng tròn progress hoặc gauge]
Xếp loại:  [Badge] Giỏi
Phân loại: Điểm thành phần breakdown (nếu có)
```
Variants: 
- **Score circle**: Vòng tròn lớn với điểm số ở giữa
- **Score badge**: Compact badge dùng trong table
- **Score breakdown**: Bar chart từng phần (Kiểm tra 15' / 1 tiết / Học kỳ)

---

### 4.5 Grade/Report Card
| Component | Mô tả |
|---|---|
| Transcript row | Môn học · Điểm TB · Điểm HP · Xếp loại |
| Semester summary | GPA tổng · Xếp hạng lớp · Hạnh kiểm |
| Progress chart | Line chart điểm qua các kỳ |
| Attendance summary | % chuyên cần, số buổi vắng/trễ |

---

### 4.6 Attendance Tracker
- **Attendance grid**: Grid calendar tháng, mỗi ngày là cell (P/V/L/K)
- **Legend**: Có mặt (P) · Vắng (V) · Phép (L) · Trễ (K)
- **Attendance summary bar**: Tổng hợp số buổi theo loại

---

### 4.7 Schedule / Timetable
| View | Mô tả |
|---|---|
| Weekly grid | 7 cột ngày × các tiết học (dạng lưới) |
| Day view | Danh sách tiết trong ngày |
| Month view | Calendar tháng với event dots |

**Lesson event card trong schedule:**
- Môn học (màu phân biệt môn) · Giáo viên · Phòng học · Giờ

---

### 4.8 Assignment Card
```
[Icon loại bài tập]  Tên bài tập
Môn: Toán · Lớp: 10A1
Deadline: [Icon clock] 23:59 ngày 15/06/2026
[Status badge] Chưa nộp / Đã nộp / Trễ hạn
[Button] Làm bài / Xem lại
```

---

### 4.9 Student Profile Card
```
[Avatar lg]
Họ tên học sinh
Mã HS: HS001234
Lớp: 10A1 · Khóa: 2023-2026
[Stats] GPA: 8.2 · Chuyên cần: 95%
[Tags] Ban Tự nhiên · Lớp chọn
```

---

### 4.10 Teacher Profile Card
```
[Avatar lg]
Họ tên giáo viên
Mã GV: GV005678
Môn: Toán · Chức vụ: GVCN 10A1
[Stats] Số lớp: 4 · Số tiết/tuần: 18
```

---

### 4.11 Notification Item
```
[Avatar / Icon] [Tiêu đề thông báo]    [Thời gian]
               [Nội dung tóm tắt...]
               [Unread dot nếu chưa đọc]
```
Types: Bài tập mới · Điểm được cập nhật · Tin nhắn · Thông báo hệ thống · Nhắc nhở deadline

---

### 4.12 Announcement / Post
```
[Avatar GV]  Tên giáo viên          [Thời gian đăng]
             [Nội dung thông báo hoặc bài đăng]
             [Attachments: file/ảnh nếu có]
             [Like] [Comment] [Share nội bộ]
```

---

### 4.13 Chat / Message
| Component | Mô tả |
|---|---|
| Message bubble (sent) | Căn phải, màu primary |
| Message bubble (received) | Căn trái, màu neutral |
| Message with attachment | File, ảnh, link preview |
| Message timestamp | Gộp theo nhóm thời gian |
| Chat input | Textarea + Emoji + Attach + Send |
| Conversation list item | Avatar · Tên · Preview tin cuối · Unread badge |

---

### 4.14 Document Viewer
- PDF viewer tích hợp (không tải về được nếu bị khóa)
- Image viewer với zoom
- Video player với controls chuẩn
- Audio player compact

---

### 4.15 Class/Group Card
```
[Thumbnail hoặc gradient màu]
Tên lớp: 10A1
Năm học: 2025-2026 · Sĩ số: 38 HS
GVCN: Nguyễn Thị B
[Button] Vào lớp
```

---

## 5. PAGE TEMPLATES

| Template | Mô tả |
|---|---|
| **Login** | Form đăng nhập + SSO options |
| **Dashboard — Học sinh** | Bài tập cần làm · Lịch học · Điểm gần đây · Thông báo |
| **Dashboard — Giáo viên** | Lớp đang dạy · Bài cần chấm · Lịch dạy · Thông báo |
| **Dashboard — Phụ huynh** | Điểm số con · Điểm danh · Thông báo từ trường |
| **Dashboard — Quản trị** | KPI tổng quan: số HS, GV, lớp, bài thi |
| **Course/Subject List** | Grid/list môn học, filter theo khối/lớp |
| **Lesson Detail** | Video/tài liệu + Q&A + bài tập liên quan |
| **Exam — Làm bài** | Question navigator + Question content + Timer |
| **Exam — Kết quả** | Score display + Answer review + Giải thích |
| **Class Management** | Table danh sách HS + attendance + điểm |
| **Question Bank** | Table câu hỏi + filter + bulk action |
| **Create Exam** | Stepper: Cài đặt → Chọn câu hỏi → Phân phối → Xem trước |
| **Grade Book** | Spreadsheet-like grid nhập điểm |
| **Report** | Filters + Charts + Export |
| **Notification Center** | List thông báo với filter đọc/chưa đọc |
| **Profile & Settings** | Tabs: Thông tin · Bảo mật · Thông báo |
| **School Management** | Cây tổ chức: Trường > Khối > Lớp |

---

## 6. TỔNG KẾT SỐ LƯỢNG

| Nhóm | Số component |
|---|---|
| Atoms | 11 nhóm (~40 variants) |
| Molecules | 14 nhóm |
| Organisms | 10 nhóm |
| Education-specific | 15 nhóm |
| Page Templates | 17 templates |
| **Tổng** | **~96 components + 17 templates** |

---

## 7. THỨ TỰ ƯU TIÊN XÂY DỰNG

### Phase 1 — Foundation (tuần 1-2)
- [ ] Color tokens
- [ ] Typography tokens  
- [ ] Spacing & Grid tokens
- [ ] Button (tất cả variants)
- [ ] Input, Textarea
- [ ] Select, Checkbox, Radio, Toggle
- [ ] Badge, Tag, Avatar, Icon

### Phase 2 — Core Molecules & Organisms (tuần 3-4)
- [ ] Form Field (with validation states)
- [ ] Modal / Dialog
- [ ] Toast / Notification
- [ ] Data Table (basic)
- [ ] Navigation Header + Sidebar
- [ ] Alert / Banner

### Phase 3 — Education Components (tuần 5-6)
- [ ] Question Card (tất cả loại câu hỏi)
- [ ] Exam Interface (navigator, timer, header)
- [ ] Course Card, Assignment Card
- [ ] Score Display, Grade components
- [ ] Schedule / Timetable

### Phase 4 — Templates (tuần 7-8)
- [ ] Dashboard layouts (4 vai trò)
- [ ] Exam page
- [ ] Grade book
- [ ] Report page

---

*File này là nguồn tham chiếu (source of truth) cho toàn bộ quá trình thiết kế Figma.*
