import React, { useRef } from 'react';
import useTwitterLogo from 'hooks/useTwitterLogo';
import useFontSize from 'hooks/useFontSize';
import classNameUtil from 'utils/className';
import './Container.css';
import getCSSVariables from 'utils/getCSSVariables';
import themes, { ThemeOption, TweetCardColors } from 'themes';
import globalClassName from 'utils/globalClassName';
import useGradientBackground from 'hooks/useGradientBackground';
import useBlurredBackground from 'hooks/useBlurredBackground';
import css from './Container.module.css';

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    children: any;
    className?: string,
    theme?: ThemeOption;
    colors?: TweetCardColors;
    gradientBackground?: boolean;
    blurredBackground?: boolean;
}

const Container = ({
  children,
  className,
  theme = 'light',
  colors = {},
  gradientBackground,
  blurredBackground,
  ...rest
} : ContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const twitterLogo = useTwitterLogo(containerRef);
  useFontSize(containerRef);
  const gradientStyle = useGradientBackground(gradientBackground, colors, themes[theme]);
  const blurredStyle = useBlurredBackground(blurredBackground, colors, themes[theme]);

  return (
    <div
      ref={containerRef}
      {...classNameUtil(
        globalClassName('container'),
        className,
        css.container,
        twitterLogo,
      )}
      {...rest}
      style={{
        ...getCSSVariables(colors, themes[theme]),
        ...gradientStyle,
        ...blurredStyle,
        ...rest.style,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
