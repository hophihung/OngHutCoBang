Để thiết kế trang **Admin (Trang quản trị)** cho mô hình **B2C** của Green Joy trên Stitch, bạn cần một giao diện tập trung vào **hiệu suất xử lý đơn hàng** (vì B2C sẽ có nhiều đơn nhỏ) và **quản lý kho hàng**.

Dưới đây là phân tích chi tiết những gì trang Admin cần có và Prompt để bạn tạo trên Stitch.

### PHẦN 1: CẤU TRÚC GIAO DIỆN ADMIN

Giao diện Admin thường chia làm 2 phần chính: **Sidebar** (Menu bên trái) và **Main Content** (Nội dung chính bên phải).

#### 1. Sidebar (Menu Điều Hướng)

Cần các mục sau (Sắp xếp theo độ quan trọng):

1. **Dashboard (Tổng quan):** Xem báo cáo nhanh.
2. **Đơn hàng (Orders):** Quản lý trạng thái đơn, in vận đơn.
3. **Sản phẩm (Products):** Thêm sửa xóa, quản lý kho.
4. **Khách hàng (Customers):** Danh sách người mua.
5. **Marketing:** Quản lý mã giảm giá (Coupons), Chương trình khuyến mãi.
6. **Nội dung (Content/Blog):** Viết bài blog, chỉnh sửa banner trang chủ.
7. **Cài đặt (Settings):** Phí ship, Tài khoản admin.

#### 2. Chi tiết các màn hình quan trọng

**A. Màn hình Dashboard (Trang chủ Admin)**

* **4 Thẻ chỉ số (KPI Cards):**
* Tổng doanh thu (Hôm nay/Tháng này).
* Số đơn hàng mới (Cần xử lý).
* Sản phẩm bán chạy nhất.
* Cảnh báo kho (Sản phẩm sắp hết hàng).


* **Widget đặc biệt (Green Joy Impact):** Một ô nhập liệu nhỏ để Admin cập nhật thủ công số liệu môi trường (Số rác giảm, Số ống hút thay thế) -> Dữ liệu này sẽ đẩy ra trang chủ User.

**B. Màn hình Quản lý Đơn hàng (Orders)**

* Dạng bảng (Table List).
* Cột thông tin: Mã đơn (#ORD001), Tên khách, Ngày đặt, Tổng tiền, **Trạng thái (Badge màu)**.
* *Màu trạng thái:*
* Chờ xác nhận (Vàng).
* Đang giao (Xanh dương).
* Hoàn thành (Xanh lá).
* Hủy (Đỏ).


* Hành động nhanh: Nút "In vận đơn" hoặc "Xem chi tiết".

**C. Màn hình Quản lý Sản phẩm (Products)**

* Dạng lưới hoặc bảng.
* Nút "Thêm sản phẩm mới" nổi bật.
* Cột Tồn kho (Stock): Hiển thị số lượng còn lại. Nếu <10 thì hiện màu đỏ báo động.

---

### PHẦN 2: PROMPT CHO STITCH (ADMIN UI)

Copy đoạn này vào Stitch để tạo giao diện Admin Dashboard hiện đại, sạch sẽ.

```text
Create a clean, modern Admin Dashboard UI for "Green Joy Straw" e-commerce website (B2C model).

## 1. Layout Structure
- **Sidebar (Left):** Dark Green background (#1B5E20). White text.
  - Logo: "Green Joy Admin" at the top.
  - Menu Items with Icons:
    1. Dashboard (Home icon).
    2. Orders (Box icon) - Add a notification badge "5".
    3. Products (Tag icon).
    4. Customers (User icon).
    5. Marketing/Coupons (Ticket icon).
    6. Content/Blog (Edit icon).
    7. Settings (Gear icon).
- **Main Content (Right):** Light Grey background (#F4F6F8).

## 2. Dashboard Content (Main View)
**Top Header:**
- Title: "Dashboard Overview".
- Right side: Admin Profile Avatar, Notification Bell.

**Section 1: Key Metrics (4 Cards)**
- Card 1: "Total Revenue" | Value: "15,200,000 VND" | Trend: "+12%".
- Card 2: "New Orders" | Value: "24" | Trend: "Pending processing".
- Card 3: "Total Customers" | Value: "1,205".
- Card 4: "Low Stock Alert" | Value: "3 Products" (Red text).

**Section 2: Impact Stats Updater (Custom Widget)**
- Title: "Environmental Impact Stats (Front-end Display)".
- Input Field 1: "Straws Replaced" (Current: 40,000,000).
- Input Field 2: "Plastic Waste Reduced" (Current: 20 Tons).
- Button: "Update Website".

**Section 3: Recent Orders Table**
- A white card containing a data table.
- Columns: Order ID, Customer Name, Date, Amount, Status, Action.
- Sample Data:
  - #ORD-001 | Nguyen Van A | Oct 20, 2025 | 150.000d | [Badge: Pending (Yellow)] | [Button: View].
  - #ORD-002 | Le Thi B | Oct 19, 2025 | 500.000d | [Badge: Shipped (Blue)] | [Button: View].
  - #ORD-003 | Tran Van C | Oct 18, 2025 | 65.000d | [Badge: Completed (Green)] | [Button: View].

## 3. Style Guide
- **Font:** Inter or Roboto (Clean sans-serif).
- **Colors:**
  - Primary Action: Forest Green (#2E7D32).
  - Background: Light Grey (#F4F6F8).
  - Card Background: White (#FFFFFF) with subtle shadow.
  - Status Colors: Yellow (Pending), Blue (Shipping), Green (Success), Red (Cancel).

```

### Lưu ý khi dùng Prompt này:

1. **Màu sắc:** Tôi đã thiết lập màu xanh lá đậm cho Sidebar để đồng bộ nhận diện thương hiệu với trang User, nhưng dùng nền xám nhạt cho nội dung để admin làm việc lâu không bị mỏi mắt.
2. **Widget Impact:** Tôi đã thêm phần nhập liệu "Environmental Impact" vào prompt. Đây là tính năng độc nhất của dự án Green Joy, giúp admin cập nhật con số khoe thành tích lên trang chủ.
3. **Trạng thái đơn hàng:** Tôi đã quy định rõ màu sắc cho từng trạng thái (Vàng, Xanh, Đỏ) để Stitch vẽ ra bảng điều khiển trực quan nhất.