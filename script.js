const trigrams = [
  {name:"乾", reading:"けん", symbol:"☰", bits:[1,1,1]},
  {name:"兌", reading:"だ",   symbol:"☱", bits:[1,1,0]},
  {name:"離", reading:"り",   symbol:"☲", bits:[1,0,1]},
  {name:"震", reading:"しん", symbol:"☳", bits:[1,0,0]},
  {name:"巽", reading:"そん", symbol:"☴", bits:[0,1,1]},
  {name:"坎", reading:"かん", symbol:"☵", bits:[0,1,0]},
  {name:"艮", reading:"ごん", symbol:"☶", bits:[0,0,1]},
  {name:"坤", reading:"こん", symbol:"☷", bits:[0,0,0]}
];

// 上卦|下卦 → [周易の卦番号, 卦名, 読み]
const H = {
"乾|乾":[1,"乾為天","けんいてん"],"坤|坤":[2,"坤為地","こんいち"],
"坎|震":[3,"水雷屯","すいらいちゅん"],"艮|坎":[4,"山水蒙","さんすいもう"],
"坎|乾":[5,"水天需","すいてんじゅ"],"乾|坎":[6,"天水訟","てんすいしょう"],
"坤|坎":[7,"地水師","ちすいし"],"坎|坤":[8,"水地比","すいちひ"],
"巽|乾":[9,"風天小畜","ふうてんしょうちく"],"乾|兌":[10,"天沢履","てんたくり"],
"坤|乾":[11,"地天泰","ちてんたい"],"乾|坤":[12,"天地否","てんちひ"],
"乾|離":[13,"天火同人","てんかどうじん"],"離|乾":[14,"火天大有","かてんたいゆう"],
"坤|艮":[15,"地山謙","ちざんけん"],"震|坤":[16,"雷地豫","らいちよ"],
"兌|震":[17,"沢雷随","たくらいずい"],"艮|巽":[18,"山風蠱","さんぷうこ"],
"坤|兌":[19,"地沢臨","ちたくりん"],"巽|坤":[20,"風地観","ふうちかん"],
"離|震":[21,"火雷噬嗑","からいぜいごう"],"艮|離":[22,"山火賁","さんかひ"],
"艮|坤":[23,"山地剥","さんちはく"],"坤|震":[24,"地雷復","ちらいふく"],
"乾|震":[25,"天雷无妄","てんらいむぼう"],"艮|乾":[26,"山天大畜","さんてんたいちく"],
"艮|震":[27,"山雷頤","さんらいい"],"兌|巽":[28,"沢風大過","たくふうたいか"],
"坎|坎":[29,"坎為水","かんいすい"],"離|離":[30,"離為火","りいか"],
"兌|艮":[31,"沢山咸","たくざんかん"],"震|巽":[32,"雷風恒","らいふうこう"],
"乾|艮":[33,"天山遯","てんざんとん"],"震|乾":[34,"雷天大壮","らいてんたいそう"],
"離|坤":[35,"火地晋","かちしん"],"坤|離":[36,"地火明夷","ちかめいい"],
"巽|離":[37,"風火家人","ふうかかじん"],"離|兌":[38,"火沢睽","かたくけい"],
"坎|艮":[39,"水山蹇","すいざんけん"],"震|坎":[40,"雷水解","らいすいかい"],
"艮|兌":[41,"山沢損","さんたくそん"],"巽|震":[42,"風雷益","ふうらいえき"],
"兌|乾":[43,"沢天夬","たくてんかい"],"乾|巽":[44,"天風姤","てんぷうこう"],
"兌|坤":[45,"沢地萃","たくちすい"],"坤|巽":[46,"地風升","ちふうしょう"],
"兌|坎":[47,"沢水困","たくすいこん"],"坎|巽":[48,"水風井","すいふうせい"],
"兌|離":[49,"沢火革","たくかかく"],"離|巽":[50,"火風鼎","かふうてい"],
"震|震":[51,"震為雷","しんいらい"],"艮|艮":[52,"艮為山","ごんいざん"],
"巽|艮":[53,"風山漸","ふうざんぜん"],"震|兌":[54,"雷沢帰妹","らいたくきまい"],
"震|離":[55,"雷火豊","らいかほう"],"離|艮":[56,"火山旅","かざんりょ"],
"巽|巽":[57,"巽為風","そんいふう"],"兌|兌":[58,"兌為沢","だいたく"],
"巽|坎":[59,"風水渙","ふうすいかん"],"坎|兌":[60,"水沢節","すいたくせつ"],
"巽|兌":[61,"風沢中孚","ふうたくちゅうふ"],"震|艮":[62,"雷山小過","らいざんしょうか"],
"坎|離":[63,"水火既済","すいかきせい"],"離|坎":[64,"火水未済","かすいびせい"]
};


