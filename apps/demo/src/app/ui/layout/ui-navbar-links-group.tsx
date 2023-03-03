import { Box, Collapse, createStyles, getStylesRef, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { ComponentType, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const useStyles = createStyles((theme, _, getRef) => {
  const icon = getStylesRef('icon')

  return {
    control: {
      fontWeight: 500,
      display: 'block',
      width: '100%',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      fontSize: theme.fontSizes.sm,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },

    link: {
      fontWeight: 500,
      display: 'block',
      textDecoration: 'none',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      paddingLeft: 31,
      marginLeft: 30,
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({
          variant: 'light',
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
          }).color,
        },
      },
    },

    chevron: {
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      transition: 'transform 200ms ease',
    },
  }
})

export interface UiNavbarLinkGroupProps {
  icon?: ComponentType<{ size: number }>
  link?: string
  label: string
  links?: { label: string; link: string }[]
}

export function UiNavbarLinkGroup({ icon: Icon, label, link, links }: UiNavbarLinkGroupProps) {
  const { classes, cx, theme } = useStyles()
  const hasLinks = Array.isArray(links)
  const location = useLocation()
  const linkActive = link && location.pathname === link
  const [opened, setOpened] = useState(location.pathname?.startsWith(`${link}`) || false)

  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft

  const items = (hasLinks ? links : []).map((link) => {
    const active = location.pathname === link.link
    return (
      <Text
        className={cx(classes.link, { [classes.linkActive]: active })}
        component={Link}
        to={link.link}
        key={link.label}
      >
        {link.label}
      </Text>
    )
  })

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group position="apart" spacing={0}>
          {link ? (
            <Text
              className={cx({ [classes.linkActive]: linkActive })}
              component={Link}
              to={`${link}`}
              sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
              onClick={() => setOpened(false)}
            >
              <UiNavbarLinkLink label={label} icon={Icon} />
            </Text>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <UiNavbarLinkLink label={label} icon={Icon} />
            </Box>
          )}
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                marginLeft: theme.spacing.xs,
                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}

function UiNavbarLinkLink({ icon: Icon, label }: UiNavbarLinkGroupProps) {
  return (
    <>
      {Icon ? (
        <ThemeIcon variant="light" size={30}>
          <Icon size={18} />
        </ThemeIcon>
      ) : null}
      <Box ml="md">{label}</Box>
    </>
  )
}
