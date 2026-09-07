# Crafting Basics

This file explains the campaign's player-facing blacksmithing and Masterpiece item rules.

## Three-Step Blacksmithing System

Blacksmithing uses three sequential stages:

> Concept -> Blueprint -> Smithing

These stages represent different parts of craftsmanship:

- Concept: What should I create?
- Blueprint: How can I make it work?
- Smithing: Can I successfully manufacture it?

## Core Crafting Variables

The system uses three independent 1-10 scales.

### Design Complexity

Design Complexity represents how difficult the item is to design and engineer.

Complexity affects Blueprint DC and Blueprint creation time.

It represents sophistication rather than power or rank.

| Complexity | General Meaning |
|---:|---|
| 1-2 | Simple or well-understood design |
| 3-4 | Normal specialized equipment |
| 5-6 | Unusual or custom design |
| 7-8 | Highly sophisticated design or multiple interacting functions |
| 9 | Extremely complex experimental design |
| 10 | Cutting-edge design pushing the smith's understanding |

A high-rank item can still have low Complexity if its actual design is simple.

### Main Material Workability

Main Material Workability represents how difficult the item's primary material is to physically work.

Workability affects Smithing DC and Smithing time.

Workability is not the same as rarity, monetary value, magical power, or item rank.

A valuable material can be easy to work, while an inexpensive monster material could be extremely difficult to shape.

### Construction Scale

Construction Scale represents how much actual work the item requires due to physical size, number of components, number of interconnected pieces, and amount of construction required.

Construction Scale affects time only.

It does not modify Blueprint DC or Smithing DC.

| Scale | Example |
|---:|---|
| 1 | Ring, arrowhead, tiny component |
| 2 | Dagger, simple tool |
| 3 | Sword, hammer, axe |
| 4 | Large weapon, shield, helmet |
| 5 | Complex weapon, small armor assembly |
| 6 | Half plate or several interconnected pieces |
| 7 | Full plate armor |
| 8 | Large elaborate equipment |
| 9 | Very large or exceptionally component-heavy construction |
| 10 | Massive smithing project |

These are guidelines rather than rigid classifications.

Core distinction:

> Complexity = how hard is it to figure out?
>
> Workability = how hard is the material to work?
>
> Construction Scale = how much work is there to do?

## Step 1 - Concept

The character first determines what they want to create.

This includes deciding:

- What the item is.
- What purpose it serves.
- Its intended functions.
- Its intended abilities or features.
- What inspires the design.

The player then makes a skill check.

### Skill Selection

The player may use any skill for this check as long as they can reasonably explain how that skill contributes to the concept.

Examples:

- Arcana to understand a magical phenomenon the item will reproduce.
- Nature to draw inspiration from a monster or natural process.
- Medicine to design equipment around anatomy.
- Athletics to draw from practical experience using weapons or moving under physical strain.
- Investigation to analyze existing equipment.
- Survival to design something for a hostile environment.
- Religion to incorporate knowledge of divine or mystical principles.

Creative justifications are encouraged.

The DM determines whether the explanation is reasonable.

### Inspiration Time

Step 1 does not use normal hourly work calculations.

The concept develops over either:

> 1 full day without combat

or:

> 1 week if the character experiences combat every day

This represents the character thinking about the project while observing things, talking to people, experimenting, adventuring, studying, gathering inspiration, and considering possible designs.

The character does not need to spend the entire period sitting at a desk.

### Help

Step 1 has the most permissive Help rules of the crafting system.

Almost anyone can potentially contribute because anything can be a source of inspiration.

A creature providing reasonable assistance gives the player advantage on the Step 1 roll.

Multiple helpers do not stack additional advantage or bonuses.

Help must still make contextual sense.

For example, another adventurer can discuss problems with existing equipment, a wizard can describe how a magical effect feels or behaves, a child could make an unexpected observation that inspires the design, and an animal could contribute indirectly if the item relates to that animal or its behavior.

### Resolution

Calculate:

> Score = d20 + relevant modifiers

Compare the score to the Step 1 DC.

| Result | Outcome |
|---|---|
| Natural 20 | Success; Blueprint DC receives -5 |
| Score >= DC + 5 | Success; Blueprint DC receives -2 |
| DC <= Score < DC + 5 | Success |
| DC - 5 < Score < DC | Success; Blueprint DC receives +2 |
| Score <= DC - 5 | Failure |

On failure, the current concept has not developed into something the character believes is workable.

Failure does not automatically mean the desired item is impossible.

The character may potentially revisit the idea later.

The Step 1 modifier is carried into Step 2.

## Step 2 - Blueprint

The character converts the successful concept into an actual technical blueprint.

The player makes either an Intelligence check or a Wisdom check.

