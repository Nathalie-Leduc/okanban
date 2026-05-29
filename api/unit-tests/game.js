/**
 * Calcule le nombre de points de force d'un personnage selon son niveau.
 * @param {number} level - Le niveau du personnage (entier positif)
 * @returns {number} - Le nombre de points de force
 * On traite les palliers du plus élevé au plus bas
 * on utilise Math.trunc() pour enlever les décimales (5 niveaux/5 - 1 point, mais 7 niveaux/5 = 1.4 point avec Math.trunc() = 1 point)
 * on redescend le niveau après chaque pallier pour simplifier les calculs suivants
 */

export function computeStrength(level) {
  //on initialise les points à 0
  let points = 0;

  //Palier 4 : niveau > 200 (1 point tous les 5 niveaux)
  if (level > 200) {
    //on calcule combien de niveaux au-dessus de 200
    const levelsAbove200 = level - 200;
    //On divise par 5 et on garde la partie entière
    points += Math.trunc(levelsAbove200 / 5);
    //on redescent à 200 pour continuer les calculs
    level = 200;
  }

  //Palier 3 : niveau 101 à 200 (1 point tous les 3 niveaux)
  if (level > 100 ) {
    const levelsAbove100 = level - 100;
    points += Math.trunc(levelsAbove100 / 3);
    level = 100;
  }

   //Palier 2 : niveau 51 à 100 (1 point tous les 2 niveaux)
  if (level > 50 ) {
    const levelsAbove50 = level - 50;
    points += Math.trunc(levelsAbove50 / 2);
    level = 50;
  }


   //Palier 1 : niveau 5 à 50 (1 point par niveau)
    points += level;
    
    return points;
  }



