import styles from './web-gum-ui.module.css'

/* eslint-disable-next-line */
export interface WebGumUiProps {}

export function WebGumUi(props: WebGumUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WebGumUi!</h1>
    </div>
  )
}

export default WebGumUi
