// questions.js — Category-based question database for Lily & Mia's Trip Around the World

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const CATEGORY_META = {
  geography:   { label:'Geography',   color:'#2980b9', light:'#d6eaf8', icon:'compass' },
  mathematics: { label:'Maths',       color:'#e67e22', light:'#fdebd0', icon:'math' },
  biology:     { label:'Biology',     color:'#27ae60', light:'#d5f5e3', icon:'leaf' },
  general:     { label:'General',     color:'#8e44ad', light:'#e8daef', icon:'star' },
  funfacts:    { label:'Fun Facts',   color:'#d4ac0d', light:'#fef9e7', icon:'lightning' },
  squid:       { label:'Squid!',      color:'#1a252f', light:'#85929e', icon:'squid' },
  memory:      { label:'Memory',      color:'#c0392b', light:'#fadbd8', icon:'card' },
  start:       { label:'Start',       color:'#27ae60', light:'#d5f5e3', icon:'flag' },
  finish:      { label:'Finish!',     color:'#f1c40f', light:'#fef9e7', icon:'trophy' },
};

// ── QUESTION DATABASE ─────────────────────────────────────────────────────────
// 10 questions per category per level (5 cats × 3 levels = 150 questions)

const QUESTION_DB = [

// ════════════════════════════════════════
// GEOGRAPHY — Level 1
// ════════════════════════════════════════
{id:'g1l1a',cat:'geography',level:1,q:"What is the capital city of France?",opts:["London","Berlin","Paris","Rome"],a:2,fact:"Paris has been France's capital for over 1,000 years and is famous for the Eiffel Tower."},
{id:'g1l1b',cat:'geography',level:1,q:"Which is the largest ocean on Earth?",opts:["Atlantic","Indian","Arctic","Pacific"],a:3,fact:"The Pacific Ocean covers about one-third of Earth's entire surface."},
{id:'g1l1c',cat:'geography',level:1,q:"On which continent is Brazil located?",opts:["Africa","Asia","South America","Europe"],a:2,fact:"Brazil is the largest country in South America and the fifth largest in the world."},
{id:'g1l1d',cat:'geography',level:1,q:"What is the capital of Australia?",opts:["Sydney","Melbourne","Canberra","Brisbane"],a:2,fact:"Canberra was built as a compromise between Sydney and Melbourne, both of which wanted to be capital."},
{id:'g1l1e',cat:'geography',level:1,q:"Which country has a red maple leaf on its flag?",opts:["USA","Canada","Japan","Switzerland"],a:1,fact:"The maple leaf has been a Canadian symbol since the 18th century."},
{id:'g1l1f',cat:'geography',level:1,q:"What is the longest river in the world?",opts:["Amazon","Mississippi","Yangtze","Nile"],a:3,fact:"The Nile flows about 6,650 km through north-eastern Africa to the Mediterranean Sea."},
{id:'g1l1g',cat:'geography',level:1,q:"Which country is known as the Land of the Rising Sun?",opts:["China","Japan","South Korea","Thailand"],a:1,fact:"Japan's name in Japanese is 'Nihon' which means 'origin of the sun'."},
{id:'g1l1h',cat:'geography',level:1,q:"How many continents are there on Earth?",opts:["5","6","7","8"],a:2,fact:"The seven continents are Africa, Antarctica, Asia, Australia, Europe, North America, and South America."},
{id:'g1l1i',cat:'geography',level:1,q:"Which country has the Great Wall?",opts:["India","Japan","China","South Korea"],a:2,fact:"The Great Wall of China stretches over 21,000 km and took over 1,000 years to build."},
{id:'g1l1j',cat:'geography',level:1,q:"What is the capital of Egypt?",opts:["Luxor","Alexandria","Aswan","Cairo"],a:3,fact:"Cairo is Africa's largest city, home to over 20 million people."},

// ════════════════════════════════════════
// GEOGRAPHY — Level 2
// ════════════════════════════════════════
{id:'g1l2a',cat:'geography',level:2,q:"Which mountain is the tallest on Earth?",opts:["K2","Mount Kilimanjaro","Mount Everest","Mont Blanc"],a:2,fact:"Mount Everest stands 8,848 metres above sea level on the border of Nepal and Tibet."},
{id:'g1l2b',cat:'geography',level:2,q:"Which African country has the most pyramids?",opts:["Egypt","Ethiopia","Sudan","Libya"],a:2,fact:"Sudan has over 200 pyramids — more than Egypt! They were built by the ancient Nubian civilisations."},
{id:'g1l2c',cat:'geography',level:2,q:"The Amazon River flows into which ocean?",opts:["Pacific","Indian","Southern","Atlantic"],a:3,fact:"The Amazon carries 20% of all freshwater flowing into the world's oceans."},
{id:'g1l2d',cat:'geography',level:2,q:"Which is the smallest country in the world?",opts:["Monaco","San Marino","Liechtenstein","Vatican City"],a:3,fact:"Vatican City covers just 0.44 square kilometres inside Rome, Italy."},
{id:'g1l2e',cat:'geography',level:2,q:"On which continent is the Sahara Desert located?",opts:["Asia","South America","Australia","Africa"],a:3,fact:"The Sahara is the world's largest hot desert, nearly the size of the United States."},
{id:'g1l2f',cat:'geography',level:2,q:"Which sea separates Europe from Africa?",opts:["Red Sea","Baltic Sea","Mediterranean Sea","Caspian Sea"],a:2,fact:"The Mediterranean Sea touches 21 countries across three continents."},
{id:'g1l2g',cat:'geography',level:2,q:"What is the capital of Brazil?",opts:["Rio de Janeiro","São Paulo","Salvador","Brasília"],a:3,fact:"Brasília was built from scratch in 4 years and became Brazil's capital in 1960."},
{id:'g1l2h',cat:'geography',level:2,q:"The Great Barrier Reef is located near which country?",opts:["New Zealand","Japan","Australia","Indonesia"],a:2,fact:"The Great Barrier Reef is the world's largest coral reef system, visible from space."},
{id:'g1l2i',cat:'geography',level:2,q:"Which country owns the Galapagos Islands?",opts:["Peru","Chile","Colombia","Ecuador"],a:3,fact:"Charles Darwin visited the Galapagos in 1835, inspiring his theory of natural selection."},
{id:'g1l2j',cat:'geography',level:2,q:"Lake Baikal in Russia is the world's deepest lake. How deep is it?",opts:["500 m","1,000 m","1,642 m","2,000 m"],a:2,fact:"Lake Baikal contains about 20% of the world's unfrozen surface fresh water."},

// ════════════════════════════════════════
// GEOGRAPHY — Level 3
// ════════════════════════════════════════
{id:'g1l3a',cat:'geography',level:3,q:"Which strait separates Europe from Africa?",opts:["Strait of Hormuz","Strait of Gibraltar","Bering Strait","Strait of Malacca"],a:1,fact:"The Strait of Gibraltar is only 14 km wide at its narrowest point."},
{id:'g1l3b',cat:'geography',level:3,q:"What is the name of the tectonic plate that most of the Pacific Ocean sits on?",opts:["Eurasian Plate","African Plate","Pacific Plate","Indo-Australian Plate"],a:2,fact:"The Pacific Plate is the largest tectonic plate on Earth and is slowly moving northwest."},
{id:'g1l3c',cat:'geography',level:3,q:"Which country has the most time zones?",opts:["China","Russia","USA","France"],a:3,fact:"France has 12 time zones because of its overseas territories, more than any other country."},
{id:'g1l3d',cat:'geography',level:3,q:"The Atacama Desert in Chile is famous for being what?",opts:["Hottest","Largest","Driest","Windiest"],a:2,fact:"Parts of the Atacama have never recorded rainfall. NASA tests Mars rovers there!"},
{id:'g1l3e',cat:'geography',level:3,q:"What percentage of Earth's fresh water is stored in Antarctica's ice?",opts:["20%","40%","60%","80%"],a:2,fact:"If Antarctica's ice melted, sea levels would rise by about 60 metres worldwide."},
{id:'g1l3f',cat:'geography',level:3,q:"Which country has the longest coastline in the world?",opts:["Norway","Russia","USA","Canada"],a:3,fact:"Canada's coastline measures 202,080 km — more than 5 times around the Earth!"},
{id:'g1l3g',cat:'geography',level:3,q:"What is the name of the deepest trench in the world's oceans?",opts:["Puerto Rico Trench","Java Trench","Mariana Trench","Tonga Trench"],a:2,fact:"The Mariana Trench reaches 11,034 metres — deeper than Mount Everest is tall."},
{id:'g1l3h',cat:'geography',level:3,q:"Which river delta is the largest in the world?",opts:["Nile Delta","Amazon Delta","Ganges-Brahmaputra Delta","Yangtze Delta"],a:2,fact:"The Ganges-Brahmaputra Delta covers 100,000 sq km in Bangladesh and India."},
{id:'g1l3i',cat:'geography',level:3,q:"The Ring of Fire is an area with many volcanoes around which ocean?",opts:["Atlantic","Indian","Arctic","Pacific"],a:3,fact:"The Ring of Fire has 452 volcanoes and is responsible for 90% of the world's earthquakes."},
{id:'g1l3j',cat:'geography',level:3,q:"What is the world's largest landlocked country?",opts:["Mongolia","Kazakhstan","Bolivia","Chad"],a:1,fact:"Kazakhstan is the 9th largest country in the world and is bigger than Western Europe."},

// ════════════════════════════════════════
// MATHEMATICS — Level 1
// ════════════════════════════════════════
{id:'m1l1a',cat:'mathematics',level:1,q:"What is 7 × 8?",opts:["54","56","63","48"],a:1,fact:"Multiplication is just repeated addition — 7×8 means adding 7 eight times!"},
{id:'m1l1b',cat:'mathematics',level:1,q:"What is half of 64?",opts:["28","36","32","34"],a:2,fact:"Halving is the same as dividing by 2. Half of 64 = 64 ÷ 2 = 32."},
{id:'m1l1c',cat:'mathematics',level:1,q:"How many sides does a hexagon have?",opts:["5","7","8","6"],a:3,fact:"Honeycombs are hexagonal because it's the most efficient shape for storing honey!"},
{id:'m1l1d',cat:'mathematics',level:1,q:"What is 100 − 37?",opts:["63","67","73","57"],a:0,fact:"One trick: 100 − 37 = 100 − 40 + 3 = 60 + 3 = 63."},
{id:'m1l1e',cat:'mathematics',level:1,q:"What is 9 × 9?",opts:["72","82","81","91"],a:2,fact:"There's a fun pattern in the 9 times table — the digits always add up to 9!"},
{id:'m1l1f',cat:'mathematics',level:1,q:"If you have 24 apples and share them equally among 4 friends, how many does each get?",opts:["5","6","8","4"],a:1,fact:"Division is just splitting into equal groups. 24 ÷ 4 = 6."},
{id:'m1l1g',cat:'mathematics',level:1,q:"What is the next number in the sequence: 2, 4, 6, 8, …?",opts:["9","10","12","11"],a:1,fact:"These are the even numbers! They always increase by 2."},
{id:'m1l1h',cat:'mathematics',level:1,q:"How many minutes are in 2 hours?",opts:["100","120","140","90"],a:1,fact:"1 hour = 60 minutes, so 2 hours = 120 minutes."},
{id:'m1l1i',cat:'mathematics',level:1,q:"What shape has 3 sides?",opts:["Square","Pentagon","Triangle","Rectangle"],a:2,fact:"The word 'triangle' comes from Latin 'triangulum' meaning three angles."},
{id:'m1l1j',cat:'mathematics',level:1,q:"What is 25 + 75?",opts:["90","95","105","100"],a:3,fact:"25 and 75 are complementary — they always add up to 100!"},

// ════════════════════════════════════════
// MATHEMATICS — Level 2
// ════════════════════════════════════════
{id:'m1l2a',cat:'mathematics',level:2,q:"What is 15% of 200?",opts:["25","30","35","40"],a:1,fact:"To find 15%, find 10% (=20) then add half of that (10), so 20+10=30."},
{id:'m1l2b',cat:'mathematics',level:2,q:"What is the area of a rectangle 8 cm long and 5 cm wide?",opts:["26 cm²","40 cm²","30 cm²","45 cm²"],a:1,fact:"Area of a rectangle = length × width. 8 × 5 = 40 cm²."},
{id:'m1l2c',cat:'mathematics',level:2,q:"What is the square root of 144?",opts:["11","13","12","14"],a:2,fact:"12 × 12 = 144. The square root of a number is what you multiply by itself to get it."},
{id:'m1l2d',cat:'mathematics',level:2,q:"A train travels at 60 km/h. How far does it go in 2.5 hours?",opts:["120 km","150 km","180 km","200 km"],a:1,fact:"Distance = speed × time. 60 × 2.5 = 150 km."},
{id:'m1l2e',cat:'mathematics',level:2,q:"What is 3/4 expressed as a decimal?",opts:["0.34","0.7","0.75","0.8"],a:2,fact:"3 divided by 4 = 0.75. You can also think of it as 75 cents in a dollar."},
{id:'m1l2f',cat:'mathematics',level:2,q:"How many degrees are in a right angle?",opts:["45°","60°","90°","180°"],a:2,fact:"A right angle looks like the corner of a square and is exactly 90 degrees."},
{id:'m1l2g',cat:'mathematics',level:2,q:"What is 2⁵ (2 to the power of 5)?",opts:["10","16","32","64"],a:2,fact:"2⁵ = 2×2×2×2×2 = 32. Powers of 2 are important in computers!"},
{id:'m1l2h',cat:'mathematics',level:2,q:"If a pizza has 8 slices and you eat 3, what fraction is left?",opts:["3/8","1/2","5/8","2/3"],a:2,fact:"8 total − 3 eaten = 5 remaining, so 5/8 of the pizza is left."},
{id:'m1l2i',cat:'mathematics',level:2,q:"What is the perimeter of a square with sides of 7 cm?",opts:["14 cm","21 cm","28 cm","49 cm"],a:2,fact:"Perimeter = all sides added. For a square: 4 × 7 = 28 cm."},
{id:'m1l2j',cat:'mathematics',level:2,q:"Round 3.847 to 2 decimal places.",opts:["3.84","3.85","3.8","3.9"],a:1,fact:"Look at the third decimal (7). Since it's 5 or more, round up: 3.85."},

// ════════════════════════════════════════
// MATHEMATICS — Level 3
// ════════════════════════════════════════
{id:'m1l3a',cat:'mathematics',level:3,q:"What is the value of π (pi) to 2 decimal places?",opts:["3.12","3.14","3.16","3.41"],a:1,fact:"Pi is an irrational number — its decimal goes on forever without repeating!"},
{id:'m1l3b',cat:'mathematics',level:3,q:"If a car uses 8 litres per 100 km, how many litres for a 350 km journey?",opts:["24 L","28 L","32 L","36 L"],a:1,fact:"8 litres per 100 km × 3.5 = 28 litres. This is called fuel efficiency!"},
{id:'m1l3c',cat:'mathematics',level:3,q:"What is the formula for the area of a circle?",opts:["2πr","πr²","πd","2πr²"],a:1,fact:"A = πr² where r is the radius. Pi (π) ≈ 3.14159."},
{id:'m1l3d',cat:'mathematics',level:3,q:"Solve: 5x − 3 = 17. What is x?",opts:["3","4","5","6"],a:1,fact:"Add 3 to both sides: 5x = 20, then divide by 5: x = 4."},
{id:'m1l3e',cat:'mathematics',level:3,q:"What is the sum of interior angles of a pentagon?",opts:["360°","450°","540°","720°"],a:2,fact:"Formula: (n-2) × 180°. For pentagon (5 sides): (5-2) × 180 = 540°."},
{id:'m1l3f',cat:'mathematics',level:3,q:"A bag has 3 red and 7 blue balls. What is the probability of picking red?",opts:["3/7","3/10","7/10","1/3"],a:1,fact:"Probability = favourable outcomes ÷ total outcomes = 3 ÷ (3+7) = 3/10."},
{id:'m1l3g',cat:'mathematics',level:3,q:"What is the Fibonacci sequence's 8th number? (1,1,2,3,5,8,13,…)",opts:["18","19","20","21"],a:3,fact:"Each Fibonacci number is the sum of the two before it. This pattern appears throughout nature!"},
{id:'m1l3h',cat:'mathematics',level:3,q:"Convert 0.625 to a fraction in its simplest form.",opts:["5/8","6/10","62/100","3/5"],a:0,fact:"0.625 = 625/1000 = 5/8. The greatest common factor of 625 and 1000 is 125."},
{id:'m1l3i',cat:'mathematics',level:3,q:"A cube has sides of 4 cm. What is its volume?",opts:["16 cm³","32 cm³","48 cm³","64 cm³"],a:3,fact:"Volume of a cube = side³. 4 × 4 × 4 = 64 cm³."},
{id:'m1l3j',cat:'mathematics',level:3,q:"What is the highest common factor (HCF) of 36 and 48?",opts:["6","9","12","18"],a:2,fact:"Factors of 36: 1,2,3,4,6,9,12,18,36. Factors of 48: 1,2,3,4,6,8,12,16,24,48. Highest common = 12."},

// ════════════════════════════════════════
// BIOLOGY — Level 1
// ════════════════════════════════════════
{id:'b1l1a',cat:'biology',level:1,q:"What do plants need along with water and sunlight to make their own food?",opts:["Soil","Carbon dioxide","Oxygen","Nitrogen"],a:1,fact:"Plants make food through photosynthesis using sunlight, water, and CO₂ — releasing oxygen as a bonus!"},
{id:'b1l1b',cat:'biology',level:1,q:"How many legs does an insect have?",opts:["4","6","8","10"],a:1,fact:"All insects have 6 legs, 3 body parts, and most have wings. Spiders have 8 legs and are not insects."},
{id:'b1l1c',cat:'biology',level:1,q:"What is the largest animal on Earth?",opts:["Elephant","Great White Shark","Blue Whale","Giraffe"],a:2,fact:"The blue whale can grow up to 30 metres long and weigh as much as 200 tonnes!"},
{id:'b1l1d',cat:'biology',level:1,q:"What do herbivores eat?",opts:["Only meat","Only plants","Both plants and meat","Only fish"],a:1,fact:"Herbivores like cows, horses, and rabbits only eat plants. 'Herba' means grass in Latin."},
{id:'b1l1e',cat:'biology',level:1,q:"Which organ pumps blood around your body?",opts:["Lungs","Brain","Stomach","Heart"],a:3,fact:"Your heart beats about 100,000 times every day — that's about 35 million times a year!"},
{id:'b1l1f',cat:'biology',level:1,q:"What is the name of the process by which caterpillars become butterflies?",opts:["Migration","Metamorphosis","Pollination","Hibernation"],a:1,fact:"During metamorphosis, the caterpillar transforms completely inside its chrysalis over about 2 weeks."},
{id:'b1l1g',cat:'biology',level:1,q:"What are the tiny holes in leaves called that let gases in and out?",opts:["Stomata","Chloroplasts","Roots","Petals"],a:0,fact:"Stomata are like tiny mouths in leaves — they open and close to control gas exchange."},
{id:'b1l1h',cat:'biology',level:1,q:"What is the hard outer covering of insects and crabs called?",opts:["Scales","Fur","Exoskeleton","Shell"],a:2,fact:"An exoskeleton is an external skeleton that supports and protects the body — like armour!"},
{id:'b1l1i',cat:'biology',level:1,q:"How many chambers does a human heart have?",opts:["2","3","4","5"],a:2,fact:"The heart has 4 chambers: right and left atria (upper) and right and left ventricles (lower)."},
{id:'b1l1j',cat:'biology',level:1,q:"What is the green pigment in plants that captures sunlight?",opts:["Melanin","Haemoglobin","Chlorophyll","Carotene"],a:2,fact:"Chlorophyll makes plants green. In autumn it breaks down, revealing yellow and orange pigments!"},

// ════════════════════════════════════════
// BIOLOGY — Level 2
// ════════════════════════════════════════
{id:'b1l2a',cat:'biology',level:2,q:"What is the basic unit of life?",opts:["Organ","Tissue","Cell","Atom"],a:2,fact:"All living things are made of cells. A human body has about 37 trillion cells!"},
{id:'b1l2b',cat:'biology',level:2,q:"Which part of the cell contains DNA?",opts:["Cell membrane","Cytoplasm","Mitochondria","Nucleus"],a:3,fact:"The nucleus is the cell's control centre, housing DNA that carries genetic instructions."},
{id:'b1l2c',cat:'biology',level:2,q:"What is the function of red blood cells?",opts:["Fight infection","Carry oxygen","Produce hormones","Digest food"],a:1,fact:"Red blood cells contain haemoglobin, which binds to oxygen in the lungs and delivers it to the body."},
{id:'b1l2d',cat:'biology',level:2,q:"What are animals that eat both plants and animals called?",opts:["Herbivores","Carnivores","Omnivores","Decomposers"],a:2,fact:"Humans, bears, and pigs are omnivores. 'Omni' means 'all' in Latin."},
{id:'b1l2e',cat:'biology',level:2,q:"Which gas do plants release during photosynthesis?",opts:["Carbon dioxide","Nitrogen","Hydrogen","Oxygen"],a:3,fact:"Plants are essential for life on Earth because they produce the oxygen we breathe."},
{id:'b1l2f',cat:'biology',level:2,q:"What is the longest bone in the human body?",opts:["Humerus","Tibia","Spine","Femur"],a:3,fact:"The femur (thigh bone) can be up to 50 cm long in adults and is incredibly strong."},
{id:'b1l2g',cat:'biology',level:2,q:"What type of animal is a dolphin?",opts:["Fish","Amphibian","Reptile","Mammal"],a:3,fact:"Dolphins are mammals — they breathe air, give birth to live young, and nurse them with milk."},
{id:'b1l2h',cat:'biology',level:2,q:"How many bones are in an adult human body?",opts:["156","196","206","256"],a:2,fact:"Babies are born with about 270 bones — they fuse together as we grow to form 206."},
{id:'b1l2i',cat:'biology',level:2,q:"What is the powerhouse of the cell?",opts:["Nucleus","Ribosome","Mitochondria","Vacuole"],a:2,fact:"Mitochondria produce ATP — the energy currency that powers almost everything in your body."},
{id:'b1l2j',cat:'biology',level:2,q:"Which animal has the longest gestation period?",opts:["Elephant","Blue whale","Rhinoceros","Camel"],a:0,fact:"Elephants are pregnant for about 22 months — almost 2 years — the longest of any land animal."},

// ════════════════════════════════════════
// BIOLOGY — Level 3
// ════════════════════════════════════════
{id:'b1l3a',cat:'biology',level:3,q:"What is the process by which bacteria and fungi break down dead organisms?",opts:["Photosynthesis","Decomposition","Fermentation","Respiration"],a:1,fact:"Decomposers are nature's recyclers — they return nutrients to the soil for plants to use."},
{id:'b1l3b',cat:'biology',level:3,q:"What is the scientific name for the sugar produced by photosynthesis?",opts:["Fructose","Glucose","Sucrose","Lactose"],a:1,fact:"Glucose (C₆H₁₂O₆) is the primary fuel for most living cells."},
{id:'b1l3c',cat:'biology',level:3,q:"How many pairs of chromosomes do humans have?",opts:["20","23","24","46"],a:1,fact:"Humans have 23 pairs of chromosomes (46 total) — one set from each parent."},
{id:'b1l3d',cat:'biology',level:3,q:"What is the name of the organ that filters waste from blood in humans?",opts:["Liver","Spleen","Pancreas","Kidneys"],a:3,fact:"Your kidneys filter about 180 litres of blood every day and produce about 1.5 litres of urine."},
{id:'b1l3e',cat:'biology',level:3,q:"What is the scientific term for animals that maintain a constant body temperature?",opts:["Ectotherms","Endotherms","Poikilotherms","Heterotrophs"],a:1,fact:"Endotherms (like birds and mammals) generate their own heat. Ectotherms rely on the environment."},
{id:'b1l3f',cat:'biology',level:3,q:"What protein do fingernails and hair consist mostly of?",opts:["Collagen","Elastin","Keratin","Actin"],a:2,fact:"Keratin also makes up animal horns, hooves, and bird feathers — it's a very versatile protein!"},
{id:'b1l3g',cat:'biology',level:3,q:"What type of symbiotic relationship do clownfish and sea anemones have?",opts:["Parasitism","Commensalism","Competition","Mutualism"],a:3,fact:"Clownfish get shelter; anemones get cleaning and more food. Both benefit — that's mutualism!"},
{id:'b1l3h',cat:'biology',level:3,q:"What is the name of the process by which organisms change over many generations to suit their environment?",opts:["Migration","Adaptation","Evolution","Speciation"],a:2,fact:"Charles Darwin developed the theory of evolution by natural selection in the 1850s."},
{id:'b1l3i',cat:'biology',level:3,q:"Which molecule carries genetic information from the nucleus to ribosomes?",opts:["DNA","mRNA","tRNA","rRNA"],a:1,fact:"Messenger RNA (mRNA) carries the 'recipe' from DNA to ribosomes where proteins are made."},
{id:'b1l3j',cat:'biology',level:3,q:"How many litres of blood does an average adult human body contain?",opts:["3–4 litres","5–6 litres","7–8 litres","9–10 litres"],a:1,fact:"An adult body has 5–6 litres of blood, which completes a full circuit in about 1 minute."},

// ════════════════════════════════════════
// GENERAL KNOWLEDGE — Level 1
// ════════════════════════════════════════
{id:'k1l1a',cat:'general',level:1,q:"What colour do you get when you mix red and blue?",opts:["Orange","Green","Purple","Brown"],a:2,fact:"Purple (or violet) sits between red and blue on the colour spectrum."},
{id:'k1l1b',cat:'general',level:1,q:"How many days are in a leap year?",opts:["365","366","367","364"],a:1,fact:"We add a leap day (Feb 29) every 4 years to keep our calendar aligned with Earth's orbit."},
{id:'k1l1c',cat:'general',level:1,q:"What is the name of the fairy tale character who slept for 100 years?",opts:["Cinderella","Snow White","Rapunzel","Sleeping Beauty"],a:3,fact:"Sleeping Beauty is based on a 17th-century tale by Charles Perrault."},
{id:'k1l1d',cat:'general',level:1,q:"What instrument has black and white keys?",opts:["Guitar","Trumpet","Violin","Piano"],a:3,fact:"A standard piano has 88 keys — 52 white and 36 black."},
{id:'k1l1e',cat:'general',level:1,q:"Which planet is closest to the Sun?",opts:["Venus","Earth","Mars","Mercury"],a:3,fact:"Mercury orbits the Sun every 88 days — a year on Mercury is less than 3 months on Earth!"},
{id:'k1l1f',cat:'general',level:1,q:"What sport is played at Wimbledon?",opts:["Cricket","Football","Tennis","Golf"],a:2,fact:"Wimbledon is the oldest tennis tournament in the world, first held in 1877."},
{id:'k1l1g',cat:'general',level:1,q:"What is the name of the famous toy building blocks made from plastic bricks?",opts:["Meccano","Duplo","Lego","K'Nex"],a:2,fact:"Lego was invented in Denmark in 1949. The word comes from the Danish 'leg godt' meaning 'play well'."},
{id:'k1l1h',cat:'general',level:1,q:"How many letters are in the English alphabet?",opts:["24","25","26","27"],a:2,fact:"The English alphabet has 26 letters. Some other languages have more — Hawaiian has only 13!"},
{id:'k1l1i',cat:'general',level:1,q:"What do you call a baby dog?",opts:["Kitten","Cub","Puppy","Foal"],a:2,fact:"Puppies are born with their eyes closed. They open them at about 2 weeks old."},
{id:'k1l1j',cat:'general',level:1,q:"Which planet is known as the Red Planet?",opts:["Jupiter","Saturn","Venus","Mars"],a:3,fact:"Mars looks red because its surface is covered with iron oxide — basically rust!"},

// ════════════════════════════════════════
// GENERAL KNOWLEDGE — Level 2
// ════════════════════════════════════════
{id:'k1l2a',cat:'general',level:2,q:"Who wrote Romeo and Juliet?",opts:["Charles Dickens","William Shakespeare","Jane Austen","J.K. Rowling"],a:1,fact:"Shakespeare wrote Romeo and Juliet around 1594–1596. He wrote 37 plays in total!"},
{id:'k1l2b',cat:'general',level:2,q:"What is the chemical symbol for gold?",opts:["Go","Gd","Gl","Au"],a:3,fact:"Au comes from 'aurum', the Latin word for gold. It's been prized for thousands of years."},
{id:'k1l2c',cat:'general',level:2,q:"In which city are the headquarters of the United Nations?",opts:["Geneva","Paris","London","New York"],a:3,fact:"The UN was founded in 1945 after World War II. It now has 193 member countries."},
{id:'k1l2d',cat:'general',level:2,q:"Which ancient wonder of the world still exists today?",opts:["Hanging Gardens","Colossus of Rhodes","Great Pyramid of Giza","Temple of Artemis"],a:2,fact:"The Great Pyramid of Giza was built around 2560 BC and is the oldest of the Seven Wonders."},
{id:'k1l2e',cat:'general',level:2,q:"What is the speed of light in a vacuum (approximately)?",opts:["300,000 km/s","150,000 km/s","3,000 km/s","30,000 km/s"],a:0,fact:"Light travels so fast it could circle Earth about 7.5 times in just one second!"},
{id:'k1l2f',cat:'general',level:2,q:"Who painted the Mona Lisa?",opts:["Michelangelo","Raphael","Leonardo da Vinci","Botticelli"],a:2,fact:"Leonardo da Vinci painted the Mona Lisa between 1503–1519. It's now in the Louvre in Paris."},
{id:'k1l2g',cat:'general',level:2,q:"What is the hardest natural substance on Earth?",opts:["Granite","Ruby","Diamond","Quartz"],a:2,fact:"Diamond is a 10 on the Mohs hardness scale. It's made of pure carbon arranged in a special crystal structure."},
{id:'k1l2h',cat:'general',level:2,q:"What language is spoken in Brazil?",opts:["Spanish","French","English","Portuguese"],a:3,fact:"Portuguese is spoken in Brazil because it was colonised by Portugal starting in 1500."},
{id:'k1l2i',cat:'general',level:2,q:"How many strings does a standard guitar have?",opts:["4","5","6","7"],a:2,fact:"Standard guitars have 6 strings. Bass guitars usually have 4, and some guitars have 7 or 12!"},
{id:'k1l2j',cat:'general',level:2,q:"What is the name of the first artificial satellite launched into space?",opts:["Apollo","Vostok","Sputnik","Explorer"],a:2,fact:"Sputnik 1 was launched by the Soviet Union on 4 October 1957, starting the Space Age."},

// ════════════════════════════════════════
// GENERAL KNOWLEDGE — Level 3
// ════════════════════════════════════════
{id:'k1l3a',cat:'general',level:3,q:"What is the Rosetta Stone?",opts:["A famous gem","A musical instrument","An ancient decree in 3 scripts","A Roman road map"],a:2,fact:"Found in 1799, the Rosetta Stone helped scholars finally decode Egyptian hieroglyphics."},
{id:'k1l3b',cat:'general',level:3,q:"What is the name of the economic theory that free markets regulate themselves without government intervention?",opts:["Marxism","Keynesianism","Laissez-faire","Mercantilism"],a:2,fact:"'Laissez-faire' means 'let do' in French. Adam Smith described these ideas in The Wealth of Nations (1776)."},
{id:'k1l3c',cat:'general',level:3,q:"What is the Turing Test designed to measure?",opts:["Computer speed","A machine's ability to mimic human intelligence","Internet security","Memory capacity"],a:1,fact:"Alan Turing proposed the test in 1950. A machine passes if a human can't tell they're not talking to a person."},
{id:'k1l3d',cat:'general',level:3,q:"In what year did the Berlin Wall fall?",opts:["1985","1987","1989","1991"],a:2,fact:"The Berlin Wall fell on 9 November 1989, reuniting East and West Germany after 28 years."},
{id:'k1l3e',cat:'general',level:3,q:"What does UNESCO stand for?",opts:["United Nations Education, Science and Culture Organisation","Universal Nations Economic and Social Council","United Nations Environment Sustainability Committee","Universal Education, Science and Cultural Organisation"],a:0,fact:"UNESCO works to build peace through international cooperation in education, science, and culture."},
{id:'k1l3f',cat:'general',level:3,q:"What is the name of the magnetic field that protects Earth from solar wind?",opts:["Ionosphere","Magnetosphere","Van Allen Belt","Thermosphere"],a:1,fact:"Earth's magnetosphere deflects harmful charged particles from the Sun, making life possible."},
{id:'k1l3g',cat:'general',level:3,q:"Who developed the theory of general relativity?",opts:["Isaac Newton","Niels Bohr","Albert Einstein","Max Planck"],a:2,fact:"Einstein published his general theory of relativity in 1915, revolutionising our understanding of gravity."},
{id:'k1l3h',cat:'general',level:3,q:"The Silk Road was an ancient trade route connecting China to which other region?",opts:["Africa","Australia","The Americas","Europe and the Middle East"],a:3,fact:"The Silk Road stretched over 6,400 km and connected civilisations for over 1,500 years."},
{id:'k1l3i',cat:'general',level:3,q:"What is the name of the award given to the best film at the Academy Awards?",opts:["Palme d'Or","BAFTA","Golden Globe","Oscar for Best Picture"],a:3,fact:"The Academy Awards have been held since 1929. The Oscar statuette weighs 3.8 kg."},
{id:'k1l3j',cat:'general',level:3,q:"What is the approximate age of the universe?",opts:["4.5 billion years","13.8 billion years","100 billion years","4 trillion years"],a:1,fact:"Scientists calculated the age of the universe from the cosmic microwave background radiation."},

// ════════════════════════════════════════
// FUN FACTS — Level 1
// ════════════════════════════════════════
{id:'f1l1a',cat:'funfacts',level:1,q:"How many hearts does an octopus have?",opts:["1","2","3","4"],a:2,fact:"Octopuses have 3 hearts — 2 pump blood to the gills, and 1 pumps it to the rest of the body. Their blood is blue!"},
{id:'f1l1b',cat:'funfacts',level:1,q:"What is the only fruit with seeds on the outside?",opts:["Raspberry","Strawberry","Blueberry","Kiwi"],a:1,fact:"What we call strawberry 'seeds' are actually tiny fruits called achenes. The real seeds are inside those!"},
{id:'f1l1c',cat:'funfacts',level:1,q:"How long can a snail sleep for?",opts:["1 week","1 month","3 years","1 year"],a:2,fact:"Snails can hibernate for up to 3 years during drought. They seal their shells with a layer of mucus!"},
{id:'f1l1d',cat:'funfacts',level:1,q:"What animal never sleeps?",opts:["Dolphin","Shark","Jellyfish","Snake"],a:1,fact:"Sharks must keep swimming to breathe. Some rest parts of their brain while keeping the other half alert."},
{id:'f1l1e',cat:'funfacts',level:1,q:"A group of flamingos is called a what?",opts:["Pod","Flamboyance","Flock","Colony"],a:1,fact:"Flamingos get their pink colour from the food they eat — shrimp and algae containing pink pigments!"},
{id:'f1l1f',cat:'funfacts',level:1,q:"What is the fastest land animal?",opts:["Lion","Horse","Cheetah","Gazelle"],a:2,fact:"Cheetahs can reach 120 km/h in short bursts and can accelerate from 0 to 100 km/h in just 3 seconds!"},
{id:'f1l1g',cat:'funfacts',level:1,q:"Bananas are technically which type of plant product?",opts:["Nut","Vegetable","Berry","Flower"],a:2,fact:"Botanically, bananas are berries! Strawberries are NOT berries by botanical definition. Science is wild!"},
{id:'f1l1h',cat:'funfacts',level:1,q:"How many eyes does a spider have?",opts:["2","4","6","8"],a:3,fact:"Most spiders have 8 eyes, but some cave spiders have none. Spider silk is stronger than steel wire!"},
{id:'f1l1i',cat:'funfacts',level:1,q:"Which bird can fly backwards?",opts:["Penguin","Eagle","Hummingbird","Parrot"],a:2,fact:"Hummingbirds flap their wings up to 80 times per second and are the only birds that can fly backwards!"},
{id:'f1l1j',cat:'funfacts',level:1,q:"What is the name of the toy story cowboy character?",opts:["Buzz","Woody","Rex","Hamm"],a:1,fact:"Woody Pride is the main character of Toy Story (1995), Pixar's first feature-length film."},

// ════════════════════════════════════════
// FUN FACTS — Level 2
// ════════════════════════════════════════
{id:'f1l2a',cat:'funfacts',level:2,q:"How many muscles does it take to smile?",opts:["6","12","17","43"],a:2,fact:"It takes 17 muscles to smile and about 43 to frown — so smiling is actually easier!"},
{id:'f1l2b',cat:'funfacts',level:2,q:"What is the only planet that rotates on its side?",opts:["Saturn","Neptune","Uranus","Venus"],a:2,fact:"Uranus has an axial tilt of 98°, so it basically rolls around the Sun like a bowling ball!"},
{id:'f1l2c',cat:'funfacts',level:2,q:"Which country invented pizza?",opts:["USA","Greece","Italy","Spain"],a:2,fact:"Modern pizza was invented in Naples, Italy in the 1800s. The Margherita was created for Queen Margherita in 1889."},
{id:'f1l2d',cat:'funfacts',level:2,q:"What colour is the blood of an octopus?",opts:["Red","Green","Blue","Purple"],a:2,fact:"Octopus blood is blue because it contains copper-based haemocyanin instead of iron-based haemoglobin."},
{id:'f1l2e',cat:'funfacts',level:2,q:"How many times can a piece of paper be folded in half?",opts:["4–5 times","6–7 times","8–9 times","10+ times"],a:1,fact:"You can typically fold paper about 7 times. A piece folded 42 times would reach the Moon!"},
{id:'f1l2f',cat:'funfacts',level:2,q:"Which animal has fingerprints almost identical to humans?",opts:["Gorilla","Koala","Chimpanzee","Orangutan"],a:1,fact:"Koala fingerprints are so similar to humans that they have even confused crime scene investigators!"},
{id:'f1l2g',cat:'funfacts',level:2,q:"What material was the first Lego brick made from?",opts:["Metal","Wood","Rubber","Plastic"],a:1,fact:"The original Lego bricks from 1949 were made of wood, but switched to plastic in the 1950s."},
{id:'f1l2h',cat:'funfacts',level:2,q:"How long does it take light from the Sun to reach Earth?",opts:["3 minutes","8 minutes","15 minutes","30 minutes"],a:1,fact:"Light takes about 8 minutes and 20 seconds to travel the 150 million km from the Sun to Earth."},
{id:'f1l2i',cat:'funfacts',level:2,q:"What is a baby kangaroo called?",opts:["Cub","Joey","Pup","Kit"],a:1,fact:"A baby kangaroo (joey) is the size of a jellybean when born and lives in its mother's pouch for 9 months!"},
{id:'f1l2j',cat:'funfacts',level:2,q:"What is the world's most widely spoken language by number of native speakers?",opts:["English","Spanish","Hindi","Mandarin Chinese"],a:3,fact:"Mandarin Chinese has about 920 million native speakers, nearly double the next largest group."},

// ════════════════════════════════════════
// FUN FACTS — Level 3
// ════════════════════════════════════════
{id:'f1l3a',cat:'funfacts',level:3,q:"What is the longest any animal has survived without water?",opts:["1 month","6 months","3 years","10 years"],a:2,fact:"Some species of tardigrade (water bear) can survive decades without water in a state called cryptobiosis."},
{id:'f1l3b',cat:'funfacts',level:3,q:"What percentage of Earth's species are insects?",opts:["10%","30%","50%","80%"],a:2,fact:"Insects make up about 80% of all known animal species — over 1 million described species!"},
{id:'f1l3c',cat:'funfacts',level:3,q:"The human eye can distinguish between approximately how many colours?",opts:["1,000","10,000","100,000","10 million"],a:3,fact:"The eye has 3 types of colour receptors (cones) allowing us to see approximately 10 million shades."},
{id:'f1l3d',cat:'funfacts',level:3,q:"What is the total length of blood vessels in the human body?",opts:["10,000 km","60,000 km","100,000 km","200,000 km"],a:2,fact:"If you stretched out all your blood vessels, they would circle Earth about 2.5 times!"},
{id:'f1l3e',cat:'funfacts',level:3,q:"What is the only food that never spoils?",opts:["Vinegar","Salt","Honey","Dried beans"],a:2,fact:"Edible honey has been found in Egyptian tombs over 3,000 years old! Its high sugar and low moisture prevent bacteria."},
{id:'f1l3f',cat:'funfacts',level:3,q:"What fraction of an iceberg is above water?",opts:["1/2","1/5","1/8","1/10"],a:2,fact:"About 1/8 of an iceberg is visible above water — the rest is hidden below. This inspired the phrase 'tip of the iceberg'."},
{id:'f1l3g',cat:'funfacts',level:3,q:"How many atoms are in a grain of sand?",opts:["Thousands","Millions","Billions","Trillions or more"],a:3,fact:"A grain of sand contains approximately 8 quintillion (8,000,000,000,000,000,000) atoms of silicon dioxide."},
{id:'f1l3h',cat:'funfacts',level:3,q:"What is the most abundant element in the universe?",opts:["Oxygen","Carbon","Helium","Hydrogen"],a:3,fact:"Hydrogen makes up about 75% of all normal matter in the universe. Stars like our Sun are mostly hydrogen."},
{id:'f1l3i',cat:'funfacts',level:3,q:"What is the name for a word that reads the same forwards and backwards?",opts:["Anagram","Palindrome","Acronym","Synonym"],a:1,fact:"Examples: racecar, level, kayak, madam. The word 'palindrome' comes from Greek meaning 'running back again'."},
{id:'f1l3j',cat:'funfacts',level:3,q:"How far does Earth travel through space each year (its orbit around the Sun)?",opts:["150 million km","500 million km","940 million km","2 billion km"],a:2,fact:"Earth travels about 940 million km per year, at an average speed of 107,000 km/h around the Sun!"},

]; // end QUESTION_DB

// ── TILE CATEGORY GENERATOR ───────────────────────────────────────────────────

function generateTileCategories() {
  const pool = [];
  ['geography','mathematics','biology','general','funfacts'].forEach(c => {
    for (let i = 0; i < 10; i++) pool.push(c);
  });
  for (let i = 0; i < 5; i++) pool.push('squid');
  for (let i = 0; i < 3; i++) pool.push('memory');
  // pool has 58 elements; we need 58 for tiles 2..59
  shuffleArray(pool);
  return ['start', ...pool, 'finish'];
}

function getQuestionForTile(category, level, usedIds) {
  let pool = QUESTION_DB.filter(q => q.cat === category && q.level === level && !usedIds.has(q.id));
  if (!pool.length) pool = QUESTION_DB.filter(q => q.cat === category && !usedIds.has(q.id));
  if (!pool.length) pool = QUESTION_DB.filter(q => q.cat === category);
  if (!pool.length) pool = QUESTION_DB;
  return pool[Math.floor(Math.random() * pool.length)];
}
