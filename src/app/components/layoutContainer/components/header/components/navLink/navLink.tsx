import classnames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './navLink.module.scss';

type NavLinkProps = React.ComponentProps<typeof Link>;

export const NavLink = ({ children, className, ...otherProps }: NavLinkProps): JSX.Element => {
  const pathname = usePathname();
  const currentRoute = pathname === otherProps.href.toString();

  const classNames = classnames(styles.root, className, { [styles.active]: currentRoute });

  return (
    <Link {...otherProps} className={classNames}>
      {children}
    </Link>
  );
};
