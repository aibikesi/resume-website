export const profile = {
  name: '陈祥宇',
  nameEn: 'Chen Xiangyu',
  title: '前端开发方向 / 本科在读',
  subtitle: '前端开发方向 · 本科在读',
  heroGreeting: '你好， 我是 陈祥宇',
  heroTagline: '用代码创造\n数字体验',
  heroTaglineEn: 'Crafting Digital Experiences',
  heroDescription: '计算机科学与技术专业在读，热爱前端开发与交互设计',
  bio: [
    '计算机科学与技术专业本科在读，专注于前端开发技术。熟练掌握 React、Vue 等主流框架，对 UI/UX 设计有独到见解。热爱将视觉创意转化为流畅的交互体验，追求代码质量与设计美学的平衡。',
    '在校期间积极参与各类项目实践与设计工作坊，注重工程化思维与设计思维的双重培养。持续学习前沿技术，致力于成为兼具设计感与工程能力的开发者。'
  ],
  
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student&backgroundColor=FF2D55&radius=50',
  
  contact: {
    email: '1821602331@qq.com',
    phone: '13283332985',
    location: '中国 · 河北邢台',
    website: '',
    linkedin: '',
    github: ''
  },

  stats: [
    { value: '4', label: '学习年限' },
    { value: '15+', label: '完成项目' },
    { value: '8', label: '设计奖项' },
    { value: '20+', label: '课程学分' }
  ],

  skills: [
    {
      category: '前端开发',
      icon: 'code',
      enTitle: 'Frontend',
      items: [
        { name: 'React / Next.js', level: 82 },
        { name: 'Vue / Nuxt.js', level: 75 },
        { name: 'TypeScript', level: 78 },
        { name: 'CSS / Tailwind', level: 85 }
      ]
    },
    {
      category: 'UI/UX 设计',
      icon: 'layers',
      enTitle: 'Design',
      items: [
        { name: 'Figma / 原型设计', level: 88 },
        { name: '交互动效', level: 80 },
        { name: '设计系统', level: 72 },
        { name: '用户研究', level: 68 }
      ]
    },
    {
      category: '后端基础',
      icon: 'server',
      enTitle: 'Backend',
      items: [
        { name: 'Node.js / Express', level: 70 },
        { name: 'Python', level: 72 },
        { name: '数据库基础', level: 65 },
        { name: 'RESTful API', level: 68 }
      ]
    },
    {
      category: '工具与工程化',
      icon: 'tool',
      enTitle: 'Tools',
      items: [
        { name: 'Git / 版本控制', level: 80 },
        { name: 'Webpack / Vite', level: 75 },
        { name: 'Docker 基础', level: 55 },
        { name: 'CI/CD 流程', level: 60 }
      ]
    }
  ],

  projects: [
    {
      title: '智慧校园助手',
      description: '基于 React + Node.js 的全栈校园服务平台，集成课程表、活动通知等功能',
      tech: ['React', 'Node.js', 'MongoDB'],
      period: '2025'
    },
    {
      title: '影集·Photo Gallery',
      description: '响应式摄影作品展示网站，支持瀑布流布局与交互动效',
      tech: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
      period: '2024'
    },
    {
      title: '车辆追踪系统',
      description: '基于北斗定位的实时车辆监控平台，支持轨迹回放与电子围栏告警',
      tech: ['Vue 3', 'Leaflet', 'WebSocket', 'Express'],
      period: '2025'
    }
  ],

  education: {
    school: '河北农业大学',
    degree: '计算机科学与技术 · 本科',
    period: '2020 - 2027',
    gpa: '3.7/4.0',
    courses: ['数据结构与算法', 'Web前端开发', '人机交互设计', '数据库系统原理', '计算机网络']
  },

  navItems: [
    { label: '首页', href: '#hero' },
    { label: '关于', href: '#about' },
    { label: '能力', href: '#skills' },
    { label: '联系', href: '#contact' }
  ]
};
