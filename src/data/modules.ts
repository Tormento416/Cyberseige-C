export interface Module {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  weaponName: string;
  weaponIcon: string; // Lucide icon identifier
  characterSpeakerId: string;
  briefingDialogue: {
    speakerId: string;
    text: string;
  }[];
  conceptsLearned: string[];
  formulasExplained: {
    concept: string;
    formula: string;
    explanation: string;
  }[];
  starterCode: string;
  testId: string;
  hints: string[];
  victoryCutscene: {
    title: string;
    weaponDescription: string;
    actionText: string;
    audioEffect: 'emp' | 'laser' | 'shield' | 'fanfare';
  };
}

export const MODULES: Module[] = [
  {
    id: 'module-1',
    number: 1,
    title: 'Signal & Control',
    subtitle: 'Basics & Control Flow',
    description: 'Master primitive types, size constraints, execution flow control, and pass-by-value vs pass-by-reference.',
    weaponName: 'EMP Overdrive Cannon',
    weaponIcon: 'Zap',
    characterSpeakerId: 'vance',
    briefingDialogue: [
      {
        speakerId: 'vance',
        text: "Recruit! The robot army's vanguard is encroaching on Sector 4. Our automated pulse cannon power supply is out of sync."
      },
      {
        speakerId: 'jax',
        text: "We need you to calibrate the energy loop using C++ control flow, correctly declare the primitive types, and pass parameters by reference so we don't waste system resources!"
      },
      {
        speakerId: 'eva',
        text: "Remember: 'int' is 4 bytes, 'double' is 8 bytes, 'char' is 1 byte, and 'bool' is 1 byte. Passing by reference (&) passes the actual memory address alias, avoiding expensive variable copying."
      }
    ],
    conceptsLearned: [
      'Primitive Types (int, double, char, bool) & sizeof() limits',
      'Control Structures (if/else, switch, for/while loops)',
      'Functions, Signatures & Return Types',
      'Pass-by-Value vs. Pass-by-Reference (&)'
    ],
    formulasExplained: [
      {
        concept: 'Memory Alignment & Sizes',
        formula: 'sizeof(char)=1B, sizeof(bool)=1B, sizeof(int)=4B, sizeof(double)=8B',
        explanation: 'Variables occupy specific contiguous bytes on the stack. Primitive limits define max values: int max ~ 2.14 billion.'
      },
      {
        concept: 'Value vs Reference Passing',
        formula: 'void tune(int val) vs void tune(int& ref)',
        explanation: 'Pass-by-value creates a duplicate copy on stack frame. Pass-by-reference (&) passes a direct alias to the caller variable.'
      }
    ],
    starterCode: `// MODULE 1: Calibrate EMP Overdrive Cannon
#include <iostream>

// 1. Declare function that takes powerLevel by reference (&) to modify it directly
void calibratePower(int& powerLevel, double frequency, char modeCode, bool isShieldActive) {
    // 2. Add an if/else or switch statement based on modeCode
    if (modeCode == 'E') {
        // 3. Use a loop to ramp up powerLevel to 500
        for (int i = 0; i < 5; ++i) {
            powerLevel += 80;
        }
    } else {
        powerLevel = 100;
    }
}

int main() {
    int currentPower = 100;
    double freq = 98.6;
    char mode = 'E';
    bool shield = true;

    // Call function using pass-by-reference
    calibratePower(currentPower, freq, mode, shield);
    
    std::cout << "EMP Power Calibrated: " << currentPower << " MW" << std::endl;
    return 0;
}`,
    testId: 'mod1_types_control',
    hints: [
      'Ensure you include primitive types (int, double, char, bool).',
      'Use a for or while loop along with an if statement.',
      'Make sure the function parameter uses reference syntax (&powerLevel).'
    ],
    victoryCutscene: {
      title: 'EMP OVERDRIVE CANNON ONLINE!',
      weaponDescription: 'High-voltage electromagnetic shockwave launcher capable of frying drone CPU circuits within a 500-meter radius.',
      actionText: 'Commander Vance triggers the EMP! A blinding blue electromagnetic pulse blasts through incoming robot scout units, rendering them inert!',
      audioEffect: 'emp'
    }
  },
  {
    id: 'module-2',
    number: 2,
    title: 'Memory Matrix',
    subtitle: 'Pointers & Memory Management',
    description: 'Direct memory manipulation with & and *, Stack vs Heap allocations, RAII principles, and smart pointers.',
    weaponName: 'Quantum RAM Barrier',
    weaponIcon: 'Shield',
    characterSpeakerId: 'eva',
    briefingDialogue: [
      {
        speakerId: 'eva',
        text: "Targeting radar breached! Rogue units are trying to trigger memory leak overflows on our defense grid."
      },
      {
        speakerId: 'jax',
        text: "Raw pointers are powerful but dangerous if you forget to call 'delete'. That's where RAII and smart pointers come to the rescue!"
      },
      {
        speakerId: 'vance',
        text: "Use std::unique_ptr and std::shared_ptr to build our Quantum RAM Barrier. No memory leaks on my watch!"
      }
    ],
    conceptsLearned: [
      'Memory Addresses (&) & Pointer Dereferencing (*)',
      'Stack Memory (Automatic) vs. Heap Allocation (new/delete)',
      'Resource Acquisition Is Initialization (RAII)',
      'Smart Pointers: std::unique_ptr & std::shared_ptr'
    ],
    formulasExplained: [
      {
        concept: 'Pointer Mechanics',
        formula: 'int* ptr = &val; *ptr = 42;',
        explanation: 'ptr stores the memory address (e.g. 0x7ffe4010). The dereference operator * accesses the value at that address.'
      },
      {
        concept: 'RAII & Smart Pointer Lifetime',
        formula: 'auto ptr = std::make_unique<Shield>();',
        explanation: 'When the stack frame exits, std::unique_ptr destructor fires automatically, calling delete on heap memory.'
      }
    ],
    starterCode: `// MODULE 2: Deploy Quantum RAM Barrier
#include <iostream>
#include <memory>

class QuantumShield {
public:
    int barrierPower = 100;
    void activate() {
        std::cout << "Quantum RAM Shield Active. Frequency: " << barrierPower << " THz" << std::endl;
    }
};

int main() {
    // 1. Working with raw pointer & address operator
    int coreTemp = 65;
    int* pTemp = &coreTemp;
    *pTemp = 45; // Cool down core

    // 2. Dynamic Heap Allocation using RAII Smart Pointers
    // Use std::unique_ptr to safely own heap object without manual delete!
    std::unique_ptr<QuantumShield> shield = std::make_unique<QuantumShield>();
    
    // Access member via arrow operator ->
    shield->activate();

    // 3. Shared ownership example
    std::shared_ptr<QuantumShield> sharedBarrier = std::make_shared<QuantumShield>();
    
    return 0; // Smart pointers automatically release heap memory here!
}`,
    testId: 'mod2_pointers_memory',
    hints: [
      'Include <memory> header for smart pointers.',
      'Show raw pointer usage (* and &).',
      'Instantiate heap objects using std::make_unique or std::make_shared.'
    ],
    victoryCutscene: {
      title: 'QUANTUM RAM BARRIER DEPLOYED!',
      weaponDescription: 'A multi-layered energetic forcefield powered by leak-proof heap memory allocation management.',
      actionText: 'EVA activates the barrier! Incoming mortar shells disintegrate on impact against the shimmering green plasma shield grid!',
      audioEffect: 'shield'
    }
  },
  {
    id: 'module-3',
    number: 3,
    title: 'Mech Factory',
    subtitle: 'Object-Oriented Programming (OOP)',
    description: 'Classes, Objects, Encapsulation, Polymorphism, VTables, Special Member Functions, and Rule of 3/5.',
    weaponName: 'VTable Exo-Mech',
    weaponIcon: 'Bot',
    characterSpeakerId: 'jax',
    briefingDialogue: [
      {
        speakerId: 'jax',
        text: "Omega-Zero is deploying Titan Class war machines. Regular weapons won't cut it. We need an Exo-Mech blueprint!"
      },
      {
        speakerId: 'vance',
        text: "Build a polymorphic base class 'MechUnit' and derived combat mechs. Use virtual functions so our squad can swap weapon payloads dynamically during combat!"
      },
      {
        speakerId: 'eva',
        text: "Make sure your base class destructor is virtual to avoid incomplete object destruction when deleting through base pointers!"
      }
    ],
    conceptsLearned: [
      'Classes, Instantiation & Public/Private Encapsulation',
      'The 4 Pillars: Encapsulation, Abstraction, Inheritance & Polymorphism',
      'Virtual Functions & Runtime VTable Dynamic Dispatch',
      'Special Member Functions & Rule of Three / Rule of Five'
    ],
    formulasExplained: [
      {
        concept: 'Virtual Function Table (VTable)',
        formula: 'sizeof(Derived) = Data Members + vptr (8 Bytes)',
        explanation: 'Classes with virtual methods store an invisible vptr pointing to a function table. Calling virtual methods performs dynamic lookup at runtime.'
      },
      {
        concept: 'Rule of Three / Rule of Five',
        formula: 'Destructor, Copy Constructor, Copy Assignment [Move Constructor, Move Assignment]',
        explanation: 'If a class manages raw resources, explicitly define all member copy/move lifetime functions to prevent double-free bugs.'
      }
    ],
    starterCode: `// MODULE 3: Construct VTable Exo-Mech Blueprint
#include <iostream>
#include <string>

// 1. Base Class with Encapsulation & Polymorphism
class MechUnit {
private:
    std::string unitId; // Encapsulated private state
protected:
    int armorPoints;
public:
    MechUnit(std::string id, int hp) : unitId(id), armorPoints(hp) {}
    
    // Virtual destructor is ESSENTIAL for polymorphic base classes!
    virtual ~MechUnit() {
        std::cout << "Mech " << unitId << " deactivated safely." << std::endl;
    }

    // Pure virtual or virtual function for runtime dispatch
    virtual void attack() {
        std::cout << "Base Mech kinetic attack!" << std::endl;
    }
};

// 2. Derived Class implementing Inheritance
class ExoArmorMech : public MechUnit {
public:
    ExoArmorMech(std::string id) : MechUnit(id, 2500) {}
    
    void attack() override {
        std::cout << "Exo-Mech fires Plasma Launcher! 2500 Damage!" << std::endl;
    }
};

int main() {
    // Polymorphic pointer invocation via VTable
    MechUnit* myMech = new ExoArmorMech("EXO-V1");
    myMech->attack(); // Dispatches to ExoArmorMech::attack()
    
    delete myMech; // Fires virtual ~MechUnit() cleanly!
    return 0;
}`,
    testId: 'mod3_oop_lifecycles',
    hints: [
      'Define a base class and a derived class using inheritance (: public Base).',
      'Mark the base attack method as virtual and override it in derived class.',
      'Ensure the base class destructor is marked virtual (~Base()).'
    ],
    victoryCutscene: {
      title: 'VTABLE EXO-MECH FULL ASSEMBLY COMPLETE!',
      weaponDescription: 'Heavy cybernetic battle suit featuring dynamic polymorphic weapon swapping and VTable targeting dispatch.',
      actionText: 'Jax powers up the VTable Mech! The suit stomps into combat, unleashing dual plasma streams that blast through Omega-Zero’s armor division!',
      audioEffect: 'laser'
    }
  },
  {
    id: 'module-4',
    number: 4,
    title: 'Tactical Grid',
    subtitle: 'Standard Template Library (STL)',
    description: 'Master std::vector, std::array, std::map, std::set, Iterators, and algorithms like std::sort and std::transform.',
    weaponName: 'Swarm Vector Radar',
    weaponIcon: 'Radar',
    characterSpeakerId: 'vance',
    briefingDialogue: [
      {
        speakerId: 'vance',
        text: "Sensors report hundreds of fast-moving aerial drones approaching! Manual targeting is impossible!"
      },
      {
        speakerId: 'eva',
        text: "Store the enemy signatures in an STL std::vector, iterate through them with auto iterators, and use std::sort to prioritize nearest targets."
      },
      {
        speakerId: 'jax',
        text: "The STL gives us pre-tested algorithms that run at maximum O(N log N) speed. Let's sweep the skies!"
      }
    ],
    conceptsLearned: [
      'STL Containers: std::vector, std::array, std::map, std::set',
      'Uniform Navigation using Iterators (begin(), end())',
      'STL Algorithms: std::sort, std::find, std::transform',
      'Lambda Expressions & Custom Sort Comparators'
    ],
    formulasExplained: [
      {
        concept: 'Vector Dynamic Resizing Complexity',
        formula: 'Amortized O(1) Push Back | Capacity Doubling: 1 -> 2 -> 4 -> 8 -> 16',
        explanation: 'std::vector allocates contiguous memory blocks on the heap. When capacity overflows, it allocates double capacity and moves items.'
      },
      {
        concept: 'Algorithm Time Complexity',
        formula: 'std::sort = O(N log N) | std::find = O(N) | std::map lookup = O(log N)',
        explanation: 'std::sort uses Introsort (QuickSort + HeapSort fallback) to guarantee O(N log N) worst case.'
      }
    ],
    starterCode: `// MODULE 4: Build Swarm Vector Radar
#include <iostream>
#include <vector>
#include <algorithm>

struct RobotTarget {
    int id;
    double distance;
};

int main() {
    // 1. STL Container: std::vector
    std::vector<RobotTarget> targets = {
        {101, 450.5},
        {102, 120.0},
        {103, 890.2},
        {104, 230.8}
    };

    // 2. STL Algorithm: std::sort with Lambda Comparator
    std::sort(targets.begin(), targets.end(), [](const RobotTarget& a, const RobotTarget& b) {
        return a.distance < b.distance; // Priority to closest robot
    });

    // 3. Iteration using auto iterators
    std::cout << "Priority Locked Targets:" << std::endl;
    for (auto it = targets.begin(); it != targets.end(); ++it) {
        std::cout << "Robot ID #" << it->id << " | Distance: " << it->distance << "m" << std::endl;
    }

    return 0;
}`,
    testId: 'mod4_stl_iterators',
    hints: [
      'Include <vector> and <algorithm> headers.',
      'Use std::vector to store items.',
      'Apply std::sort or std::transform with iterators (.begin(), .end()).'
    ],
    victoryCutscene: {
      title: 'SWARM VECTOR RADAR ONLINE!',
      weaponDescription: 'High-speed automated vector target acquisition matrix capable of locking onto 10,000 enemy signals simultaneously.',
      actionText: 'Commander Vance initiates radar lock! The radar sweeps the battlefield, instantly prioritizing targets and destroying 50 drone threats per second!',
      audioEffect: 'fanfare'
    }
  },
  {
    id: 'module-5',
    number: 5,
    title: 'Quantum Core',
    subtitle: 'Advanced & Modern Paradigms',
    description: 'Generic Templates, Move Semantics (&&, std::move), constexpr compile-time execution, and C++20 Concepts.',
    weaponName: 'Singularity Quantum Beam',
    weaponIcon: 'Cpu',
    characterSpeakerId: 'eva',
    briefingDialogue: [
      {
        speakerId: 'eva',
        text: "Omega-Zero has revealed his ultimate Citadel Fortress! We need an weapon with zero runtime overhead."
      },
      {
        speakerId: 'jax',
        text: "Use 'constexpr' to calculate weapon trajectory parameters at COMPILE TIME! Then use Move Semantics (&&) to transfer massive energy buffers instantly without copying data."
      },
      {
        speakerId: 'vance',
        text: "Combine it with generic C++ Templates and C++20 Concepts. Fire the Singularity Beam!"
      }
    ],
    conceptsLearned: [
      'Generic Type-Agnostic Function & Class Templates',
      'Move Semantics, Rvalue References (&&) & std::move',
      'Compile-Time Programming: constexpr & consteval',
      'C++20 Concepts & Constraints (requires clause)'
    ],
    formulasExplained: [
      {
        concept: 'Move Semantics vs Copy',
        formula: 'Copy: O(N) heap re-allocation | Move (std::move): O(1) pointer swap',
        explanation: 'Move constructor transfers ownership of dynamic memory resources from rvalue temporary (&&) to new object without copying elements.'
      },
      {
        concept: 'Compile-Time Constexpr Execution',
        formula: 'constexpr int val = calculatePower(); // Zero runtime CPU cost!',
        explanation: 'constexpr forces the compiler to evaluate values during compilation, placing result directly into read-only binary text section.'
      }
    ],
    starterCode: `// MODULE 5: Ignite Singularity Quantum Beam
#include <iostream>
#include <utility>

// 1. Compile-time evaluation using constexpr
constexpr double computeQuantumYield(int coreCount) {
    return coreCount * 999.99;
}

// 2. Generic Template Function
template <typename T>
T amplifyEnergy(T input) {
    return input * 2;
}

// 3. Class demonstrating Move Semantics (&&)
class EnergyCell {
public:
    int* powerBuffer;
    
    EnergyCell(int size) {
        powerBuffer = new int[size];
        std::cout << "Allocated power buffer." << std::endl;
    }
    
    ~EnergyCell() {
        delete[] powerBuffer;
    }

    // Move Constructor (Rvalue Reference &&)
    EnergyCell(EnergyCell&& other) noexcept {
        powerBuffer = other.powerBuffer;
        other.powerBuffer = nullptr; // Transferred ownership!
        std::cout << "Moved energy buffer instantly (O(1) time)!" << std::endl;
    }
};

int main() {
    constexpr double yield = computeQuantumYield(4);
    int amplified = amplifyEnergy(500);

    EnergyCell cell1(1000);
    EnergyCell cell2 = std::move(cell1); // Triggers Move Constructor!

    std::cout << "Singularity Beam Ready. Yield: " << yield << " MW" << std::endl;
    return 0;
}`,
    testId: 'mod5_advanced_modern',
    hints: [
      'Define a template <typename T> function or class.',
      'Use constexpr for a compile-time variable or calculation.',
      'Demonstrate move semantics using rvalue reference (&&) or std::move.'
    ],
    victoryCutscene: {
      title: 'SINGULARITY QUANTUM BEAM FIRE!',
      weaponDescription: 'Ultimate zero-overhead energy weapon powered by compile-time constexpr math and zero-copy move semantics.',
      actionText: 'All resistance forces combine power! A radiant golden quantum beam pierces Omega-Zero’s Citadel shield, collapsing the enemy war core!',
      audioEffect: 'fanfare'
    }
  },
  {
    id: 'module-final-tool',
    number: 6,
    title: 'Final Mission: Scanner Studio',
    subtitle: 'Build Your Own Real C++ Tool',
    description: 'Combine all learned C++ fundamentals, OOP, Pointers, and STL to assemble a functional C++ Network & Bluetooth Scanner tool!',
    weaponName: 'Resistance Cyber-Scanner',
    weaponIcon: 'Terminal',
    characterSpeakerId: 'jax',
    briefingDialogue: [
      {
        speakerId: 'jax',
        text: "Congratulations Commander! You defeated Omega-Zero's army! Now, it's time to take your skills into the real world."
      },
      {
        speakerId: 'vance',
        text: "This is your custom reward: a real, compilable C++ application that scans Wi-Fi network devices and Bluetooth LE signals!"
      },
      {
        speakerId: 'eva',
        text: "You can customize your network interfaces, select socket scan ranges, inspect the fully commented C++ source code, and download it for your system!"
      }
    ],
    conceptsLearned: [
      'Real-World C++ Socket Networking (WinSock / POSIX Sockets)',
      'Cross-Platform Bluetooth Signal Detection Principles',
      'Production Code Architecture & Modularity',
      'CMake Build Setup & Standalone C++ Compilation'
    ],
    formulasExplained: [
      {
        concept: 'Network Socket Scanning Formula',
        formula: 'connect(socket_fd, (struct sockaddr*)&addr, sizeof(addr))',
        explanation: 'Probes TCP/UDP IP ports or ICMP echo packets to discover active host devices on local subnets (e.g. 192.168.1.0/24).'
      }
    ],
    starterCode: ``, // Custom interactive generator handles this
    testId: 'mod_final',
    hints: [],
    victoryCutscene: {
      title: 'RESISTANCE CYBER-SCANNER GRADUATION!',
      weaponDescription: 'Real-world C++ Wi-Fi & Bluetooth Device Scanner project ready for compilation.',
      actionText: 'You have mastered C++ from primitive types to modern move semantics! Your customized C++ Network & Bluetooth scanner tool is generated and ready to compile.',
      audioEffect: 'fanfare'
    }
  }
];
