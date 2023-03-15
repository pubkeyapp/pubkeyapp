import styles from './web-account-feature.module.css'

/* eslint-disable-next-line */
export interface WebAccountFeatureProps {}

export function WebAccountFeature(props: WebAccountFeatureProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WebAccountFeature!</h1>
    </div>
  )
}

export default WebAccountFeature
