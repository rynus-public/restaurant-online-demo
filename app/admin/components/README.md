# Admin Dashboard Components

Thư mục này chứa các component đã được tách từ file `page.tsx` ban đầu để dễ maintain và tái sử dụng.

## Cấu trúc Components

### 1. **AdminDataProvider.tsx**
- Component context cung cấp dữ liệu cho toàn bộ admin dashboard
- Quản lý state cho tables, reservations, orders, menu items
- Cung cấp các functions để update dữ liệu

### 2. **PageHeader.tsx**
- Component header của trang admin
- Hiển thị title và status "Live updates"

### 3. **StatCard.tsx**
- Component tái sử dụng cho các card thống kê
- Support multiple color schemes (amber, blue, green, purple)
- Props: title, value, icon, href, primaryColor, subtitle, secondaryText

### 4. **TableStatusCard.tsx**
- Component hiển thị tổng quan trạng thái bàn
- Bao gồm summary stats và grid layout của tất cả bàn
- Handle table click events

### 5. **Timeline.tsx**
- Component timeline hiển thị lịch hoạt động trong ngày
- Features: scroll to current time, filter by table, real-time updates
- Hiển thị events từ tables và reservations

### 6. **RecentActivity.tsx**
- Component hiển thị hoạt động gần đây
- Bao gồm recent reservations và recent orders

### 7. **TableDetailModal.tsx**
- Modal popup để xem và chỉnh sửa chi tiết bàn
- Features: edit customer info, change table status, time slot selection
- Form validation và error handling

## Usage

```tsx
import { 
  useAdminData, 
  PageHeader, 
  StatCard, 
  TableStatusCard, 
  Timeline, 
  RecentActivity, 
  TableDetailModal 
} from './components';
```

## Lợi ích của việc tách component

1. **Maintainability**: Mỗi component có trách nhiệm riêng biệt
2. **Reusability**: Các component có thể được tái sử dụng ở nơi khác
3. **Testing**: Dễ dàng test từng component độc lập
4. **Performance**: Có thể optimize từng component riêng biệt
5. **Code Organization**: Code được tổ chức rõ ràng và dễ đọc
6. **Team Development**: Nhiều developer có thể làm việc song song trên các component khác nhau

## Future Enhancements

- Add loading states cho các component
- Implement error boundaries
- Add animation/transition effects
- Optimize performance với React.memo
- Add unit tests cho từng component
