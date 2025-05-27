# 🐉 DragonsFrontendFarm


DragonsFrontendFarm is a decentralized finance (DeFi) web application inspired by PancakeSwap, built to interact with smart contracts for staking, farming, and Initial Farm Offerings (IFOs) on EVM-compatible blockchains (such as Binance Smart Chain or Avalanche). The frontend provides users with access to various liquidity pools, yield farms, and token launch events, allowing them to stake, earn, and manage digital assets in a secure and user-friendly interface.

## Features

- **DeFi Yield Farming & Staking**: Stake tokens in various pools to earn rewards.
- **Initial Farm Offerings (IFOs)**: Participate in new token launches using LP tokens.
- **Pools Dashboard**: View pool stats, track rewards, and manage your liquidity.
- **Wallet Integration**: Connect with popular crypto wallets.
- **Cross-platform Support**: Designed to support multiple EVM chains (e.g., BSC, Avalanche).
- **Community Driven**: Open source and welcoming to contributors.

## Project Structure

- `components`: Generic UI components.
- `views`: Page building blocks and route roots.
- `config`: Configuration files and ABIs.
- `state`: Redux store files for global state management.
- `context`: React contexts for global data.
- `hooks`: Shared React hooks.
- `utils`: Utility functions.

## Getting Started

1. **Clone the repository**
   ```sh
   git clone https://github.com/TartarusDevtech/DragonsFrontendFarm.git
   cd DragonsFrontendFarm
   ```

2. **Install dependencies**
   ```sh
   yarn
   ```

3. **Environment setup**
   - Create a `.env.development.local` file at the project root:
     ```
     REACT_APP_CROWDIN_APIKEY = ""
     REACT_APP_CROWDIN_PROJECTID = ""
     ```
   - (For i18n system, contact a maintainer for credentials.)

4. **Run the app**
   ```sh
   yarn start
   ```

5. **Run tests**
   ```sh
   yarn test
   ```

## Contributing

We welcome contributions! Please read our [contributing guidelines](./CONTRIBUTING.md) before submitting a pull request.

---

## About

**DragonsFrontendFarm** is a DeFi frontend platform modeled after PancakeSwap, tailored for cross-chain decentralized finance. It enables users to participate in liquidity mining, yield farming, and token launches, offering a rich ecosystem for earning and managing crypto assets. The project leverages modern React, Redux Toolkit, and Web3 technologies, with a strong focus on community involvement and open-source development.

- **Repository:** [TartarusDevtech/DragonsFrontendFarm](https://github.com/TartarusDevtech/DragonsFrontendFarm)
- **License:** MIT (if not stated otherwise)
- **Technologies:** React, Redux Toolkit, Web3, EVM, TypeScript

---

**Disclaimer:** This project is for educational and demonstration purposes. Always DYOR (Do Your Own Research) and use at your own risk.
