const VALID_USERNAME = "tibbar";
const VALID_PASSWORD = "3411125";

// 验证相关函数（两步验证）
let authStep = 1; // 1: 用户名, 2: 密码

function checkAuthStatus() {
    return localStorage.getItem("birthday_auth") === "true";
}

function setAuthStatus(authenticated) {
    if (authenticated) {
        localStorage.setItem("birthday_auth", "true");
    } else {
        localStorage.removeItem("birthday_auth");
    }
}

function showLoginModal() {
    const modal = document.getElementById("login-modal");
    if (modal) modal.style.display = "flex";
    resetToStep1(); // 每次显示模态框重置到第一步
}

function hideLoginModal() {
    const modal = document.getElementById("login-modal");
    if (modal) modal.style.display = "none";
}

// 重置到用户名步骤
function resetToStep1() {
    authStep = 1;
    const stepUsername = document.getElementById("step-username");
    const stepPassword = document.getElementById("step-password");
    const loginBtn = document.getElementById("login-btn");
    const errorMsg = document.getElementById("login-error");
    const messageDiv = document.getElementById("login-message");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (stepUsername) stepUsername.style.display = "block";
    if (stepPassword) stepPassword.style.display = "none";
    if (loginBtn) loginBtn.textContent = "下一步";
    if (errorMsg) errorMsg.textContent = "";
    if (messageDiv) messageDiv.innerHTML = "每一件收到的物品都可能是提示哦";
    if (usernameInput) usernameInput.value = "";
    if (passwordInput) passwordInput.value = "";
}

// 切换到密码步骤
function goToStep2() {
    authStep = 2;
    const stepUsername = document.getElementById("step-username");
    const stepPassword = document.getElementById("step-password");
    const loginBtn = document.getElementById("login-btn");
    const errorMsg = document.getElementById("login-error");
    const messageDiv = document.getElementById("login-message");

    if (stepUsername) stepUsername.style.display = "none";
    if (stepPassword) stepPassword.style.display = "block";
    if (loginBtn) loginBtn.textContent = "登录";
    if (errorMsg) errorMsg.textContent = "";
    if (messageDiv) messageDiv.innerHTML = "他做了个梦。那是个思乡的梦。他梦到了一个周日上午，他坐火车回到了家。出站后他坐上了蓝蓝的<b>*号线</b>，<b>*站</b>后到达了一座有名的商场。他在那里吃了饭，打算下午去河边玩。<br>" +
        "他来到了城市北侧的河，那里的花开得正盛。他在河边吹风散步，不觉到了傍晚。他来到了离河岸的第三站，感叹着日新月异。毕竟这一站曾是<b>*号线</b>一期的终点站。<br>" +
        "他坐上了这趟回城的地铁。<b>*站</b>后下了车。在一家鲜为人知的小店吃了碗面。<br>" +
        "吃完晚饭他该走了。他发现不同于来时，<b>*号线</b>能更快的到达车站。<br>" +
        "幸运的是，这一站恰好是个换乘站。他不用再走去找那一条线了。<br>" +
        "坐了<b>*站</b>后，他回到了火车站。可是就在进站的那一刻，一股违和感油然而生。这车站似乎比来的时候大得多得多，而且分明的写着南…南…站……<br>" +
        "他浑然惊醒，才发觉自己睡着了。原来是他在火车上睡着了，还仿佛梦到了今天的行程，却在不同的城市。<br>" +
        "“列车前方到站：苏州站。前方到站：苏州站。”<br>" +
        "<a href='https://www.metroman.cn/maps/shijiazhuang/network' target='_blank'>点此提示</a>";
    // 聚焦密码输入框
    const passwordInput = document.getElementById("password");
    if (passwordInput) setTimeout(() => passwordInput.focus(), 50);
}