The player chooses which ability to use.

Intelligence can represent calculated engineering, measurements, theory, material science, magical calculations, and similar approaches.

Wisdom can represent practical intuition, craftsmanship experience, instinctive understanding of materials, and similar approaches.

Neither ability is inherently superior.

### Readability

When creating the blueprint, the player chooses how understandable it is intended to be.

Readability modifies Blueprint DC.

| Intended Reader | Modifier |
|---|---:|
| Only the blueprint's creator needs to understand it | +1 |
| A trained blacksmith should be able to understand it | +3 |
| An average NPC should be able to understand it | +5 |

A personal blueprint may contain shorthand, assumptions, personal notation, or intuitive instructions only its creator understands.

A more readable blueprint requires additional clarity and precision.

This allows highly readable blueprints to potentially become useful items that can be shared, taught from, sold, or used by other smiths.

### Blueprint DC

Calculate:

> Blueprint DC = 10 + Step 1 Modifier + Design Complexity + Readability

The Step 1 Modifier is:

- Natural 20: -5.
- Score >= Step 1 DC + 5: -2.
- Normal success: 0.
- Score between DC - 5 and DC: +2.

### Blueprint Time

Calculate:

> Blueprint Work Time = Design Complexity x Construction Scale x 15 minutes

Examples:

- Complexity 3 / Scale 3 = 135 minutes = 2 hours 15 minutes.
- Complexity 6 / Scale 4 = 360 minutes = 6 hours.
- Complexity 8 / Scale 7 = 840 minutes = 14 hours.

This is active work time.

The required work may be divided across multiple periods or days.

The Blueprint roll is made after the required work has been completed.

### Help

Another creature may help with blueprint creation if there is a reasonable justification for how they contribute to the design process.

Valid Help grants advantage on the Blueprint roll.

Possible examples include:

- Another smith checking measurements.
- A mage assisting with magical theory.
- An anatomist helping with articulated armor.
- The intended wielder providing technical or practical feedback.
- Someone with specialized knowledge relevant to the design.

The standard for reasonable Help is stricter than Step 1 because the assistant must actually contribute to designing the blueprint.

Multiple helpers do not provide stacking bonuses.

### Resolution

Calculate:

> Score = d20 + relevant modifiers

Compare the score to Blueprint DC.

| Result | Outcome |
|---|---|
| Natural 20 | Success; Smithing DC receives -5 |
| Score >= DC + 5 | Success; Smithing DC receives -2 |
| DC <= Score < DC + 5 | Success |
| DC - 5 < Score < DC | Blueprint incomplete; another work period or attempt is required and the Blueprint DC permanently decreases by 2 |
| Score <= DC - 5 | Failure |

### Incomplete Blueprint Progress

The -2 DC reduction from an incomplete Blueprint result is cumulative.

Example:

Initial Blueprint DC:

> DC 21

First attempt:

> Score 18

This falls in the incomplete range.

New DC:

> 19

Second attempt:

> Score 17

Still incomplete.

New DC:

> 17

Third attempt:

> Score 17

Success.

This represents repeated drafting, testing, revisions, corrections, solving engineering problems, and gradually understanding the design.

The original Step 1 modifier does not change.

The accumulating -2 reductions belong specifically to this blueprint's development.

Each new Blueprint attempt requires another appropriate period of work based on the Blueprint's normal work-time calculation unless the DM rules otherwise.

## Step 3 - Smithing

Once the blueprint is successfully completed, the character physically creates the item.

The character makes a Smithing check.

The character adds proficiency if they are proficient with Smith's Tools.

The appropriate ability modifier should follow the campaign's normal Smithing or tool rules if already established.

### Smithing DC

Calculate:

> Smithing DC = 10 + Step 2 Modifier + Main Material Workability + Expected Rank Modifier

The Step 2 Modifier is:

- Blueprint Natural 20: -5.
- Blueprint Score >= DC + 5: -2.
- Normal Blueprint success: 0.

### Expected Rank Modifier

Compare the intended item's rank to the blacksmith's current rank.

Campaign rank order:

> Iron -> Bronze -> Silver -> Gold -> Diamond

| Expected Item Rank | Modifier |
|---|---:|
| Lower than blacksmith's rank | +1 |
| Same as blacksmith's rank | +2 |
| 1 rank higher | +3 |
| 2 ranks higher | +4 |
| 3 ranks higher | +5 |
| Continue accordingly | +1 for each additional rank |

Higher than smith = +3 for the first rank above, then +1 for every additional rank above that.

### Smithing Time

Calculate:

> Smithing Work Time = Main Material Workability x Construction Scale x 30 minutes

Examples:

