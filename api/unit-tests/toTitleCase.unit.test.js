import { describe, it } from "node:test";
import assert from "node:assert";
import { toTitleCase } from "./toTitleCase.js";

describe('toTitleCase()', () => {
    it('Mot en minuscules', () => {
      //ARRANGE : prépare la donnée d'entrée
      const input = "oclock"

      //ACT : éxécute la fonction
      const result = toTitleCase(input);

      //ASSERT : vérifie le résultat attendu
    assert.equal(result, "Oclock");
  });

   it('Mot avec chiffres et caractères spéciaux', () => {
    // ARRANGE
    const input = "oCL0ck!";
    
    // ACT
    const result = toTitleCase(input);
    
    // ASSERT
    assert.equal(result, "Ocl0ck!");
  });
  
  it('Chaîne vide', () => {
    // ARRANGE
    const input = "";
    
    // ACT
    const result = toTitleCase(input);
    
    // ASSERT
    assert.equal(result, "");
  });
  
  it('Plusieurs mots en minuscules', () => {
    // ARRANGE
    const input = "hello world";
    
    // ACT
    const result = toTitleCase(input);
    
    // ASSERT
    assert.equal(result, "Hello World");
  });
  
  it('Plusieurs mots en majuscules', () => {
    // ARRANGE
    const input = "BONJOUR MONDE";
    
    // ACT
    const result = toTitleCase(input);
    
    // ASSERT
    assert.equal(result, "Bonjour Monde");
  });
  
  it('Phrase complexe avec apostrophes et ponctuation', () => {
    // ARRANGE
    const input = "Mais qu'est-ce qu'il se passe ici ?";
    
    // ACT
    const result = toTitleCase(input);
    
    // ASSERT
    assert.equal(result, "Mais Qu'est-ce Qu'il Se Passe Ici ?");
  });
  
  // Tests supplémentaires pour être robuste
  it('Valeur null', () => {
    // ARRANGE
    const input = null;
    
    // ACT
    const result = toTitleCase(input);
    
    // ASSERT
    assert.equal(result, "");
  });
  
  it('Valeur undefined', () => {
    // ARRANGE
    const input = undefined;
    
    // ACT
    const result = toTitleCase(input);
    
    // ASSERT
    assert.equal(result, "");
  });
});

