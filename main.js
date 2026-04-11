const DB = [
    {
        id: 'claude',
        baseName: 'Claude',
        logoText: 'C',
        logoBg: '#e3a985',
        tiers: {
            free: { price: { zh: '免费', en: 'Free' }, stat: { value: { zh: '有限次数', en: 'Limited' }, desc: { zh: '视服务器负载变动', en: 'Varies with server load' } }, rating: 2, tags1: [{ text: {zh: '每日重置', en: 'Daily Reset' }, type: 'outlined'}], tags2: [{ text: {zh: 'Sonnet 4.6', en: 'Sonnet 4.6'}, type: 'outlined'}] },
            pro: { price: { zh: '$20 / 月', en: '$20 / mo' }, stat: { value: { zh: '~45条/5小时', en: '~45 msgs / 5h' }, desc: { zh: '短消息估算，长对话消耗更快', en: 'Estimate for short msgs' } }, rating: 3, tags1: [{ text: { zh: '5小时一次', en: '5-Hour Reset' }, type: 'outlined' }], tags2: [{ text: { zh: 'Sonnet/Opus 4.6', en: 'Sonnet/Opus 4.6' }, type: 'outlined' }] },
            max: { price: { zh: '$30 / 月', en: '$30 / mo (Team)' }, stat: { value: { zh: '~100条/5小时', en: '~100 msgs / 5h' }, desc: { zh: '团队版配额更高', en: 'Higher quota per user' } }, rating: 4, tags1: [{ text: { zh: '高频优先', en: 'High Priority' }, type: 'orange' }], tags2: [{ text: { zh: '全部模型', en: 'All Models' }, type: 'outlined' }] }
        },
        comments: [{ id: 1, text: { zh: 'Claude 写代码真的强。', en: 'Claude is goated for coding.' }, likes: 12, rating: 5 }]
    },
    {
        id: 'chatgpt',
        baseName: 'ChatGPT',
        logoText: 'G',
        logoBg: '#2ab684',
        tiers: {
            free: { price: { zh: '免费', en: 'Free' }, stat: { value: { zh: '动态配额', en: 'Dynamic' }, desc: { zh: 'GPT-5/o3 每月极低配额', en: 'Very low advanced features' } }, rating: 2, tags1: [{ text: { zh: '共享池', en: 'Shared Pool' }, type: 'orange' }], tags2: [{ text: { zh: 'GPT-5_mini', en: 'GPT-5_mini' }, type: 'outlined' }] },
            pro: { price: { zh: '$20 / 月', en: '$20 / mo' }, stat: { value: { zh: '动态浮动', en: 'Dynamic Float' }, desc: { zh: '超限降级至 mini', en: 'Fallback to mini when limit hit' } }, rating: 4, tags1: [{ text: { zh: '5小时', en: '5-Hour Reset' }, type: 'outlined' }], tags2: [{ text: { zh: 'GPT-5 / o3', en: 'GPT-5 / o3' }, type: 'outlined' }] },
            max: { price: { zh: '$60 / 月', en: '$60 / mo (Pro+)' }, stat: { value: { zh: '无限量o3', en: 'Unlimited o3' }, desc: { zh: '无需担心降级', en: 'No more fallback' } }, rating: 5, tags1: [{ text: { zh: '独立配额', en: 'Dedicated Quota' }, type: 'green' }], tags2: [{ text: { zh: '最高优先级', en: 'Highest Prio' }, type: 'outlined' }] }
        },
        comments: [{ id: 2, text: { zh: '降级有些烦人，但这玩意全能。', en: 'Fallback is annoying but it does everything.' }, likes: 45, rating: 4 }]
    },
    {
        id: 'gemini',
        baseName: 'Google AI',
        logoText: 'G',
        logoBg: '#4c8bf5',
        tiers: {
            free: { price: { zh: '免费', en: 'Free' }, stat: { value: { zh: '无明确限制', en: 'No Explicit Limit' }, desc: { zh: '基础 Flash 模型', en: 'Basic Flash Model' } }, rating: 5, tags1: [{ text: { zh: '日常使用充足', en: 'Plenty for Daily' }, type: 'green' }], tags2: [{ text: { zh: 'Gemini Flash', en: 'Gemini Flash' }, type: 'outlined' }] },
            pro: { price: { zh: '$19.99 / 月', en: '$19.99 / mo' }, stat: { value: { zh: '~500条/天', en: '~500 msgs / day' }, desc: { zh: 'Gemini App 对话', en: 'Gemini App Chat' } }, rating: 5, tags1: [{ text: { zh: '每天凌晨重置', en: 'Daily Reset' }, type: 'outlined' }], tags2: [{ text: { zh: 'Gemini 3.1 Pro', en: 'Gemini 3.1 Pro' }, type: 'outlined' }] },
            max: { price: { zh: '$30 / 月', en: '$30 / mo (Enterprise)' }, stat: { value: { zh: '~1000条/天', en: '~1000 msgs / day' }, desc: { zh: '附加各种服务积分', en: 'Workspace Integrated' } }, rating: 5, tags1: [{ text: { zh: '随时重置', en: 'Anytime' }, type: 'outlined' }], tags2: [{ text: { zh: '全家桶', en: 'All Google Suite' }, type: 'outlined' }] }
        },
        comments: [{ id: 3, text: { zh: '上下文超级长，特别好用。', en: 'Context length is insane.' }, likes: 18, rating: 5 }]
    },
    {
        id: 'deepseek',
        baseName: 'DeepSeek',
        logoText: 'D',
        logoBg: '#2c3e50',
        tiers: {
            free: { price: { zh: '免费', en: 'Free' }, stat: { value: { zh: '无限度', en: 'Unlimited' }, desc: { zh: '免费网页端', en: 'Free Web UI' } }, rating: 5, tags1: [{ text: { zh: '服务器可能繁忙', en: 'Network busy at times' }, type: 'orange' }], tags2: [{ text: { zh: 'DeepSeek V3', en: 'DeepSeek V3' }, type: 'outlined' }] },
            pro: { price: { zh: '按Token计费', en: 'Pay as you go' }, stat: { value: { zh: '高并发API', en: 'High Concurrency API' }, desc: { zh: '极低成本', en: 'Incredibly low cost' } }, rating: 5, tags1: [{ text: { zh: 'API独立扣费', en: 'Separate API billing' }, type: 'grey' }], tags2: [{ text: { zh: 'Coder / Chat', en: 'Coder / Chat' }, type: 'outlined' }] },
            max: { price: { zh: '企业充值', en: 'Enterprise Top-up' }, stat: { value: { zh: '专属集群', en: 'Dedicated Cluster' }, desc: { zh: '独享算力不排队', en: 'No queuing' } }, rating: 5, tags1: [{ text: { zh: '独立配额', en: 'Dedicated Quota' }, type: 'green' }], tags2: [{ text: { zh: '所有模型', en: 'All models' }, type: 'outlined' }] }
        },
        comments: [{ id: 4, text: { zh: '国产性价比之光，编程超越多数对手。', en: 'Best value globally, coding beats most.' }, likes: 98, rating: 5 }]
    },
    {
        id: 'kimi',
        baseName: 'Kimi',
        logoText: 'K',
        logoBg: '#d35400',
        tiers: {
            free: { price: { zh: '免费', en: 'Free' }, stat: { value: { zh: '中高频限流', en: 'Rate limited peak' }, desc: { zh: '高峰期需排队', en: 'Queues during peak' } }, rating: 3, tags1: [{ text: { zh: '动态限流', en: 'Dynamic Limiting' }, type: 'orange' }], tags2: [{ text: { zh: 'Moonshot 默认', en: 'Moonshot Default' }, type: 'outlined' }] },
            pro: { price: { zh: '打赏制 (如 19元/月)', en: 'Tips (e.g. ~$3/mo)' }, stat: { value: { zh: '优先权', en: 'Priority Access' }, desc: { zh: '不排队、高联网额度', en: 'No queues, higher web search' } }, rating: 4, tags1: [{ text: { zh: '高峰专属', en: 'Peak Bypass' }, type: 'green' }], tags2: [{ text: { zh: 'Moonshot Plus', en: 'Moonshot Plus' }, type: 'outlined' }] },
            max: { price: { zh: '打赏 199/月', en: 'Tips max (~$28/mo)' }, stat: { value: { zh: '无极长文', en: 'Limitless Long-text' }, desc: { zh: '支持庞大文档上下文', en: 'Massive document contextual limit' } }, rating: 5, tags1: [{ text: { zh: '绝不排队', en: 'Never queues' }, type: 'green' }], tags2: [{ text: { zh: '200W 上下文满血', en: '2M Full Context' }, type: 'outlined' }] }
        },
        comments: [{ id: 5, text: { zh: '阅读长文档太舒服了，国产必用。', en: 'Reading long papers is a breeze.' }, likes: 67, rating: 5 }]
    }
];

