// 聊天应用JavaScript代码

// DOM元素
const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// 用户配置
const currentUser = {
    id: 'user',
    name: 'You',
    avatar: 'https://p3-doubao-search-sign.byteimg.com/labis/a9b0ec27e751f6cc2d0286acdb1e8e82~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1782633072&x-signature=m5xO73AC1LQa4T0vH46bL0nWzjA%3D'
};

const botUser = {
    id: 'bot',
    name: 'TEA',
    avatar: 'https://p26-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/fd57c55a55c5440eab1671ca462e92be.jpg~tplv-a9rns2rl98-24:720:720.image?rcl=2025123016214967AE600B96AC510D48E2&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1767687709&x-signature=3Pgmmu3eJFJwnSeL0H9PK7KrIGk%3D'
};

// 预设对话
const presetMessages = [
    {
        sender: currentUser,
        text: '请给我多个主题为："十一月的第一朵茉莉，罗盘的永恒指向"的冬季穿搭方案。',
        timestamp: new Date()
    },
    {
        sender: botUser,
        text: '这是一个很有诗意的主题！我来为你设计几个冬季穿搭方案，融合茉莉花的优雅与罗盘的指引元素。',
        timestamp: new Date()
    },
    {
        sender: botUser,
        text: '方案一：优雅茉莉风 - 米白色高领毛衣搭配浅灰色呢子大衣，下着奶白色毛呢半身裙，脚踩米色短靴，配饰选择珍珠项链和茉莉花香囊，整体色调温暖柔和如茉莉花般清新。',
        timestamp: new Date()
    },
    {
        sender: botUser,
        text: '方案二：罗盘指引风 - 深蓝色毛呢大衣内搭白色针织衫，下着卡其色直筒裤，脚踩棕色皮靴，配饰选择带有罗盘图案的围巾和皮质手套，展现探索精神与时尚态度。',
        timestamp: new Date()
    },
    {
        sender: botUser,
        text: '方案三：冬日茉莉茶 - 浅粉色羊绒衫搭配白色羽绒服，下着浅灰色打底裤，脚踩白色雪地靴，配饰选择毛线帽和毛绒围巾，温暖舒适又不失女性柔美。',
        timestamp: new Date()
    },
    {
        sender: botUser,
        text: '方案四：都市探险家 - 黑色羽绒服内搭高领毛衣，下着黑色修身裤，脚踩黑色皮靴，配饰选择带有指南针元素的背包和手套，展现都市女性的独立与自信。',
        timestamp: new Date()
    },
    {
        sender: botUser,
        text: '方案五：温柔与坚定 - 浅紫色毛衣搭配格纹呢子大衣，下着米色直筒裤，脚踩棕色短靴，配饰选择珍珠耳环和皮质手提包，完美融合茉莉花的温柔与罗盘的坚定。',
        timestamp: new Date()
    },
    {
        sender: botUser,
        text: '方案六：冬季花园 - 白色高领毛衣搭配浅粉色大衣，下着白色毛呢裙，脚踩裸色高跟鞋，配饰选择花朵形状的耳环和手提包，如同一朵在冬日绽放的茉莉花。',
        timestamp: new Date()
    },
    {
        sender: botUser,
        text: '方案七：简约导航者 - 灰色高领毛衣搭配黑色大衣，下着黑色铅笔裤，脚踩黑色短靴，配饰选择简约风格的项链和手表，展现现代都市女性的简约与干练。',
        timestamp: new Date()
    },
    {
        sender: botUser,
        text: '方案八：复古寻香 - 米色针织连衣裙外搭棕色皮毛一体外套，脚踩棕色短靴，配饰选择复古风格的耳环和手提包，仿佛在冬日里寻找茉莉花的芬芳。',
        timestamp: new Date()
    }
];

// 自动回复消息列表（保留用于用户后续提问）
const autoReplies = [
    '这些穿搭方案融合了茉莉花的优雅与罗盘的指引元素，希望你喜欢！',
    '你可以根据场合和个人喜好选择适合自己的穿搭方案。',
    '冬季穿搭最重要的是保暖又时尚，这些方案都兼顾了实用性和美观性。',
    '如果你有其他穿搭需求，随时可以告诉我！',
    '搭配适当的配饰可以让整体造型更加出彩哦！'
];

// 初始化应用
function initApp() {
    // 加载预设对话
    loadPresetMessages();
    
    // 添加事件监听器
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 自动滚动到底部
    scrollToBottom();
}

// 加载预设对话
function loadPresetMessages() {
    presetMessages.forEach((message, index) => {
        setTimeout(() => {
            addMessageToChat(message.sender, message.text, message.timestamp, true);
            
            // 移除了"正在输入"指示器功能
        }, index * 1500); // 每条消息间隔1.5秒
    });
}

// 发送消息
function sendMessage() {
    const text = messageInput.value.trim();
    
    if (text === '') return;
    
    // 添加用户消息到聊天
    addMessageToChat(currentUser, text, new Date());
    
    // 清空输入框
    messageInput.value = '';
    
    // 自动回复
    setTimeout(() => {
        const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
        addMessageToChat(botUser, randomReply, new Date());
    }, 1000);
}

// 添加消息到聊天
function addMessageToChat(sender, text, timestamp, isPreset = false) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');
    
    if (sender.id === currentUser.id) {
        messageContainer.classList.add('sent');
    } else {
        messageContainer.classList.add('received');
    }
    
    // 创建头像元素
    const avatarElement = document.createElement('img');
    avatarElement.src = sender.avatar;
    avatarElement.alt = sender.name;
    avatarElement.classList.add('avatar');
    
    // 创建消息气泡元素
    const messageBubble = document.createElement('div');
    messageBubble.classList.add('message-bubble');
    
    if (sender.id === currentUser.id) {
        messageBubble.classList.add('message-bubble-sent');
    } else {
        messageBubble.classList.add('message-bubble-received');
    }
    
    // 创建消息文本元素
    const messageText = document.createElement('div');
    messageText.classList.add('message-text');
    
    // 将元素组装起来
    messageBubble.appendChild(messageText);
    
    // 不添加任何头像，只显示消息气泡
    messageContainer.appendChild(messageBubble);
    
    // 添加到聊天容器
    chatContainer.appendChild(messageContainer);
    
    // 滚动到底部
    scrollToBottom();
    
    // 应用打字机效果
    if ((sender.id === botUser.id) || isPreset) {
        typeWriterEffect(messageText, text);
    } else {
        messageText.textContent = text;
    }
}

// 打字机效果
function typeWriterEffect(element, text) {
    element.style.setProperty('--steps', text.length);
    element.classList.add('typing-effect');
    
    let i = 0;
    const typingSpeed = 50; // 打字速度（毫秒/字符）
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, typingSpeed);
        } else {
            element.classList.remove('typing-effect');
        }
    }
    
    type();
}

// 已移除"正在输入"指示器功能

// 格式化时间
function formatTime(timestamp) {
    const hours = timestamp.getHours().toString().padStart(2, '0');
    const minutes = timestamp.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// 滚动到底部
function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);