- Scale 3 sword using Workability 3 material: 270 minutes = 4 hours 30 minutes.
- Scale 3 sword using Workability 8 material: 720 minutes = 12 hours.
- Scale 7 plate armor using Workability 5 material: 1,050 minutes = 17 hours 30 minutes.

This is active crafting time.

The required work does not need to be consecutive.

For example, a 17.5-hour project could be divided into 5 hours on Day 1, 6 hours on Day 2, and 6.5 hours on Day 3.

The Smithing roll occurs after the required crafting time has been completed.

### Help

Another creature may help with Smithing if there is a reasonable justification for how they contribute to physically creating the item.

Valid Help grants advantage on the Smithing roll.

Possible assistance could include:

- Another blacksmith assisting with the forge.
- Someone physically manipulating a massive workpiece.
- A mage stabilizing magical material.
- Someone knowledgeable about a monster component assisting while it is worked.
- Another relevant specialist performing part of the construction.

Smith's Tools proficiency is not automatically required to Help if the helper's contribution makes sense.

The DM determines whether the assistance is reasonable.

Multiple helpers do not stack additional advantage.

### Resolution

Calculate:

> Score = d20 + relevant modifiers

Compare the score to Smithing DC.

| Result | Outcome |
|---|---|
| Natural 1 | Failure; all materials are lost |
| Score <= DC - 5 | Failure; lose half the materials or one important material |
| DC - 5 < Score < DC | Success, but item gains one negative effect |
| DC <= Score < DC + 5 | Normal success |
| Score >= DC + 5 | Success; item gains one positive effect in addition to its planned properties |
| Natural 20 | Item becomes a Masterpiece Item of its intended rank |

Natural 1 and natural 20 are special outcomes.

## Positive And Negative Effects

Positive and negative effects should generally be related to the item's design, intended purpose, materials used, and the circumstances of construction.

Possible positive effects could include:

- Lower weight.
- Exceptional durability.
- Improved edge retention.
- An additional use of a minor ability.
- Improved range.
- Easier activation.
- Minor unintended magical functionality.
- Exceptional performance under particular circumstances.

Possible negative effects could include:

- Excessive weight.
- Noise.
- Awkward handling.
- Additional maintenance requirements.
- Reduced uses of an ability.
- Narrower activation conditions.
- Minor activation cost.
- Vulnerability to certain circumstances, materials, or damage.

These examples are not exhaustive tables.

Effects should fit the individual project.

## Masterpiece Items

If the Step 3 Smithing roll is a natural 20, the resulting item becomes:

> A Masterpiece Item of its intended rank.

A Masterpiece is qualitatively different from an ordinary exceptional crafting result.

It has two major special properties.

### Soul Binding

A Masterpiece Item may become soul-bound to a person.

Once soul-bound, the Masterpiece can rank up alongside its owner.

Example:

> Bronze -> Silver -> Gold -> Diamond

A Bronze Masterpiece soul-bound to a Bronze-rank adventurer can potentially progress through those ranks as its owner progresses.

This allows Masterpieces to remain meaningful signature equipment rather than eventually becoming obsolete because their owner has surpassed the item's original rank.

Soul-binding requirements, rituals, costs, restrictions, and transfer mechanics are handled by the DM when they become relevant.

### Confluence Channeling

A soul-bound Masterpiece can channel part of its owner's confluence without requiring the owner to activate the confluence itself.

The word part is important.

The Masterpiece does not automatically provide unrestricted access to every function of the owner's confluence.

Instead, the item can express an aspect of what that confluence represents in a manner appropriate to:

- The item.
- The owner.
- The confluence.
- The item's rank.

For example, an item soul-bound to someone with Astral Forge might eventually express an appropriate aspect of forging, reinforcement, repair, transformation, or similar concepts without requiring full Astral Forge activation.

This example is illustrative only.

Specific Masterpiece powers require DM confirmation.

### Progression Principle

A Masterpiece should not merely gain larger numerical bonuses as its owner ranks up.

Ideally:

> The item gradually becomes more representative of the person to whom it is soul-bound.

Its expression of the owner's confluence may develop alongside them.

Exact progression mechanics are handled by the DM when they become relevant.

## Crafting Philosophy

The crafting system separates all three stages because different parts of the process can succeed or fail in different ways.

A character may:

- Have a brilliant idea but struggle to engineer it.
- Produce an excellent blueprint but struggle with difficult material.
- Gradually solve a difficult blueprint through repeated attempts.
- Successfully create an item with an unintended flaw.
- Produce an unexpectedly superior item.
- Very rarely create a true Masterpiece.

The system rewards creativity, relevant character skills, cooperation, preparation, material choice, time investment, and crafting proficiency.

The fundamental workflow is:

> Inspiration -> Engineering -> Execution
