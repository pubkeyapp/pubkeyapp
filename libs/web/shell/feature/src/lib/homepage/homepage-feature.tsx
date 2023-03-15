import { Button, Container, Group, Paper, Stack } from '@mantine/core'
import { IconCookie, IconGauge, IconLock, IconMessage2, IconUser } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { HomepageSectionBuiltWith } from './homepage-section-built-with'
import { HomepageSectionFaq } from './homepage-section-faq'
import { HomepageSectionGrid } from './homepage-section-grid'
import { HomepageSectionHeroImage } from './homepage-section-hero-image'
import { DialectLogo } from './logos/dialect-logo'
import { GumLogo } from './logos/gum-logo'
import { HeliusLogo } from './logos/helius-logo'

export function HomepageFeature() {
  return (
    <Stack spacing={72}>
      <HomepageSectionHeroImage
        title={
          <>
            <br />
            Decentralized
            <br />
            Identity
            <br />
            Provider
            <br />
            <br />
            Built on Solana.
          </>
        }
        description={
          'PubKey is a decentralized and censorship-resistant way to manage your online identities. Open-source and built on Solana.'
        }
        cta="Get early access"
      />
      <HomepageSectionBuiltWith
        data={[
          {
            icon: <DialectLogo height={36} width={150} />,
            title: 'Dialect',
            description:
              'Rich, interactive mobile messaging and notifications. Get notified about the content you care about the most.',
            link: 'https://dialect.to',
          },
          {
            icon: <GumLogo height={36} width={100} />,
            title: 'Gum',
            description:
              'Solana Social Legos: Build sticky apps with ease. The Gum SDK is all you need to make your applications engaging and fun to use.',
            link: 'https://gum.fun',
          },
          {
            icon: <HeliusLogo height={36} width={175} />,
            title: 'Helius',
            description:
              'The ultimate developer platform for building on Solana. Navigate on-chain data with enhanced Solana APIs, webhooks and RPCs.',
            link: 'https://helius.xyz',
          },
        ]}
      />

      <HomepageSectionGrid
        title="The Social Network That Puts You in Control"
        description="Discover the features that set PubKey apart from traditional social networks."
        data={[
          {
            icon: IconGauge,
            title: 'Decentralized Control',
            description: 'Take control of your social media presence with decentralized blockchain storage.',
          },
          {
            icon: IconUser,
            title: 'Solana Integration',
            description: 'Sign up with your Solana wallet for unparalleled privacy and security.',
          },
          {
            icon: IconCookie,
            title: 'Censorship Resistance',
            description: 'Enjoy a social network free from censorship and corporate meddling.',
          },
          {
            icon: IconLock,
            title: 'Transparent Friends List',
            description: 'View your friends list on the blockchain for maximum transparency and security.',
          },
          {
            icon: IconMessage2,
            title: 'Public Key Profiles',
            description: 'Use your public key as your profile, ensuring authenticity and security.',
          },
          {
            icon: IconLock,
            title: 'Immutable Posts',
            description: 'Post with confidence knowing your content is stored immutably on the blockchain.',
          },
        ]}
      />
      <HomepageSectionFaq
        data={[
          {
            id: '1',
            question: 'What is PubKey?',
            answer: 'PubKey is a decentralized social network built on the Solana blockchain.',
          },
          {
            id: '2',
            question: 'How is PubKey different from traditional social networks?',
            answer:
              'PubKey is decentralized, meaning that it is not controlled by a central authority, and user data is stored on the blockchain, making it secure and tamper-proof.',
          },
          {
            id: '3',
            question: 'What is Solana, and why is it used in PubKey?',
            answer:
              'Solana is a fast and secure blockchain platform that offers high performance and low transaction fees. It is used in PubKey to ensure fast, reliable, and secure transactions, making it the perfect fit for a decentralized social network.',
          },
          {
            id: '4',
            question: 'How do I sign up for PubKey?',
            answer:
              'You can sign up for PubKey by connecting your Solana wallet to the platform. Once connected, you can create your profile, start adding friends, and posting content.',
          },
          {
            id: '5',
            question: 'How is my privacy protected on PubKey?',
            answer:
              'PubKey offers unparalleled privacy by allowing users to control their social media presence and keep their data secure on the blockchain. The platform also offers end-to-end encryption for private messaging, ensuring that your messages remain private and secure.',
          },
          {
            id: '6',
            question: 'Is PubKey free to use?',
            answer:
              'Yes, PubKey is free to use. However, some features may require payment in cryptocurrency, such as creating a custom profile or accessing premium content.',
          },
          {
            id: '7',
            question: 'Can I earn cryptocurrency on PubKey?',
            answer:
              'Yes, PubKey offers ways to earn cryptocurrency, such as by participating in the community, creating high-quality content, and engaging with other users.',
          },
          {
            id: '8',
            question: 'Is PubKey available on mobile devices?',
            answer:
              'Yes, PubKey is available on mobile devices. You can download the PubKey app from the App Store or Google Play and start using the platform on your mobile device.',
          },
        ]}
      />
      <Group position="center" mb={72}>
        <Button component={Link} to="/dashboard" size="xl">
          Get Early Access
        </Button>
      </Group>
    </Stack>
  )
}

export function HomepageContentFeature({ page }: { page: string }) {
  return (
    <Container>
      <Paper>TBD: {page}</Paper>
    </Container>
  )
}
