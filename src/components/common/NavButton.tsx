import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { NavLinkProps } from 'react-router-dom';
import '../../styles/Button.css'

interface NavButtonProps
    extends NavLinkProps { }

const NavButton: FunctionComponent<NavButtonProps> = (
    props
) => {
    return (<NavLink className='button nav-button'
        {...props}>
    </NavLink>);
}

export default NavButton;