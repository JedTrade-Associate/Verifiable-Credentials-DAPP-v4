# OpenAttestation Token Gating Website (Proof of concept)

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Installing](#installing)
- [Usage](#usage)
- [References](#references)

## 🧐 About

This POC is to implement a method to use NFTs for token gating events in real life. It will make use of Verifiable Credentials (VC) to prove ownership of a wallet address and to prove ownership of an NFT via the wallet address. VCs issued complies with Singapore OpenAttestation standards (https://www.openattestation.com/).

## 🏁 Getting Started
### Prerequisites
What things you need to install the software and how to install them.

```
Give examples
```

### Installing

In project root folder, open a terminal and run npm install to install the dependencies
```
npm install
```

## 🎈 Usage

### Registration flow
```mermaid
graph TD
    A{Start} --> B(Connect wallet to DAPP)
    B --> C(Able to Sign message?)
    C --> |No| CE(Unable to prove wallet ownership)
    C --> |Yes| D(Display QR code)
    D --> E{Open Mobile App}
    E --> F(Scan QR Code)
    F --> G(Device registered and VC is stored)
    G --> H(VC displayed as QR code for verification)
    H & CE --> I(End of registration)
```

### Verification flow
```mermaid
graph TD
    A{Start} --> B(Login to verifier account)
    B --> C(Submit event configurations)
    C --> E(Conditions generated with unique code)
    E --> F{Open Mobile App}
    F --> G(Able to log-in with unique code?)
    G --> |No| G2(Unique code not found)
    G --> |Yes| H(Scan QR code to verify)
    H & G2 --> I{End}
```
## ⛏️ Built Using
- [React](https://reactjs.org/) - User Interface
- [Tailwind](https://tailwindcss.com/) - Styling

## 🎉 References
- 