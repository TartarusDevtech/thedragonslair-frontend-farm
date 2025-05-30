import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import FlexLayout from 'components/layout/Flex'
import { useFarms, usePriceWavaxUsdt, usePriceDreggUsdt } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'

import FarmStakingCard from './components/FarmStakingCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'


const Hero = styled.div`
  align-items: center;
  background-image: url('/images/egg/3.png');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/egg/3.png'), url('/images/egg/3b.png');
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`
const StickySideBar = styled.div`
  position: sticky;
  float: left;
  top: 40%;
`

const StickyIcons = styled.a`
  display: block;
  text-align: center;
  padding: 1px;
  color: white;
  font-size: 20px;
  max-width: 10%;
  height: auto;
`


const Home: React.FC = ( ) => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceDreggUsdt()
  const bnbPrice = usePriceWavaxUsdt()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const tokenMode = false;

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }
        const cakeRewardPerBlock = new BigNumber(farm.eggPerBlock || 1).times(new BigNumber(farm.poolWeight)) .div(new BigNumber(10).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = cakePrice.times(cakeRewardPerYear);

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0);

        if (farm.quoteTokenSymbol === QuoteToken.WAVAX) {
          totalValue = totalValue.times(bnbPrice);
        }

        if(totalValue.comparedTo(0) > 0){
          apy = apy.div(totalValue);
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          cakePrice={cakePrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [bnbPrice, account, cakePrice, ethereum],
  )

  return (
    <div>
    <StickySideBar>
        <StickyIcons href="https://twitter.com/DRGNCRYPTOGAMIN" target="_blank">
              <img alt="twitter" src="https://seeklogo.com/images/T/twitter-icon-square-logo-108D17D373-seeklogo.com.png"/>
          </StickyIcons>
          <StickyIcons href="https://t.me/thedragonslairfarm" target="_blank">
              <img alt="telegram" src="https://image.flaticon.com/icons/png/512/124/124019.png"/>
          </StickyIcons>
          <StickyIcons href="" target="_blank">
              <img alt="charts" src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/chart_candlestick.png"/>
          </StickyIcons>
          <StickyIcons href="" target="_blank">
              <img alt="exchange" src="https://assets.coingecko.com/markets/images/627/large/pangolin.jpg?1613741041"/>
          </StickyIcons>
          <StickyIcons href="https://docs.thedragonslair.farm/" target="_blank">
              <img alt="docs" src="https://cdn2.iconfinder.com/data/icons/metro-ui-dock/512/Doc_-_Google_Docs.png"/>
          </StickyIcons>
    </StickySideBar>
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="secondary">
          The Dragon&apos;s Lair
        </Heading>
      </Hero>
    
      <div>
        <FarmStakingCard />
        <div>
          <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly}/> 

          <Route exact path={`${path}`}>
            {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsList(inactiveFarms, true)}
          </Route>
        </div>
      </div>
      <div>
        <Cards>
          <FarmStakingCard />
        
          <CakeStats />
          <TotalValueLockedCard />
        </Cards>
      </div>
    </Page>
    </div>
  )
}

export default Home
