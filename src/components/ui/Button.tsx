{
  "dependencies": {
    "core": {
      "react": "^18.3.1",
      "react-dom": "^18.3.1",
      "@react-three/fiber": "^8.17.10",
      "three": "^0.169.0",
      "gsap": "^3.12.5",
      "@react-three/drei": "^9.114.0",
      "clsx": "^2.1.1",
      "tailwind-merge": "^2.5.4"
    },
    "dev": {
      "@vitejs/plugin-react": "^4.3.3",
      "vite": "^5.4.10",
      "typescript": "^5.6.3",
      "@types/node": "^20.11.24",
      "tailwindcss": "^3.4.1",
      "autoprefixer": "^10.4.20",
      "@eslint/js": "^9.13.0",
      "eslint": "^9.13.0",
      "globals": "^15.11.0",
      "typescript-eslint": "^8.10.0",
      "eslint-plugin-react-hooks": "^5.0.0",
      "eslint-plugin-react-refresh": "^0.4.14"
    },
    "ui": {
      "framer-motion": "^12.6.3",
      "lucide-react": "^0.344.0",
    },
    "code-helpers":{}
  }
}
```

```typescript
// src/components/ui/Button.tsx
import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { useTheme } from '../../design-system/theme';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  href?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'medium',
  href,
  children,
  ...props
}, ref) => {
  const theme = useTheme();

  const baseButtonStyles = css`
    font-family: ${theme.fontHeading};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: 8px;
    padding: ${size === 'small' ? '0.5rem 1rem' : size === 'large' ? '1rem 2rem' : '0.75rem 1.5rem'};
    font-size: ${size === 'small' ? '0.875rem' : size === 'large' ? '1.125rem' : '1rem'};
    transition: all 0.3s ease-in-out;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px ${theme.accent};
    }

    &:active {
      transform: translateY(0px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  `;

  const primaryButtonStyles = css`
    background-color: ${theme.primary};
    color: ${theme.textInverted};

    &:hover {
      background-color: ${theme.primaryLight};
    }
  `;

  const secondaryButtonStyles = css`
    background-color: ${theme.secondary};
    color: ${theme.text};
    border: 2px solid ${theme.secondary};

    &:hover {
      background-color: ${theme.secondaryLight};
      border-color: ${theme.secondaryLight};
      color: ${theme.text};
    }
  `;

  const StyledButton = styled(motion.button)`
    ${baseButtonStyles}
    ${variant === 'primary' ? primaryButtonStyles : secondaryButtonStyles}
  `;

  const StyledLink = styled(motion.a)`
    ${baseButtonStyles}
    ${variant === 'primary' ? primaryButtonStyles : secondaryButtonStyles}
    text-decoration: none;
  `;

  if (href) {
    return (
      <StyledLink
        href={href}
        {...props}
        ref={ref as React.Ref<HTMLAnchorElement>}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97, y: 0 }}
      >
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      {...props}
      ref={ref as React.Ref<HTMLButtonElement>}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97, y: 0 }}
    >
      {children}
    </StyledButton>
  );
});

Button.displayName = 'Button';

export default Button;