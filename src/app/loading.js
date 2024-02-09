import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const loading = () => {
  return (
    <div>
        <Skeleton count={10} height={30} />
        <h1>Loading....</h1>
    </div>
  )
}

export default loading