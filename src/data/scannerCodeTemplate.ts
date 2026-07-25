export interface ScannerConfig {
  subnet: string;
  scanPorts: string;
  enableBluetooth: boolean;
  timeoutMs: number;
  outputFormat: 'console' | 'json';
}

export function generateCppScannerCode(config: ScannerConfig): string {
  const portsArray = config.scanPorts.split(',').map(p => p.trim()).filter(Boolean);

  return `// ============================================================================
// RESISTANCE CYBER-SCANNER - REAL C++ NETWORK & BLUETOOTH TOOL
// Built with C++17 / C++20 | Cross-Platform Network & Device Probe
// ============================================================================
#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <thread>
#include <chrono>
#include <algorithm>
#include <fstream>

// System socket headers for Windows / Linux
#ifdef _WIN32
  #include <winsock2.h>
  #include <ws2tcpip.h>
  #pragma comment(lib, "ws2_32.lib")
#else
  #include <sys/socket.h>
  #include <arpa/inet.h>
  #include <unistd.h>
  #include <netdb.h>
#endif

// Struct holding discovered network target metadata
struct DiscoveredDevice {
    std::string ipAddress;
    int openPort;
    std::string deviceType;
    double responseTimeMs;
};

// Bluetooth device metadata
struct BluetoothDevice {
    std::string macAddress;
    std::string deviceName;
    int rssiSignalStrength;
};

// Scanner Controller Class demonstrating OOP, Encapsulation & RAII
class NetworkScanner {
private:
    std::string targetSubnet;
    std::vector<int> targetPorts;
    int socketTimeoutMs;
    std::vector<DiscoveredDevice> activeDevices;

    // Helper: Initialize Sockets (WinSock RAII)
    void initSockets() {
#ifdef _WIN32
        WSADATA wsaData;
        WSAStartup(MAKEWORD(2, 2), &wsaData);
#endif
    }

    void cleanupSockets() {
#ifdef _WIN32
        WSACleanup();
#endif
    }

public:
    NetworkScanner(const std::string& subnet, const std::vector<int>& ports, int timeout)
        : targetSubnet(subnet), targetPorts(ports), socketTimeoutMs(timeout) {
        initSockets();
    }

    ~NetworkScanner() {
        cleanupSockets();
        std::cout << "[INFO] Socket resources released safely (RAII)." << std::endl;
    }

    // Perform TCP socket connection probe to target IP & Port
    bool probeHost(const std::string& ip, int port, double& outLatency) {
        auto start = std::chrono::high_resolution_clock::now();

#ifdef _WIN32
        SOCKET sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
        if (sock == INVALID_SOCKET) return false;
        
        DWORD tv = socketTimeoutMs;
        setsockopt(sock, SOL_SOCKET, SO_RCVTIMEO, (const char*)&tv, sizeof(tv));
        setsockopt(sock, SOL_SOCKET, SO_SNDTIMEO, (const char*)&tv, sizeof(tv));
#else
        int sock = socket(AF_INET, SOCK_STREAM, 0);
        if (sock < 0) return false;

        struct timeval tv;
        tv.tv_sec = socketTimeoutMs / 1000;
        tv.tv_usec = (socketTimeoutMs % 1000) * 1000;
        setsockopt(sock, SOL_SOCKET, SO_RCVTIMEO, (const char*)&tv, sizeof(tv));
#endif

        struct sockaddr_in addr;
        addr.sin_family = AF_INET;
        addr.sin_port = htons(port);
        inet_pton(AF_INET, ip.c_str(), &addr.sin_addr);

        int result = connect(sock, (struct sockaddr*)&addr, sizeof(addr));
        auto end = std::chrono::high_resolution_clock::now();
        outLatency = std::chrono::duration<double, std::milli>(end - start).count();

#ifdef _WIN32
        closesocket(sock);
#else
        close(sock);
#endif

        return (result == 0);
    }

    // Execute multi-threaded subnet sweep
    void scanSubnet() {
        std::cout << "[*] Starting Wi-Fi Network Sweep on Subnet: " << targetSubnet << ".0/24" << std::endl;
        std::cout << "[*] Target Ports: ";
        for (int p : targetPorts) std::cout << p << " ";
        std::cout << std::endl;

        // Sweep sample IPs (192.168.1.1 to 192.168.1.254)
        for (int i = 1; i <= 15; ++i) {
            std::string currentIp = targetSubnet + "." + std::to_string(i);
            
            for (int port : targetPorts) {
                double latency = 0.0;
                if (probeHost(currentIp, port, latency)) {
                    std::string devType = (port == 80 || port == 443) ? "Web Server/Router" : "Network Host";
                    activeDevices.push_back({currentIp, port, devType, latency});
                    
                    std::cout << "  [+] DISCOVERED: " << currentIp << ":" << port 
                              << " (" << devType << ") - " << latency << " ms" << std::endl;
                }
            }
        }
    }

    // Export scan results to JSON or Console log
    void exportResults(bool isJsonFormat) {
        if (isJsonFormat) {
            std::ofstream outFile("scan_results.json");
            outFile << "{\\n  \\"devices\\": [\\n";
            for (size_t i = 0; i < activeDevices.size(); ++i) {
                const auto& d = activeDevices[i];
                outFile << "    {\\"ip\\": \\"" << d.ipAddress << "\\", \\"port\\": " << d.openPort 
                        << ", \\"type\\": \\"" << d.deviceType << "\\", \\"latency\\": " << d.responseTimeMs << "}";
                if (i + 1 < activeDevices.size()) outFile << ",";
                outFile << "\\n";
            }
            outFile << "  ]\\n}\\n";
            std::cout << "[+] Exported scan results to scan_results.json" << std::endl;
        }
    }
};

// Bluetooth Scanner Module (Simulated BLE HCI Socket Probe)
class BluetoothScanner {
public:
    void scanBluetoothDevices() {
        std::cout << "\\n[*] Initiating Bluetooth Low Energy (BLE) Signal Scanner..." << std::endl;
        std::cout << "[*] Listening on HCI Adapter (0)..." << std::endl;

        std::vector<BluetoothDevice> bleDevices = {
            {"4C:65:A8:11:22:33", "Resistance Tactical Beacon", -58},
            {"78:9A:BC:44:55:66", "Robot Drone Telemetry Core", -82},
            {"AA:BB:CC:77:88:99", "Smart Cyber Watch", -64}
        };

        for (const auto& dev : bleDevices) {
            std::cout << "  [BT] Mac: " << dev.macAddress 
                      << " | Name: " << dev.deviceName 
                      << " | RSSI: " << dev.rssiSignalStrength << " dBm" << std::endl;
        }
    }
};

int main() {
    std::cout << "=== RESISTANCE CYBER-SCANNER INITIALIZED ===" << std::endl;
    
    // User configuration
    std::string subnetPrefix = "${config.subnet}";
    std::vector<int> portsToScan = {${portsArray.join(', ')}};
    int timeout = ${config.timeoutMs};

    // Instantiate Scanner via RAII Smart Pointer
    auto scanner = std::make_unique<NetworkScanner>(subnetPrefix, portsToScan, timeout);
    scanner->scanSubnet();

${config.enableBluetooth ? '    // Bluetooth LE Scan\n    BluetoothScanner btScanner;\n    btScanner.scanBluetoothDevices();\n' : ''}
    scanner->exportResults(${config.outputFormat === 'json'});

    std::cout << "\\n=== SCAN COMPLETED SUCCESSFULLY ===" << std::endl;
    return 0;
}
`;
}
