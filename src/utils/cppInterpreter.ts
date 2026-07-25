export interface MemoryBlock {
  address: string;
  name: string;
  type: string;
  value: string;
  location: 'stack' | 'heap';
  pointsTo?: string; // Target memory address if it's a pointer
  isLeaked?: boolean;
}

export interface SimulationResult {
  success: boolean;
  output: string;
  logs: string[];
  memoryState: MemoryBlock[];
  error?: string;
  formulaNote?: string;
}

export function evaluateCppCode(
  code: string,
  targetTestId: string
): SimulationResult {
  const cleanCode = code.trim();
  const logs: string[] = [];
  let success = false;
  let error = undefined;
  let formulaNote = undefined;
  const memoryState: MemoryBlock[] = [];

  try {
    switch (targetTestId) {
      case 'mod1_types_control': {
        // Module 1: Types & Control Flow
        // Must contain correct variable definitions and if/switch/loop logic
        const hasTypes = /\b(int|double|char|bool)\b/.test(cleanCode);
        const hasLoopOrIf = /\b(if|switch|for|while)\b/.test(cleanCode);
        const hasPassByRef = /&\w+/.test(cleanCode);

        memoryState.push(
          { address: '0x7ffe1001', name: 'powerLevel', type: 'int', value: '100', location: 'stack' },
          { address: '0x7ffe1005', name: 'frequency', type: 'double', value: '98.60', location: 'stack' },
          { address: '0x7ffe100d', name: 'modeCode', type: 'char', value: "'E'", location: 'stack' },
          { address: '0x7ffe100e', name: 'isShieldActive', type: 'bool', value: 'true', location: 'stack' }
        );

        if (hasTypes && hasLoopOrIf && hasPassByRef) {
          success = true;
          logs.push('[OK] Primitive types initialized in 1-byte, 4-byte, and 8-byte stack frames.');
          logs.push('[OK] Control flow loop calibrated EMP Pulse Cannon output to 500MW.');
          logs.push('[OK] Pass-by-reference (&) parameter safely updated target state without extra copying.');
          formulaNote = 'Formula: sizeof(char)=1B | sizeof(bool)=1B | sizeof(int)=4B | sizeof(double)=8B';
        } else {
          error = 'Missing primitives, control flow (if/loop), or pass-by-reference (&). Check task requirements!';
          logs.push('[FAIL] Compilation halted: Function parameters must use pass-by-reference (&) and control logic.');
        }
        break;
      }

      case 'mod2_pointers_memory': {
        // Module 2: Pointers, Stack vs Heap & Smart Pointers
        const hasPointer = /\*|\&/.test(cleanCode);
        const hasNew = /\bnew\b/.test(cleanCode) || /\bmake_unique\b/.test(cleanCode) || /\bmake_shared\b/.test(cleanCode);
        const hasSmartPointer = /std::(unique_ptr|shared_ptr)/.test(cleanCode);

        // Memory visualization
        memoryState.push(
          { address: '0x7ffe4010', name: 'ptrShield', type: 'std::unique_ptr<Shield>', value: '0x00a1ff20', location: 'stack', pointsTo: '0x00a1ff20' },
          { address: '0x00a1ff20', name: '*ptrShield (Heap Object)', type: 'QuantumShield', value: '{ power: 100% }', location: 'heap' }
        );

        if (hasPointer && hasNew && hasSmartPointer) {
          success = true;
          logs.push('[OK] Stack pointer address 0x7ffe4010 allocated.');
          logs.push('[OK] Heap memory block 0x00a1ff20 initialized via RAII smart pointer.');
          logs.push('[OK] Scope teardown guarantee verified: std::unique_ptr will call destructor automatically.');
          formulaNote = 'RAII Guarantee: Dynamic memory bound to stack object scope. Zero memory leak probability!';
        } else {
          error = 'Your code must use pointers (*), dynamic allocation (new / make_unique), and std::unique_ptr or std::shared_ptr!';
          logs.push('[FAIL] Danger of memory leak! Ensure heap allocations are managed by std::unique_ptr.');
        }
        break;
      }

      case 'mod3_oop_lifecycles': {
        // Module 3: OOP, Inheritance, Polymorphism & Lifecycle
        const hasClass = /\bclass\b/.test(cleanCode);
        const hasVirtual = /\bvirtual\b/.test(cleanCode);
        const hasInheritance = /:\s*(public|protected|private)/.test(cleanCode);
        const hasDestructor = /~\w+/.test(cleanCode);

        memoryState.push(
          { address: '0x7ffe8004', name: 'mechUnit', type: 'ExoMech*', value: '0x00b2cc10', location: 'stack', pointsTo: '0x00b2cc10' },
          { address: '0x00b2cc10', name: 'VTable Pointer', type: 'vptr', value: '0x004011a0 [VTable]', location: 'heap' },
          { address: '0x00b2cc18', name: 'armorPoints', type: 'int', value: '2500', location: 'heap' }
        );

        if (hasClass && hasVirtual && hasInheritance && hasDestructor) {
          success = true;
          logs.push('[OK] Class blueprint instantiated with encapsulation (private data / public interface).');
          logs.push('[OK] Dynamic binding enabled via virtual function table (VTable).');
          logs.push('[OK] Virtual destructor registered to ensure proper derived cleanup.');
          formulaNote = 'Polymorphism Cost: 1 extra pointer (vptr) per object instance -> points to vtable array of function pointers.';
        } else {
          error = 'Please define a class hierarchy with inheritance (: public), virtual functions, and virtual destructors (~Class)!';
          logs.push('[FAIL] Polymorphic vtable missing. Make sure your base class destructor is virtual.');
        }
        break;
      }

      case 'mod4_stl_iterators': {
        // Module 4: STL Containers, Iterators & Algorithms
        const hasVector = /std::(vector|array|map|set)/.test(cleanCode);
        const hasAlgorithm = /std::(sort|find|transform)/.test(cleanCode);
        const hasIteratorOrRange = /\b(auto|begin|end)\b/.test(cleanCode) || /for\s*\(.*:.*/.test(cleanCode);

        memoryState.push(
          { address: '0x7ffec010', name: 'targetList', type: 'std::vector<Robot>', value: 'size=4, cap=8', location: 'stack', pointsTo: '0x00d4aa00' },
          { address: '0x00d4aa00', name: 'Buffer[0..3]', type: 'Robot[4]', value: '[ID:101, ID:104, ID:109, ID:200]', location: 'heap' }
        );

        if (hasVector && hasAlgorithm && hasIteratorOrRange) {
          success = true;
          logs.push('[OK] STL container std::vector instantiated with dynamic heap growth.');
          logs.push('[OK] std::sort algorithm executed in O(N log N) time complexity.');
          logs.push('[OK] Uniform iterator traversal performed via range-based loop.');
          formulaNote = 'Vector Complexity: Random Access O(1) | Insertion at End Amortized O(1) | std::sort O(N log N)';
        } else {
          error = 'Code must utilize an STL container (std::vector), iterators/auto, and an STL algorithm (std::sort or std::transform)!';
          logs.push('[FAIL] Algorithm efficiency check failed. Use std::sort or std::find from <algorithm>.');
        }
        break;
      }

      case 'mod5_advanced_modern': {
        // Module 5: Templates, Move Semantics & C++20 Concepts
        const hasTemplate = /template\s*</.test(cleanCode);
        const hasMove = /std::move|&&/.test(cleanCode);
        const hasConstexpr = /\b(constexpr|consteval)\b/.test(cleanCode);

        memoryState.push(
          { address: '0x7fff0010', name: 'core1', type: 'QuantumCore<int>', value: 'rvalue moved', location: 'stack' },
          { address: '0x7fff0020', name: 'core2', type: 'QuantumCore<int>', value: 'Buffer transferred (0x00f5ff00)', location: 'stack', pointsTo: '0x00f5ff00' }
        );

        if (hasTemplate && hasMove && hasConstexpr) {
          success = true;
          logs.push('[OK] Type-agnostic function template compiled.');
          logs.push('[OK] Move constructor (&&) transferred heap buffer ownership with zero deep copies!');
          logs.push('[OK] Constexpr compile-time calculation evaluated before program execution.');
          formulaNote = 'Move Semantics: Copying an N-element array takes O(N). Moving rvalue reference (&&) takes O(1) pointer swap!';
        } else {
          error = 'Please include a template <typename T>, move semantics (std::move or rvalue &&), and a constexpr evaluation!';
          logs.push('[FAIL] Modern C++ check: Utilize move semantics (&&) and compile-time constexpr execution.');
        }
        break;
      }

      default:
        // Sandbox fallback
        success = true;
        logs.push('[OK] Code evaluated successfully.');
        break;
    }
  } catch (err: unknown) {
    success = false;
    error = err instanceof Error ? err.message : 'Syntax error in C++ code structure.';
    logs.push(`[ERROR] ${error}`);
  }

  const output = logs.join('\n');
  return { success, output, logs, memoryState, error, formulaNote };
}
