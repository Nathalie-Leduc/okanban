import { describe, it } from "node:test";
import assert from "node:assert";
import { computeStrength } from "./game.js";

describe('Game module', () => {
  describe('computeStrength function', () => {
    
    // Tests du palier 1 (niveaux 1-50)
    it('Au niveau 1, le personnage a 1 point de force', () => {
      // ARRANGE
      const level = 1;
      
      // ACT
      const result = computeStrength(level);
      
      // ASSERT
      assert.equal(result, 1);
    });
    
    it('Au niveau 50, le personnage a 50 points de force', () => {
      // ARRANGE
      const level = 50;
      
      // ACT
      const result = computeStrength(level);
      
      // ASSERT
      assert.equal(result, 50);
    });
    
    // Tests du palier 2 (niveaux 51-100)
    it('Au niveau 51, le personnage a toujours 50 points (pas encore gagné)', () => {
      // ARRANGE
      const level = 51;
      
      // ACT
      const result = computeStrength(level);
      
      // ASSERT
      assert.equal(result, 50);
    });
    
    it('Au niveau 52, le personnage a 51 points (50 + 1)', () => {
      // ARRANGE
      const level = 52;
      
      // ACT
      const result = computeStrength(level);
      
      // ASSERT
      assert.equal(result, 51);
    });
    
    it('Au niveau 100, le personnage a 75 points (50 + 25)', () => {
      // ARRANGE
      const level = 100;
      
      // ACT
      const result = computeStrength(level);
      
      // ASSERT
      assert.equal(result, 75);
    });
    
    // Tests du palier 3 (niveaux 101-200)
    it('Au niveau 101, le personnage a toujours 75 points', () => {
      // ARRANGE
      const level = 101;
      
      // ACT
      const result = computeStrength(level);
      
      // ASSERT
      assert.equal(result, 75);
    });
    
    it('Au niveau 200, le personnage a 108 points (50 + 25 + 33)', () => {
      // ARRANGE
      const level = 200;
      
      // ACT
      const result = computeStrength(level);
      
      // ASSERT
      assert.equal(result, 108);
    });
    
    // Tests du palier 4 (niveaux 201+)
    it('Au niveau 201, le personnage a toujours 108 points', () => {
      // ARRANGE
      const level = 201;
      
      // ACT
      const result = computeStrength(level);
      
      // ASSERT
      assert.equal(result, 108);
    });
    
    it('Au niveau 205, le personnage a 109 points (50 + 25 + 33 + 1)', () => {
      // ARRANGE
      const level = 205;
      
      // ACT
      const result = computeStrength(level);
      
      // ASSERT
      assert.equal(result, 109);
    });
    
    it('Au niveau 500, le personnage a 168 points (50 + 25 + 33 + 60)', () => {
      // ARRANGE
      const level = 500;
      
      // ACT
      const result = computeStrength(level);
      
      // ASSERT
      assert.equal(result, 168);
    });
    
    // Tests des limites et cas particuliers
    it('Au niveau 55, le personnage a 52 points', () => {
      // ARRANGE
      const level = 55;
      
      // ACT
      const result = computeStrength(level);
      
      // ASSERT
      // 50 (niveaux 1-50) + 2 (5 niveaux après 50 / 2 = 2.5 → 2)
      assert.equal(result, 52);
    });
    
  });
});