const I18N = {
    overview: { zh: '总览：共用 vs 独立', en: 'Overview: Shared vs Dedicated' },
    chat: { zh: '普通聊天', en: 'Standard Chat' },
    coding: { zh: 'AI 编程工具', en: 'AI Coding Tools' },
    cli: { zh: 'CLI 终端', en: 'CLI Terminal' },
    free: { zh: '免费版 (Free)', en: 'Free Tier' },
    pro: { zh: '专业版 (Pro/Plus)', en: 'Pro / Plus Tier' },
    max: { zh: '尊享版 (Max/Enterprise)', en: 'Max / Enterprise Tier' },
    chatLimit: { zh: '聊天限额', en: 'Chat Quotas' },
    resetCycle: { zh: '重置周期', en: 'Reset Cycle' },
    model: { zh: '模型', en: 'Models' },
    ratingTxt: { zh: '相对宽裕度', en: 'Generosity' },
    comments: { zh: '用户评论', en: 'Comments' },
    commentPlaceholder: { zh: '添加您的评论...', en: 'Add your comment...' },
    submitComment: { zh: '发表评论', en: 'Post Comment' },
    rateHint: { zh: '评分:', en: 'Rating:' }
};

document.addEventListener('DOMContentLoaded', () => {
    let currentLang = 'zh';
    let currentTier = 'pro';
    let currentTheme = localStorage.getItem('theme') || 'auto';
    
    const cardsRoot = document.getElementById('cards-root');
    const langBtn = document.getElementById('lang-toggle');
    const themeBtn = document.getElementById('theme-toggle');
    const subFilter = document.getElementById('sub-filter');

    // DOM strings cache
    const uiTabOverview = document.getElementById('ui-tab-overview');
    const uiTabChat = document.getElementById('ui-tab-chat');
    const uiTabCoding = document.getElementById('ui-tab-coding');
    const uiTabCli = document.getElementById('ui-tab-cli');
    const uiFilterFree = document.getElementById('ui-filter-free');
    const uiFilterPro = document.getElementById('ui-filter-pro');
    const uiFilterMax = document.getElementById('ui-filter-max');

    // Handle Theme
    function applyTheme(theme) {
        if (theme === 'auto') {
            document.documentElement.removeAttribute('data-theme');
            themeBtn.textContent = '🌙 Auto';
        } else if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeBtn.textContent = '☀️ Dark';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeBtn.textContent = '🌙 Light';
        }
    }
    
    // Auto-detect system 
    const darkMatch = window.matchMedia('(prefers-color-scheme: dark)');
    if(currentTheme === 'auto') {
        document.documentElement.setAttribute('data-theme', darkMatch.matches ? 'dark' : 'light');
    } else {
        applyTheme(currentTheme);
    }
    darkMatch.addEventListener('change', e => {
        if(currentTheme === 'auto') document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    });

    themeBtn.addEventListener('click', () => {
        if(currentTheme === 'auto') currentTheme = 'dark';
        else if(currentTheme === 'dark') currentTheme = 'light';
        else currentTheme = 'auto';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
        // recheck auto if we switched to it
        if(currentTheme === 'auto') document.documentElement.setAttribute('data-theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    });

    // Handle Lang
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        langBtn.textContent = currentLang === 'zh' ? 'English' : '中文';
        renderApp();
    });

    // Handle Sub
    subFilter.addEventListener('change', (e) => {
        currentTier = e.target.value;
        renderApp();
    });

    // Handle Tabs (Visual)
    document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', (e) => {
        document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
        e.target.classList.add('active');
    }));

    function getStars(rating) {
        let h = '';
        for(let i=1; i<=5; i++) {
            h += i <= rating ? '★' : '<span class="stars-dim">☆</span>';
        }
        return h;
    }

    function renderApp() {
        // Update static UI translations
        uiTabOverview.textContent = I18N.overview[currentLang];
        uiTabChat.textContent = I18N.chat[currentLang];
        uiTabCoding.textContent = I18N.coding[currentLang];
        uiTabCli.textContent = I18N.cli[currentLang];
        uiFilterFree.textContent = I18N.free[currentLang];
        uiFilterPro.textContent = I18N.pro[currentLang];
        uiFilterMax.textContent = I18N.max[currentLang];

        // Render Cards
        cardsRoot.innerHTML = '';
        DB.forEach(prod => {
            const tData = prod.tiers[currentTier];
            const tags1Html = tData.tags1.map(tag => `<span class="tag ${tag.type}">${tag.text[currentLang]}</span>`).join('');
            const tags2Html = tData.tags2.map(tag => `<span class="tag ${tag.type}">${tag.text[currentLang]}</span>`).join('');

            const card = document.createElement('div');
            card.className = `card ${prod.id}`;
            card.innerHTML = `
                <div class="card-header">
                    <div class="logo-box" style="background:${prod.logoBg}">${prod.logoText}</div>
                    <div class="title">
                        <h2>${prod.baseName} ${currentTier === 'pro' && prod.id === 'claude'? 'Pro' : ''}${currentTier === 'pro' && prod.id === 'chatgpt'? 'Plus' : ''}</h2>
                        <p>${tData.price[currentLang]}</p>
                    </div>
                </div>
                
                <div class="section-label">${I18N.chatLimit[currentLang]}</div>
                <div class="stat-block">
                    <div class="stat-value">${tData.stat.value[currentLang]}</div>
                    <div class="stat-desc">${tData.stat.desc[currentLang]}</div>
                </div>
                
                <div class="rating">${I18N.ratingTxt[currentLang]} <span class="stars">${getStars(tData.rating)}</span></div>
                
                <div class="section-label">${I18N.resetCycle[currentLang]}</div>
                <div class="tags"><div class="tag-group">${tags1Html}</div></div>

                <div class="section-label">${I18N.model[currentLang]}</div>
                <div class="tags"><div class="tag-group">${tags2Html}</div></div>

                <div class="comments-section" id="${prod.id}-comments"></div>
            `;
            cardsRoot.appendChild(card);
            renderComments(prod.id, card.querySelector(`#${prod.id}-comments`));
        });
    }

    function renderComments(pid, container) {
        const prod = DB.find(p => p.id === pid);
        const comments = prod.comments || [];
        
        container.innerHTML = `
            <div class="comments-title">${I18N.comments[currentLang]} (${comments.length})</div>
            <div class="comment-input-area">
                <div class="rating-widget">
                    ${I18N.rateHint[currentLang]}
                    <div class="rating-stars interactive-stars">
                        <span data-val="1" class="rating-star">★</span><span data-val="2" class="rating-star">★</span>
                        <span data-val="3" class="rating-star">★</span><span data-val="4" class="rating-star">★</span>
                        <span data-val="5" class="rating-star">★</span>
                    </div>
                </div>
                <textarea placeholder="${I18N.commentPlaceholder[currentLang]}"></textarea>
                <button class="comment-submit">${I18N.submitComment[currentLang]}</button>
            </div>
            <div class="comment-list"></div>
        `;

        const textarea = container.querySelector('textarea');
        const submitBtn = container.querySelector('.comment-submit');
        const listDiv = container.querySelector('.comment-list');
        const stars = container.querySelectorAll('.interactive-stars .rating-star');
        
        let currentRating = 5;
        function updateStars(val) {
            stars.forEach((s, idx) => {
                if (idx < val) s.classList.add('filled');
                else s.classList.remove('filled');
            });
        }
        updateStars(currentRating);
        stars.forEach(star => {
            star.addEventListener('click', (e) => {
                currentRating = parseInt(e.target.dataset.val);
                updateStars(currentRating);
            });
        });

        function populateList() {
            listDiv.innerHTML = '';
            comments.forEach(c => {
                const item = document.createElement('div');
                item.className = 'comment-item';
                
                let sH = '';
                for(let i=1; i<=5; i++) sH += i <= c.rating ? `<span class="rating-star filled" style="cursor:default">★</span>` : `<span class="rating-star" style="cursor:default">★</span>`;
                
                item.innerHTML = `
                    <div class="rating-stars" style="margin-bottom:6px;">${sH}</div>
                    <div class="comment-text">${typeof c.text === 'object' ? c.text[currentLang] || c.text.zh : c.text}</div>
                    <div class="comment-tools">
                        <button class="like-btn" data-id="${c.id}">
                            ♥ <span class="like-count">${c.likes}</span>
                        </button>
                    </div>
                `;
                listDiv.appendChild(item);
            });

            // Like toggles
            listDiv.querySelectorAll('.like-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const el = e.currentTarget;
                    const id = parseInt(el.dataset.id);
                    const c = comments.find(x => x.id === id);
                    if (!el.classList.contains('liked')) {
                        el.classList.add('liked');
                        c.likes++;
                    } else {
                        el.classList.remove('liked');
                        c.likes--;
                    }
                    el.querySelector('.like-count').textContent = c.likes;
                });
            });
        }

        populateList();

        submitBtn.addEventListener('click', () => {
            const text = textarea.value.trim();
            if (text) {
                comments.unshift({
                    id: Date.now(),
                    text: { zh: text, en: text }, // default generic
                    likes: 0,
                    rating: currentRating
                });
                textarea.value = '';
                updateStars(5); currentRating = 5;
                container.querySelector('.comments-title').textContent = `${I18N.comments[currentLang]} (${comments.length})`;
                populateList();
            }
        });
    }

    // Init
    renderApp();
});
