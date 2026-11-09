/* 进阶题 Day 6-10 */
window.BOOST_B = {
  6: [
    {
      subject: 'eng', skill: '介词', type: 'choice',
      stem: 'Choose the correct word: "The vapor turns back ____ tiny drops of water."',
      options: ['in', 'into', 'on', 'at'],
      answer: 1,
      explain: 'turn into = 变成，是固定搭配（水蒸气变成小水滴）。注意区分 turn on（打开）、turn in（上交）。'
    },
    {
      subject: 'eng', skill: '介词', type: 'choice',
      stem: 'Choose the correct word: "These drops gather ____ dust and form clouds."',
      options: ['around', 'between', 'under', 'through'],
      answer: 0,
      explain: 'gather around = 聚集在……周围。介词题先想画面：小水滴围着尘埃聚拢，形成云。'
    },
    {
      subject: 'eng', skill: '细节', type: 'reading',
      stem: 'According to the passage, what happens during condensation?',
      options: ['Water turns into a gas.', 'Vapor turns back into tiny drops of water.', 'Drops fall as rain.', 'Water flows back to the ocean.'],
      answer: 1,
      explain: '原文："the vapor turns back into tiny drops of water. These drops gather around dust and form clouds. This step is called condensation."'
    },
    {
      subject: 'eng', skill: '写作目的', type: 'reading',
      stem: 'Why does the writer end with "The water you drink today may once have been drunk by a dinosaur"?',
      options: ['To prove that dinosaurs lived near water.', 'To make readers feel the idea is surprising and memorable.', 'To explain how dinosaurs disappeared.', 'To show that water is dirty.'],
      answer: 1,
      explain: '这句话不是科学论证，而是让读者「有感」的收尾技巧，目的是加深印象。问「为什么这样结尾」通常答「让读者印象深刻／引发兴趣」。'
    },
    {
      subject: 'eng', skill: '词义', type: 'reading',
      stem: 'In the passage, "vapor" is —',
      options: ['a kind of dust', 'water in the form of a gas', 'a small drop of rain', 'cold air high in the sky'],
      answer: 1,
      explain: '原文："some of it turns into vapor — a gas you cannot see"，破折号后就是解释。'
    },
    {
      subject: 'math', skill: '面积', type: 'choice',
      stem: 'A rectangular field is 24 m long and 15 m wide. What is its area?',
      options: ['39 m²', '78 m²', '360 m²', '720 m²'],
      answer: 2,
      explain: '面积 = 长 × 宽 = 24 × 15 = 360 m²。注意面积的单位要带平方（m²），周长才用米。'
    },
    {
      subject: 'math', skill: '面积单位换算', type: 'choice',
      stem: 'How many square centimeters are there in 3 square meters?',
      options: ['300', '3,000', '30,000', '300,000'],
      answer: 2,
      explain: '1 m = 100 cm，所以 1 m² = 100 × 100 = 10,000 cm²；3 m² = 30,000 cm²。面积单位换算要「平方」倍数，不是乘 100。'
    },
    {
      subject: 'math', skill: '周长', type: 'choice',
      stem: 'A square garden has sides of 9 m. A fence is put around it. How many meters of fence are needed?',
      options: ['18 m', '36 m', '81 m', '72 m'],
      answer: 1,
      explain: '正方形周长 = 边长 × 4 = 9 × 4 = 36 m。81 是面积，是最常见的干扰项。'
    },
    {
      subject: 'chi', skill: '标点', type: 'choice',
      stem: '依次填入标点，最恰当的一项是：「云是怎么形成的__水先变成水蒸气__再变成小水滴__」',
      options: ['？ ， 。', '？ ； 。', '。 ， 。', '： ， ？'],
      answer: 0,
      explain: '第一句是疑问句用问号；中间用逗号连接连续动作；句末用句号。'
    },
    {
      subject: 'chi', skill: '词语搭配', type: 'choice',
      stem: '下列搭配完全恰当的一项是：',
      options: ['天气热烈 / 提高水平 / 增强信心', '天气炎热 / 提高水平 / 增强信心', '天气炎热 / 提高信心 / 增强水平', '天气热烈 / 提高信心 / 增强水平'],
      answer: 1,
      explain: '「天气」配「炎热」，「水平」配「提高」，「信心」配「增强」。固定搭配靠语感积累，也是病句题的常见考点。'
    }
  ],

  7: [
    {
      subject: 'eng', skill: '代词', type: 'choice',
      stem: 'Choose the correct word: "The kite lost ____ tail and spun in the air."',
      options: ['it\'s', 'its', 'it', 'itself'],
      answer: 1,
      explain: 'its = 它的（所有格）；it\'s = it is。这里需要「它的尾巴」，所以用 its。这是最高频的拼写陷阱。'
    },
    {
      subject: 'eng', skill: '代词', type: 'choice',
      stem: 'Choose the correct word: "Kenji tied the cloth to the kite ____."',
      options: ['him', 'his', 'himself', 'he'],
      answer: 2,
      explain: '主语和宾语是同一个人时用反身代词 himself（他自己）。tie … himself 表示「他亲手绑」。'
    },
    {
      subject: 'eng', skill: '问题与解决', type: 'reading',
      stem: 'Why did the kite keep crashing at first?',
      options: ['The wind was too weak.', 'The kite had no tail to keep it steady.', 'The paper was too heavy.', 'Kenji ran too slowly.'],
      answer: 1,
      explain: '祖父说 "A kite needs something to pull it back… Otherwise it just spins"，加上后来「绑上布条就飞起来了」可以确认原因。'
    },
    {
      subject: 'eng', skill: '寓意', type: 'reading',
      stem: 'What does the grandfather mean by "Everything that flies needs something to hold it steady"?',
      options: ['Kites should be tied to a tree.', 'A little control or limit helps you go higher.', 'Flying is dangerous for children.', 'Only old people understand kites.'],
      answer: 1,
      explain: '这是全文的寓意句：看似「拉住你」的东西，其实是让你飞得稳的前提。寓意题要跳出故事本身，找它想说的道理。'
    },
    {
      subject: 'eng', skill: '句意推断', type: 'reading',
      stem: 'How did Kenji most likely feel when the kite finally climbed into the sky?',
      options: ['Bored', 'Proud and relieved', 'Angry with his grandfather', 'Afraid of the wind'],
      answer: 1,
      explain: '反复失败后成功，情绪通常是「自豪 + 松了一口气」。情感推断题要结合前文的挫折与转机。'
    },
    {
      subject: 'math', skill: '日历推算', type: 'choice',
      stem: 'Kenji flew his kite on Saturday. He wants to fly again 21 days later. What day of the week will that be?',
      options: ['Monday', 'Wednesday', 'Saturday', 'Sunday'],
      answer: 2,
      explain: '21 ÷ 7 = 3 周整，星期不变，还是 Saturday。周期问题先除以周期，看余数。'
    },
    {
      subject: 'math', skill: '混合运算', type: 'choice',
      stem: 'Calculate: 3 × (12 + 8) − 15 = ?',
      options: ['45', '60', '75', '30'],
      answer: 0,
      explain: '先算括号：12 + 8 = 20；再乘：3 × 20 = 60；最后减：60 − 15 = 45。运算顺序：括号 → 乘除 → 加减。'
    },
    {
      subject: 'math', skill: '分数应用', type: 'choice',
      stem: 'Kenji used 3/4 of a 12-meter string for the kite tail. How many meters did he use?',
      options: ['3 m', '4 m', '9 m', '16 m'],
      answer: 2,
      explain: '12 ÷ 4 = 3（每份 3 米），取 3 份 = 9 米。分数「几分之几」先除分母再乘分子。'
    },
    {
      subject: 'chi', skill: '字义', type: 'choice',
      stem: '「故」在「故人」「故乡」中的意思是：',
      options: ['原因', '故意', '原来的、旧的', '所以'],
      answer: 2,
      explain: '「故人」＝旧友，「故乡」＝原来的家乡，都取「原来的、旧的」义。「故」还有「原因」（缘故）、「所以」（故如此）等义，要看具体词语。'
    },
    {
      subject: 'chi', skill: '句子排序', type: 'choice',
      stem: '把下面句子排成一段通顺的话：①他绑上一条布条 ②风筝一次次栽进草地 ③肯吉做了一只风筝 ④这次风筝稳稳地飞上了天',
      options: ['③②①④', '③①②④', '②③①④', '①③②④'],
      answer: 0,
      explain: '先做风筝（③），再失败（②），然后发现问题并改进（①），最后成功（④）。排序题先找「起因句」，再按时间顺序串。'
    }
  ],

  8: [
    {
      subject: 'eng', skill: '主谓一致', type: 'choice',
      stem: 'Choose the correct word: "Each of the students ____ a calculator."',
      options: ['have', 'has', 'are having', 'were having'],
      answer: 1,
      explain: 'each of + 复数名词作主语时，谓语用单数：Each of the students has…。类似的还有 every one of、none of（正式用法）。'
    },
    {
      subject: 'eng', skill: '主谓一致', type: 'choice',
      stem: 'Choose the correct word: "Neither the teacher nor the students ____ ready."',
      options: ['is', 'are', 'was', 'has'],
      answer: 1,
      explain: 'neither…nor… 连接主语时遵循「就近原则」，靠近动词的是 students（复数），所以用 are。'
    },
    {
      subject: 'eng', skill: '人物推断', type: 'reading',
      stem: 'What does Katherine\'s sentence "she was never afraid of hard problems — only of not trying" tell us about her?',
      options: ['She was afraid of making mistakes.', 'She valued effort more than being clever.', 'She disliked working with others.', 'She thought problems were easy.'],
      answer: 1,
      explain: '不怕难题、只怕不尝试，说明她看重「敢试、肯做」胜过天赋。人物推断题要抓「她说了什么 + 她做了什么」两面。'
    },
    {
      subject: 'eng', skill: '细节', type: 'reading',
      stem: 'Why did John Glenn ask for Katherine to check the numbers?',
      options: ['He did not trust the computer\'s answer.', 'He wanted to meet her.', 'The computer was broken.', 'NASA rules required it.'],
      answer: 0,
      explain: '原文："The computer gave an answer, but he did not trust it." 细节题要看清 but 之后的转折。'
    },
    {
      subject: 'eng', skill: '写作意图', type: 'reading',
      stem: 'Why does the writer mention that Katherine\'s family drove hundreds of miles to a better school?',
      options: ['To show that the family had a big car.', 'To show how hard it was for her to get an education.', 'To explain why she loved numbers.', 'To prove that travel is important.'],
      answer: 1,
      explain: '这一段讲的是种族隔离下上学困难，用「开车几百英里」这个细节说明求学之难，从而突出她的坚持。'
    },
    {
      subject: 'math', skill: '因数', type: 'choice',
      stem: 'How many factors does 36 have?',
      options: ['6', '8', '9', '12'],
      answer: 2,
      explain: '36 的因数：1、2、3、4、6、9、12、18、36，共 9 个。成对找（1×36、2×18、3×12、4×9、6×6），不会漏。'
    },
    {
      subject: 'math', skill: '多位数乘法', type: 'choice',
      stem: 'Katherine worked at NASA for 33 years. How many months is that?',
      options: ['366', '384', '396', '408'],
      answer: 2,
      explain: '33 × 12 = 33 × 10 + 33 × 2 = 330 + 66 = 396 个月。'
    },
    {
      subject: 'math', skill: '公倍数', type: 'choice',
      stem: 'Which number is a multiple of BOTH 3 and 4?',
      options: ['18', '24', '30', '34'],
      answer: 1,
      explain: '24 ÷ 3 = 8，24 ÷ 4 = 6，都能整除。3 和 4 的最小公倍数是 12，所以 12 的倍数（12、24、36…）都满足。'
    },
    {
      subject: 'chi', skill: '修辞', type: 'choice',
      stem: '「她像一台不会累的计算器」这句话用了什么修辞手法？',
      options: ['拟人', '比喻', '夸张', '排比'],
      answer: 1,
      explain: '把人比作「计算器」，有本体、喻体和比喻词「像」，是明喻。比喻的作用是让特点更具体可感。'
    },
    {
      subject: 'chi', skill: '成语', type: 'choice',
      stem: '下列句子中成语使用恰当的一项是：',
      options: ['她孜孜不倦地练习计算，终于取得了好成绩。', '他孜孜不倦地睡了一整天。', '教室里孜孜不倦，非常安静。', '这道题很简单，他孜孜不倦地做完了。'],
      answer: 0,
      explain: '「孜孜不倦」形容勤奋努力、不知疲倦，只能修饰学习工作类行为，不能形容睡觉、安静或做简单题。'
    }
  ],

  9: [
    {
      subject: 'eng', skill: '连词', type: 'choice',
      stem: 'Choose the best word: "Most bags are used for only 15 minutes, ____ they stay in the environment for hundreds of years."',
      options: ['so', 'but', 'because', 'if'],
      answer: 1,
      explain: '前后是对比（只用 15 分钟 vs 留存几百年），用 but。「用得短」和「留得久」不是因果，不能选 so。'
    },
    {
      subject: 'eng', skill: '连词', type: 'choice',
      stem: 'Choose the correct word: "____ plastic bags are banned, the streets in Rwanda are much cleaner."',
      options: ['Although', 'Because', 'Unless', 'However'],
      answer: 1,
      explain: '前半是原因、后半是结果，用 Because。Although 表让步（虽然），语义就反了；However 是副词，不能连接两个句子。'
    },
    {
      subject: 'eng', skill: '作者立场', type: 'reading',
      stem: 'What does the writer think is the best solution?',
      options: ['Passing more laws', 'Bringing your own cloth bag', 'Using paper bags instead', 'Stopping shopping'],
      answer: 1,
      explain: '原文："But the best solution is simpler: bring your own bag." 问作者立场，重点找 best / should / must 这类评价词。'
    },
    {
      subject: 'eng', skill: '词义', type: 'reading',
      stem: 'In the passage, "brittle" most nearly means —',
      options: ['easy to break', 'very heavy', 'bright in colour', 'full of water'],
      answer: 0,
      explain: 'brittle = 脆的、易碎的。原文说阳光让塑料袋变脆，然后碎成微塑料，可反推词义。'
    },
    {
      subject: 'eng', skill: '论据作用', type: 'reading',
      stem: 'Why does the writer mention Rwanda?',
      options: ['To show that laws can make a real difference.', 'To compare Rwanda with other countries.', 'To explain how plastic is made.', 'To show that Rwanda has no shops.'],
      answer: 0,
      explain: '卢旺达是「禁用塑料袋后街道更干净」的例子，用来证明法律有效。举例子的题，答案基本是「证明前面的观点」。'
    },
    {
      subject: 'math', skill: '乘法应用', type: 'choice',
      stem: 'A family uses 6 plastic bags every day. How many bags do they use in a year of 365 days?',
      options: ['1,920', '2,190', '2,920', '3,650'],
      answer: 1,
      explain: '6 × 365 = 6 × 300 + 6 × 60 + 6 × 5 = 1,800 + 360 + 30 = 2,190。'
    },
    {
      subject: 'math', skill: '三角形周长', type: 'choice',
      stem: 'A triangle has sides of 7.5 cm, 6 cm and 8.5 cm. What is its perimeter?',
      options: ['21 cm', '22 cm', '22.5 cm', '23 cm'],
      answer: 1,
      explain: '7.5 + 8.5 = 16，16 + 6 = 22 cm。先把能凑整的小数相加，再算剩下的，又快又准。'
    },
    {
      subject: 'math', skill: '小数减法', type: 'choice',
      stem: 'A cloth bag costs 3.65 yuan. You pay with a 10-yuan note. How much change do you get?',
      options: ['6.35 yuan', '6.45 yuan', '7.35 yuan', '7.65 yuan'],
      answer: 0,
      explain: '10 − 3.65 = 6.35。可心算：3.65 到 4 差 0.35，4 到 10 差 6，合计 6.35。'
    },
    {
      subject: 'chi', skill: '成语运用', type: 'choice',
      stem: '下列句子中，加点成语使用不恰当的一项是：',
      options: ['塑料袋在环境中留存数百年，这个事实令人触目惊心。', '他随手把袋子扔进河里，真是雪中送炭。', '减少塑料用量，需要每个人身体力行。', '微塑料问题日益严重，我们不能视而不见。'],
      answer: 1,
      explain: '「雪中送炭」指在别人困难时给予帮助，与「往河里扔垃圾」完全相反，褒贬误用。'
    },
    {
      subject: 'chi', skill: '缩句', type: 'choice',
      stem: '把「每年有大量塑料袋被随意丢弃在河流和海洋里」缩到最简，正确的是：',
      options: ['塑料袋被丢弃。', '大量塑料袋丢弃在海洋里。', '每年有塑料袋。', '塑料袋在河流和海洋里。'],
      answer: 0,
      explain: '缩句保留「谁 + 做什么」的主干：塑料袋（主语）+ 被丢弃（谓语）。时间、数量、地点都要删掉。'
    }
  ],

  10: [
    {
      subject: 'eng', skill: '情态动词', type: 'choice',
      stem: 'Choose the best word: "A bridge ____ carry its own weight and the weight of everything crossing it."',
      options: ['can', 'must', 'might', 'would'],
      answer: 1,
      explain: '这是工程上的必然要求，「必须」用 must。can 表能力（能），might 表可能，语气都不够。'
    },
    {
      subject: 'eng', skill: '情态动词', type: 'choice',
      stem: 'Choose the correct sentence:',
      options: ['Engineers must to test models first.', 'Engineers must test models first.', 'Engineers must testing models first.', 'Engineers musts test models first.'],
      answer: 1,
      explain: '情态动词后接动词原形，且情态动词本身不加 s：must test。must to 是典型错误。'
    },
    {
      subject: 'eng', skill: '主旨', type: 'reading',
      stem: 'What is the passage mainly about?',
      options: ['How to build a model bridge', 'The three main kinds of bridges and how they carry weight', 'Why the 1940 bridge fell down', 'The history of bridge building in America'],
      answer: 1,
      explain: '全文围绕「桥要承受什么」和「三种桥」展开，最后补一句安全问题。主旨要覆盖全文，不能只是某一段。'
    },
    {
      subject: 'eng', skill: '细节', type: 'reading',
      stem: 'In an arch bridge, where does the weight go?',
      options: ['Into the cables above', 'Down and out into the ground on both sides', 'Straight down into the water', 'Into the supports under the middle'],
      answer: 1,
      explain: '原文："the weight pushes down and out into the ground on both sides"。注意 out 这个词，是拱桥的关键。'
    },
    {
      subject: 'eng', skill: '论据作用', type: 'reading',
      stem: 'Why does the writer tell the story of the 1940 bridge?',
      options: ['To show that old bridges are beautiful.', 'To show that engineers learn from failures.', 'To prove that wind is dangerous.', 'To explain how suspension bridges work.'],
      answer: 1,
      explain: '原文紧接着说 "Since then, engineers have studied that failure carefully, and modern bridges are much safer." 例子是为了说明「从失败中学习」。'
    },
    {
      subject: 'math', skill: '三角形内角', type: 'choice',
      stem: 'An isosceles triangle has a top angle of 40°. What is each base angle?',
      options: ['40°', '60°', '70°', '80°'],
      answer: 2,
      explain: '等腰三角形两个底角相等：(180 − 40) ÷ 2 = 70°。'
    },
    {
      subject: 'math', skill: '对称轴', type: 'choice',
      stem: 'How many lines of symmetry does a square have?',
      options: ['2', '4', '6', '8'],
      answer: 1,
      explain: '正方形有 4 条对称轴：两条对角线 + 两条过中点的横竖线。长方形只有 2 条，别混。'
    },
    {
      subject: 'math', skill: '周长逆推', type: 'choice',
      stem: 'A square has a perimeter of 36 cm. What is its area?',
      options: ['36 cm²', '72 cm²', '81 cm²', '144 cm²'],
      answer: 2,
      explain: '周长 36 → 边长 36 ÷ 4 = 9 cm；面积 9 × 9 = 81 cm²。两步题先求边长，再求面积。'
    },
    {
      subject: 'chi', skill: '比喻', type: 'choice',
      stem: '「一座拱桥像一张拉满的弓」这句话的表达效果是：',
      options: ['说明桥是用木头做的', '形象地写出拱桥弯曲的形态和承受力量的样子', '说明桥很容易断', '夸张地写出桥很长'],
      answer: 1,
      explain: '比喻的作用 = 把事物的形态/特点写得具体形象。这里「拉满的弓」既写形状，也暗示它绷着劲儿承重。'
    },
    {
      subject: 'chi', skill: '古诗', type: 'choice',
      stem: '「欲穷千里目，更上一层楼」表达的道理是：',
      options: ['楼越高越危险', '站得高才能看得远，要不断进取', '登高会让人头晕', '风景只在远处'],
      answer: 1,
      explain: '这两句出自王之涣《登鹳雀楼》，表面写登楼，实际讲「想看得更远就要再上一层」，鼓励不断进取。'
    }
  ]
};
