#include <WiFi.h>
#include <HTTPClient.h>
#include "arduino_secrets.h" 

// Credenciais puxadas do header de segurança
const char* ssid = SECRET_SSID;
const char* pass = SECRET_PASS;
const char* firebaseURL = SECRET_FIREBASE_URL;

// Definição de Hardware
#define BOTAO 26
#define LED 13

void setup() {
  Serial.begin(115200);
  pinMode(BOTAO, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);

  WiFi.begin(ssid, pass);
  Serial.print("Conectando Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConectado!");
}

void loop() {
  // Verificação do botão com debounce manual
  if (digitalRead(BOTAO) == LOW) {
    delay(50); 
    
    int contadorCliques = 1;
    unsigned long tempoEspera = millis();
    
    // Janela de 400ms para detectar double click
    while (millis() - tempoEspera < 400) {
      if (digitalRead(BOTAO) == HIGH) {
        delay(50); 
        while (millis() - tempoEspera < 400) {
          if (digitalRead(BOTAO) == LOW) {
            contadorCliques = 2;
            break;
          }
        }
      }
    }

    if (contadorCliques == 2) {
      Serial.println(">>> CANCELANDO");
      enviarChamado(false);
      digitalWrite(LED, LOW); 
    } else {
      Serial.println(">>> CHAMANDO");
      enviarChamado(true);
      digitalWrite(LED, HIGH);
    }
    
    delay(500); // Evita repetições indesejadas
  }

  // Sync com o Firebase (Polling de 1s)
  if (WiFi.status() == WL_CONNECTED) {
    verificarStatusNoFirebase();
  }
}

// Envio de dados via PATCH para o Realtime DB
void enviarChamado(bool status) {
  HTTPClient http;
  http.begin(firebaseURL);
  http.addHeader("Content-Type", "application/json");
  String json = "{\"andar_cima\": " + String(status ? "true" : "false") + "}";
  http.sendRequest("PATCH", json);
  http.end();
}

// Checagem de estado externa
void verificarStatusNoFirebase() {
  static unsigned long ultimaChecagem = 0;
  
  if (millis() - ultimaChecagem > 1000) {
    HTTPClient http;
    http.begin(firebaseURL);
    int httpCode = http.GET();
    if (httpCode > 0) {
      String payload = http.getString();
      // Verifica o booleano direto no payload
      if (payload.indexOf("\"andar_cima\":true") != -1) {
        digitalWrite(LED, HIGH);
      } else {
        digitalWrite(LED, LOW);
      }
    }
    http.end();
    ultimaChecagem = millis();
  }
}