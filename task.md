Based on the document, here's a clear algorithm description for implementing the Latvian print design generator:

## Latvian Print Design Algorithm

### Overview
Create a personalized symmetric pattern based on a person's birthday and name. The pattern consists of colored squares in a grid with a colored background.

### Grid Structure
1. Create a 20x20 grid of squares (10x10 for each quadrant)
2. Each square contains a digit (0-9) calculated as: `digit = (row * column) % 10`
3. The grid is divided into 4 quadrants for symmetry
4. Only define the top-left quadrant; mirror it horizontally and vertically to create the full pattern

### Step 1: Generate Base Grid Numbers
For the top-left 10x10 quadrant:
- Row numbers: 0-9 (top to bottom)
- Column numbers: 0-9 (left to right)
- Each cell (r,c) contains digit: `(r * c) % 10`

### Step 2: Extract Birthday Code
Input: Birthday in format DD.MM.YYYY
1. Extract all unique digits from the birthday
2. Remove duplicates, keep first occurrence
3. Example: 12.07.1993 → [1,2,0,7,9,3] (removed duplicate 9 and 1)

### Step 3: Calculate Main Color (Birthday Color)
1. Sum all digits in the birthday: 1+2+0+7+1+9+9+3 = 32
2. Reduce to single digit by summing repeatedly: 32 → 3+2 = 5
3. Continue until single digit remains

### Step 4: Calculate Background Color (Name Color)
1. Convert each letter to a number using this mapping:
   - 1: A, G, Ļ, T
   - 2: Ā, Ģ, M, U
   - 3: B, H, N, Ū
   - 4: C, I, Ņ, V
   - 5: Č, Ī, O, Z
   - 6: D, J, P, Ž
   - 7: E, K, R
   - 8: Ē, Ķ, S
   - 9: F, L, Š

2. Sum all letter values for name and surname
3. Reduce to single digit (same as birthday calculation)

### Step 5: Map Numbers to Colors
```
1 = Red
2 = Orange
3 = Yellow
4 = Green
5 = Light Blue
6 = Dark Blue (Indigo)
7 = Purple
8 = Pink
9 = Gold
```

### Step 6: Generate Pattern
1. In the top-left quadrant, color squares whose digits match the birthday code
2. Use the main color (from birthday) for these squares
3. Mirror this quadrant:
   - Top-right: horizontal mirror
   - Bottom-left: vertical mirror
   - Bottom-right: both horizontal and vertical mirror
4. Set background color (from name) for all uncolored squares

### Implementation Notes
- If name color equals birthday color, only show the birthday color (no background contrast)
- Grid should be perfectly symmetric across both axes
- The digit in position (0,0) is always 0, (1,1) is 1, (2,3) is 6, etc.

### Example Output
For Tīna Bērziņa, 29.12.2007:
- Birthday code: [2,9,1,0,7]
- Main color: 2+9+1+2+2+0+0+7 = 23 → 5 (Light Blue)
- Background color: T(1)+Ī(5)+N(3)+A(1) + B(3)+Ē(8)+R(7)+Z(5)+I(4)+Ņ(4)+A(1) = 42 → 6 (Dark Blue)
- Color Light Blue squares at positions with digits 2,9,1,0,7
- Fill remaining squares with Dark Blue

This creates a symmetric personal pattern unique to each person's name and birthday combination.