function initAuth() {
    if (checkAuthStatus()) {
        hideLoginModal();
        return;
    }

    showLoginModal();

    const loginBtn = document.getElementById("login-btn");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMsg = document.getElementById("login-error");

    // 限制输入只允许字母和数字
    function restrictAlphaNum(e) {
        this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
    }
    if (usernameInput) usernameInput.addEventListener("input", restrictAlphaNum);
    if (passwordInput) passwordInput.addEventListener("input", restrictAlphaNum);

    function handleStep() {
        if (authStep === 1) {
            const username = usernameInput ? usernameInput.value : "";
            if (username === VALID_USERNAME) {
                goToStep2();
            } else {
                errorMsg.textContent = "用户名错误";
                if (usernameInput) usernameInput.value = "";
            }
        } else if (authStep === 2) {
            const password = passwordInput ? passwordInput.value : "";
            if (password === VALID_PASSWORD) {
                setAuthStatus(true);
                hideLoginModal();
            } else {
                errorMsg.textContent = "密码错误";
                if (passwordInput) passwordInput.value = "";
            }
        }
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", handleStep);
    }

    // 支持回车
    const handleEnter = (e) => {
        if (e.key === "Enter") handleStep();
    };
    if (usernameInput) usernameInput.addEventListener("keypress", handleEnter);
    if (passwordInput) passwordInput.addEventListener("keypress", handleEnter);
}


// 页面切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化认证系统
    initAuth();
    // 初始化粒子效果
    initParticles();
    // 初始化烟花粒子效果（仅在首页显示）
    initFireworks();

    // 导航切换
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');

            // 更新导航状态
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // 切换页面
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === pageId) {
                    page.classList.add('active');
                }
            });

            // 如果是首页，显示烟花效果；否则隐藏
            if (pageId === 'home') {
                showFireworks();
            } else {
                hideFireworks();
            }

            // 如果是时间轴页面，检查可见性
            if (pageId === 'timeline') {
                setTimeout(checkTimelineVisibility, 100);
            }
        });
    });

    // 初始化数据
    initLetters();
    initTimeline();
    initMusicPlayer();

    // 页面加载后触发时间轴检查
    setTimeout(checkTimelineVisibility, 300);

    // 初始时滚动到顶部
    window.scrollTo(0, 0);
});

// 粒子效果
function initParticles() {
    const count = 80;

    for (let i = 0; i < count; i++) {
        const p = document.createElement("div");
        p.className = "particle";

        const size = Math.random() * 3 + 2;
        p.style.width = size + "px";
        p.style.height = size + "px";

        p.style.left = Math.random() * window.innerWidth + "px";
        p.style.top = Math.random() * window.innerHeight + "px";

        p.style.animationDuration = (Math.random() * 4 + 4) + "s";
        p.style.animationDelay = Math.random() * 5 + "s";

        // 使用暖色调
        p.style.background = `hsl(${Math.random() * 30 + 20}, 100%, 80%)`;

        document.body.appendChild(p);
    }
}

// 烟花粒子效果
let fireworksInterval;

