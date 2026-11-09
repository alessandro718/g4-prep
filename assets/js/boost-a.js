/* 进阶题 Day 1-5：每天 10 题（英语 5 / 数学 3 / 语文 2） */
window.BOOST_A = {
  1: [
    {
      subject: 'eng', skill: '词义猜测', type: 'reading',
      stem: 'In the passage, the word "instinct" means an ability that —',
      options: ['is learned from parents', 'an animal has without being taught', 'only young animals have', 'is used only for finding food'],
      answer: 1,
      explain: '原文直接给了定义："something an animal knows how to do without being taught"。做词义题先找文中的解释句，通常在破折号或 that is 之后。'
    },
    {
      subject: 'eng', skill: '主谓一致', type: 'choice',
      stem: 'Choose the correct word: "Monarch butterflies ____ south every autumn."',
      options: ['flies', 'fly', 'is flying', 'has flown'],
      answer: 1,
      explain: '主语 butterflies 是复数，一般现在时用动词原形 fly。注意 every autumn 是一般现在时的标志词。'
    },
    {
      subject: 'eng', skill: '代词指代', type: 'choice',
      stem: 'Read: "They also follow the same routes their parents used, even though they have never flown them before." What does "them" refer to?',
      options: ['the parents', 'the routes', 'the butterflies', 'the scientists'],
      answer: 1,
      explain: 'them 指前面最近出现的复数名词 routes（路线）。代词题的方法：往前找最近的、意思讲得通的复数名词。'
    },
    {
      subject: 'eng', skill: '推理', type: 'reading',
      stem: 'Why does the passage say "No single butterfly makes the whole trip alone"?',
      options: ['Because butterflies are too weak to fly far.', 'Because several generations share the journey.', 'Because scientists carry some of them.', 'Because they rest in Mexico for years.'],
      answer: 1,
      explain: '原文紧接着解释 "several generations take turns"，说明是几代人接力完成。这类题答案就在下一句，不要凭常识选。'
    },
    {
      subject: 'eng', skill: '细节', type: 'reading',
      stem: 'According to the passage, what do the butterflies do in spring?',
      options: ['They fly south to Mexico.', 'They stop to lay eggs on milkweed plants.', 'They hide in the mountains.', 'They wait for the sun to move.'],
      answer: 1,
      explain: '原文："In spring, the butterflies fly north again. They stop to lay eggs on milkweed plants." 细节题按季节定位原文即可。'
    },
    {
      subject: 'math', skill: '除法估算', type: 'choice',
      stem: 'A monarch butterfly travels about 3,000 miles in 90 days. About how many miles does it travel each day?',
      options: ['about 3 miles', 'about 30 miles', 'about 300 miles', 'about 3,000 miles'],
      answer: 1,
      explain: '3,000 ÷ 90 = 300 ÷ 9 ≈ 33，最接近 30。估算题先把两个数同时划掉一个 0，再算 300 ÷ 9。'
    },
    {
      subject: 'math', skill: '多步乘法', type: 'choice',
      stem: 'A park counts 12,500 butterflies on Monday. On Tuesday there are 3 times as many. How many butterflies are counted on the two days in all?',
      options: ['37,500', '50,000', '62,500', '25,000'],
      answer: 1,
      explain: '周二 12,500 × 3 = 37,500，两天合计 12,500 + 37,500 = 50,000。注意问的是 two days in all，要加总，不是只算周二。'
    },
    {
      subject: 'math', skill: '单位换算', type: 'choice',
      stem: 'One mile is about 1.6 kilometers. About how many kilometers is a 2,500-mile journey?',
      options: ['1,560 km', '2,500 km', '4,000 km', '16,000 km'],
      answer: 2,
      explain: '2,500 × 1.6 = 4,000。可以先算 2,500 × 1.5 = 3,750，再加 2,500 × 0.1 = 250，合计 4,000。'
    },
    {
      subject: 'chi', skill: '字形', type: 'choice',
      stem: '下列词语中，没有错别字的一项是：',
      options: ['迫不急待', '一如既往', '再接再励', '变本加利'],
      answer: 1,
      explain: 'A 应为「迫不及待」（急→及），C 应为「再接再厉」（励→厉），D 应为「变本加厉」（利→厉）。「一如既往」正确。'
    },
    {
      subject: 'chi', skill: '成语运用', type: 'choice',
      stem: '下列句子中成语使用恰当的一项是：',
      options: ['他上课总是心不在焉，笔记记得工工整整。', '这道题他想了半个小时，终于恍然大悟。', '同学们在操场上鸦雀无声地奔跑。', '这本书我看了三遍，真是一见钟情。'],
      answer: 1,
      explain: '恍然大悟＝一下子明白过来，符合「想了半小时终于明白」。A 前后矛盾；C「鸦雀无声」形容安静，不能修饰奔跑；D「一见钟情」只用于人。'
    }
  ],

  2: [
    {
      subject: 'eng', skill: '名词复数', type: 'choice',
      stem: 'Choose the correct word: "Three ____ were playing near the water fountain."',
      options: ['childs', 'childes', 'children', 'childrens'],
      answer: 2,
      explain: 'child 的复数是 children（不规则变化），本身已是复数，不能再加 s。同类词：man→men, woman→women, mouse→mice, foot→feet。'
    },
    {
      subject: 'eng', skill: '冠词', type: 'choice',
      stem: 'Choose the correct pair: "It took almost ____ hour to find ____ lunchbox."',
      options: ['a … a', 'an … the', 'an … a', 'the … an'],
      answer: 1,
      explain: 'hour 的 h 不发音，读音以元音开头，所以用 an；第二空特指「那个（丢了的）饭盒」，用 the。'
    },
    {
      subject: 'eng', skill: '因果推断', type: 'reading',
      stem: 'Why did Mia\'s face turn red?',
      options: ['Because she was angry with Leo.', 'Because she realized she had left the lunchbox there herself.', 'Because the dumplings were too hot.', 'Because she could not find her backpack.'],
      answer: 1,
      explain: '原文："She had left it there herself, after washing her hands." 脸红是因为意识到是自己的疏忽。情感推断题要找到「触发事件」那一句。'
    },
    {
      subject: 'eng', skill: '人物推断', type: 'reading',
      stem: 'What kind of person is Leo?',
      options: ['Careless and noisy', 'Kind and helpful', 'Shy and quiet', 'Unfriendly and strict'],
      answer: 1,
      explain: '他主动找到失主、还回东西，说明善良、乐于助人。人物性格题看「他做了什么」，不要看长相描述。'
    },
    {
      subject: 'eng', skill: '句子结构', type: 'choice',
      stem: 'Which sentence is written correctly?',
      options: [
        'Mia opened her backpack, her lunchbox was gone.',
        'Mia opened her backpack and her lunchbox was gone.',
        'When Mia opened her backpack, her lunchbox was gone.',
        'Mia opened her backpack her lunchbox was gone.'
      ],
      answer: 2,
      explain: 'A 是逗号粘连（两个完整句子只用逗号连）；B 用 and 连接但语义不顺，且缺逗号；D 两句直接黏在一起。C 用 When 引导时间状语从句，主从句之间加逗号，正确。'
    },
    {
      subject: 'math', skill: '有余数除法', type: 'choice',
      stem: 'Grandma made 50 dumplings and put them in boxes of 8. How many dumplings are left over?',
      options: ['2', '4', '6', '8'],
      answer: 0,
      explain: '50 ÷ 8 = 6 余 2，即装满 6 盒后剩 2 个。有余数除法：被除数 = 除数 × 商 + 余数，余数必须小于除数。'
    },
    {
      subject: 'math', skill: '估算', type: 'choice',
      stem: 'One box of notebooks costs 39 yuan. About how much do 8 boxes cost?',
      options: ['about 240 yuan', 'about 320 yuan', 'about 400 yuan', 'about 480 yuan'],
      answer: 1,
      explain: '39 × 8 ≈ 40 × 8 = 320。估算题把 39 看成 40 最省力，选项之间差距够大时不必精确计算。'
    },
    {
      subject: 'math', skill: '除法应用', type: 'choice',
      stem: 'The cafeteria has 132 chairs arranged in rows of 6. How many rows are there?',
      options: ['12', '20', '22', '26'],
      answer: 2,
      explain: '132 ÷ 6 = 22。可以想 6 × 20 = 120，还剩 12，12 ÷ 6 = 2，所以 20 + 2 = 22。'
    },
    {
      subject: 'chi', skill: '量词', type: 'choice',
      stem: '依次填入量词，最恰当的一项是：「一（ ）红布」「一（ ）饺子」「一（ ）善意」',
      options: ['块 只 份', '条 个 片', '张 颗 种', '片 碗 点'],
      answer: 0,
      explain: '布用「块」（也可用「条」指长条形），饺子用「个/只」，善意用「份/片/点」。「一块红布」是原文用法。'
    },
    {
      subject: 'chi', skill: '近义词辨析', type: 'choice',
      stem: '「忽然」和「突然」用法不同的是：',
      options: ['「忽然」只能用在句首', '「突然」可以作定语修饰名词，如「突然的变化」', '「忽然」不能表示时间短', '两者完全不能互换'],
      answer: 1,
      explain: '「突然」是形容词，可作定语（突然的变化）或状语；「忽然」只是副词，只能作状语，不能说「忽然的变化」。'
    }
  ],

  3: [
    {
      subject: 'eng', skill: '一般现在时', type: 'choice',
      stem: 'Choose the correct word: "One robot in Japan ____ a strawberry every eight seconds."',
      options: ['pick', 'picks', 'picking', 'are picking'],
      answer: 1,
      explain: '主语 one robot 是第三人称单数，一般现在时动词加 s。注意 every eight seconds 说明是经常性动作。'
    },
    {
      subject: 'eng', skill: '疑问句', type: 'choice',
      stem: 'Choose the correct question: ____',
      options: ['How often does the robot pick a strawberry?', 'How often the robot picks a strawberry?', 'How often does the robot picks a strawberry?', 'How often do the robot pick a strawberry?'],
      answer: 0,
      explain: '特殊疑问句结构：疑问词 + does + 主语 + 动词原形。does 后面的动词必须还原成原形，所以不能 picks。'
    },
    {
      subject: 'eng', skill: '细节', type: 'reading',
      stem: 'According to farmers, what is one problem that robots help solve?',
      options: ['Robots make fruit taste sweeter.', 'Fewer young people want to work on farms.', 'Robots can fix broken water pipes.', 'Robots can decide which field needs rain.'],
      answer: 1,
      explain: '原文："they solve a serious problem: fewer young people want to work on farms"。C、D 恰好是文中说机器人做不到的事。'
    },
    {
      subject: 'eng', skill: '作者态度', type: 'reading',
      stem: 'What is the writer\'s view of farm robots?',
      options: ['They will soon replace all farmers.', 'They are useful helpers but have limits.', 'They are too expensive to be useful.', 'They damage the plants they touch.'],
      answer: 1,
      explain: '最后一句 "most farmers use robots as helpers, not as replacements for people" 说明作者认为机器人是有用的帮手但有局限。注意 But 段后的转折。'
    },
    {
      subject: 'eng', skill: '词义', type: 'reading',
      stem: 'In the last sentence, "replacements for people" means —',
      options: ['machines that people buy', 'machines that take the place of human workers', 'people who repair machines', 'machines that replace broken parts'],
      answer: 1,
      explain: 'replace = 取代，replacement = 替代者。整句意思是「机器人是帮手，不是人的替代品」。'
    },
    {
      subject: 'math', skill: '单位时间产量', type: 'choice',
      stem: 'If one robot picks a strawberry every 8 seconds, how many can it pick in one hour?',
      options: ['450', '480', '360', '600'],
      answer: 0,
      explain: '1 小时 = 60 × 60 = 3,600 秒，3,600 ÷ 8 = 450 个。这类题第一步永远是把时间换成同一单位。'
    },
    {
      subject: 'math', skill: '分数比较', type: 'choice',
      stem: 'Which is greater: 3/4 or 5/8?',
      options: ['3/4', '5/8', 'They are equal', 'Cannot tell'],
      answer: 0,
      explain: '通分：3/4 = 6/8，6/8 > 5/8，所以 3/4 大。分数比较首选通分，分母相同时比分子。'
    },
    {
      subject: 'math', skill: '乘法应用', type: 'choice',
      stem: 'A farm has 24 robots. Each robot picks 450 strawberries a day. How many strawberries do they pick in one day?',
      options: ['9,800', '10,800', '10,080', '12,000'],
      answer: 1,
      explain: '24 × 450 = 24 × 45 × 10 = 1,080 × 10 = 10,800。先算 24 × 45 再补 0，比直接竖式更快。'
    },
    {
      subject: 'chi', skill: '成语', type: 'choice',
      stem: '下列句子中，成语使用不恰当的一项是：',
      options: ['农业科技日新月异，机器人也走上了田间。', '他一边写作业一边看电视，真是全神贯注。', '面对难题，他没有退缩，而是迎难而上。', '这些老农经验丰富，说起节气如数家珍。'],
      answer: 1,
      explain: '「全神贯注」指注意力完全集中，与「一边写作业一边看电视」矛盾。判断成语先看它和后文情境是否自相矛盾。'
    },
    {
      subject: 'chi', skill: '多音字', type: 'choice',
      stem: '「行」在下列词语中读音与其他三项不同的是：',
      options: ['银行', '行业', '行列', '行走'],
      answer: 3,
      explain: '「银行、行业、行列」的「行」都读 háng；「行走」的「行」读 xíng。多音字判断靠词义：表示「行走、可以」时读 xíng，表示「排列、行业」时读 háng。'
    }
  ],

  4: [
    {
      subject: 'eng', skill: '不规则动词', type: 'choice',
      stem: 'Choose the correct word: "I slowly ____ up and spoke."',
      options: ['stand', 'stood', 'standed', 'standing'],
      answer: 1,
      explain: '全文是过去时叙事，stand 的过去式是 stood（不规则）。常见不规则动词：stand-stood, speak-spoke, begin-began, catch-caught。'
    },
    {
      subject: 'eng', skill: '一般过去时', type: 'choice',
      stem: 'Choose the correct sentence:',
      options: ['Did she finished her speech?', 'Did she finish her speech?', 'Does she finished her speech?', 'Did she finishes her speech?'],
      answer: 1,
      explain: 'Did 已经表示过去时，后面的动词必须用原形：Did she finish…? 这是最高频的失分点。'
    },
    {
      subject: 'eng', skill: '句意推断', type: 'reading',
      stem: 'What does "It never gets easy — but it does get easier" mean?',
      options: ['Raising your hand is always easy.', 'She still feels nervous, but it becomes less hard over time.', 'She has stopped raising her hand.', 'The teacher made the questions easier.'],
      answer: 1,
      explain: 'never gets easy（从来不容易）+ does get easier（但确实越来越轻松）＝仍然紧张，但没那么难了。注意 does 在这里表示强调。'
    },
    {
      subject: 'eng', skill: '动机推断', type: 'reading',
      stem: 'Why did Sam come over after class?',
      options: ['He wanted to borrow her notes.', 'He wanted to say he had felt the same way.', 'He wanted to laugh at her voice.', 'He wanted to answer the question too.'],
      answer: 1,
      explain: '"I wanted to answer too, but I was too scared." 说明 Sam 是来表达「我也一样」，产生共鸣。'
    },
    {
      subject: 'eng', skill: '句子合并', type: 'choice',
      stem: 'Which sentence best combines: "My heart was beating fast. I raised my hand."',
      options: ['My heart was beating fast, I raised my hand.', 'Although my heart was beating fast, I raised my hand.', 'My heart was beating fast because I raised my hand.', 'My heart was beating fast but I raised my hand, too.'],
      answer: 1,
      explain: '两句是转折关系（紧张但仍然举手），用 Although 最准确。A 是逗号粘连（run-on），C 因果颠倒。'
    },
    {
      subject: 'math', skill: '同分母分数加法', type: 'choice',
      stem: 'Mia ate 1/8 of a cake at noon and 3/8 after school. Her brother ate 2/8. How much cake did they eat in all?',
      options: ['5/8', '6/8', '6/24', '1/2'],
      answer: 1,
      explain: '同分母分数相加，分母不变、分子相加：1 + 3 + 2 = 6，得 6/8（约分后 3/4）。不要分母也相加。'
    },
    {
      subject: 'math', skill: '小数加法', type: 'choice',
      stem: 'A notebook costs 2.75 yuan and a pen costs 1.4 yuan. What is the total cost?',
      options: ['3.15 yuan', '4.15 yuan', '4.05 yuan', '3.79 yuan'],
      answer: 1,
      explain: '2.75 + 1.40 = 4.15。小数加法必须小数点对齐，1.4 要补成 1.40 再算。'
    },
    {
      subject: 'math', skill: '单位换算', type: 'choice',
      stem: 'A class lasts 1.5 hours. How many minutes is that?',
      options: ['75 minutes', '90 minutes', '105 minutes', '150 minutes'],
      answer: 1,
      explain: '1 小时 = 60 分钟，0.5 小时 = 30 分钟，合计 90 分钟。时间换算是 60 进制，不是 100 进制。'
    },
    {
      subject: 'chi', skill: '病句', type: 'choice',
      stem: '下列句子没有语病的一项是：',
      options: ['通过这次演讲，使我变得勇敢了。', '这次演讲让我变得勇敢了。', '这次演讲，让我变得勇敢起来了很多。', '经过这次演讲之后，我变得勇敢了的原因。'],
      answer: 1,
      explain: 'A 是「通过……使……」造成主语残缺；C 语义重复；D 句式杂糅。B 主谓宾完整。'
    },
    {
      subject: 'chi', skill: '关联词', type: 'choice',
      stem: '填入最恰当的关联词：「____ 声音很小，____ 我还是把话说完。」',
      options: ['因为……所以……', '虽然……但是……', '只要……就……', '不但……而且……'],
      answer: 1,
      explain: '前后是转折关系（声音小 vs 仍然说完），用「虽然……但是……」。判断关联词先看两句之间的逻辑关系。'
    }
  ],

  5: [
    {
      subject: 'eng', skill: '比较级', type: 'choice',
      stem: 'Choose the correct word: "Oats give you energy that lasts ____ than sugary cereal."',
      options: ['long', 'longer', 'longest', 'more long'],
      answer: 1,
      explain: '有 than 就要用比较级，单音节词直接加 -er：longer。more long 是错误形式。'
    },
    {
      subject: 'eng', skill: '最高级', type: 'choice',
      stem: 'Choose the correct sentence:',
      options: ['Breakfast is the most important meal of the day.', 'Breakfast is the more important meal of the day.', 'Breakfast is most important meal of the day.', 'Breakfast is the importantest meal of the day.'],
      answer: 0,
      explain: '三者以上比较用最高级，多音节词前加 the most：the most important。important 不能加 -est。'
    },
    {
      subject: 'eng', skill: '写作目的', type: 'reading',
      stem: 'Why does the writer compare the body to a car?',
      options: ['To show that cars are expensive.', 'To help readers understand how the body uses food as fuel.', 'To explain how to drive safely.', 'To prove that breakfast is a big meal.'],
      answer: 1,
      explain: '比喻的作用是让抽象道理变好懂：车要油、人要早餐，都是「燃料」逻辑。问比喻作用的题，答案通常是「帮助读者理解」。'
    },
    {
      subject: 'eng', skill: '因果', type: 'reading',
      stem: 'Why does a breakfast with oats, milk, egg and fruit last longer?',
      options: ['Because it is bigger.', 'Because it contains protein and fiber.', 'Because it tastes better.', 'Because it has more sugar.'],
      answer: 1,
      explain: '原文："they contain protein and fiber"。因果题要找到 because / so / that is why 这些信号词后面的内容。'
    },
    {
      subject: 'eng', skill: '词义', type: 'reading',
      stem: 'In the passage, "skip breakfast" means —',
      options: ['eat breakfast quickly', 'not eat breakfast at all', 'cook breakfast for others', 'eat breakfast in a car'],
      answer: 1,
      explain: 'skip = 跳过、略过，"skip breakfast" 就是不吃早餐。由下文 "your brain has less energy" 也能反推。'
    },
    {
      subject: 'math', skill: '周长应用', type: 'choice',
      stem: 'A garden is a rectangle 12 m long and 8 m wide. A fence costs 5 yuan per meter. How much does the fence cost?',
      options: ['100 yuan', '200 yuan', '240 yuan', '480 yuan'],
      answer: 1,
      explain: '周长 = (12 + 8) × 2 = 40 m；40 × 5 = 200 元。陷阱：用面积 96 去乘会得到 480。'
    },
    {
      subject: 'math', skill: '三角形内角', type: 'choice',
      stem: 'Two angles of a triangle are 45° and 65°. What is the third angle?',
      options: ['60°', '70°', '80°', '110°'],
      answer: 1,
      explain: '三角形内角和 180°，180 − 45 − 65 = 70°。'
    },
    {
      subject: 'math', skill: '平均数', type: 'choice',
      stem: 'Ben slept 8, 7, 9 and 8 hours on four nights. What was his average sleep per night?',
      options: ['7 hours', '7.5 hours', '8 hours', '8.5 hours'],
      answer: 2,
      explain: '(8 + 7 + 9 + 8) ÷ 4 = 32 ÷ 4 = 8 小时。平均数 = 总数 ÷ 个数。'
    },
    {
      subject: 'chi', skill: '古诗', type: 'choice',
      stem: '下列诗句中，描写春天景色的一项是：',
      options: ['接天莲叶无穷碧，映日荷花别样红。', '停车坐爱枫林晚，霜叶红于二月花。', '两个黄鹂鸣翠柳，一行白鹭上青天。', '孤舟蓑笠翁，独钓寒江雪。'],
      answer: 2,
      explain: '「黄鹂、翠柳、白鹭」都是春天景物。A 是夏天（荷花），B 是秋天（霜叶），D 是冬天（寒江雪）。'
    },
    {
      subject: 'chi', skill: '字义', type: 'choice',
      stem: '「食」在下列词语中意思与其他三项不同的是：',
      options: ['早餐', '食物', '食言', '粮食'],
      answer: 2,
      explain: '「食言」的「食」是「违背、不履行」的意思（食言＝说话不算数），其余都指「吃的东西」。'
    }
  ]
};
