import addresses from 'config/constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID

export const getCakeAddress = () => {
  return addresses.dragonegg[chainId]
}
export const getMasterChefAddress = () => {
  return addresses.masterChef[chainId]
}
export const getMulticallAddress = () => {
  return addresses.mulltiCall[chainId]
}
export const getWavaxbAddress = () => {
  return addresses.wavax[chainId]
}
export const getLotteryAddress = () => {
  return addresses.lottery[chainId]
}
export const getLotteryTicketAddress = () => {
  return addresses.lotteryNFT[chainId]
}
