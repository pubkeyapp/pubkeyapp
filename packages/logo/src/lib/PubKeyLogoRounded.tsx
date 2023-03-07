import React from 'react'
import { LogoProps, usePubKeyLogoColors } from './use-pubkey-logo-colors'

export function PubKeyLogoRounded({ size, color, variant, inverted, ...others }: LogoProps) {
  const colors = usePubKeyLogoColors(color, variant, inverted)

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 512" width={size} height={size} {...others}>
      <rect id="Rectangle" fill={colors.background} x="0" y="0" width="512" height="512" rx="64"></rect>
      <g id="P" transform="translate(142.000000, 96.000000)" fill={colors.color} fillRule="nonzero">
        <path
          d="M55.296,210.432 L55.296,316.416 C52.5653333,317.44 48.9813333,318.378667 44.544,319.232 C40.1066667,320.085333 35.1573333,320.512 29.696,320.512 C19.1146667,320.512 11.52,318.549333 6.912,314.624 C2.304,310.698667 0,304.128 0,294.912 L0,30.72 C0,24.9173333 1.62133333,20.3946667 4.864,17.152 C8.10666667,13.9093333 12.6293333,11.4346667 18.432,9.728 C29.0133333,5.97333333 41.6426667,3.41333333 56.32,2.048 C70.9973333,0.682666667 84.8213333,-5.68434189e-14 97.792,-5.68434189e-14 C142.165333,-5.68434189e-14 175.018667,9.38666667 196.352,28.16 C217.685333,46.9333333 228.352,72.3626667 228.352,104.448 C228.352,136.533333 217.685333,162.218667 196.352,181.504 C175.018667,200.789333 143.189333,210.432 100.864,210.432 L55.296,210.432 Z M97.28,165.888 C120.832,165.888 139.349333,160.768 152.832,150.528 C166.314667,140.288 173.056,124.928 173.056,104.448 C173.056,83.968 166.656,68.9493333 153.856,59.392 C141.056,49.8346667 122.709333,45.056 98.816,45.056 C90.9653333,45.056 83.2,45.3973333 75.52,46.08 C67.84,46.7626667 60.928,47.616 54.784,48.64 L54.784,165.888 L97.28,165.888 Z"
          id="Shape"
        ></path>
      </g>
    </svg>
  )
}
