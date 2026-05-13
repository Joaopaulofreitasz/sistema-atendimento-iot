# 🛎️ Smart Waiter System - IoT & Web Dashboard

Sistema Full Stack de chamada de garçons que integra hardware (ESP32) e software (React) para otimizar o atendimento em estabelecimentos com múltiplos ambientes ou andares.

## 🚀 Sobre o Projeto

Este projeto demonstra a integração em tempo real entre um dispositivo físico e uma interface web. Quando um botão é pressionado no andar superior (controlado pelo ESP32), um alerta visual é disparado instantaneamente no painel do garçom, permitindo uma resposta rápida e organizada.

### Principais Funcionalidades:
*   **Comunicação Real-time**: Utiliza Firebase Realtime Database para sincronização de baixa latência.
*   **Alerta Visual**: Dashboard interativo com mudanças de estado baseadas nos dados do banco.
*   **Gestão de Chamados**: Função para marcar atendimentos como concluídos diretamente pela interface.
*   **Segurança de Dados**: Implementação rigorosa de variáveis de ambiente (.env) para proteção de credenciais.

## 🛠️ Tecnologias Utilizadas

### Frontend & Cloud:
*   **React.js**: Interface do usuário moderna e responsiva.
*   **Firebase**: Realtime Database para persistência e sincronização de dados.
*   **CSS3**: Estilização personalizada para alertas visuais (Minimalist/Professional Style).

### Hardware & Firmware:
*   **ESP32**: Microcontrolador com conectividade Wi-Fi.
*   **C++/Arduino IDE**: Lógica de controle do hardware.

## 📂 Estrutura do Repositório

O projeto está organizado em duas frentes principais:
*   `/esp32-firmware`: Contém o código fonte (.ino) para o microcontrolador.
*   `/web-painel`: Contém a aplicação React com as configurações de integração.

## ⚙️ Como Configurar

### Requisitos Prévios:
1. Ter uma instância do Firebase configurada.
2. Criar um arquivo `.env` na pasta do React baseado no `.env.example`.
3. Criar um arquivo `arduino_secrets.h` na pasta do firmware baseado no `arduino_secrets.h.example`.

### Executando o Frontend:
```bash
cd web-painel
npm install
npm start

Desenvolvido por João Paulo de Freitas Costa.