function initFireworks() {
    const fireworksContainer = document.getElementById('fireworks');

    // 创建烟花粒子
    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';

        // 随机位置
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // 随机大小
        const size = Math.random() * 8 + 2;

        // 随机颜色 - 使用暖色调
        const colors = ['#ff9e6d', '#ffb347', '#ffcc80', '#ffddb0', '#ffe6cc'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // 设置烟花样式
        firework.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            opacity: 0;
            box-shadow: 0 0 10px ${color};
        `;

        fireworksContainer.appendChild(firework);

        // 烟花动画
        const duration = Math.random() * 2 + 1;
        const delay = Math.random() * 0.5;

        // 使用Web Animations API创建动画
        firework.animate([
            {
                opacity: 0,
                transform: 'scale(0) translate(0, 0)'
            },
            {
                opacity: 1,
                transform: 'scale(1) translate(0, 0)'
            },
            {
                opacity: 0,
                transform: `scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`
            }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });

        // 动画结束后移除元素
        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, (duration + delay) * 1000);
    }

    // 开始烟花效果
    function startFireworks() {
        fireworksInterval = setInterval(createFirework, 300);
    }

    // 停止烟花效果
    function stopFireworks() {
        clearInterval(fireworksInterval);
        // 清除所有烟花元素
        const fireworks = document.querySelectorAll('.firework');
        fireworks.forEach(firework => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        });
    }

    // 暴露函数给外部使用
    window.showFireworks = startFireworks;
    window.hideFireworks = stopFireworks;
}

// 信箱数据
const letters = [
    {
        title: "来自15岁的ZLZQ",
        date: "2022年2月26日",
        preview: "那一年，你对我说...",
        content: "写给正在努力奋斗的M.E.:<br>" +
            "打扰啦～虽然信息发达，可我还是愿意将我想说的话写出来，看起来会厚重一点，正式一点。<br>" +
            "虽然我们不在一个学校，交流甚少，可能共同话题可不也不很多，但我还是无法忘记你。我似乎停留在过去，记忆像一本被我翻烂的书，只有那么多，每次想着想着就会不由自主的笑。<br>" +
            "我现在在精英中学过着住校生活，还算充实紧张，每天有读不完的课本写不完的限时练，背不过的读背资料和改不完的错题。你在二中应该过得很充实满足吧。我在精英一切都好，希望你亦然快乐。<br>" +
            "我们28日开学，所以我无法在你生日当天送上祝福，只好提前道一声：“生日快乐。”<br>" +
            "你就是我的候样。说实话，每次我做数学、物理题快崩溃时，我者会想一想你，想一想老徐也许正在埋头苦学，于是我又充满了动力。因为你，我愿意成为一个更好的人。<br>" +
            "好啦，我不找打扰你啦，那就祝我们爬不同的山，还能回到同一条路上，等我们再见时，那时我们会更好。天天开心！<br>" +
            "没准备开学考试的我<br>" +
            "2022.2.26晚<br>"
    },
    {
        title: "来自16岁的M.E.",
        date: "2022年4月1日",
        preview: "那一年，我想对你说...",
        content: "TO 16岁的你：<br>" +
            "首先，祝你生日快乐!<br>" +
            "今年没办法见面送礼物真是可惜。还好网络还给了我一个写生贺的机会，还希望你能体谅我潦草的字迹。<br>" +
            "过去的一年里，真的发生了太多。一年以前，我们还共处一个学校，共面同一个挑战，共有着对未来的无限理想与目标；而一年之后的如今，我们虽不在同一所学校，但眼前的挑战和心中的梦，还是相同的。中考后，我们在学校握手言别；而如今，我们仍能在网络上相见。九年同窗的同学情谊，岂是一朝分别，三年异处所能磨灭的。现在想想，我真的很幸运。能在人生三观刚开始形成时遇到了你。是你，与我在艰难学习路上一起挣扎；是你，让懵懂无知的我学会了与人交住；是你，送给了我一份宝贵的人生经历。谢谢你。<br>" +
            "诚然，高中是辛苦的三年，但这才是我们人生中最精彩的三年。我们不再怀抱儿童的天真，不再阻对世界的无知而真正懂得什么是生活，什么是价值。提到这，我就不由得想起年级主任说过的话:“二中是一所有情怀的学校。而我们繁多的活动也印证了这一点，——也许这才提历届二中学子真正留恋二中的原因吧——留恋自己的青春。是啊，无论如何，无论在什么学校，在这三年里，最重要的是拼搏出值得留恋的无悔青春。<br>" +
            "读了你的生贺，我真的很感动。一想到在我学习时，在不远的教室里，也有一个奋斗的身影，我就觉得我必须尽全力拼过三年，哪怕不是为了我自己。还是以我班主任在班会课上的发言收尾最为会适:<br>" +
            "“如果让我表达我的情感，我不会说我爱你们，我会说：我陪你们三年”<br>" +
            "刚16岁的M.E.<br>"
    },
    {
        title: "来自17岁的M.E.",
        date: "2023年4月1日",
        preview: "之后，我想对你说...",
        content: "TO 17岁的你：<br>" +
            "生日快乐啊！这是一句迟到的生日祝福。<br>" +
            "虽然写这篇生贺时是4月1日，但你读到它时距现在多远就不得而知了。<br>" +
            "如果你能对每年都迟到的祝福没有太多怨言，那就太好了。作为补偿，今年也准备了特殊礼物，希望它能跨过网络传递给你。<br>" +
            "都说“见字如晤”，这背后除了思念，更多的应该是回忆和真挚情谊。十一年相识，九年同窗，我们从学习上的同伴，一路走来成为“人生路上的战友”。<br>" +
            "你说我是你最好的朋友，看到这行字，我真的非常开心，同时十分感慨，在那一瞬间，我无比真加地感受到你就站在我面前，在那一瞬间，我第一次感受到自己受他人在意。在那一瞬间，我深切地体会到了文字的力量和分量。<br>" +
            "谢谢你。同样我也认为你是我最好的“战友”。<br>" +
            "在我看来，这与普通的“同好“意义不同。“同好”仅以共同兴趣相联系，停留于表面，在当下互联网时代更方便形成；而所谓战友即能同甘共苦，互帮互助，共同冲锋的更深入的关系。<br>" +
            "谢谢你，在求学的“战场”上与我并肩前行，谢谢你，对我如此接纳和认可。<br>" +
            "转眼我们都已不再是当初的孩童，成人的沉梯也只差一阶，求学的“战斗”也进入了最后时刻。“高三”的重量远非这两个文字所能承受，但其重量更不可能把学生压倒。<br>" +
            "你也说会想到我和你一样在努力，视我为方向，但我想告诉你，这也是竞赛带给我最宝贵的一条收获：青春从不需要方向，水手的眼中从来不是岸边和灯塔，而是无尽的，波涛汹涌的，吸引着人深入其中的那大海。<br>" +
            "任何人无成为青春授勋，你面对的方向就是前方，你脚踏的地方就是道路。成为一束光，为何一定要追逐太阳？尽全去攀，去闯，纵使从空中坚下，也能成为闪电亮彻天际。<br>" +
            "这时，我将不会是灯塔，而是床头暗淡的夜灯。<br>" +
            "最后，再次祝你生日快乐，新的一岁，新的征程。纵生于黑夜，仍怒号光明。那时，我们终会于顶峰再会。<br>" +
            "17岁的M.E.<br>" +
            "2023年4月1日。<br>"
    },
    {
        title: "来自19岁的ZLZQ",
        date: "2026年3月15日",
        preview: "写给二十岁的M.E. ...",
        content: "二十岁的M.E.:<br>" +
            "你好啊!见字如面，今年虽然没办法亲身赶到苏州给你线下过生日(我准备的线下plan就这样泡汤了..，但我依旧准备了一些小惊喜，希望能够通过网络让你感到些许的来自好友的温暖和祝福。<br>" +
            "我之前在网上看到一篇博文，题目叫做“二十岁是人生的雨季”，博文里面讲述了关于博主对人生二十岁的探讨，里面有一些内容我的确有些共情，同时，我也有一些自己的想法和思考，现在 我想把它们讲给你听。<br>" +
            "自从上了大学，我感觉时间过的越来越快，日子就像被上了发条一样，专业课、实验、作业、比赛各种各样的事情不断的吻上来，除了学业，还有社交上的琐事缠身，只有在周末才能够奢侈地睡到自然醒，感受久违的慵懒和闲散。<br>" +
            "我们在年龄上成年了，可我觉得我的心理还尚未成年，就像村上春树在《挪威的森林》里提到过的“那时我发现自己已经二十岁了，这个突然的发现让我有点不知所措。在那之前，我一直以为十八岁之后是十九岁，十九岁之后是十八岁，如此反复”，十九岁在过渡中度过，我们被猛然抛进成年人的世界里，却还带少年人尚未被磨平棱角，我的思想是矛盾的，我一方面在渴望不必有各种计划所束缚的旅行，享受这副年轻的躯体带来的力量，另一方面，我又羡慕那些三十多岁人的沉稳和成熟，我既想拥有不顾一切的冲动又渴望着游刃有余的老练，就在这样的矛盾中，跌跌撞撞地来到二十岁的路口。<br>" +
            "二十岁，当源源不断的焦虑和内心勃发的生机形成一种平衡，它们拉扯着我，却也托举着我，一边让我看清前路漫漫，一边让我长出奔赴的翅膀，“二十岁是人生的雨季”，充满潮湿、暗淡和各种不确定性，但是，没有哪个地方会一直下雨，就像加缪所说的:“我的身上，有一个不可战胜的夏天”<br>" +
            "我想，我们都会迎来夏天的，那时，你还会是我的挚友，我们还会看向彼此，还会说“你好啊，又见面了，最近过得还好吗”。<br>" +
            "Zlzq于2026年3月15日0时<br>"
    },
    {
        title: "来自20岁的M.E.",
        date: "2026年4月1日",
        preview: "今天，我想对你说...",
        content: "红豆泥私密马赛，这里没有大段文字。原谅我今年没有码字，时间全用来写代码和设计ARG了。希望你能get到我的巧思。"
    }
];

// 初始化信箱
function initLetters() {
    const lettersContainer = document.querySelector('.letters-container');

    letters.forEach((letter, index) => {
        const letterElement = document.createElement('div');
        letterElement.className = 'letter';
        letterElement.innerHTML = `
            <div class="letter-header">
                <h3 class="letter-title">${letter.title}</h3>
                <span class="letter-date">${letter.date}</span>
            </div>
            <div class="letter-preview">${letter.preview}</div>
            <div class="letter-content">${letter.content}</div>
        `;

        letterElement.addEventListener('click', function() {
            // 切换展开状态
            this.classList.toggle('expanded');

            // 点击反馈
            this.style.transform = 'translateY(-3px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });

        lettersContainer.appendChild(letterElement);
    });
}

// 时间轴数据
const timelineItems = [
    {
        date: "2025年3月15日",
        title: "南京大学（鼓楼校区）",
        text: "北大楼",
        image: "20250315.jpg"
    },
    {
        date: "2025年3月29日",
        title: "莫愁湖公园",
        text: "南京的春",
        image: "20250329.jpg"
    },
    {
        date: "2025年9月20日",
        title: "虎丘湿地公园",
        text: "苏州的秋",
        image: "20250920.jpg"
    },
    {
        date: "2026年3月29日",
        title: "观音门公园",
        text: "无敌构图",
        image: "20250329.jpg"
    }
];

// 初始化时间轴
function initTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');

    timelineItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
        itemElement.innerHTML = `
            <div class="timeline-date">${item.date}</div>
            <div class="timeline-content">
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-text">${item.text}</p>
                <img src="${item.image}" alt="${item.title}" class="timeline-image" loading="lazy">
            </div>
        `;

        timelineContainer.appendChild(itemElement);
    });
}

// 检查时间轴元素是否可见
function checkTimelineVisibility() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) * 1.2 &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (isVisible) {
            item.classList.add('visible');
        }
    });
}

// 监听滚动事件，检查时间轴可见性
window.addEventListener('scroll', checkTimelineVisibility);

// 音乐播放器功能
function initMusicPlayer() {
    const audio = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSongElement = document.querySelector('.current-song');

    // 音乐列表
    const songs = [
        { title: "生日快乐（海底捞版）", src: "music1.mp3" },
        { title: "Fly My Wings - Mili", src: "music2.mp3" },
        { title: "这世界那么多人 - 莫文蔚", src: "music3.mp3" },
        { title: "小美满 - 周深", src: "music4.mp3" }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;

    // 更新当前歌曲显示
    function updateSongInfo() {
        currentSongElement.textContent = songs[currentSongIndex].title;
    }

    // 播放/暂停功能
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;

        // 点击反馈
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });

    // 上一首
    prevBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        audio.src = songs[currentSongIndex].src;
        updateSongInfo();

        if (isPlaying) {
            audio.play();
        }

        // 点击反馈
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });

    // 下一首
    nextBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        audio.src = songs[currentSongIndex].src;
        updateSongInfo();

        if (isPlaying) {
            audio.play();
        }

        // 点击反馈
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });

    // 初始化歌曲信息
    updateSongInfo();
}