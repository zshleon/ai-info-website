document.addEventListener('DOMContentLoaded', () => {
    
    // Tab switching (Visual only for now since all cards are shown in the design)
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Mock data for comments
    const initialComments = {
        claude: [
            { id: 1, text: "Claude Sonnet 写代码确实好用，但 45条限额有点紧张。", likes: 12, rating: 4 },
        ],
        chatgpt: [
            { id: 2, text: "现在降级太频繁了，动不动就被切到 mini 模型。", likes: 45, rating: 3 },
            { id: 3, text: "画图还是 ChatGPT 强。", likes: 8, rating: 4 }
        ],
        gemini: [
            { id: 4, text: "1.5 Pro 有 1M 上下文，处理财报无敌，而且给的条数很多。", likes: 32, rating: 5 }
        ]
    };

    function renderStars(rating) {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            starsHTML += i <= rating ? `<span class="rating-star filled">★</span>` : `<span class="rating-star">★</span>`;
        }
        return `<div class="rating-stars inline-stars" style="pointer-events:none;">${starsHTML}</div>`;
    }

    function setupCommentSection(productId, targetDivId) {
        const container = document.getElementById(targetDivId);
        if (!container) return;

        let comments = initialComments[productId] || [];

        // Build UI
        container.innerHTML = `
            <div class="comments-section">
                <div class="comments-title">用户评论 (${comments.length})</div>
                
                <div class="comment-input-area">
                    <div class="rating-widget" style="margin-bottom: 8px;">
                        评分: 
                        <div class="rating-stars interactive-stars">
                            <span data-val="1" class="rating-star">★</span>
                            <span data-val="2" class="rating-star">★</span>
                            <span data-val="3" class="rating-star">★</span>
                            <span data-val="4" class="rating-star">★</span>
                            <span data-val="5" class="rating-star">★</span>
                        </div>
                    </div>
                    <textarea placeholder="添加您的评论..."></textarea>
                    <button class="comment-submit">发表评论</button>
                </div>

                <div class="comment-list"></div>
            </div>
        `;

        const textarea = container.querySelector('textarea');
        const submitBtn = container.querySelector('.comment-submit');
        const listDiv = container.querySelector('.comment-list');
        const stars = container.querySelectorAll('.interactive-stars .rating-star');
        
        let currentRating = 5; // Default rating
        
        // Setup stars interactivity
        function updateInteractiveStars(val) {
            stars.forEach((s, idx) => {
                if (idx < val) s.classList.add('filled');
                else s.classList.remove('filled');
            });
        }
        updateInteractiveStars(currentRating);
        
        stars.forEach(star => {
            star.addEventListener('click', (e) => {
                currentRating = parseInt(e.target.dataset.val);
                updateInteractiveStars(currentRating);
            });
        });

        // Render comments function
        function renderComments() {
            listDiv.innerHTML = '';
            container.querySelector('.comments-title').textContent = `用户评论 (${comments.length})`;
            
            comments.forEach(c => {
                const item = document.createElement('div');
                item.className = 'comment-item';
                item.innerHTML = `
                    <div class="comment-meta" style="display:flex; justify-content:space-between; margin-bottom:6px;">
                        ${renderStars(c.rating)}
                    </div>
                    <div class="comment-text">${c.text}</div>
                    <div class="comment-tools">
                        <button class="like-btn" data-id="${c.id}">
                            ♥ <span class="like-count">${c.likes}</span>
                        </button>
                    </div>
                `;
                listDiv.appendChild(item);
            });

            // Bind like buttons
            listDiv.querySelectorAll('.like-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const btnEl = e.currentTarget;
                    const id = parseInt(btnEl.dataset.id);
                    const comment = comments.find(c => c.id === id);
                    if (!btnEl.classList.contains('liked')) {
                        btnEl.classList.add('liked');
                        comment.likes++;
                        btnEl.querySelector('.like-count').textContent = comment.likes;
                    } else {
                        btnEl.classList.remove('liked');
                        comment.likes--;
                        btnEl.querySelector('.like-count').textContent = comment.likes;
                    }
                });
            });
        }

        renderComments();

        // Submit comment
        submitBtn.addEventListener('click', () => {
            const text = textarea.value.trim();
            if (text) {
                comments.unshift({
                    id: Date.now(),
                    text: text,
                    likes: 0,
                    rating: currentRating
                });
                textarea.value = '';
                currentRating = 5;
                updateInteractiveStars(5);
                renderComments();
            }
        });
    }

    setupCommentSection('claude', 'claude-comments');
    setupCommentSection('chatgpt', 'chatgpt-comments');
    setupCommentSection('gemini', 'gemini-comments');
});
