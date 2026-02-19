import { useState } from 'react';

interface Recipe {
  name: string;
  ingredients: string[];
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  instructions: string;
  tags: string[];
  hours: string[];  // horários sugeridos
  difficulty: 'fácil' | 'médio';
}

const RECIPES: Recipe[] = [
  // ☀️ CAFÉ DA MANHÃ
  {
    name: 'Bowl de Frutas com Sementes',
    ingredients: ['banana', 'mamao', 'aveia', 'chia', 'linhaca', 'castanha_para'],
    time: '5 min', calories: 280, protein: 9, carbs: 48, fat: 8,
    instructions: `🛒 O que você vai precisar: 1 banana, ½ mamão, 4 col. sopa aveia, 1 col. chá chia, 1 col. chá linhaça, 3 castanhas do Pará, canela e mel a gosto.

📋 Passo a passo:
1. Pegue uma tigela funda (pode ser de vidro ou cerâmica)
2. Descasque a banana e corte em rodelas — espessura de 1 dedo
3. Corte o mamão ao meio, tire as sementes com uma colher e corte em cubos médios
4. Coloque as frutas na tigela
5. Por cima, adicione a aveia em flocos (não precisa cozinhar!)
6. Polvilhe a chia e a linhaça por cima
7. Pique as castanhas do Pará grosseiramente com uma faca e adicione
8. Finalize com uma pitada de canela e um fio de mel
9. Sirva imediatamente — quanto mais fresco, melhor!

💡 Dica: Use frutas bem maduras — ficam mais doces naturalmente e não precisa de açúcar!`,
    tags: ['sem glúten', 'energético', 'fibras'], hours: ['07:00', '08:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Ovo Mexido com Queijo',
    ingredients: ['ovo', 'queijo_minas'],
    time: '8 min', calories: 230, protein: 18, carbs: 2, fat: 16,
    instructions: `🛒 O que você vai precisar: 2-3 ovos, 30g queijo minas fatiado, sal, pimenta preta, 1 col. chá manteiga ou azeite.

📋 Passo a passo:
1. Quebre os ovos numa tigela — bata com um garfo até gema e clara ficarem misturadas
2. Tempere com uma pitada de sal e pimenta preta a gosto
3. Aqueça uma frigideira antiaderente em fogo BAIXO (fogo baixo é o segredo!)
4. Adicione a manteiga e espere derreter — não deixe queimar
5. Despeje os ovos batidos na frigideira
6. Com uma espátula, mexa DEVAGAR fazendo movimentos circulares lentos
7. Quando o ovo começar a firmar nas bordas mas ainda estar úmido no centro, adicione o queijo picado
8. Desligue o fogo — o calor residual termina o cozimento
9. Sirva imediatamente na torrada ou pão integral

💡 Segredo: fogo baixo + não deixar secar demais = ovo mexido cremoso e gostoso!`,
    tags: ['proteico', 'rápido', 'poucos carboidratos'], hours: ['07:00', '08:00', '09:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Tapioca com Ovo e Ricota',
    ingredients: ['tapioca', 'ovo', 'ricota'],
    time: '10 min', calories: 320, protein: 22, carbs: 38, fat: 8,
    instructions: `🛒 O que você vai precisar: 3-4 col. sopa goma de tapioca, 1 ovo, 50g ricota, sal, ervas a gosto (salsinha, cebolinha).

📋 Passo a passo:
1. Tempere a ricota: amasse com um garfo, adicione sal, pimenta e salsinha picada
2. Para o ovo mexido: bata 1 ovo com sal e frite numa frigideira pequena mexendo sempre
3. Aqueça outra frigideira antiaderente em fogo médio — não precisa de óleo!
4. Espalhe a goma de tapioca uniformemente cobrindo toda a superfície (use 3-4 colheres bem cheias)
5. Aguarde 1-2 minutos: a tapioca vai mudar de cor (ficar levemente transparente) e firmar
6. Verifique se soltou do fundo — se não grudar quando você balançar a frigideira, está pronta
7. Com uma espátula, coloque o ovo mexido e a ricota temperada na metade da tapioca
8. Dobre a outra metade por cima, como um pastel
9. Deslize para o prato e sirva quente

💡 A goma de tapioca já vem pronta no mercado — não precisa hidratar!`,
    tags: ['sem glúten', 'proteico'], hours: ['07:00', '08:00', '10:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Vitamina Energética',
    ingredients: ['banana', 'abacate', 'aveia', 'chia'],
    time: '5 min', calories: 340, protein: 7, carbs: 45, fat: 14,
    instructions: `🛒 O que você vai precisar: 1 banana, ½ abacate maduro, 3 col. sopa aveia, 1 col. chá chia, 200ml leite ou água de coco, 1 col. chá mel (opcional).

📋 Passo a passo:
1. Descasque a banana — pode usar banana congelada para ficar mais cremosa e gelada!
2. Corte o abacate ao meio, retire o caroço com uma faca e tire a polpa com uma colher
3. Coloque banana e abacate no liquidificador
4. Adicione o leite ou água de coco
5. Adicione a aveia, chia e mel
6. Tampa bem e bata por 30-40 segundos em velocidade alta
7. Prove e ajuste: muito grosso? Adicione mais leite. Pouco doce? Mais mel
8. Sirva imediatamente em copo alto

💡 Dica PRO: Congele bananas maduras em saquinhos — sempre terá à mão pra vitaminas!`,
    tags: ['pré-treino', 'energético'], hours: ['06:30', '07:00', '08:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Panqueca de Banana com Aveia',
    ingredients: ['banana', 'aveia', 'ovo'],
    time: '15 min', calories: 310, protein: 14, carbs: 52, fat: 6,
    instructions: `🛒 O que você vai precisar: 1 banana madura (quanto mais madura melhor!), 2 ovos, 4 col. sopa aveia em flocos, canela a gosto.

📋 Passo a passo:
1. Descasque a banana e amasse com um garfo numa tigela até virar um purê liso
2. Quebre os ovos na mesma tigela e misture bem com o garfo
3. Adicione a aveia e a canela — misture até formar uma massa homogênea
4. A massa deve ficar um pouco mais grossa que massa de panqueca normal
5. Aqueça uma frigideira antiaderente em fogo MÉDIO-BAIXO — não precisa de óleo!
6. Com uma colher grande, despeje uma porção da massa (equivalente a 2 col. de sopa)
7. Espalhe levemente com as costas da colher formando um disco
8. Aguarde 2-3 minutos: quando as bordas firmarem e aparecerem bolhinhas, vire
9. Doure do outro lado por mais 1-2 minutos
10. Repita até acabar a massa — rende 4-6 panqueques

💡 Sirva com mel, frutas frescas ou iogurte grego por cima!`,
    tags: ['sem farinha', 'energético', 'doce'], hours: ['07:00', '08:00', '09:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Iogurte com Granola e Mel',
    ingredients: ['iogurte_grego', 'aveia', 'castanha_para', 'mel'],
    time: '3 min', calories: 290, protein: 14, carbs: 38, fat: 8,
    instructions: `🛒 O que você vai precisar: 150g iogurte grego natural, 2-3 col. sopa aveia ou granola, 2-3 castanhas do Pará, 1 col. chá mel, canela a gosto.

📋 Passo a passo:
1. Abra o iogurte grego e despeje numa tigela ou copo bonito
2. Com as costas da colher, nivele o iogurte
3. Adicione a granola ou aveia por cima (não misture — fica mais bonito e crocante!)
4. Pique as castanhas grosseiramente e espalhe
5. Regue com um fio de mel em zigue-zague
6. Polvilhe canela a gosto
7. Opcional: adicione frutas vermelhas (morango, mirtilo) por cima

💡 Use iogurte grego NATURAL — tem mais proteína e menos açúcar que os com sabor!`,
    tags: ['probiótico', 'rápido'], hours: ['07:00', '08:00', '10:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Overnight Oats',
    ingredients: ['aveia', 'chia', 'banana'],
    time: '5 min (preparo na noite anterior)', calories: 320, protein: 10, carbs: 58, fat: 5,
    instructions: `🛒 O que você vai precisar: 4 col. sopa aveia em flocos, 150ml leite (qualquer tipo), 1 col. chá chia, 1 banana, mel e canela.

📋 Passo a passo (preparo na NOITE ANTERIOR):
1. Pegue um pote com tampa (vidro é ideal, mas pote de plástico também funciona)
2. Coloque a aveia em flocos no fundo
3. Adicione o leite — a aveia deve ficar coberta pelo leite
4. Adicione a chia e uma pitada de canela
5. Misture bem com uma colher
6. Tampa o pote e leve para a geladeira
7. Deixe descansar a noite toda (no mínimo 6 horas)

Na manhã seguinte:
8. Retire da geladeira — a aveia vai estar cremosa e expandida
9. Adicione banana fatiada por cima
10. Castanhas, mel e mais canela para finalizar
11. Pode comer frio mesmo — é a graça do overnight oats!

💡 Prepare 2-3 potes de uma vez para ter café da manhã rápido por vários dias!`,
    tags: ['preparo antecipado', 'fibras'], hours: ['07:00', '08:00'],
    difficulty: 'fácil',
  },

  // 🌿 LANCHE DA MANHÃ
  {
    name: 'Mix de Castanhas',
    ingredients: ['castanha_para', 'amendoa', 'nozes'],
    time: '1 min', calories: 200, protein: 6, carbs: 8, fat: 18,
    instructions: `🛒 O que você vai precisar: 2-3 castanhas do Pará, 5 amêndoas, 3 nozes, 1 col. sopa semente de girassol.

📋 Passo a passo:
1. Separe as castanhas numa tigelinha ou num saquinho pequeno
2. Quantidade certa por porção: 2-3 castanhas do Pará (NÃO exagere — são muito calóricas e ricas em selênio), 5 amêndoas, 3 metades de nozes
3. Adicione a semente de girassol
4. Pronto! Coma devagar, mastigando bem

💡 Atenção: 2-3 castanhas do Pará por dia é o suficiente! Comer muito pode causar excesso de selênio.
💡 Dica: Separe as porções da semana em saquinhos na noite de domingo — praticidade na hora H!`,
    tags: ['rápido', 'poucos carboidratos', 'ômega 3'], hours: ['09:30', '10:00', '10:30'],
    difficulty: 'fácil',
  },
  {
    name: 'Abacate com Limão e Castanhas',
    ingredients: ['abacate', 'castanha_para'],
    time: '3 min', calories: 220, protein: 3, carbs: 10, fat: 19,
    instructions: `🛒 O que você vai precisar: ½ abacate maduro, suco de ½ limão, sal e pimenta a gosto, 3 castanhas do Pará, 1 col. sopa semente de girassol.

📋 Passo a passo:
1. Corte o abacate ao meio no sentido do comprimento, girando a faca em torno do caroço
2. Torça as duas metades em direções opostas para separar
3. Retire o caroço batendo levemente a faca nele e girando
4. Se for comer só metade, não retire a casca da outra metade — dura mais com o caroço
5. Com uma colher, retire a polpa do abacate da casca
6. Coloque numa tigela e esprema o limão por cima
7. Tempere com sal e pimenta preta
8. Amasse levemente com um garfo (não precisa virar purê completo)
9. Pique as castanhas e coloque por cima junto com as sementes

💡 O limão serve dois propósitos: sabor E evita que o abacate escureça!`,
    tags: ['poucos carboidratos', 'gordura boa'], hours: ['09:30', '10:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Suco Verde Detox',
    ingredients: [],
    time: '5 min', calories: 45, protein: 1.5, carbs: 9, fat: 0.3,
    instructions: `🛒 O que você vai precisar: 1 folha de couve, ½ pepino, suco de 1 limão, 1 pedacinho gengibre fresco (~1cm), 200ml água gelada, 1 col. chá chia.

📋 Passo a passo:
1. Lave bem a couve e o pepino em água corrente
2. Retire o talo central da couve (pode ser duro) — só use as folhas verdes
3. Pique a couve grosseiramente em pedaços menores para o liquidificador processar melhor
4. Descasque o pepino (opcional — a casca tem fibras mas pode deixar o sabor mais amargo)
5. Corte o pepino em pedaços
6. Rale ou corte o gengibre — ele é picante, então comece com pouco!
7. No liquidificador: coloque a água, couve, pepino e gengibre
8. Bata por 30 segundos em velocidade alta
9. Esprema o limão por cima e bata mais 10 segundos
10. Adicione a chia, mexa com colher e sirva logo (a chia incha rapidinho)
11. NÃO coe — as fibras são o mais importante!

💡 Se ficar muito amargo: adicione 1 col. chá mel ou mais limão`,
    tags: ['detox', 'anti-inflamatório'], hours: ['07:00', '09:00', '10:00'],
    difficulty: 'fácil',
  },

  // 🌞 ALMOÇO
  {
    name: 'Frango Grelhado com Legumes',
    ingredients: ['frango', 'abobrinha', 'cenoura', 'brocolis'],
    time: '25 min', calories: 310, protein: 38, carbs: 18, fat: 6,
    instructions: `🛒 O que você vai precisar: 150g peito de frango, 1 abobrinha, 1 cenoura, brócolis (1 xíc.), azeite, alho, sal, ervas a gosto.

📋 Passo a passo:
PREPARANDO O FRANGO:
1. Retire o frango da embalagem e seque com papel toalha — isso ajuda a dourar melhor
2. Tempere com: sal, pimenta, alho picado e ervas (pode usar tempero pronto sem glutamato)
3. Deixe descansar 5 minutos para absorver o tempero
4. Aqueça uma frigideira ou chapa em fogo MÉDIO-ALTO — deve estar bem quente antes do frango entrar
5. Coloque 1 col. chá azeite e espalhe
6. Coloque o frango — ouvirá um chiado, é normal! Não mexa nos primeiros 4-5 minutos
7. Vire quando estiver dourado — mais 4-5 minutos do outro lado
8. Corte no meio para verificar: se estiver branco por dentro (sem rosa), está pronto

PREPARANDO OS LEGUMES:
9. Enquanto o frango descansa, aqueça outra frigideira com azeite
10. Refogue o alho por 30 segundos
11. Adicione cenoura em rodelas (1 minuto), depois abobrinha e brócolis
12. Tempere com sal e tampe por 3-4 minutos para cozinhar no vapor

💡 O frango descansado por 2-3 minutos após grelhar fica muito mais suculento!`,
    tags: ['proteico', 'poucos carboidratos'], hours: ['12:00', '13:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Bowl Proteico com Arroz',
    ingredients: ['frango', 'arroz_integral', 'feijao', 'abobrinha'],
    time: '30 min', calories: 490, protein: 42, carbs: 52, fat: 7,
    instructions: `🛒 O que você vai precisar: 150g frango, ½ xíc. arroz integral cru, 4 col. sopa feijão cozido, 1 abobrinha, azeite, limão, sal.

📋 Passo a passo:
ARROZ INTEGRAL:
1. Lave o arroz em água corrente até a água sair limpa
2. Para 1 xíc. de arroz: coloque 2 xíc. de água numa panela
3. Deixe ferver, adicione sal e o arroz
4. Tampe, reduza o fogo para o mínimo e cozinhe 30-35 minutos
5. Não abra a tampa durante o cozimento!

FRANGO DESFIADO:
6. Cozinhe o frango em água temperada (sal, alho, louro) por 20 minutos
7. Retire, deixe esfriar 5 minutos e desfie com dois garfos

MONTAGEM DO BOWL:
8. Aqueça o feijão com um pouco de azeite, alho e sal
9. Refogue a abobrinha em cubos em fogo médio com azeite
10. Monte: arroz na base, frango desfiado ao lado, feijão, abobrinha
11. Regue com azeite e esprema limão por cima

💡 Arroz integral leva mais tempo mas tem muito mais fibra e nutrientes que o branco!`,
    tags: ['completo', 'pós-treino'], hours: ['12:00', '13:00', '14:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Salada de Atum com Ovos',
    ingredients: ['ovo', 'cenoura'],
    time: '15 min', calories: 280, protein: 32, carbs: 12, fat: 11,
    instructions: `🛒 O que você vai precisar: 1 lata atum ao natural (120g), 2 ovos, 1 cenoura, milho verde, salsinha, azeite, limão, sal.

📋 Passo a passo:
OVOS COZIDOS PERFEITOS:
1. Coloque os ovos numa panela pequena e cubra com água fria
2. Leve ao fogo até ferver
3. Quando ferver, conte: 8 min = gema mole por dentro (cremosa); 10 min = gema dura
4. Retire e coloque imediatamente em água gelada por 5 minutos — descasca muito mais fácil!
5. Descasque e corte ao meio

MONTAGEM:
6. Escorra bem o atum da lata — aperte com um garfo para tirar todo o líquido
7. Rale a cenoura crua no ralo grosso
8. Numa tigela: misture o atum, cenoura ralada, milho escorrido e salsinha picada
9. Tempere com suco de limão, azeite, sal e pimenta
10. Misture bem e coloque os ovos cozidos por cima
11. Sirva frio — pode guardar na geladeira por até 2 dias!

💡 Prefira atum ao NATURAL — o atum em óleo tem muito mais calorias!`,
    tags: ['poucos carboidratos', 'rápido', 'proteico'], hours: ['12:00', '13:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Wrap de Frango com Ricota',
    ingredients: ['frango', 'ricota'],
    time: '15 min', calories: 290, protein: 34, carbs: 22, fat: 8,
    instructions: `🛒 O que você vai precisar: 1 wrap ou tortilla integral, 120g frango grelhado desfiado, 50g ricota, folhas de alface, 1 tomate, limão, ervas, sal.

📋 Passo a passo:
PREPARANDO O FRANGO:
1. Grelhe o frango como ensinado na receita anterior
2. Deixe esfriar 5 minutos e desfie com dois garfos — puxe em direções opostas para desfiar

PREPARANDO A RICOTA:
3. Coloque a ricota numa tigela e amasse com um garfo
4. Tempere com: sal, pimenta preta, suco de ½ limão e salsinha picada
5. Misture bem até ficar cremosa

MONTANDO O WRAP:
6. Coloque o wrap/tortilla numa tábua (não precisa aquecer, mas pode se quiser)
7. Espalhe a ricota temperada por toda a superfície deixando 2cm de borda
8. Coloque as folhas de alface no centro
9. Adicione o frango desfiado por cima
10. Fatias de tomate por último
11. Dobre as bordas laterais para dentro e enrole firmemente começando pelo lado de baixo
12. Corte ao meio na diagonal para servir

💡 Pode preparar antes e guardar na geladeira por até 4 horas!`,
    tags: ['prático', 'proteico'], hours: ['12:00', '13:00', '15:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Peixe Assado com Legumes',
    ingredients: ['abobrinha', 'brocolis', 'batata_doce'],
    time: '35 min', calories: 360, protein: 35, carbs: 28, fat: 8,
    instructions: `🛒 O que você vai precisar: 150g filé de peixe (tilápia, merluza ou atum), 1 batata doce, 1 abobrinha, brócolis, azeite, limão, alho, sal, ervas.

📋 Passo a passo:
PREPARANDO:
1. Pré-aqueça o forno a 200°C por 10 minutos antes de usar
2. Lave o peixe em água corrente e seque com papel toalha
3. Tempere: coloque numa forma refratária, regue com azeite, limão, alho picado, sal e ervas (manjericão, alecrim ou salsinha)
4. Deixe marinar 10 minutos enquanto prepara os legumes

LEGUMES:
5. Descasque a batata doce e corte em cubos de 2cm
6. Corte a abobrinha em rodelas grossas
7. Separe os floretes de brócolis
8. Numa vasilha, misture os legumes com azeite, sal e pimenta

ASSANDO:
9. Coloque os legumes ao redor do peixe na mesma forma (ou use uma forma separada)
10. Asse por 20-25 minutos na grade do meio do forno
11. O peixe está pronto quando a carne desmanche facilmente com um garfo
12. A batata doce deve estar macia quando espetar um garfo

💡 Verifique depois de 20 minutos — cada forno é diferente!`,
    tags: ['ômega 3', 'anti-inflamatório'], hours: ['12:00', '13:00', '19:00'],
    difficulty: 'médio',
  },
  {
    name: 'Sopa de Legumes com Frango',
    ingredients: ['frango', 'cenoura', 'abobrinha', 'brocolis'],
    time: '40 min', calories: 250, protein: 28, carbs: 22, fat: 4,
    instructions: `🛒 O que você vai precisar: 150g frango, 1 cenoura, 1 abobrinha, 1 chuchu (opcional), 1 caldo de galinha caseiro ou tablete, alho, cebola, sal, salsinha.

📋 Passo a passo:
1. Pique o alho e a cebola em pedaços pequenos
2. Numa panela média, aqueça 1 col. sopa azeite em fogo médio
3. Refogue o alho por 30 segundos — fica aromático mas não deixe queimar (fica amargo!)
4. Adicione a cebola e refogue mais 2 minutos até ficar transparente
5. Corte o frango em cubos de 2-3cm e coloque na panela
6. Mexa por 3-4 minutos até o frango ficar branco por fora
7. Cubra com 800ml de água quente
8. Adicione o caldo ou tempero natural (sal, louro, pimenta)
9. Deixe ferver e cozinhe em fogo médio por 15 minutos com a panela tampada
10. Enquanto isso, corte cenoura em rodelas e abobrinha/chuchu em cubos
11. Adicione os legumes na panela e cozinhe mais 10 minutos
12. Prove o sal e ajuste se necessário
13. Finalize com salsinha picada fresca — faz toda a diferença!

💡 Quanto mais tempo cozinhar, mais gostoso fica. Pode fazer em quantidade e guardar 3 dias na geladeira!`,
    tags: ['reconfortante', 'light'], hours: ['12:00', '19:00', '20:00'],
    difficulty: 'médio',
  },

  // 🍎 LANCHE DA TARDE
  {
    name: 'Bowl Proteico Pós-Treino',
    ingredients: ['iogurte_grego', 'banana', 'aveia', 'amendoa'],
    time: '5 min', calories: 350, protein: 22, carbs: 42, fat: 9,
    instructions: `🛒 O que você vai precisar: 150g iogurte grego natural, 1 banana, 3 col. sopa aveia, 10 amêndoas, 1 col. chá mel, canela.

📋 Passo a passo:
1. Este lanche é para comer em até 30 minutos após o treino — tenha os ingredientes prontos!
2. Coloque o iogurte grego numa tigela ou copo largo
3. Fatie a banana em rodelas e coloque por cima
4. Adicione a aveia em flocos (fria, direto do pacote)
5. Pique as amêndoas grosseiramente com uma faca e espalhe
6. Regue com mel
7. Polvilhe canela
8. Coma imediatamente — a proteína do iogurte + carboidrato da banana é a combinação perfeita pós-treino!

💡 Por que este lanche é especial: o iogurte grego tem ~15-18g proteína por potinho — seus músculos agradecem!`,
    tags: ['pós-treino', 'proteico'], hours: ['15:00', '16:00', '17:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Ovo Cozido com Castanhas',
    ingredients: ['ovo', 'castanha_para'],
    time: '10 min', calories: 200, protein: 15, carbs: 3, fat: 14,
    instructions: `🛒 O que você vai precisar: 2 ovos, 2-3 castanhas do Pará, sal, azeite (opcional).

📋 Passo a passo:
MÉTODO INFALÍVEL PARA OVO COZIDO:
1. Coloque os ovos numa panela pequena — eles devem caber sem se sobrepor
2. Cubra completamente com água fria (2-3 dedos acima dos ovos)
3. Leve ao fogo alto até ferver
4. Quando a água ferver, reduza para fogo médio
5. Marque o tempo: 6 min = gema bem mole; 8 min = gema cremosa; 10 min = gema dura
6. Escorra a água quente e coloque imediatamente em água com gelo por 5 minutos
7. Descasque sob água corrente — começa pela ponta menor, onde tem uma câmara de ar

SERVINDO:
8. Corte ao meio e tempere com sal e um fio de azeite
9. Sirva com as castanhas do Pará ao lado

💡 O banho de gelo é ESSENCIAL — facilita descascar e para o cozimento na hora certa!`,
    tags: ['proteico', 'poucos carboidratos', 'rápido'], hours: ['15:00', '16:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Tapioca com Abacate',
    ingredients: ['tapioca', 'abacate'],
    time: '8 min', calories: 310, protein: 3, carbs: 42, fat: 14,
    instructions: `🛒 O que você vai precisar: 3-4 col. sopa goma de tapioca, ½ abacate maduro, suco de ½ limão, sal, semente de girassol.

📋 Passo a passo:
PREPARANDO O RECHEIO:
1. Retire a polpa do abacate com uma colher e coloque na tigela
2. Esprema o limão por cima (realça o sabor e evita escurecer)
3. Tempere com sal e amasse com um garfo — deixe alguns pedaços, não precisa virar purê
4. Adicione semente de girassol e misture

FAZENDO A TAPIOCA:
5. Aqueça uma frigideira antiaderente em fogo médio SEM óleo por 1-2 minutos
6. Coloque as colheres de goma espalhando bem por toda a frigideira
7. Aguarde 1-2 minutos sem mexer — a goma vai firmar e mudar de cor
8. Teste: balance a frigideira — se a tapioca se mover sem grudar, está pronta
9. Retire do fogo e coloque numa tábua
10. Espalhe o abacate temperado em metade da tapioca
11. Dobre a outra metade por cima

💡 Nunca coloque o recheio muito quente — o abacate não gosta de calor!`,
    tags: ['sem glúten', 'gordura boa'], hours: ['15:00', '16:00', '17:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Smoothie Tropical',
    ingredients: ['mamao', 'banana', 'chia'],
    time: '5 min', calories: 180, protein: 3, carbs: 40, fat: 2,
    instructions: `🛒 O que você vai precisar: ½ mamão maduro, 1 banana, 200ml água de coco (ou leite de coco light), 1 col. chá chia, gengibre fresco a gosto.

📋 Passo a passo:
1. Corte o mamão ao meio, retire as sementes com colher e retire a polpa
2. Descasque a banana — banana bem madura fica mais doce!
3. Rale um pedacinho de gengibre (começa com pouco — é forte!)
4. Coloque no liquidificador: mamão, banana, água de coco e gengibre
5. Bata em velocidade alta por 30-40 segundos até ficar liso
6. Adicione a chia e bata mais 5 segundos (só misturar, não bater muito)
7. Sirva imediatamente em copo alto
8. Opcional: gelo por cima para ficar geladinho

💡 Para ficar mais gelado e cremoso: congele a banana em pedaços antes!`,
    tags: ['digestivo', 'tropical'], hours: ['15:00', '16:00'],
    difficulty: 'fácil',
  },

  // 🌙 JANTAR
  {
    name: 'Omelete de Legumes',
    ingredients: ['ovo', 'abobrinha', 'brocolis'],
    time: '12 min', calories: 260, protein: 20, carbs: 10, fat: 16,
    instructions: `🛒 O que você vai precisar: 3 ovos, 1 abobrinha pequena, ½ xíc. brócolis, sal, pimenta, azeite, salsinha.

📋 Passo a passo:
PREPARANDO:
1. Corte a abobrinha em cubos pequenos (1cm)
2. Separe os floretes de brócolis em pedaços pequenos
3. Quebre os ovos numa tigela, adicione sal, pimenta e bata bem com garfo ou fouet
4. Pique salsinha e adicione aos ovos

COZINHANDO:
5. Aqueça uma frigideira média (20-22cm) em fogo médio com 1 col. chá azeite
6. Refogue a abobrinha e brócolis por 3-4 minutos até ficarem al dente (firmes mas cozidos)
7. Tempere os legumes com sal e distribua uniformemente na frigideira
8. Despeje a mistura de ovos por cima dos legumes
9. IMPORTANTE: Reduza o fogo para baixo e tampe a frigideira
10. Aguarde 3-4 minutos sem mexer — o vapor cozinha a parte de cima
11. Está pronto quando as bordas estiverem firmes e o centro ainda levemente tremido
12. Deslize para o prato dobrado ao meio ou sirva aberto

💡 Omelete mal passado (ainda cremoso no centro) é muito mais gostoso!`,
    tags: ['poucos carboidratos', 'leve', 'proteico'], hours: ['19:00', '20:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Frango Desfiado com Batata Doce',
    ingredients: ['frango', 'batata_doce'],
    time: '30 min', calories: 380, protein: 35, carbs: 38, fat: 5,
    instructions: `🛒 O que você vai precisar: 150g frango (peito ou coxa sem pele), 1 batata doce média (150-200g), azeite, alho, sal, ervas, limão.

📋 Passo a passo:
BATATA DOCE COZIDA:
1. Descasque a batata doce com um descascador ou faca
2. Corte em cubos de 3-4cm — pedaços menores cozinham mais rápido
3. Coloque numa panela com água e sal
4. Cozinhe em fogo médio por 15-20 minutos até um garfo entrar facilmente
5. Escorra a água e amasse com garfo enquanto quente — fica cremosa!
6. Adicione um fio de azeite e sal a gosto

FRANGO DESFIADO:
7. Coloque o frango numa panela com água, sal, alho e louro
8. Cozinhe em fogo médio por 20-25 minutos (peito) ou 30 min (coxa)
9. Retire o frango — guarde o caldo! Serve pra fazer sopa depois
10. Deixe esfriar 5 minutos e desfie com dois garfos puxando em direções opostas
11. Numa frigideira, aqueça azeite e refogue o frango desfiado com alho picado
12. Tempere com ervas e limão
13. Sirva ao lado da batata doce amassada

💡 A batata doce tem carboidratos de absorção lenta — energia por horas!`,
    tags: ['equilibrado', 'proteico'], hours: ['19:00', '20:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Salada Completa com Ovos',
    ingredients: ['ovo', 'cenoura', 'abobrinha'],
    time: '15 min', calories: 240, protein: 16, carbs: 14, fat: 13,
    instructions: `🛒 O que você vai precisar: 2-3 ovos cozidos, alface (1 pé), rúcula, 1 cenoura, 1 tomate, ½ pepino, abobrinha, azeite, limão, mostarda, sal.

📋 Passo a passo:
MOLHO DE MOSTARDA E LIMÃO:
1. Numa tigela pequena: 2 col. sopa azeite + suco de 1 limão + 1 col. chá mostarda + pitada de sal
2. Misture bem com um garfo até emulsificar (ficar homogêneo)
3. Prove e ajuste: mais limão? Mais azeite?

PREPARANDO OS LEGUMES:
4. Lave bem todas as folhas e verduras em água corrente
5. Rasgue o alface e rúcula com as mãos — não corte! Fica mais bonito
6. Rale a cenoura no ralo grosso
7. Corte o tomate e pepino em fatias
8. Corte a abobrinha em tiras finas e grelhe rapidamente com sal (opcional)

MONTAGEM:
9. Numa saladeira grande: folhas na base
10. Distribua os legumes por cima — organize por cores para ficar bonito!
11. Adicione os ovos cozidos cortados ao meio
12. Regue com o molho na hora de servir (nunca antes — a salada murcha!)

💡 Princípio de ouro: nunca misture o molho antes de servir!`,
    tags: ['leve', 'poucos carboidratos'], hours: ['19:00', '20:00'],
    difficulty: 'fácil',
  },
  {
    name: 'Caldo de Frango Proteico',
    ingredients: ['frango', 'cenoura'],
    time: '35 min', calories: 210, protein: 26, carbs: 12, fat: 4,
    instructions: `🛒 O que você vai precisar: 200g frango, 1 cenoura, 1 chuchu, salsão (aipo), cúrcuma, gengibre, sal, salsinha.

📋 Passo a passo:
1. Corte o frango em pedaços médios (não muito pequenos para não ressecar)
2. Pique: cenoura em rodelas, chuchu em cubos, salsão em fatias
3. Numa panela grande, coloque o frango, todos os legumes e 1 litro de água fria
4. DICA: começar com água FRIA faz o caldo ficar muito mais saboroso!
5. Adicione: 1 col. chá cúrcuma (dourada), 1 pedaço pequeno gengibre ralado, sal e pimenta
6. Leve ao fogo alto até ferver
7. Quando ferver, reduza para fogo baixo e espume: retire com uma colher a espuma branca que se forma na superfície — deixa o caldo mais limpo
8. Tampe e cozinhe em fogo baixo por 30-35 minutos
9. Retire o frango, desfie e coloque de volta no caldo
10. Prove o sal e ajuste
11. Finalize com salsinha fresca picada na hora de servir

💡 A cúrcuma é anti-inflamatória e deixa o caldo com uma cor dourada linda!`,
    tags: ['leve', 'anti-inflamatório', 'reconfortante'], hours: ['19:00', '20:00', '21:00'],
    difficulty: 'médio',
  },
];

const HOUR_LABELS: Record<string, string> = {
  '06:30': '☀️ Bem cedo',
  '07:00': '☀️ 7h',
  '08:00': '🌅 8h',
  '09:00': '🌤️ 9h',
  '09:30': '🌤️ 9h30',
  '10:00': '🍎 10h',
  '10:30': '🍎 10h30',
  '12:00': '🌞 12h',
  '13:00': '🌞 13h',
  '14:00': '🌞 14h',
  '15:00': '🍊 15h',
  '16:00': '🍊 16h',
  '17:00': '🍊 17h',
  '19:00': '🌙 19h',
  '20:00': '🌙 20h',
  '21:00': '🌙 21h',
};

const PERIOD_FILTERS = [
  { key: '', label: 'Todas', emoji: '🍽️' },
  { key: 'manha', label: 'Café da Manhã', emoji: '☀️' },
  { key: 'lanche_manha', label: 'Lanche Manhã', emoji: '🍎' },
  { key: 'almoco', label: 'Almoço', emoji: '🌞' },
  { key: 'lanche_tarde', label: 'Lanche Tarde', emoji: '🍊' },
  { key: 'jantar', label: 'Jantar', emoji: '🌙' },
];

function getPeriod(hours: string[]): string {
  const h = hours[0];
  if (!h) return '';
  const num = parseInt(h);
  if (num < 10) return 'manha';
  if (num < 12) return 'lanche_manha';
  if (num < 15) return 'almoco';
  if (num < 18) return 'lanche_tarde';
  return 'jantar';
}

export default function RecipeGenerator() {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = RECIPES.filter(r => {
    const matchPeriod = !filter || getPeriod(r.hours) === filter;
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase());
    return matchPeriod && matchSearch;
  });

  const diffColor = (d: string) => d === 'fácil' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600';

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
        🍳 Receitas Saudáveis
      </h2>
      <p className="text-sm text-gray-400 mb-4">{RECIPES.length} receitas — com horários sugeridos</p>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Buscar receita..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-orange-300"
      />

      {/* Period filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {PERIOD_FILTERS.map(p => (
          <button
            key={p.key}
            onClick={() => setFilter(p.key)}
            className={`flex flex-col items-center px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all shrink-0 ${
              filter === p.key
                ? 'bg-gradient-to-b from-orange-400 to-pink-400 text-white shadow-md'
                : 'bg-gray-100 text-gray-500 hover:bg-orange-50'
            }`}
          >
            <span className="text-lg">{p.emoji}</span>
            {p.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-3">{filtered.length} receitas encontradas</p>

      {/* Recipe list */}
      <div className="space-y-3">
        {filtered.map(recipe => (
          <div key={recipe.name} className="border border-gray-100 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === recipe.name ? null : recipe.name)}
              className="w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{recipe.name}</p>
                  {/* Hours */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {recipe.hours.map(h => (
                      <span key={h} className="text-xs bg-orange-50 text-orange-500 px-2 py-0.5 rounded-full">
                        {HOUR_LABELS[h] || h}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {recipe.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-green-600 font-bold">{recipe.calories} kcal</p>
                  <p className="text-xs text-blue-500">💪 {recipe.protein}g</p>
                  <p className="text-xs text-gray-400">⏱ {recipe.time}</p>
                </div>
              </div>
            </button>

            {expanded === recipe.name && (
              <div className="px-4 pb-4 border-t border-gray-100">
                {/* Macros */}
                <div className="grid grid-cols-4 gap-2 my-3">
                  <div className="text-center bg-green-50 rounded-lg py-1.5">
                    <p className="text-sm font-bold text-green-600">{recipe.calories}</p>
                    <p className="text-xs text-gray-400">kcal</p>
                  </div>
                  <div className="text-center bg-blue-50 rounded-lg py-1.5">
                    <p className="text-sm font-bold text-blue-500">{recipe.protein}g</p>
                    <p className="text-xs text-gray-400">prot.</p>
                  </div>
                  <div className="text-center bg-orange-50 rounded-lg py-1.5">
                    <p className="text-sm font-bold text-orange-400">{recipe.carbs}g</p>
                    <p className="text-xs text-gray-400">carbs</p>
                  </div>
                  <div className="text-center bg-yellow-50 rounded-lg py-1.5">
                    <p className="text-sm font-bold text-yellow-500">{recipe.fat}g</p>
                    <p className="text-xs text-gray-400">gord.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${diffColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </span>
                  <span className="text-xs text-gray-400">⏱ {recipe.time}</span>
                </div>

                <p className="text-xs font-semibold text-gray-600 mb-2">📋 Como fazer:</p>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                  {recipe.instructions}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-gray-300">
          <p className="text-4xl mb-2">🥦</p>
          <p className="text-sm">Nenhuma receita encontrada</p>
        </div>
      )}
    </div>
  );
}
