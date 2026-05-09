// Real animal images for memory game
// Using Wikipedia Commons and reliable public-domain URLs
const ANIMAL_CARDS = [
  { name: "Lion",        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/320px-Lion_waiting_in_Namibia.jpg" },
  { name: "Elephant",    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/320px-African_Bush_Elephant.jpg" },
  { name: "Giraffe",     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Giraffe_Mikumi_National_Park.jpg/240px-Giraffe_Mikumi_National_Park.jpg" },
  { name: "Zebra",       img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Plains_Zebra_Equus_quagga.jpg/320px-Plains_Zebra_Equus_quagga.jpg" },
  { name: "Polar Bear",  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Polar_Bear_-_Alaska_%28cropped%29.jpg/240px-Polar_Bear_-_Alaska_%28cropped%29.jpg" },
  { name: "Giant Panda", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/320px-Grosser_Panda.JPG" },
  { name: "Kangaroo",    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Kangaroo_and_joey03.jpg/240px-Kangaroo_and_joey03.jpg" },
  { name: "Penguin",     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/South_Shetland-2016-Deception_Island%E2%80%93Chinstrap_penguin_%28Pygoscelis_antarctica%29_04.jpg/240px-South_Shetland-2016-Deception_Island%E2%80%93Chinstrap_penguin_%28Pygoscelis_antarctica%29_04.jpg" },
  { name: "Tiger",       img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Walking_tiger_female.jpg/320px-Walking_tiger_female.jpg" },
  { name: "Koala",       img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/240px-Koala_climbing_tree.jpg" },
  { name: "Toucan",      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Toucan_2_-_Juancho1973.jpg/240px-Toucan_2_-_Juancho1973.jpg" },
  { name: "Red Fox",     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Vulpes_vulpes_ssp_fulvus.jpg/320px-Vulpes_vulpes_ssp_fulvus.jpg" },
  { name: "Flamingo",    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Greater_Flamingo_Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg/240px-Greater_Flamingo_Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" },
  { name: "Gorilla",     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Western_Lowland_Gorilla_at_Bristol_Zoo.jpg/240px-Western_Lowland_Gorilla_at_Bristol_Zoo.jpg" },
  { name: "Dolphin",     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tursiops_truncatus_01.jpg/320px-Tursiops_truncatus_01.jpg" },
  { name: "Snow Leopard",img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/SnowLeopard.jpg/320px-SnowLeopard.jpg" },
  { name: "Chameleon",   img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Laelapidae_-_Furcifer_pardalis.jpg/240px-Laelapidae_-_Furcifer_pardalis.jpg" },
  { name: "Cheetah",     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cheetah_%28Acinonyx_jubatus%29_in_the_Serengeti.jpg/320px-Cheetah_%28Acinonyx_jubatus%29_in_the_Serengeti.jpg" },
];

function getRandomAnimalSet(count) {
  const shuffled = shuffleArray([...ANIMAL_CARDS]);
  return shuffled.slice(0, count);
}
