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

const positions = ["初","二","三","四","五","上"];
const posLabels = ["初爻","二爻","三爻","四爻","五爻","上爻"];

const $ = id => document.getElementById(id);
const castBtn=$("cast"), againBtn=$("again"), result=$("result");

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
      castBtn.disabled=false; againBtn.disabled=false;
      result.scrollIntoView({behavior:"smooth",block:"start"});
    }
  },90);
}

castBtn.addEventListener("click",cast);
againBtn.addEventListener("click",cast);
