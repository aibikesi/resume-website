export const profile = {
  name: '陈祥宇',
  nameEn: 'Chen Xiangyu',
  title: '前端开发方向 / 本科在读',
  subtitle: '前端开发方向 · 本科在读',
  heroGreeting: '你好， 我是 陈祥宇',
  heroTagline: '用代码创造\n数字体验',
  heroTaglineEn: 'Crafting Digital Experiences',
  heroDescription: '计算机科学与技术专业在读，热爱前端开发与全栈技术实践',
  bio: [
    '计算机科学与技术专业本科在读，专注于全栈开发技术。熟练掌握 HTML、CSS、JavaScript 及 Vue 等前端框架，具备 Spring Boot 后端开发能力。热爱将创意转化为实用的技术方案，追求代码质量与工程效率的平衡。',
    '在校期间积极参与项目实践，注重前后端协同开发与数据库设计。持续学习人工智能与机器学习前沿技术，致力于成为兼具工程能力与创新思维的开发者。'
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
        { name: 'CSS', level: 85 },
        { name: 'HTML', level: 88 },
        { name: 'JavaScript', level: 80 },
        { name: 'Vue', level: 75 }
      ]
    },
    {
      category: '后端基础',
      icon: 'server',
      enTitle: 'Backend',
      items: [
        { name: 'Python', level: 72 },
        { name: 'Spring Boot', level: 68 },
        { name: 'Spring MVC', level: 65 }
      ]
    },
    {
      category: '开发工具',
      icon: 'tool',
      enTitle: 'DevTools',
      items: [
        { name: 'Git', level: 80 },
        { name: 'Linux', level: 72 },
        { name: 'IDEA', level: 78 }
      ]
    },
    {
      category: '数据库',
      icon: 'database',
      enTitle: 'Database',
      items: [
        { name: 'MySQL', level: 75 },
        { name: 'Redis', level: 68 },
        { name: 'SQL 优化', level: 65 },
        { name: '数据库设计规范', level: 70 }
      ]
    },
    {
      category: '人工智能',
      icon: 'cpu',
      enTitle: 'AI / ML',
      items: [
        { name: 'Scikit-learn', level: 65 },
        { name: 'PyTorch', level: 60 },
        { name: '计算机视觉', level: 62 },
        { name: 'NLP', level: 58 }
      ]
    }
  ],

  projects: [
    {
      title: '智慧校园助手',
      description: '基于 Spring Boot + Vue 的全栈校园服务平台，集成课程表、活动通知等功能',
      tech: ['Spring Boot', 'MySQL', 'Vue'],
      period: '2025'
    },
    {
      title: '个人简历网站',
      description: '响应式个人简历展示网站，支持交互动效与暗色主题，部署于 Cloudflare',
      tech: ['React', 'Vite', 'GSAP', 'WebGL'],
      period: '2025'
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
    courses: ['数据结构与算法', 'Web前端开发', '操作系统', '数据库系统原理', '计算机网络']
  },

  navItems: [
    { label: '首页', href: '#hero' },
    { label: '关于', href: '#about' },
    { label: '能力', href: '#skills' },
    { label: '联系', href: '#contact' }
  ]
};