const trigramMeaning = {
"乾":"天を象り、健やかに動く性質を表します。","兌":"沢を象り、悦び・和やかさ・交流を表します。",
"離":"火を象り、明るさ・明晰さ・付着する性質を表します。","震":"雷を象り、動き・発動・奮起を表します。",
"巽":"風・木を象り、入り込むこと・柔順・浸透を表します。","坎":"水を象り、険しさ・陥ること・流れを表します。",
"艮":"山を象り、止まること・区切り・静止を表します。","坤":"地を象り、受容・柔順・支える働きを表します。"
};

const hexKeywords = {
1:"創造・剛健",
2:"受容・柔順",
3:"始まりの困難",
4:"学び・啓蒙",
5:"待機・時機",
6:"対立・争い",
7:"統率・組織",
8:"親和・結びつき",
9:"蓄積・抑制",
10:"礼・慎重",
11:"平和・調和",
12:"閉塞・不通",
13:"協同・同志",
14:"豊かさ・保有",
15:"謙虚・節度",
16:"喜び・備え",
17:"随う・適応",
18:"乱れの修復",
19:"接近・成長",
20:"観察・省察",
21:"障害の除去",
22:"装飾・文飾",
23:"衰退・剥落",
24:"回復・再出発",
25:"自然・無妄",
26:"蓄積・鍛錬",
27:"養い・言葉",
28:"過重・非常",
29:"険難・誠実",
30:"明知・付着",
31:"感応・交流",
32:"持続・恒常",
33:"退避・引き際",
34:"勢力・自制",
35:"前進・進展",
36:"明を隠す・忍耐",
37:"家庭・秩序",
38:"相違・対立",
39:"困難・停滞",
40:"解放・解消",
41:"減らす・節制",
42:"増益・成長",
43:"決断・除去",
44:"遭遇・警戒",
45:"集合・結集",
46:"上昇・漸進",
47:"困窮・忍耐",
48:"井戸・基盤",
49:"変革・刷新",
50:"鼎・養成",
51:"震動・驚き",
52:"停止・静止",
53:"漸進・順序",
54:"不均衡な関係",
55:"豊盛・盛大",
56:"旅・仮住まい",
57:"浸透・柔順",
58:"悦び・交流",
59:"離散・解消",
60:"節度・区切り",
61:"誠実・信頼",
62:"小事・慎重",
63:"完成・警戒",
64:"未完成・慎重"
};

