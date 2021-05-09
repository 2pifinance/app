import PropTypes from 'prop-types'
import React, { useState }from 'react'
import { CSSTransition } from 'react-transition-group'
import VaultActions from './vaultActions'
import { fromWeiFormatted } from '../helpers/format'

const Vault = props => {
  const ref                     = React.createRef()
  const token                   = require(`../abis/tokens/${props.token}`).default
  const vault                   = require(`../abis/vaults/${props.token}`).default
  const [expanded, setExpanded] = useState(false)

  const handleClick = () => {
    setExpanded(! expanded)
  }

  const toPercentage = (number) => {
    number = number || 0.0
    const fixed = (number > 0.0 && number < 10) ? 3 : 2

    return `${(number).toFixed(fixed)}%`
  }

  const dpy = () => {
    return (props.apy || 0.0) / 365
  }

  const tokenContract = (token, web3) => {
    return () => {
      return new web3.eth.Contract(token.abi, token.address)
    }
  }

  const vaultContract = (vault, web3) => {
    return () => {
      return new web3.eth.Contract(vault.abi, vault.address)
    }
  }

  const renderVaultActions = () => {
    if (expanded) {
      return (
        <VaultActions address={props.address}
                      allowance={props.allowance}
                      balance={props.balance}
                      decimals={props.decimals}
                      deposited={props.deposited}
                      symbol={props.symbol}
                      token={props.token}
                      tokenContract={tokenContract(token, props.web3)}
                      vault={props.vault}
                      vaultContract={vaultContract(vault, props.web3)}
                      web3={props.web3} />
      )
    }
  }

  return (
    <CSSTransition nodeRef={ref} key={props.token} in={expanded} timeout={300} classNames="vault">
      <div ref={ref}>
        <div className={`card border border-${props.color} bg-dark`}>
          <div className="card-body ms-2">
            <div className="row align-items-center cursor-pointer" onClick={handleClick}>
              <div className="col-3 col-md-2 col-lg-2">
                <img src={`/images/tokens/${props.token}.svg`} alt={props.token} height="48" width="48" />
              </div>
              <div className="col-9 col-md-10 col-lg-3">
                <h3 className="h4 mb-1">
                  {props.symbol}
                </h3>
                <p className="small text-muted mb-0">
                  Uses:
                  <span className="ms-2">
                    {props.uses}
                  </span>
                </p>
              </div>
              <div className="col-6 col-lg-2 text-lg-center mt-3 mt-lg-0">
                <p className="small text-primary mb-0">
                  ${props.balance ? fromWeiFormatted(props.balance, props.decimals) : '-'}
                </p>
                <p className="small text-muted mb-0">
                  Balance
                </p>
              </div>
              <div className="col-6 col-lg-2 text-lg-center mt-3 mt-lg-0">
                <p className="small text-primary mb-0">
                  ${props.deposited ? fromWeiFormatted(props.deposited, props.decimals) : '-'}
                </p>
                <p className="small text-muted mb-0">
                  Deposited
                </p>
              </div>
              <div className="col-4 col-lg-1 text-lg-center mt-3 mt-lg-0">
                <p className="small text-nowrap mb-0">
                  {toPercentage(props.apy)}
                </p>
                <p className="small text-muted mb-0">
                  APY
                </p>
              </div>
              <div className="col-4 col-lg-1 text-lg-center mt-3 mt-lg-0">
                <p className="small text-nowrap mb-0">
                  {toPercentage(dpy())}
                </p>
                <p className="small text-muted mb-0">
                  Daily
                </p>
              </div>
              <div className="col-4 col-lg-1 text-lg-center mt-3 mt-lg-0">
                <p className="small text-nowrap mb-0">
                  ${props.tvl ? fromWeiFormatted(props.tvl, props.decimals) : '-'}
                </p>
                <p className="small text-muted mb-0">
                  TVL
                </p>
              </div>
            </div>

            {renderVaultActions()}
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

Vault.propTypes = {
  address:   PropTypes.string,
  allowance: PropTypes.object,
  apy:       PropTypes.number,
  balance:   PropTypes.object,
  color:     PropTypes.string.isRequired,
  decimals:  PropTypes.object,
  deposited: PropTypes.object,
  symbol:    PropTypes.string.isRequired,
  token:     PropTypes.string.isRequired,
  tvl:       PropTypes.object,
  uses:      PropTypes.string.isRequired,
  web3:      PropTypes.object
}

export default Vault
