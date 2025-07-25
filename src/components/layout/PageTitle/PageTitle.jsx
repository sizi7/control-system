import { useLocation } from 'react-router-dom';
import styles from './PageTitle.module.css';
import { resolveLabel } from '@/constants/pathLabels';

export default function PageTitle({ title }) {
  const { pathname } = useLocation();
  const title__ = resolveLabel(pathname);
  console.log('title__', title__);

  return <h3 className={styles.title}>{title}</h3>;
}
