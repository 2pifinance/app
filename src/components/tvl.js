import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { selectVaults } from '../features/vaultsSlice'
import { formatAmount } from '../helpers/format'
import { fromWei } from '../helpers/wei'

const Tvl = props => {
  const vaults = useSelector(selectVaults)
  const tvl    = vaults.reduce((acc, vault) => {
    const amount = vault.tvl ? fromWei(vault.tvl, vault.decimals) : NaN

    return acc.plus(amount)
  }, new BigNumber('0'))

  return (
    <div className="row text-end mt-4">
      <div className="col-6 col-sm-8 col-lg-10 border-end pe-3 border-2">
        <h2 className="h4 mb-0">
          TVL
        </h2>
      </div>
      <div className="col-6 col-sm-4 col-lg-2">
        <h3 className="h4 text-primary ms-3 mb-0">
          ${tvl.isNaN() ? '-' : formatAmount(tvl.toNumber())}
        </h3>
      </div>
    </div>
  )
}

export default Tvl