const hexThemes = {
1:"「乾」は天の働きを象り、力強く絶えず進むことを主題とします。",2:"「坤」は地の働きを象り、受け入れ、支え、育むことを主題とします。",
3:"「屯」は物事の始まりに生じる困難や混沌を表します。",4:"「蒙」は未熟さや、学びによって蒙を啓くことを表します。",
5:"「需」は必要な時機を待つこと、待機の姿勢を表します。",6:"「訟」は意見や利害の対立、争いを表します。",
7:"「師」は集団・組織を統率し、秩序を保つことを表します。",8:"「比」は人と親しみ、結びつき、助け合うことを表します。",
9:"「小畜」は小さく蓄え、少しずつ制御し整えることを表します。",10:"「履」は礼や節度を保ちながら慎重に歩むことを表します。",
11:"「泰」は天地が通じ、物事が調和して伸びる状態を表します。",12:"「否」は天地が通じず、物事が塞がる状態を表します。",
13:"「同人」は人々が志を同じくし、協同することを表します。",14:"「大有」は多くを所有し、豊かさを保つことを表します。",
15:"「謙」は自らを低くして驕らず、謙虚であることを表します。",16:"「豫」は喜びや備え、勢いが生まれることを表します。",
17:"「随」は時や人に適切に随い、状況に応じて動くことを表します。",18:"「蠱」は乱れや腐敗を正し、立て直すことを表します。",
19:"「臨」は近づくこと、上から下へ臨み関わることを表します。",20:"「観」はよく観察し、また自らも人から見られることを表します。",
21:"「噬嗑」は障害を噛み砕き、けじめをつけることを表します。",22:"「賁」は飾り整え、内容にふさわしい形を与えることを表します。",
23:"「剥」は物事が削ぎ落とされ、衰えていく過程を表します。",24:"「復」は一度離れたものが戻り、再び始まることを表します。",
25:"「无妄」は作為や邪念を離れ、自然で誠実であることを表します。",26:"「大畜」は大きく蓄え、力や知識を養うことを表します。",
27:"「頤」は養うこと、特に口から取り入れるものと言葉を表します。",28:"「大過」は負担が大きく、通常を超えた状態を表します。",
29:"「坎」は険難が重なる中で、誠実さを保って進むことを表します。",30:"「離」は明るさと、何かに付着して成り立つことを表します。",
31:"「咸」は互いに感じ、感応し、影響し合うことを表します。",32:"「恒」は一定の道を長く保ち、持続することを表します。",
33:"「遯」は時機を見て退き、距離を取ることを表します。",34:"「大壮」は力が盛んになることと、その力の扱いを表します。",
35:"「晋」は明るい方へ進み、前進することを表します。",36:"「明夷」は明るさが傷つく時に、内なる明を守ることを表します。",
37:"「家人」は家庭や身近な共同体の秩序と役割を表します。",38:"「睽」は互いに背き、違いが際立つことを表します。",
39:"「蹇」は進みにくい困難に直面し、道を求めることを表します。",40:"「解」は緊張や困難がほどけ、解放されることを表します。",
41:"「損」は減らすことを通じて、全体の均衡を整えることを表します。",42:"「益」は増すこと、利益を広く行き渡らせることを表します。",
43:"「夬」は決断し、不要なものを明確に取り除くことを表します。",44:"「姤」は思いがけない出会い、強いものとの遭遇を表します。",
45:"「萃」は人や物が集まり、一つにまとまることを表します。",46:"「升」は下から上へ、着実に伸び進むことを表します。",
47:"「困」は行き詰まりや困窮の中で道を保つことを表します。",48:"「井」は共同体を支える変わらぬ資源や基盤を表します。",
49:"「革」は古いものを改め、時に応じて変革することを表します。",50:"「鼎」は器を整え、物事を新しく養い変えることを表します。",
51:"「震」は突然の動きや驚き、それにどう応じるかを表します。",52:"「艮」は止まるべき所で止まり、静けさを保つことを表します。",
53:"「漸」は順序を踏み、少しずつ進展することを表します。",54:"「帰妹」は通常とは異なる順序や立場で関係に入ることを表します。",
55:"「豊」は盛大で満ちた状態と、その盛りの中での行動を表します。",56:"「旅」は仮の場所に身を置く者の身の処し方を表します。",
57:"「巽」は柔らかく入り込み、繰り返し浸透していくことを表します。",58:"「兌」は悦び、言葉を交わし、互いに和することを表します。",
59:"「渙」は凝り固まったものが散り、隔たりが解けることを表します。",60:"「節」は節度や区切りを設け、適切に制限することを表します。",
61:"「中孚」は内面の誠実さと、そこから生じる信頼を表します。",62:"「小過」は小さなことにおける行き過ぎを主題とします。",
63:"「既済」は物事が一応完成した後の秩序維持を表します。",64:"「未済」はまだ完成しておらず、完成へ向かう途上を表します。"
};

const linePositionMeaning = [
"初爻は卦の始まりです。主題がまだ表面化しきっていない初動の段階で、これからの方向が形づくられる位置です。",
"二爻は下卦の中央です。物事が内側で安定し始める段階で、中正を得やすい位置として伝統的に重視されます。",
"三爻は下卦の終わりです。内から外へ移る境目にあり、進むか留まるかの緊張や行き過ぎが現れやすい位置です。",
"四爻は上卦の始まりです。内側の段階を越えて外・社会的な場へ出たところで、五爻との関係や身の置き方が問題になりやすい位置です。",
"五爻は上卦の中央です。卦全体の中心的な働きを担う位置とされ、主題が整った形で現れることが多い爻です。",
"上爻は卦の最終段階です。主題が極まった位置であり、行き過ぎや終結、次の局面への転換が表れやすい爻です。"
];

const positions = ["初","二","三","四","五","上"];
const posLabels = ["初爻","二爻","三爻","四爻","五爻","上爻"];

const $ = id => document.getElementById(id);
const castBtn=$("cast"), againBtn=$("again"), result=$("result");
const explainBtn=$("explainBtn"), explanation=$("explanation");

