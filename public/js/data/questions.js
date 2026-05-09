// Question Database - Lily & Mia's Trip Around the World
// Format: { id, country, continent, region, level (1=easy,2=medium,3=hard), question, options:[A,B,C,D], answer (0-3 index), fact }

const QUESTION_DB = [

// ============================================================
// NORTH AMERICA
// ============================================================
{id:1,country:"Canada",continent:"North America",level:1,question:"What is the capital city of Canada?",options:["Toronto","Vancouver","Ottawa","Montreal"],answer:2,fact:"Ottawa has been Canada's capital since 1857, chosen by Queen Victoria."},
{id:2,country:"Canada",continent:"North America",level:1,question:"What is Canada's national animal?",options:["Moose","Beaver","Bear","Wolf"],answer:1,fact:"The beaver appears on Canada's nickel coin and is a symbol of Canadian industry."},
{id:3,country:"Canada",continent:"North America",level:1,question:"What is the longest river in Canada?",options:["Fraser River","St. Lawrence River","Mackenzie River","Saskatchewan River"],answer:2,fact:"The Mackenzie River stretches over 4,200 km and flows north to the Arctic Ocean."},
{id:4,country:"Canada",continent:"North America",level:1,question:"Which ocean borders Canada to the east?",options:["Pacific Ocean","Arctic Ocean","Atlantic Ocean","Indian Ocean"],answer:2,fact:"Canada has the longest coastline in the world, touching three oceans."},
{id:5,country:"Canada",continent:"North America",level:2,question:"How many provinces does Canada have?",options:["8","10","12","13"],answer:1,fact:"Canada has 10 provinces and 3 territories, covering 9.98 million square kilometres."},
{id:6,country:"Canada",continent:"North America",level:2,question:"What is the name of Canada's famous waterfall on the border with the USA?",options:["Angel Falls","Victoria Falls","Niagara Falls","Iguazu Falls"],answer:2,fact:"Niagara Falls is actually three waterfalls — Horseshoe, American, and Bridal Veil."},
{id:7,country:"Canada",continent:"North America",level:2,question:"What language is spoken alongside English as an official language in Canada?",options:["Spanish","French","Portuguese","Italian"],answer:1,fact:"The province of Quebec is predominantly French-speaking and has its own distinct culture."},
{id:8,country:"Canada",continent:"North America",level:3,question:"Which Canadian province is the largest by area?",options:["Ontario","British Columbia","Quebec","Nunavut"],answer:3,fact:"Nunavut is Canada's largest and newest territory, created in 1999 for the Inuit people."},
{id:9,country:"Canada",continent:"North America",level:3,question:"What percentage of the world's fresh water is found in Canada?",options:["5%","10%","20%","35%"],answer:2,fact:"Canada holds about 20% of the world's fresh surface water, including the Great Lakes."},
{id:10,country:"Canada",continent:"North America",level:3,question:"What is the name of the indigenous people of northern Canada and Alaska?",options:["Navajo","Cherokee","Inuit","Apache"],answer:2,fact:"The Inuit have lived in the Arctic for thousands of years and are experts at surviving extreme cold."},

{id:11,country:"USA",continent:"North America",level:1,question:"What is the capital of the United States?",options:["New York","Los Angeles","Chicago","Washington D.C."],answer:3,fact:"Washington D.C. stands for District of Columbia and was designed by Pierre Charles L'Enfant in 1791."},
{id:12,country:"USA",continent:"North America",level:1,question:"How many stripes are on the American flag?",options:["13","15","20","50"],answer:0,fact:"The 13 stripes represent the original 13 colonies that declared independence from Britain."},
{id:13,country:"USA",continent:"North America",level:1,question:"Which famous bridge is in San Francisco?",options:["Brooklyn Bridge","Golden Gate Bridge","Tower Bridge","Sydney Harbour Bridge"],answer:1,fact:"The Golden Gate Bridge opened in 1937 and took 4 years to build."},
{id:14,country:"USA",continent:"North America",level:1,question:"What is the largest state in the USA?",options:["Texas","California","Montana","Alaska"],answer:3,fact:"Alaska is more than twice the size of Texas and was purchased from Russia in 1867 for $7.2 million."},
{id:15,country:"USA",continent:"North America",level:2,question:"Which mountain is the highest point in North America?",options:["Mount Whitney","Mount Rainier","Denali","Pikes Peak"],answer:2,fact:"Denali (formerly Mount McKinley) stands 6,190 metres tall in Alaska."},
{id:16,country:"USA",continent:"North America",level:2,question:"What is the name of the famous canyon in Arizona?",options:["Bryce Canyon","Zion Canyon","Grand Canyon","Antelope Canyon"],answer:2,fact:"The Grand Canyon is up to 1.6 km deep and was carved by the Colorado River over millions of years."},
{id:17,country:"USA",continent:"North America",level:2,question:"Which Great Lake is entirely within the United States?",options:["Lake Superior","Lake Michigan","Lake Erie","Lake Ontario"],answer:1,fact:"Lake Michigan is the only Great Lake that lies entirely within the United States."},
{id:18,country:"USA",continent:"North America",level:3,question:"In what year did the United States declare independence?",options:["1776","1789","1800","1812"],answer:0,fact:"The Declaration of Independence was signed on July 4, 1776, now celebrated as Independence Day."},
{id:19,country:"USA",continent:"North America",level:3,question:"What is the name of the world's largest hot desert, partly in the southwestern USA?",options:["Sahara","Gobi","Mojave","Sonoran"],answer:3,fact:"The Sonoran Desert spans the southwestern USA and northwestern Mexico, home to the giant saguaro cactus."},
{id:20,country:"USA",continent:"North America",level:3,question:"Which river forms much of the border between the USA and Mexico?",options:["Colorado River","Mississippi River","Rio Grande","Pecos River"],answer:2,fact:"The Rio Grande flows 3,060 km from Colorado to the Gulf of Mexico."},

{id:21,country:"Mexico",continent:"North America",level:1,question:"What is the capital of Mexico?",options:["Guadalajara","Cancun","Mexico City","Monterrey"],answer:2,fact:"Mexico City is one of the largest cities in the world with over 21 million people in its metro area."},
{id:22,country:"Mexico",continent:"North America",level:1,question:"What is Mexico's national dish?",options:["Paella","Tacos","Sushi","Pizza"],answer:1,fact:"Mexico's cuisine is so unique it was declared a UNESCO Intangible Cultural Heritage in 2010."},
{id:23,country:"Mexico",continent:"North America",level:2,question:"What ancient civilization built the pyramids at Teotihuacan?",options:["Aztec","Maya","Olmec","Toltec"],answer:0,fact:"The Pyramid of the Sun at Teotihuacan is the third-largest pyramid in the world."},
{id:24,country:"Mexico",continent:"North America",level:3,question:"What is the name of the large peninsula in southeast Mexico known for Mayan ruins?",options:["Baja California","Yucatan Peninsula","Gulf Coast","Oaxaca Coast"],answer:1,fact:"The Yucatan Peninsula is home to Chichen Itza, one of the New Seven Wonders of the World."},

// ============================================================
// CENTRAL AMERICA & CARIBBEAN
// ============================================================
{id:25,country:"Cuba",continent:"Central America & Caribbean",level:1,question:"What is the capital of Cuba?",options:["Santiago","Havana","Camaguey","Trinidad"],answer:1,fact:"Havana was founded by the Spanish in 1519 and is one of the oldest cities in the Americas."},
{id:26,country:"Cuba",continent:"Central America & Caribbean",level:2,question:"Cuba is the largest island in which sea?",options:["Mediterranean Sea","Red Sea","Caribbean Sea","Coral Sea"],answer:2,fact:"Cuba covers 109,884 square kilometres making it the largest Caribbean island nation."},
{id:27,country:"Panama",continent:"Central America & Caribbean",level:1,question:"What famous canal connects the Atlantic and Pacific oceans?",options:["Suez Canal","Panama Canal","English Channel","Kiel Canal"],answer:1,fact:"The Panama Canal saves ships up to 15,000 km compared to going around South America."},
{id:28,country:"Panama",continent:"Central America & Caribbean",level:2,question:"How long is the Panama Canal?",options:["48 km","80 km","120 km","200 km"],answer:1,fact:"The Panama Canal was opened in 1914 after 10 years of construction and thousands of workers."},
{id:29,country:"Costa Rica",continent:"Central America & Caribbean",level:2,question:"What percentage of Costa Rica is covered by rainforest and national parks?",options:["10%","15%","25%","50%"],answer:2,fact:"Costa Rica has no permanent army and instead invests heavily in education and the environment."},
{id:30,country:"Costa Rica",continent:"Central America & Caribbean",level:3,question:"What does 'Pura Vida' mean in Costa Rica?",options:["Hello Friend","Pure Life","Beautiful Country","Good Morning"],answer:1,fact:"Pura Vida is Costa Rica's national motto and a way of life expressing happiness and gratitude."},

// ============================================================
// SOUTH AMERICA
// ============================================================
{id:31,country:"Brazil",continent:"South America",level:1,question:"What is the capital of Brazil?",options:["Rio de Janeiro","Sao Paulo","Brasilia","Salvador"],answer:2,fact:"Brasilia was built from scratch as a planned city and became Brazil's capital in 1960."},
{id:32,country:"Brazil",continent:"South America",level:1,question:"What is the name of the largest rainforest in the world, mostly in Brazil?",options:["Congo Rainforest","Amazon Rainforest","Daintree Rainforest","Tongass Rainforest"],answer:1,fact:"The Amazon Rainforest produces 20% of the world's oxygen and is home to 10% of all species on Earth."},
{id:33,country:"Brazil",continent:"South America",level:1,question:"What is Brazil's most famous sport?",options:["Basketball","Cricket","Football (Soccer)","Baseball"],answer:2,fact:"Brazil has won the FIFA World Cup 5 times — more than any other country."},
{id:34,country:"Brazil",continent:"South America",level:2,question:"What is the name of the famous giant statue overlooking Rio de Janeiro?",options:["The David","Statue of Liberty","Christ the Redeemer","The Thinker"],answer:2,fact:"Christ the Redeemer stands 38 metres tall on Corcovado Mountain and was completed in 1931."},
{id:35,country:"Brazil",continent:"South America",level:2,question:"The Amazon River flows into which ocean?",options:["Pacific Ocean","Indian Ocean","Southern Ocean","Atlantic Ocean"],answer:3,fact:"The Amazon River carries 20% of all freshwater that flows into the world's oceans."},
{id:36,country:"Brazil",continent:"South America",level:3,question:"How many species of bird live in the Amazon rainforest?",options:["Over 100","Over 500","Over 1,000","Over 3,000"],answer:2,fact:"The Amazon is home to over 1,300 bird species, including macaws, toucans and harpy eagles."},
{id:37,country:"Argentina",continent:"South America",level:1,question:"What is the capital of Argentina?",options:["Montevideo","Santiago","Lima","Buenos Aires"],answer:3,fact:"Buenos Aires means 'fair winds' in Spanish and is often called the 'Paris of South America.'"},
{id:38,country:"Argentina",continent:"South America",level:2,question:"What famous dance originated in Argentina?",options:["Samba","Tango","Salsa","Merengue"],answer:1,fact:"The tango was born in the working-class neighbourhoods of Buenos Aires in the late 19th century."},
{id:39,country:"Argentina",continent:"South America",level:3,question:"Which mountain range runs along the western edge of South America?",options:["Himalayas","Rocky Mountains","Andes","Alps"],answer:2,fact:"The Andes are the world's longest mountain range at 7,000 km, stretching across 7 countries."},
{id:40,country:"Peru",continent:"South America",level:1,question:"What ancient Incan citadel is found high in the mountains of Peru?",options:["Teotihuacan","Chichen Itza","Machu Picchu","Angkor Wat"],answer:2,fact:"Machu Picchu was built around 1450 AD and sits 2,430 metres above sea level in the Andes."},
{id:41,country:"Peru",continent:"South America",level:2,question:"What is the world's highest navigable lake, on the border of Peru and Bolivia?",options:["Lake Titicaca","Lake Baikal","Lake Victoria","Lake Superior"],answer:0,fact:"Lake Titicaca sits 3,812 metres above sea level and covers 8,372 square kilometres."},
{id:42,country:"Chile",continent:"South America",level:2,question:"What is the driest desert in the world, found in Chile?",options:["Sahara","Gobi","Atacama","Patagonian"],answer:2,fact:"Parts of the Atacama Desert have not received rain in over 400 years."},
{id:43,country:"Ecuador",continent:"South America",level:2,question:"The Galapagos Islands belong to which country?",options:["Peru","Colombia","Ecuador","Brazil"],answer:2,fact:"Charles Darwin visited the Galapagos in 1835, which inspired his theory of evolution."},
{id:44,country:"Colombia",continent:"South America",level:2,question:"Colombia is the only country in South America with coastlines on both the Pacific Ocean and which other sea?",options:["Red Sea","Caribbean Sea","Coral Sea","Tasman Sea"],answer:1,fact:"Colombia's Caribbean coast has beautiful coral reefs and colonial cities like Cartagena."},

// ============================================================
// EUROPE
// ============================================================
{id:45,country:"United Kingdom",continent:"Europe",level:1,question:"What is the capital of the United Kingdom?",options:["Manchester","Edinburgh","Birmingham","London"],answer:3,fact:"London has been a major city for over 2,000 years, founded by the Romans as 'Londinium.'"},
{id:46,country:"United Kingdom",continent:"Europe",level:1,question:"What famous clock tower is in London?",options:["Eiffel Tower","Big Ben","Leaning Tower","Sagrada Familia"],answer:1,fact:"Big Ben is actually the name of the bell inside Elizabeth Tower — it weighs 13.7 tonnes."},
{id:47,country:"United Kingdom",continent:"Europe",level:2,question:"What ancient stone monument is located in Wiltshire, England?",options:["Colosseum","Stonehenge","Parthenon","Pantheon"],answer:1,fact:"Stonehenge was built between 3000 and 1500 BC and its purpose remains a mystery."},
{id:48,country:"United Kingdom",continent:"Europe",level:3,question:"The UK is made up of how many countries?",options:["2","3","4","5"],answer:2,fact:"England, Scotland, Wales, and Northern Ireland make up the United Kingdom."},
{id:49,country:"France",continent:"Europe",level:1,question:"What is the capital of France?",options:["Lyon","Nice","Paris","Marseille"],answer:2,fact:"Paris is called the 'City of Light' and is visited by over 80 million tourists every year."},
{id:50,country:"France",continent:"Europe",level:1,question:"What is the name of the famous tower in Paris?",options:["Empire State Building","Eiffel Tower","Big Ben","Burj Khalifa"],answer:1,fact:"The Eiffel Tower was built in 1889 for the World's Fair and was supposed to be torn down after 20 years."},
{id:51,country:"France",continent:"Europe",level:2,question:"What famous bicycle race takes place in France every July?",options:["Giro d'Italia","Vuelta a España","Tour de France","Paris-Roubaix"],answer:2,fact:"The Tour de France is 21 stages covering about 3,500 km and takes about 3 weeks."},
{id:52,country:"France",continent:"Europe",level:3,question:"What is the name of the famous prehistoric cave paintings in France?",options:["Altamira","Lascaux","Chauvet","Pech Merle"],answer:1,fact:"The Lascaux cave paintings are over 17,000 years old and show bison, horses, and deer."},
{id:53,country:"Germany",continent:"Europe",level:1,question:"What is the capital of Germany?",options:["Munich","Hamburg","Frankfurt","Berlin"],answer:3,fact:"Berlin's Brandenburg Gate was a symbol of the Cold War division of Germany."},
{id:54,country:"Germany",continent:"Europe",level:2,question:"What is Germany's famous annual beer festival called?",options:["Mardi Gras","Oktoberfest","Carnival","Fasching"],answer:1,fact:"Oktoberfest in Munich attracts over 6 million visitors each year and has been held since 1810."},
{id:55,country:"Italy",continent:"Europe",level:1,question:"What is the capital of Italy?",options:["Milan","Venice","Florence","Rome"],answer:3,fact:"Rome is called the 'Eternal City' and has been continuously inhabited for over 2,700 years."},
{id:56,country:"Italy",continent:"Europe",level:1,question:"Which famous leaning building is found in Pisa, Italy?",options:["Leaning Tower of Pisa","Colosseum","Parthenon","Eiffel Tower"],answer:0,fact:"The Leaning Tower of Pisa leans because the soil on one side is too soft — it took 177 years to build."},
{id:57,country:"Italy",continent:"Europe",level:2,question:"What is the name of the ancient Roman amphitheatre in Rome?",options:["Pantheon","Colosseum","Forum","Circus Maximus"],answer:1,fact:"The Colosseum could hold up to 80,000 spectators and hosted gladiator fights for 400 years."},
{id:58,country:"Italy",continent:"Europe",level:3,question:"Which Italian city is built on water with canals instead of roads?",options:["Naples","Florence","Venice","Genoa"],answer:2,fact:"Venice is built on 118 small islands connected by 400 bridges over 177 canals."},
{id:59,country:"Spain",continent:"Europe",level:1,question:"What is the capital of Spain?",options:["Barcelona","Seville","Valencia","Madrid"],answer:3,fact:"Madrid is the highest capital city in the European Union at 667 metres above sea level."},
{id:60,country:"Spain",continent:"Europe",level:2,question:"What famous artistic landmark in Barcelona is still being built after 140 years?",options:["Alhambra","Guggenheim","Sagrada Familia","Park Güell"],answer:2,fact:"Architect Antoni Gaudí began Sagrada Familia in 1882; it is expected to finish around 2026."},
{id:61,country:"Greece",continent:"Europe",level:1,question:"What is the capital of Greece?",options:["Thessaloniki","Crete","Corfu","Athens"],answer:3,fact:"Athens is one of the oldest cities in the world with a recorded history spanning 3,400 years."},
{id:62,country:"Greece",continent:"Europe",level:2,question:"What ancient temple sits on the Acropolis in Athens?",options:["Pantheon","Parthenon","Temple of Zeus","Colosseum"],answer:1,fact:"The Parthenon was built in 447–438 BC and dedicated to Athena, goddess of wisdom."},
{id:63,country:"Netherlands",continent:"Europe",level:1,question:"What are the Netherlands famous for growing in colourful fields?",options:["Sunflowers","Roses","Tulips","Lavender"],answer:2,fact:"The Netherlands exports over 4 billion tulip bulbs every year to countries around the world."},
{id:64,country:"Norway",continent:"Europe",level:2,question:"What are the long, narrow sea inlets carved by glaciers in Norway called?",options:["Bays","Deltas","Fjords","Lagoons"],answer:2,fact:"Norway's Sognefjord is the world's deepest fjord at 1,303 metres and stretches 204 km inland."},
{id:65,country:"Norway",continent:"Europe",level:2,question:"What colourful natural phenomenon can be seen in Norway's night sky?",options:["Midnight Sun","Northern Lights","Lightning Storm","Meteor Shower"],answer:1,fact:"The Northern Lights (Aurora Borealis) are caused by solar particles hitting Earth's magnetic field."},
{id:66,country:"Finland",continent:"Europe",level:2,question:"Finland has how many lakes?",options:["Over 10,000","Over 50,000","Over 100,000","Over 200,000"],answer:2,fact:"Finland has 187,888 lakes making it the country with the most lakes per area in the world."},
{id:67,country:"Iceland",continent:"Europe",level:2,question:"Iceland sits on the boundary of which two tectonic plates?",options:["Pacific and Eurasian","North American and Eurasian","African and Eurasian","Antarctic and American"],answer:1,fact:"Iceland is geologically young and sits on a hotspot; it gets 2.5 cm wider every year."},
{id:68,country:"Russia",continent:"Europe",level:1,question:"What is the capital of Russia?",options:["St. Petersburg","Siberia","Vladivostok","Moscow"],answer:3,fact:"Moscow's Kremlin is one of the largest medieval fortresses in the world, built in 1482."},
{id:69,country:"Russia",continent:"Europe",level:2,question:"Russia is the world's largest country by area — roughly how large is it?",options:["Same as Canada","Twice the size of Canada","Three times USA","Largest in Europe only"],answer:0,fact:"Russia covers 17.1 million square kilometres — about the same as Canada and the USA combined."},
{id:70,country:"Russia",continent:"Europe",level:3,question:"What is the name of the world's deepest lake, located in Siberia, Russia?",options:["Lake Superior","Lake Baikal","Lake Tanganyika","Caspian Sea"],answer:1,fact:"Lake Baikal is 1,642 metres deep and holds 20% of the world's unfrozen fresh surface water."},
{id:71,country:"Turkey",continent:"Europe",level:2,question:"Istanbul in Turkey is the only city in the world that lies on two which two continents?",options:["Africa and Asia","Europe and Africa","Europe and Asia","Asia and America"],answer:2,fact:"The Bosphorus Strait divides Istanbul between Europe and Asia."},
{id:72,country:"Portugal",continent:"Europe",level:2,question:"Portugal is known for its age of exploration. Which explorer, sailing for Portugal, was the first to reach India by sea?",options:["Christopher Columbus","Ferdinand Magellan","Vasco da Gama","Bartolomeu Dias"],answer:2,fact:"Vasco da Gama reached India in 1498, opening a sea trade route between Europe and Asia."},

// ============================================================
// AFRICA
// ============================================================
{id:73,country:"Egypt",continent:"Africa",level:1,question:"What ancient monument is found near Cairo, Egypt?",options:["Colosseum","Stonehenge","Great Pyramid of Giza","Machu Picchu"],answer:2,fact:"The Great Pyramid of Giza was built around 2560 BC and was the world's tallest structure for 3,800 years."},
{id:74,country:"Egypt",continent:"Africa",level:1,question:"What is the name of Egypt's longest river?",options:["Amazon River","Congo River","Nile River","Niger River"],answer:2,fact:"The Nile is 6,650 km long and is considered the world's longest river."},
{id:75,country:"Egypt",continent:"Africa",level:2,question:"What ancient script did Egyptians use to write in pictures?",options:["Cuneiform","Hieroglyphics","Sanskrit","Runes"],answer:1,fact:"The Rosetta Stone, discovered in 1799, was the key to understanding Egyptian hieroglyphics."},
{id:76,country:"Morocco",continent:"Africa",level:2,question:"What mountain range runs through Morocco?",options:["Alps","Andes","Atlas Mountains","Drakensberg"],answer:2,fact:"The Atlas Mountains span Morocco, Algeria, and Tunisia and contain North Africa's highest peak, Toubkal."},
{id:77,country:"Morocco",continent:"Africa",level:2,question:"Morocco borders what large desert on its southern side?",options:["Kalahari","Atacama","Arabian","Sahara"],answer:3,fact:"The Sahara Desert is the largest hot desert in the world, covering 9.2 million square kilometres."},
{id:78,country:"Nigeria",continent:"Africa",level:2,question:"What is the most populous country in Africa?",options:["Egypt","Ethiopia","Nigeria","South Africa"],answer:2,fact:"Nigeria has over 220 million people and is the 7th most populous country in the world."},
{id:79,country:"Kenya",continent:"Africa",level:1,question:"What is the capital of Kenya?",options:["Lagos","Nairobi","Mombasa","Kampala"],answer:1,fact:"Nairobi is home to the only national park in the world located within a capital city."},
{id:80,country:"Kenya",continent:"Africa",level:2,question:"What is the name of the great animal migration that crosses Kenya and Tanzania every year?",options:["The Monarch Migration","The Great Migration","The Arctic Migration","The Salmon Run"],answer:1,fact:"Over 1.5 million wildebeest and zebras travel 1,800 km each year in search of fresh grass."},
{id:81,country:"Kenya",continent:"Africa",level:3,question:"Mount Kenya is Africa's second highest peak. Which is the highest?",options:["Mount Kilimanjaro","Table Mountain","Ras Dashen","Mount Elgon"],answer:0,fact:"Mount Kilimanjaro in Tanzania stands 5,895 metres and is Africa's highest mountain."},
{id:82,country:"Tanzania",continent:"Africa",level:1,question:"The largest elephant in the world lives on land. Where in Africa do most African elephants live?",options:["North Africa","East and Southern Africa","West Africa","Central Africa"],answer:1,fact:"African elephants can weigh up to 6,000 kg and are the world's largest land animals."},
{id:83,country:"Tanzania",continent:"Africa",level:2,question:"What is the name of Africa's largest lake, located between Tanzania, Uganda and Kenya?",options:["Lake Malawi","Lake Tanganyika","Lake Chad","Lake Victoria"],answer:3,fact:"Lake Victoria is 68,870 square kilometres and the world's largest tropical lake."},
{id:84,country:"South Africa",continent:"Africa",level:1,question:"How many capitals does South Africa have?",options:["1","2","3","4"],answer:2,fact:"South Africa has three capitals: Pretoria (executive), Cape Town (legislative), and Bloemfontein (judicial)."},
{id:85,country:"South Africa",continent:"Africa",level:2,question:"What famous national park in South Africa is home to the 'Big Five' animals?",options:["Serengeti","Kruger","Etosha","Okavango"],answer:1,fact:"The Big Five are lion, leopard, rhinoceros, elephant, and Cape buffalo."},
{id:86,country:"South Africa",continent:"Africa",level:3,question:"Where do African penguins live near Cape Town?",options:["Robben Island","Boulders Beach","Cape of Good Hope","Table Mountain"],answer:1,fact:"African penguins were nearly hunted to extinction but are now protected at Boulders Beach."},
{id:87,country:"Ethiopia",continent:"Africa",level:2,question:"Ethiopia is the birthplace of what popular drink consumed worldwide?",options:["Tea","Coca-Cola","Coffee","Hot Chocolate"],answer:2,fact:"Legend says a goat herder named Kaldi discovered coffee when his goats ate the berries and became energetic."},
{id:88,country:"Madagascar",continent:"Africa",level:2,question:"What percentage of Madagascar's animals are found nowhere else on Earth?",options:["25%","50%","75%","90%"],answer:3,fact:"Madagascar split from Africa 165 million years ago, allowing unique evolution — 90% of wildlife is endemic."},
{id:89,country:"Madagascar",continent:"Africa",level:3,question:"What unique primate is found only in Madagascar?",options:["Chimpanzee","Gorilla","Lemur","Baboon"],answer:2,fact:"There are over 100 species of lemur in Madagascar, including the ring-tailed lemur."},
{id:90,country:"Ghana",continent:"Africa",level:2,question:"Ghana was the first sub-Saharan African country to gain independence. In which year?",options:["1945","1957","1963","1970"],answer:1,fact:"Ghana gained independence from Britain on March 6, 1957, under President Kwame Nkrumah."},

// ============================================================
// MIDDLE EAST
// ============================================================
{id:91,country:"Saudi Arabia",continent:"Middle East",level:1,question:"What valuable resource is Saudi Arabia most famous for producing?",options:["Gold","Diamonds","Oil","Iron"],answer:2,fact:"Saudi Arabia has about 17% of the world's proven oil reserves."},
{id:92,country:"Saudi Arabia",continent:"Middle East",level:2,question:"What is the tallest building in the world, located near Saudi Arabia in Dubai?",options:["Burj Khalifa","Shanghai Tower","Empire State Building","Abraj Al-Bait"],answer:0,fact:"The Burj Khalifa in Dubai stands 828 metres tall with 163 floors."},
{id:93,country:"Saudi Arabia",continent:"Middle East",level:2,question:"What major desert covers most of the Arabian Peninsula?",options:["Sahara","Rub'al Khali","Gobi","Kalahari"],answer:1,fact:"The Rub'al Khali or 'Empty Quarter' is the world's largest continuous sand desert."},
{id:94,country:"Jordan",continent:"Middle East",level:2,question:"What ancient city carved into rose-red rock is Jordan's most famous attraction?",options:["Petra","Palmyra","Jerash","Aqaba"],answer:0,fact:"Petra was carved by the Nabataean people over 2,000 years ago and is called the 'Rose City.'"},
{id:95,country:"Israel",continent:"Middle East",level:2,question:"The Dead Sea borders Israel and Jordan. Why is it called 'dead'?",options:["It has no waves","No fish or plants can survive there","It is underground","It smells bad"],answer:1,fact:"The Dead Sea is 10 times saltier than the ocean — the extreme salt prevents almost all life."},
{id:96,country:"UAE",continent:"Middle East",level:2,question:"In which country is the city of Dubai located?",options:["Saudi Arabia","Qatar","UAE","Bahrain"],answer:2,fact:"The UAE (United Arab Emirates) is a federation of 7 emirates, with Dubai and Abu Dhabi being the largest."},

// ============================================================
// SOUTH ASIA
// ============================================================
{id:97,country:"India",continent:"South Asia",level:1,question:"What is the capital of India?",options:["Mumbai","Kolkata","Chennai","New Delhi"],answer:3,fact:"New Delhi was built as the capital of British India and became the capital of independent India in 1947."},
{id:98,country:"India",continent:"South Asia",level:1,question:"What is the name of the famous white marble monument in Agra, India?",options:["Colosseum","Angkor Wat","Taj Mahal","Parthenon"],answer:2,fact:"The Taj Mahal was built by Emperor Shah Jahan in memory of his wife and took 22 years to complete."},
{id:99,country:"India",continent:"South Asia",level:1,question:"What is the sacred river in India where millions of Hindus come to bathe?",options:["Amazon","Yangtze","Nile","Ganges"],answer:3,fact:"The Ganges River is 2,525 km long and is considered sacred by over 1 billion Hindu people."},
{id:100,country:"India",continent:"South Asia",level:2,question:"India is home to what percentage of the world's tigers?",options:["20%","40%","70%","90%"],answer:2,fact:"India has over 3,000 wild Bengal tigers, about 70% of the world's total tiger population."},
{id:101,country:"India",continent:"South Asia",level:2,question:"What is the name of the world's highest mountain range, found in India and neighbouring countries?",options:["Andes","Alps","Rocky Mountains","Himalayas"],answer:3,fact:"The Himalayas contain 10 of the world's 14 peaks above 8,000 metres, including Mount Everest."},
{id:102,country:"India",continent:"South Asia",level:3,question:"What is India's national animal?",options:["Asian Elephant","Snow Leopard","Bengal Tiger","Indian Cobra"],answer:2,fact:"The Bengal Tiger was chosen as India's national animal in 1973 when Project Tiger was launched to protect it."},
{id:103,country:"Nepal",continent:"South Asia",level:1,question:"What is the world's highest mountain, located in Nepal?",options:["K2","Kangchenjunga","Mount Everest","Lhotse"],answer:2,fact:"Mount Everest stands 8,849 metres above sea level and was first climbed by Hillary and Tenzing in 1953."},
{id:104,country:"Nepal",continent:"South Asia",level:2,question:"What is the capital of Nepal?",options:["Pokhara","Bhaktapur","Kathmandu","Lalitpur"],answer:2,fact:"Kathmandu Valley has seven UNESCO World Heritage Sites within a small area."},
{id:105,country:"Sri Lanka",continent:"South Asia",level:2,question:"Sri Lanka is the world's largest producer of which spice?",options:["Pepper","Turmeric","Cinnamon","Ginger"],answer:2,fact:"Sri Lanka (formerly Ceylon) produces about 80-90% of the world's true cinnamon."},

// ============================================================
// EAST ASIA
// ============================================================
{id:106,country:"China",continent:"East Asia",level:1,question:"What is the capital of China?",options:["Shanghai","Guangzhou","Chengdu","Beijing"],answer:3,fact:"Beijing has been China's capital for over 700 years and means 'Northern Capital' in Chinese."},
{id:107,country:"China",continent:"East Asia",level:1,question:"What is the name of the famous wall that stretches across northern China?",options:["Hadrian's Wall","The Great Wall of China","Aurelian Walls","Servian Wall"],answer:1,fact:"The Great Wall of China stretches over 21,000 km and took over 1,000 years to build."},
{id:108,country:"China",continent:"East Asia",level:2,question:"What giant black-and-white bear is found only in China?",options:["Polar Bear","Grizzly Bear","Giant Panda","Spectacled Bear"],answer:2,fact:"Only about 1,800 giant pandas exist in the wild, living in bamboo forests in central China."},
{id:109,country:"China",continent:"East Asia",level:2,question:"The Yangtze River is the longest river in Asia. Where does it flow from?",options:["Himalayas to Yellow Sea","Tibetan Plateau to East China Sea","Mongolia to South China Sea","Gobi Desert to Pacific"],answer:1,fact:"The Yangtze River stretches 6,380 km and is home to the world's largest hydroelectric dam — Three Gorges."},
{id:110,country:"China",continent:"East Asia",level:3,question:"China is the world's most populous country with approximately how many people?",options:["800 million","1.1 billion","1.4 billion","2 billion"],answer:2,fact:"China has about 1.4 billion people, though India has recently surpassed it as the most populous country."},
{id:111,country:"Japan",continent:"East Asia",level:1,question:"What is the capital of Japan?",options:["Osaka","Kyoto","Hiroshima","Tokyo"],answer:3,fact:"Tokyo is the world's most populous city metropolitan area with over 37 million people."},
{id:112,country:"Japan",continent:"East Asia",level:1,question:"What is Japan's famous snow-capped volcano called?",options:["Mount Fuji","Mount Etna","Mount Vesuvius","Kilauea"],answer:0,fact:"Mount Fuji is 3,776 metres tall and is Japan's highest mountain, visible from Tokyo on clear days."},
{id:113,country:"Japan",continent:"East Asia",level:2,question:"Japan is made up of approximately how many islands?",options:["Over 100","Over 1,000","Over 6,800","Over 20,000"],answer:2,fact:"Japan has 6,852 islands, but 97% of the population lives on just 4 main islands."},
{id:114,country:"Japan",continent:"East Asia",level:2,question:"What traditional Japanese art involves folding paper into shapes?",options:["Ikebana","Bonsai","Origami","Manga"],answer:2,fact:"Origami comes from the Japanese words 'oru' (to fold) and 'kami' (paper)."},
{id:115,country:"Japan",continent:"East Asia",level:3,question:"What is the name of Japan's famous bullet train?",options:["Maglev","Shinkansen","TGV","Eurostar"],answer:1,fact:"The Shinkansen launched in 1964 and can travel at speeds of up to 320 km/h."},
{id:116,country:"South Korea",continent:"East Asia",level:2,question:"What is the capital of South Korea?",options:["Busan","Incheon","Daegu","Seoul"],answer:3,fact:"Seoul is one of the world's most densely populated cities with over 25 million people in its metro area."},
{id:117,country:"Mongolia",continent:"East Asia",level:2,question:"What is the traditional dwelling of nomadic people in Mongolia called?",options:["Tepee","Igloo","Yurt","Pagoda"],answer:2,fact:"Mongolian yurts (called gers) can be assembled or dismantled in under an hour."},
{id:118,country:"Mongolia",continent:"East Asia",level:3,question:"What great empire was founded by Genghis Khan in Mongolia?",options:["Roman Empire","Ottoman Empire","Mongol Empire","British Empire"],answer:2,fact:"At its peak, the Mongol Empire was the largest contiguous land empire in history, covering 24 million km²."},

// ============================================================
// SOUTHEAST ASIA
// ============================================================
{id:119,country:"Thailand",continent:"Southeast Asia",level:1,question:"What is the capital of Thailand?",options:["Chiang Mai","Pattaya","Bangkok","Phuket"],answer:2,fact:"Bangkok's full ceremonial name is one of the longest place names in the world with 169 characters."},
{id:120,country:"Thailand",continent:"Southeast Asia",level:2,question:"What is Thailand's national animal?",options:["Tiger","Elephant","Crocodile","Komodo Dragon"],answer:1,fact:"Thailand's elephants are sacred; white elephants are especially revered and associated with royalty."},
{id:121,country:"Vietnam",continent:"Southeast Asia",level:2,question:"What is the capital of Vietnam?",options:["Ho Chi Minh City","Da Nang","Hue","Hanoi"],answer:3,fact:"Hanoi has been the capital of Vietnam since 1010 AD and means 'city inside the rivers' in Vietnamese."},
{id:122,country:"Philippines",continent:"Southeast Asia",level:2,question:"The Philippines is an archipelago of how many islands?",options:["Over 1,000","Over 3,000","Over 7,600","Over 15,000"],answer:2,fact:"The Philippines has 7,641 islands and is home to the world's second largest coral triangle."},
{id:123,country:"Indonesia",continent:"Southeast Asia",level:1,question:"Indonesia is the world's largest archipelago nation. Roughly how many islands does it have?",options:["Over 1,000","Over 5,000","Over 17,000","Over 30,000"],answer:2,fact:"Indonesia's 17,000 islands span 5,150 km, wider than the United States from coast to coast."},
{id:124,country:"Indonesia",continent:"Southeast Asia",level:2,question:"What huge lizard found only in Indonesia can grow up to 3 metres long?",options:["Monitor Lizard","Iguana","Komodo Dragon","Gila Monster"],answer:2,fact:"Komodo dragons have venomous saliva and can smell prey from 9.5 km away."},
{id:125,country:"Indonesia",continent:"Southeast Asia",level:3,question:"What is the name of the famous temple complex in Bali, Indonesia?",options:["Borobudur","Prambanan","Tanah Lot","Besakih"],answer:0,fact:"Borobudur is the world's largest Buddhist temple, built in the 9th century with 2 million stone blocks."},

// ============================================================
// OCEANIA
// ============================================================
{id:126,country:"Australia",continent:"Oceania",level:1,question:"What is the capital of Australia?",options:["Sydney","Melbourne","Brisbane","Canberra"],answer:3,fact:"Canberra was built as a compromise capital because Sydney and Melbourne both wanted to be the capital."},
{id:127,country:"Australia",continent:"Oceania",level:1,question:"What is Australia's famous large red rock called?",options:["Ayers Peak","Devils Tower","Uluru","Red Rock Canyon"],answer:2,fact:"Uluru (also called Ayers Rock) is sacred to the Anangu Aboriginal people and is 348 metres tall."},
{id:128,country:"Australia",continent:"Oceania",level:1,question:"What is the name of Australia's famous jumping marsupial?",options:["Koala","Wombat","Kangaroo","Wallaby"],answer:2,fact:"Kangaroos can jump 9 metres in a single bound and travel at 70 km/h."},
{id:129,country:"Australia",continent:"Oceania",level:2,question:"What is the world's largest coral reef system, off Australia's northeast coast?",options:["Mesoamerican Reef","Belize Barrier Reef","Andros Barrier Reef","Great Barrier Reef"],answer:3,fact:"The Great Barrier Reef is over 2,300 km long and is the only living structure visible from space."},
{id:130,country:"Australia",continent:"Oceania",level:2,question:"What egg-laying mammal is unique to Australia and New Guinea?",options:["Platypus","Echidna","Both platypus and echidna","Tasmanian Devil"],answer:2,fact:"The platypus and echidna are the world's only monotremes — egg-laying mammals."},
{id:131,country:"Australia",continent:"Oceania",level:3,question:"Australia's Aboriginal people have lived on the continent for how long?",options:["10,000 years","30,000 years","50,000 years","Over 65,000 years"],answer:3,fact:"Aboriginal Australians have the world's oldest continuous culture, with evidence of habitation over 65,000 years ago."},
{id:132,country:"New Zealand",continent:"Oceania",level:1,question:"What is the capital of New Zealand?",options:["Auckland","Christchurch","Dunedin","Wellington"],answer:3,fact:"Wellington is the southernmost capital city in the world."},
{id:133,country:"New Zealand",continent:"Oceania",level:2,question:"What is the name of the flightless bird that is New Zealand's national symbol?",options:["Penguin","Emu","Kiwi","Cassowary"],answer:2,fact:"The kiwi is nocturnal, has no wings, and lays an egg that is 20% of the mother's body weight."},
{id:134,country:"New Zealand",continent:"Oceania",level:3,question:"New Zealand was one of the last places on Earth to be settled by humans. Which people first arrived?",options:["British settlers","Dutch explorers","Maori people","Aboriginal Australians"],answer:2,fact:"The Maori arrived from Polynesia between 1250 and 1300 AD, making New Zealand one of the last habitable places colonised."},

// ============================================================
// ARCTIC / GREENLAND
// ============================================================
{id:135,country:"Greenland",continent:"Arctic",level:1,question:"Greenland is the world's largest island. Which country does it belong to?",options:["Norway","Canada","USA","Denmark"],answer:3,fact:"Despite being geographically closer to Canada, Greenland has been a Danish territory since 1814."},
{id:136,country:"Greenland",continent:"Arctic",level:2,question:"What covers about 80% of Greenland's surface?",options:["Forest","Desert","Ice sheet","Tundra"],answer:2,fact:"The Greenland Ice Sheet contains 7 metres worth of potential sea level rise if it melted completely."},
{id:137,country:"Greenland",continent:"Arctic",level:3,question:"If Greenland's ice sheet melted, by how much would global sea levels rise?",options:["1 metre","3 metres","7 metres","20 metres"],answer:2,fact:"Scientists monitor Greenland's ice closely as it is losing about 280 billion tonnes of ice per year."},

// ============================================================
// EXTRA BONUS QUESTIONS
// ============================================================
{id:138,country:"Antarctica",continent:"Antarctica",level:1,question:"Which continent is the coldest on Earth?",options:["Arctic","Asia","Antarctica","Greenland"],answer:2,fact:"The lowest temperature ever recorded on Earth was -89.2°C in Antarctica in 1983."},
{id:139,country:"Antarctica",continent:"Antarctica",level:2,question:"How many countries have claimed territory in Antarctica?",options:["None — it belongs to everyone","3","7","12"],answer:2,fact:"7 countries claim Antarctic territory but the Antarctic Treaty of 1959 suspends these claims for peaceful cooperation."},
{id:140,country:"Antarctica",continent:"Antarctica",level:3,question:"What is the thickness of the ice sheet in some parts of Antarctica?",options:["500 metres","1 km","2.3 km","5 km"],answer:2,fact:"The ice sheet can be up to 4.8 km thick in some places and contains 70% of Earth's fresh water."},
{id:141,country:"Bolivia",continent:"South America",level:2,question:"Bolivia has the world's largest salt flat. What is it called?",options:["Atacama Salt Flat","Bonneville Salt Flats","Salar de Uyuni","Dead Sea"],answer:2,fact:"Salar de Uyuni covers 10,582 square km and is so flat it is used to calibrate satellites."},
{id:142,country:"Venezuela",continent:"South America",level:2,question:"What is the name of the world's highest waterfall, found in Venezuela?",options:["Niagara Falls","Iguazu Falls","Victoria Falls","Angel Falls"],answer:3,fact:"Angel Falls drops 979 metres — so high that the water turns to mist before reaching the bottom."},
{id:143,country:"Colombia",continent:"South America",level:3,question:"Colombia is the world's top producer of which precious gemstone?",options:["Diamonds","Rubies","Emeralds","Sapphires"],answer:2,fact:"Colombia produces over 50% of the world's emeralds, prized for their deep green colour."},
{id:144,country:"Iceland",continent:"Europe",level:3,question:"Iceland has no trees. What covers much of the island instead?",options:["Grassland","Lava fields and moss","Ice and snow","Desert"],answer:1,fact:"Iceland was once forested but Norse settlers cleared the trees; today volcanic lava fields and moss cover much of the land."},
{id:145,country:"Finland",continent:"Europe",level:3,question:"Finland is the home of which legendary winter gift-giver, whose workshop is in Rovaniemi?",options:["Father Christmas","Sinterklaas","Saint Nicholas","All of these"],answer:3,fact:"Rovaniemi in Finnish Lapland is the official home of Santa Claus and receives half a million visitors each Christmas."},

]; // End QUESTION_DB

// Utility: shuffle array in place
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Build a lookup by (country, level) for fast access
function buildQuestionMap() {
  const map = {};
  for (const q of QUESTION_DB) {
    const key = q.country + '|' + q.level;
    if (!map[key]) map[key] = [];
    map[key].push(q);
  }
  return map;
}

// Get shuffled questions for a country at a given level, falling back to continent then any level
function getQuestionsForTile(countryName, continent, level, usedIds) {
  const allForCountry = QUESTION_DB.filter(q => q.country === countryName && !usedIds.has(q.id));
  const byLevel = allForCountry.filter(q => q.level === level);
  const pool = byLevel.length > 0 ? byLevel : allForCountry;
  if (pool.length > 0) {
    return shuffleArray([...pool]);
  }
  // Fallback: continent
  const byContinent = QUESTION_DB.filter(q => q.continent === continent && !usedIds.has(q.id) && q.level === level);
  if (byContinent.length > 0) return shuffleArray([...byContinent]);
  const fallback = QUESTION_DB.filter(q => q.continent === continent && !usedIds.has(q.id));
  return shuffleArray([...fallback]);
}
