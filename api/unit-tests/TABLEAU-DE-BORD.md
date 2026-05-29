1. Structure des tests avec le pattern AAA

```JS

// ARRANGE : Préparer
const input = "test";

// ACT : Agir
const result = fonction(input);

// ASSERT : Vérifier
assert.equal(result, expected);

```

1. Organisation en 3 niveaux

```JS

describe('Module')           // Niveau 1 : le module
  describe('Fonction')       // Niveau 2 : la fonction
    it('Cas de test')        // Niveau 3 : le scénario

```

3. Écrire des tests complets

✅ Cas nominaux (fonctionnement normal)
✅ Cas limites (valeurs aux frontières : 50, 51, 100, 101...)
✅ Cas d'erreur (null, undefined, chaîne vide)

4. Nommage descriptif des tests
Mes tests sont bien nommés et expliquent clairement :

Quoi : "computeStrength function"
Contexte : "Au niveau 205"
Résultat attendu : "le personnage a 109 points"

Principes FIRST validés ✅
Mes tests respectent les principes FIRST :

- **F**ast - Rapide - 31ms pour 19 test ⚡
- **I**solated - Isolé - Chaque test est indépendant 🔒
- **R**epeatable - Répétable - Je peux les relancer autant de fois que je veux 🔁
- **S**elf-validating - Auto-validé - Les tests passent ou échouent automatiquement ✔️
- **T**imely - Opportun - Je les ai écrits pendant le développement ⏰


