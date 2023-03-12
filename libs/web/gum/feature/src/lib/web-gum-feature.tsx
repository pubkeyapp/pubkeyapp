import styles from './web-gum-feature.module.css'

/* eslint-disable-next-line */
export interface WebGumFeatureProps {}

export function WebGumFeature(props: WebGumFeatureProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WebGumFeature!</h1>
    </div>
  )
}

export default WebGumFeature
