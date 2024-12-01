import styles from './alert.module.css';
import { clsx } from 'clsx';

export default function Alert({ children, ptype }) {
  return (
    <div
      className={clsx({
        [styles.success]: ptype === 'success',
        [styles.error]: ptype === 'error',
      })}
    >
      {children}
    </div>
  );
}