/**
 * Retourne une chaîne de caractères dont la première lettre de 
 * chaque mot est en majuscule et les autres lettres en minuscules.
 * @param {string} str 
 * @returns string
 */
export function toTitleCase(str) {
  // écrire le code de la fonction
  // Vérifier si la chaîne est vide ou inexistante
  if (!str || !str.length) {
    return '';
  }
  
  // 1. Tout passer en minuscules
  // 2. Découper par espaces
  // 3. Capitaliser chaque mot
  // 4. Concaténer avec des espaces
  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word.length === 0) return word;
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
}
