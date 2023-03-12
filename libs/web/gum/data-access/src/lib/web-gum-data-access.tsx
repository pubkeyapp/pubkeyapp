import styles from './web-gum-data-access.module.css'

/* eslint-disable-next-line */
export interface WebGumDataAccessProps {}

export function WebGumDataAccess(props: WebGumDataAccessProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WebGumDataAccess!</h1>
    </div>
  )
}

export default WebGumDataAccess