function secureRandom(max){
  if (window.crypto && crypto.getRandomValues){
    const a=new Uint32Array(1);
    const limit=Math.floor(0x100000000/max)*max;
    let x;
    do { crypto.getRandomValues(a); x=a[0]; } while(x>=limit);
    return x%max;
  }
  return Math.floor(Math.random()*max);
}

function exactLineName(bit, pos){
  const yinYang = bit ? "九" : "六";
  if(pos===0) return "初"+yinYang;
  if(pos===5) return "上"+yinYang;
  return yinYang + ["","二","三","四","五"][pos];
}

function renderLines(lower, upper, chosen){
  const bits=[...lower.bits,...upper.bits]; // 内部は初爻→上爻
  const box=$("lines");
  box.innerHTML="";
  for(let i=5;i>=0;i--){
    const line=document.createElement("div");
    line.className="line "+(bits[i]?"yang":"yin")+(i===chosen?" chosen":"");
    line.title=posLabels[i]+(i===chosen?"（該当爻）":"");
    box.appendChild(line);
  }
  return bits;
}

function setRolling(){
  result.hidden=false;
  explanation.hidden=true;
  explainBtn.hidden=true;
  explainBtn.setAttribute("aria-expanded","false");
  explainBtn.textContent="易の解説を見る";
  $("hexNo").textContent="筮しています…";
  $("hexName").textContent="";
  $("hexReading").textContent="";
  ["upperName","lowerName","linePos"].forEach(id=>$(id).textContent="…");
  ["upperSymbol","lowerSymbol","lineName"].forEach(id=>$(id).textContent="");
  $("lines").innerHTML="";
  $("changingLine").textContent="";
}

function cast(){
  castBtn.disabled=true; againBtn.disabled=true;
  const q=$("question").value.trim();
  $("savedQuestion").textContent=q ? "問い："+q : "問い：—";
  setRolling();

  let ticks=0;
  const timer=setInterval(()=>{
    const u=trigrams[secureRandom(8)], l=trigrams[secureRandom(8)], p=secureRandom(6);
    $("upperName").textContent=u.name;
    $("upperSymbol").textContent=u.symbol;
    $("lowerName").textContent=l.name;
    $("lowerSymbol").textContent=l.symbol;
    $("linePos").textContent=positions[p];
    ticks++;
    if(ticks>=10){
      clearInterval(timer);
      const upper=trigrams[secureRandom(8)];
      const lower=trigrams[secureRandom(8)];
      const pos=secureRandom(6);
      const hex=H[upper.name+"|"+lower.name];
      $("upperName").textContent=upper.name+"（"+upper.reading+"）";
      $("upperSymbol").textContent=upper.symbol;
      $("lowerName").textContent=lower.name+"（"+lower.reading+"）";
      $("lowerSymbol").textContent=lower.symbol;
      $("linePos").textContent=positions[pos];
      const bits=renderLines(lower,upper,pos);
      const lineName=exactLineName(bits[pos],pos);
      $("lineName").textContent=lineName;
      $("hexNo").textContent="第"+hex[0]+"卦";
      $("hexName").textContent=hex[1];
      $("hexReading").textContent="（"+hex[2]+"）";
      $("changingLine").textContent=lineName;
      $("hexKeyword").textContent=hexKeywords[hex[0]];
      $("hexTheme").textContent=hexThemes[hex[0]];
      $("lineHeading").textContent=lineName+"の解説";
      $("lineExplanation").textContent=
        lineName+"は"+(bits[pos] ? "陽爻（九）" : "陰爻（六）")+"です。"+
        linePositionMeaning[pos];
      $("trigramExplanation").textContent=
        "上卦："+upper.name+" "+upper.symbol+" — "+trigramMeaning[upper.name]+
        " 下卦："+lower.name+" "+lower.symbol+" — "+trigramMeaning[lower.name];
      explainBtn.hidden=false;
      castBtn.disabled=false; againBtn.disabled=false;
      result.scrollIntoView({behavior:"smooth",block:"start"});
    }
  },90);
}

castBtn.addEventListener("click",cast);
againBtn.addEventListener("click",cast);

explainBtn.addEventListener("click",()=>{
  const willOpen=explanation.hidden;
  explanation.hidden=!willOpen;
  explainBtn.setAttribute("aria-expanded", String(willOpen));
  explainBtn.textContent=willOpen ? "易の解説を閉じる" : "易の解説を見る";
  if(willOpen) explanation.scrollIntoView({behavior:"smooth",block:"nearest"});
});
