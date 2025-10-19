# UI适配指南

## 适配原则

### 1. 响应式单位
- **使用rpx作为主要单位**：1rpx = 屏幕宽度/750
- 避免使用px单位，除非特殊需求

### 2. 断点设置
```less
@breakpoint-xs: 320px;  // 超小屏幕
@breakpoint-sm: 375px;  // 小屏幕  
@breakpoint-md: 414px;  // 中等屏幕
@breakpoint-lg: 768px;  // 大屏幕
```

### 3. 适配策略
- **移动优先**：先设计小屏幕，再适配大屏幕
- **渐进增强**：小屏幕基础功能，大屏幕增强体验
- **弹性布局**：使用flex、grid等弹性布局

## 适配工具使用

### 1. 引入适配样式
```less
@import '../styles/adaptive.less';
```

### 2. 使用工具类
```html
<!-- 响应式容器 -->
<view class="responsive-container">
  <!-- 内容 -->
</view>

<!-- 响应式卡片 -->
<view class="responsive-card">
  <!-- 卡片内容 -->
</view>

<!-- 响应式网格 -->
<view class="responsive-grid">
  <!-- 网格项 -->
</view>

<!-- 字体大小适配 -->
<text class="text-lg">标题</text>
<text class="text-md">正文</text>
<text class="text-sm">描述</text>

<!-- 间距适配 -->
<view class="spacing-md">
  <!-- 内容 -->
</view>

<!-- 按钮适配 -->
<button class="adaptive-button-primary">主要按钮</button>
<button class="adaptive-button-secondary">次要按钮</button>

<!-- 输入框适配 -->
<input class="adaptive-input" placeholder="请输入内容" />

<!-- 安全区域适配 -->
<view class="safe-area-top safe-area-bottom">
  <!-- 内容 -->
</view>
```

### 3. 媒体查询使用
```less
// 基础样式（移动优先）
.component {
  padding: 20rpx;
  font-size: 28rpx;
}

// 中等屏幕适配
@media (min-width: 414px) {
  .component {
    padding: 30rpx;
    font-size: 32rpx;
  }
}

// 大屏幕适配
@media (min-width: 768px) {
  .component {
    padding: 40rpx;
    font-size: 36rpx;
  }
}

// 超小屏幕适配
@media (max-width: 320px) {
  .component {
    padding: 15rpx;
    font-size: 26rpx;
  }
}
```

## 常见适配场景

### 1. 导航栏适配
```less
.navigation-bar {
  height: 88rpx;
  
  @media (max-width: 320px) {
    height: 80rpx;
  }
  
  @media (min-width: 414px) {
    height: 96rpx;
  }
}
```

### 2. 列表项适配
```less
.list-item {
  padding: 30rpx;
  display: flex;
  align-items: center;
  
  @media (max-width: 320px) {
    padding: 20rpx;
    flex-direction: column;
    text-align: center;
  }
}
```

### 3. 模态框适配
```less
.modal {
  width: 90%;
  max-width: 600rpx;
  margin: 40rpx auto;
  
  @media (max-width: 320px) {
    width: calc(100% - 40rpx);
    margin: 20rpx;
  }
  
  @media (min-width: 414px) {
    max-width: 700rpx;
    margin: 60rpx auto;
  }
}
```

### 4. 图片适配
```less
.adaptive-image {
  max-width: 100%;
  height: auto;
  
  @media (max-width: 320px) {
    width: 100%;
  }
}
```

## 最佳实践

### 1. 字体适配
- 使用相对字体大小（rpx）
- 设置最小字体大小（避免过小）
- 考虑行高和字间距

### 2. 间距适配
- 使用相对间距单位
- 设置最小间距保证可点击区域
- 考虑内容密度

### 3. 布局适配
- 优先使用flex布局
- 考虑内容重排（小屏幕单列，大屏幕多列）
- 使用grid布局进行复杂布局

### 4. 交互适配
- 保证最小点击区域（44px × 44px）
- 考虑手势操作适配
- 优化输入体验

## 测试要点

### 1. 屏幕尺寸测试
- 320px × 568px (iPhone SE)
- 375px × 667px (iPhone 8)
- 414px × 896px (iPhone XR)
- 768px × 1024px (iPad)

### 2. 方向测试
- 竖屏模式
- 横屏模式

### 3. 安全区域测试
- 刘海屏适配
- 圆角屏幕适配
- 底部安全区域

## 常见问题解决

### 1. 文字溢出
```less
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-multi-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### 2. 图片变形
```less
.image-container {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 比例 */
  position: relative;
}

.image-container img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### 3. 滚动优化
```less
.scroll-container {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
```

通过遵循本指南，可以确保应用在不同屏幕尺寸下都能提供良好的用户体验。