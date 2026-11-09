/* 进阶题 Day 11-15（难度最高） */
window.BOOST_C = {
  11: [
    {
      subject: 'eng', skill: '现在进行时', type: 'choice',
      stem: 'Choose the correct words: "Right now, the students ____ the same blue shirt."',
      options: ['wear', 'wears', 'are wearing', 'wore'],
      answer: 2,
      explain: 'Right now 是现在进行时的标志，结构 be + doing，主语复数用 are wearing。'
    },
    {
      subject: 'eng', skill: '时态辨析', type: 'choice',
      stem: 'Which sentence is correct?',
      options: ['Every morning, students are putting on the same shirt.', 'Every morning, students put on the same shirt.', 'Every morning, students putting on the same shirt.', 'Every morning, students puts on the same shirt.'],
      answer: 1,
      explain: 'every morning 表示习惯性动作，用一般现在时；主语复数用动词原形 put。现在进行时只用于「此刻正在」。'
    },
    {
      subject: 'eng', skill: '结构', type: 'reading',
      stem: 'How is the passage organized?',
      options: ['Problem → solution', 'Reasons for → reasons against → the open question', 'Past → present → future', 'Question → answer → example'],
      answer: 1,
      explain: '第二段讲支持的理由（First/Second/Third），第三段讲反对的理由，最后一句留下开放问题。问结构的题，看段落开头的信号词。'
    },
    {
      subject: 'eng', skill: '观点识别', type: 'reading',
      stem: 'Which of these is an OPINION rather than a fact in the passage?',
      options: ['Students wear a blue shirt and grey trousers.', 'Mornings are faster when students do not choose clothes.', 'Willow School has students from many families.', 'Teachers can find students in a crowd.'],
      answer: 1,
      explain: '「早上更快」是支持者的判断，属于观点；其余是可核实的事实描述。事实 vs 观点的题，看有没有「我认为/更/应该」这类判断词。'
    },
    {
      subject: 'eng', skill: '细节', type: 'reading',
      stem: 'What is the main argument of those who are against uniforms?',
      options: ['Uniforms are too expensive.', 'Clothes are a way to show who you are.', 'Uniforms are uncomfortable in summer.', 'Teachers do not like uniforms.'],
      answer: 1,
      explain: '原文："Clothes are a way to show who you are, they argue." 冒号/argue 后面就是核心论点。'
    },
    {
      subject: 'math', skill: '总价', type: 'choice',
      stem: 'A uniform set needs 3 shirts at 45 yuan each and 2 pairs of trousers at 68 yuan each. What is the total cost?',
      options: ['271 yuan', '261 yuan', '291 yuan', '249 yuan'],
      answer: 0,
      explain: '3 × 45 = 135；2 × 68 = 136；135 + 136 = 271 元。分组相乘再相加，别漏其中一项。'
    },
    {
      subject: 'math', skill: '找零', type: 'choice',
      stem: 'You pay 300 yuan for two uniform sets that cost 271 yuan in all. How much change do you get?',
      options: ['19 yuan', '29 yuan', '39 yuan', '71 yuan'],
      answer: 1,
      explain: '300 − 271 = 29 元。退位减法可以用「271 到 300 差多少」来想：271 → 300 差 29。'
    },
    {
      subject: 'math', skill: '除法应用', type: 'choice',
      stem: 'A school has 486 students. If each class has 27 students, how many classes are there?',
      options: ['16', '17', '18', '19'],
      answer: 2,
      explain: '486 ÷ 27 = 18。（27 × 18 = 27 × 20 − 27 × 2 = 540 − 54 = 486，正好。）'
    },
    {
      subject: 'chi', skill: '近义词辨析', type: 'choice',
      stem: '「安静」和「宁静」用法不同的是：',
      options: ['「宁静」多形容环境平和，如「宁静的校园」', '「安静」不能形容人', '两者完全不能互换', '「宁静」只能形容夜晚'],
      answer: 0,
      explain: '「安静」可形容人和环境（教室里很安静）；「宁静」多写环境、心境的平和安定，文学色彩更浓。'
    },
    {
      subject: 'chi', skill: '短文理解', type: 'choice',
      stem: '有人说：「穿校服让学生变得一样，但学校本来就该教人做不一样的自己。」这句话的意思是：',
      options: ['校服让人变整齐，但也可能压住个性', '校服应该更贵一些', '学校不该有校服', '做不一样的人就不用上学'],
      answer: 0,
      explain: '这句话一半肯定（整齐）、一半提醒（个性），是让步式表达。理解题要读出「既……又……」的双面意思。'
    }
  ],

  12: [
    {
      subject: 'eng', skill: '一般将来时', type: 'choice',
      stem: 'Choose the correct word: "The tide ____ come back in about ten minutes."',
      options: ['will', 'is', 'did', 'has'],
      answer: 0,
      explain: 'in about ten minutes 指将来，用 will come。注意 in + 一段时间 在将来时里表示「……之后」。'
    },
    {
      subject: 'eng', skill: 'be going to', type: 'choice',
      stem: 'Which sentence is correct?',
      options: ['They are going to leave before the water comes back.', 'They are go to leave before the water comes back.', 'They going to leave before the water comes back.', 'They is going to leave before the water comes back.'],
      answer: 0,
      explain: 'be going to + 动词原形，主语 they 用 are。B 多了一个 go，C 缺 be，D 主谓不一致。'
    },
    {
      subject: 'eng', skill: '环境与情绪', type: 'reading',
      stem: 'Why does the writer mention "a low, steady rush" of water?',
      options: ['To describe a pleasant sound', 'To warn that the tide is coming back', 'To show that the cave is cold', 'To explain how shells were made'],
      answer: 1,
      explain: '声音出现后紧接着就是 "Water was coming back in"，说明这个声音是危险信号。环境描写题常常问「暗示了什么」。'
    },
    {
      subject: 'eng', skill: '句意推断', type: 'reading',
      stem: 'What does "the opening was gone" mean?',
      options: ['Someone closed the cave door.', 'The sea had covered the cave entrance.', 'Lila could not remember the way.', 'The cave had been destroyed.'],
      answer: 1,
      explain: '前文说潮水回来了，所以「洞口不见了」是被海水淹没。推断题要把前后句的情况连起来。'
    },
    {
      subject: 'eng', skill: '主题', type: 'reading',
      stem: 'What does Lila learn at the end of the story?',
      options: ['The ocean follows its own timetable and cannot be controlled.', 'Caves are too dangerous for children.', 'Shells can be used to write.', 'The beach is wider in the morning.'],
      answer: 0,
      explain: '最后一句 "the ocean was not a place but a living thing with its own schedule" 正是她要领悟的东西。'
    },
    {
      subject: 'math', skill: '行程', type: 'choice',
      stem: 'Lila walks 1.2 km back to the car at a speed of 4 km per hour. How many minutes does it take?',
      options: ['12 minutes', '15 minutes', '18 minutes', '24 minutes'],
      answer: 2,
      explain: '时间 = 路程 ÷ 速度 = 1.2 ÷ 4 = 0.3 小时；0.3 × 60 = 18 分钟。'
    },
    {
      subject: 'math', skill: '时间换算', type: 'choice',
      stem: 'They entered the cave at 14:35 and stayed 50 minutes. What time did they leave?',
      options: ['15:15', '15:25', '15:35', '15:45'],
      answer: 1,
      explain: '14:35 + 25 分钟 = 15:00，还剩 25 分钟，15:00 + 25 = 15:25。时间加法先凑整点，最不容易错。'
    },
    {
      subject: 'math', skill: '单位时间', type: 'choice',
      stem: 'A machine fills 3/4 of a bucket every minute. How many buckets does it fill in 8 minutes?',
      options: ['5', '6', '7', '8'],
      answer: 1,
      explain: '3/4 × 8 = 24 ÷ 4 = 6 桶。分数乘整数：分子乘整数再除以分母。'
    },
    {
      subject: 'chi', skill: '名句', type: 'choice',
      stem: '「纸上得来终觉浅，绝知此事要躬行」告诉我们：',
      options: ['读书没有用', '学到的东西要亲自实践才能真正掌握', '纸上的字写得太浅', '做事要靠别人帮忙'],
      answer: 1,
      explain: '这两句出自陆游《冬夜读书示子聿》，强调「躬行」（亲自实践）的重要。'
    },
    {
      subject: 'chi', skill: '字义', type: 'choice',
      stem: '「临」在「临危不惧」中的意思是：',
      options: ['靠近', '面对', '来到', '照着写'],
      answer: 1,
      explain: '「临危不惧」＝面对危险不害怕，「临」是「面对」。「临」还有靠近（临近）、来到（光临）、照着写（临摹）等义。'
    }
  ],

  13: [
    {
      subject: 'eng', skill: '所有格', type: 'choice',
      stem: 'Choose the correct form: "A year on ____ is almost twice as long as on Earth."',
      options: ['Mars', 'Mars\'', 'Mars\'s year', 'Mars of'],
      answer: 0,
      explain: '这里需要的是名词本身作介词宾语（on Mars），不需要所有格。所有格要用在「火星的……」这种结构里，如 Mars\'s surface。'
    },
    {
      subject: 'eng', skill: '标点', type: 'choice',
      stem: 'Which sentence uses commas correctly?',
      options: ['Mars is farther from the Sun so it moves more slowly.', 'Mars is farther from the Sun, so it moves more slowly.', 'Mars, is farther from the Sun so, it moves more slowly.', 'Mars is farther, from the Sun so it moves more slowly.'],
      answer: 1,
      explain: 'so 连接两个完整句子时，前面要加逗号。这是 G4 写作最常见的标点失分点。'
    },
    {
      subject: 'eng', skill: '因果', type: 'reading',
      stem: 'Why is a year on Mars longer than a year on Earth?',
      options: ['Mars is bigger than Earth.', 'Mars is farther from the Sun, so it moves more slowly.', 'Mars has two moons.', 'A day on Mars is longer.'],
      answer: 1,
      explain: '原文："That is because Mars is farther from the Sun, so it moves more slowly along its path."'
    },
    {
      subject: 'eng', skill: '推断', type: 'reading',
      stem: 'Why do some engineers set their watches to Mars time?',
      options: ['They want to live on Mars one day.', 'They need to match the day-and-night schedule of the rover they drive.', 'Mars time is more accurate.', 'Their watches were made on Mars.'],
      answer: 1,
      explain: '原文说火星一天比地球长约 40 分钟，所以「开火星车的工程师」按火星时间作息，才能和探测器同步。'
    },
    {
      subject: 'eng', skill: '推断', type: 'reading',
      stem: 'According to the last paragraph, what would be hardest for the first astronauts?',
      options: ['Flying the rocket', 'Doing everything on their own, far from any help', 'Learning to speak English', 'Finding water on Earth'],
      answer: 1,
      explain: '原文："grow food, make oxygen, and repair their own machines, far from any help"——一切都得自己做、且孤立无援。'
    },
    {
      subject: 'math', skill: '规律', type: 'choice',
      stem: 'What comes next? 1, 4, 9, 16, ___',
      options: ['20', '24', '25', '32'],
      answer: 2,
      explain: '这些是平方数：1×1、2×2、3×3、4×4，下一个是 5×5 = 25。也可以看差：+3、+5、+7，下一个 +9。'
    },
    {
      subject: 'math', skill: '规律', type: 'choice',
      stem: 'What comes next? 2, 6, 12, 20, ___',
      options: ['26', '28', '30', '32'],
      answer: 2,
      explain: '相邻两项差依次是 4、6、8，下一个差是 10，20 + 10 = 30。（也可看作 1×2、2×3、3×4、4×5、5×6。）'
    },
    {
      subject: 'math', skill: '逻辑推理', type: 'choice',
      stem: 'A rover has 6 wheels and a drone has 4. Together, 5 machines have 26 wheels. How many rovers are there?',
      options: ['2', '3', '4', '5'],
      answer: 1,
      explain: '若全是无人机：5 × 4 = 20 个轮子，少了 6 个；每换一台探测车多 2 个轮子，6 ÷ 2 = 3 台。验算：3 × 6 + 2 × 4 = 26 ✓'
    },
    {
      subject: 'chi', skill: '标点', type: 'choice',
      stem: '下列句子标点使用正确的一项是：',
      options: ['他说：「火星上很冷，气温大约零下六十度。」', '他说，「火星上很冷，气温大约零下六十度」。', '他说：「火星上很冷。气温大约零下六十度」。', '他说：「火星上很冷，气温大约零下六十度」。'],
      answer: 0,
      explain: '引号内是一个完整句子，句号要放在引号里面；冒号后引出说的话。B 缺冒号，C 句号位置割裂句子，D 句号在引号外。'
    },
    {
      subject: 'chi', skill: '短文理解', type: 'choice',
      stem: '「火星上的一天只比地球长约 40 分钟，可一年却几乎是两倍。」这句话强调的是：',
      options: ['火星的一天和一年都很长', '火星的一天差别不大，但一年的差别很大', '火星的一天比一年长', '火星和地球完全一样'],
      answer: 1,
      explain: '「只……可……」是转折对比，强调「一天差不多、一年差很多」。抓住「只」和「可」这两个字。'
    }
  ],

  14: [
    {
      subject: 'eng', skill: '句子合并', type: 'choice',
      stem: 'Which sentence best combines: "He planted one tree every day. People laughed at him."',
      options: ['He planted one tree every day, people laughed at him.', 'Even though people laughed at him, he planted one tree every day.', 'He planted one tree every day because people laughed at him.', 'People laughed at him, he planted one tree every day.'],
      answer: 1,
      explain: '两句是让步关系（别人嘲笑，他仍坚持），用 Even though。A、D 是逗号粘连，C 因果颠倒。'
    },
    {
      subject: 'eng', skill: '代词', type: 'reading',
      stem: 'Read: "He carried water from the river, watered each plant by hand, and kept animals away." What does "it" refer to in "At first it was only bamboo"?',
      options: ['the river', 'the forest / what he planted', 'the sand', 'the flood'],
      answer: 1,
      explain: '前一句讲他每天种树，"it" 指他种下的东西（最初只有竹子）。代词题回到上一句找最近的合理名词。'
    },
    {
      subject: 'eng', skill: '起因', type: 'reading',
      stem: 'What made Jadav Payeng start planting trees?',
      options: ['He wanted to be famous.', 'He saw dead snakes after a flood washed away the trees.', 'His teacher told him to.', 'He needed wood for his house.'],
      answer: 1,
      explain: '原文第一段："A flood had washed away many trees, and hundreds of snakes had died in the heat. He could not forget what he saw."'
    },
    {
      subject: 'eng', skill: '时间线', type: 'reading',
      stem: 'According to the passage, what happened after about twenty years?',
      options: ['There was a small wood.', 'Animals such as deer and birds began to arrive.', 'The forest became 550 hectares.', 'Foresters came to study the place.'],
      answer: 1,
      explain: '原文："After ten years, there was a small wood. After twenty, animals began to arrive… After nearly forty years, … 550 hectares." 三个时间点要分清。'
    },
    {
      subject: 'eng', skill: '写作意图', type: 'reading',
      stem: 'Why does the writer mention "larger than 700 football fields"?',
      options: ['To show that football is popular in India.', 'To help readers imagine how big the forest is.', 'To explain how long he worked.', 'To compare sports and farming.'],
      answer: 1,
      explain: '用熟悉的事物（足球场）作比较，让读者对「550 公顷」有具体感受。这是说明文常用的「化抽象为具体」。'
    },
    {
      subject: 'math', skill: '混合运算', type: 'choice',
      stem: 'He planted 5 trees a day for 12 days, then 8 trees a day for 10 days. How many trees in all?',
      options: ['120', '130', '140', '150'],
      answer: 2,
      explain: '5 × 12 = 60；8 × 10 = 80；合计 140。分段计算再相加，是最稳的做法。'
    },
    {
      subject: 'math', skill: '面积与总价', type: 'choice',
      stem: 'A forest covers 550 hectares. One hectare is 10,000 m². What is the area in square meters?',
      options: ['55,000 m²', '550,000 m²', '5,500,000 m²', '55,000,000 m²'],
      answer: 2,
      explain: '550 × 10,000 = 5,500,000 m²。大数乘法先把 0 数清楚：550 后面加 4 个 0，共 5,500,000。'
    },
    {
      subject: 'math', skill: '异分母分数', type: 'choice',
      stem: 'Calculate: 1/2 + 1/3 = ?',
      options: ['2/5', '5/6', '1/6', '2/6'],
      answer: 1,
      explain: '通分到 6：1/2 = 3/6，1/3 = 2/6，合计 5/6。异分母相加必须先通分，分母不能直接相加。'
    },
    {
      subject: 'chi', skill: '字形', type: 'choice',
      stem: '下列词语书写完全正确的一项是：',
      options: ['坚持不泄', '不可思议', '一如继往', '专心至志'],
      answer: 1,
      explain: 'A 应为「坚持不懈」，C 应为「一如既往」，D 应为「专心致志」。「不可思议」书写正确。'
    },
    {
      subject: 'chi', skill: '短文理解', type: 'choice',
      stem: '「人们笑他：这里什么都长不出来。他继续种。」这段描写主要表现了他的：',
      options: ['固执和听不进意见', '不被理解仍坚持的韧劲', '害怕被人嘲笑', '想证明别人错了'],
      answer: 1,
      explain: '重点在「继续种」——被嘲笑而不放弃，体现韧劲。注意选项里最容易被误选的「想证明别人错」，文中没有这种情绪。'
    }
  ],

  15: [
    {
      subject: 'eng', skill: '综合改错', type: 'choice',
      stem: 'Find the sentence with NO mistake:',
      options: ['The pot felt ashamed because of his crack.', 'The pot felt ashamed because of its crack.', 'The pot felt ashamed because of it\'s crack.', 'The pot felt ashamed because of theirs crack.'],
      answer: 1,
      explain: 'pot 是物，用 its 表所有格；his 用于人，it\'s = it is。'
    },
    {
      subject: 'eng', skill: '疑问句', type: 'choice',
      stem: 'Choose the correct question: "____ you notice the flowers on your side of the path?"',
      options: ['Did', 'Do', 'Are', 'Have'],
      answer: 0,
      explain: '故事是过去时（Did you notice…）。注意 notice 用原形，因为 did 已表过去。'
    },
    {
      subject: 'eng', skill: '因果', type: 'reading',
      stem: 'Why did the cracked pot feel ashamed?',
      options: ['It arrived home only half full every day.', 'It was made of the wrong material.', 'The water carrier shouted at it.', 'It could not carry flowers.'],
      answer: 0,
      explain: '原文："Every day, the cracked pot arrived home only half full." 它把「漏水」当成自己的错。'
    },
    {
      subject: 'eng', skill: '推理', type: 'reading',
      stem: 'Why did the pot stop feeling ashamed?',
      options: ['Someone repaired the crack.', 'It learned that its crack had watered the flowers.', 'It was given a new job.', 'The water carrier carried less water.'],
      answer: 1,
      explain: '水罐主人告诉它：裂缝漏出的水浇灌了路边的花。它明白了「短处也有用处」。'
    },
    {
      subject: 'eng', skill: '寓意', type: 'reading',
      stem: 'What is the lesson of the story?',
      options: ['Broken things should be thrown away.', 'A weakness can become a strength in the right place.', 'Never carry water in a clay pot.', 'Flowers need a lot of water.'],
      answer: 1,
      explain: '全文寓意：缺点放在合适的地方，可能变成优势。寓言题要答「道理」，不要停留在故事情节。'
    },
    {
      subject: 'math', skill: '异分母分数', type: 'choice',
      stem: 'A pot is 2/3 full. It leaks 1/6 of its water. How much water is left?',
      options: ['1/2', '1/3', '5/6', '1/6'],
      answer: 0,
      explain: '2/3 = 4/6，4/6 − 1/6 = 3/6 = 1/2。异分母先通分再减，最后约分。'
    },
    {
      subject: 'math', skill: '小数减法', type: 'choice',
      stem: 'A full pot holds 4.5 liters. It arrives home with 3.85 liters. How much water was lost?',
      options: ['0.65 L', '0.75 L', '1.35 L', '0.55 L'],
      answer: 0,
      explain: '4.50 − 3.85 = 0.65 L。小数点对齐后从百分位退位减：10 − 5 = 5，4 − 8 借位得 6，3 − 3 = 0。'
    },
    {
      subject: 'math', skill: '速度', type: 'choice',
      stem: 'The water carrier walks 2 km in 25 minutes. What is his speed in km per hour?',
      options: ['4 km/h', '4.8 km/h', '5 km/h', '6 km/h'],
      answer: 1,
      explain: '25 分钟 = 25/60 小时 = 5/12 小时；2 ÷ 5/12 = 2 × 12/5 = 4.8 km/h。也可先求每分钟 0.08 km，再乘 60。'
    },
    {
      subject: 'chi', skill: '病句', type: 'choice',
      stem: '下列句子没有语病的一项是：',
      options: ['因为我的裂缝，使路上开满了花。', '我的裂缝让路上开满了花。', '由于我的裂缝，因此路上开满了花。', '我的裂缝，路上开满了花的原因。'],
      answer: 1,
      explain: 'A「因为……使……」主语残缺；C「由于……因此……」重复；D 句式杂糅。B 主谓宾齐全。'
    },
    {
      subject: 'chi', skill: '短文理解', type: 'choice',
      stem: '「没有它，我就什么也没有了。」这句话中的「它」指的是：',
      options: ['水罐', '裂缝', '花', '路'],
      answer: 1,
      explain: '前文说「因为你的裂缝，我桌上才有花」，所以「它」指裂缝。代词指代题看上一句的因果关系。'
    }
  ]
};
